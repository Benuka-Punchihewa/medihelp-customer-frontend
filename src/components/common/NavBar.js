import React, { useState } from "react";
import 
{ Grid, 
  Stack, 
  Typography,
  TextField,
  Button,
  CircularProgress,} 
from "@mui/material";
import { Box } from "@mui/system";
import colors from "../../assets/styles/colors";
import navbarStyles from "../../assets/styles/components/navbar";
import Popup from "../../components/common/Popup";
import {createUser} from "../../service/signIn.service";
import signIn from "../../models/signIn";
import { popAlert } from "../../utils/alerts";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";


const NavBar = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showRegiserPopup, setshowRegiserPopup] = useState(false);

  const dispatch = useDispatch();


  const [inputs, setInputs] = useState(signIn);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handlePopupClose = () => setShowPopup(false);
  const handleRegisterPopupClose = () => setshowRegiserPopup(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await createUser(inputs);

    if (response.success) {
      setLoading(false);
      dispatch(authActions.login(response.data));
      response?.data?.message &&
        popAlert("Success!", response?.data?.message, "success").then((res) => {});
        window.location.replace("/");
    } else {
      response?.data?.message &&
        popAlert("Error!", response?.data?.message, "error");
      response?.data?.data && setErrors(response.data.data);
    }
    setLoading(false);
  };


    return (
    <React.Fragment>
      <Box sx={{ backgroundColor: colors.primary, px: 8, py: 3 }}>
        <Grid container>
          <Grid item xs={6}>
            <Stack
              direction="row"
              spacing={2}
              justifyContent="flex-start"
              alignItems="center"
              sx={{ height: "100%" }}
            >
              <Typography
                variant="h4"
                sx={{ fontWeight: "bold", color: colors.white }}
              >
                MediHelp
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack
              direction="row"
              spacing={2}
              justifyContent="flex-end"
              alignItems="center"
              sx={{ height: "100%" }}
            >
              <Typography sx={{ ...navbarStyles.signInUpBtn }}  onClick={() => setshowRegiserPopup(true)}>
                Register
              </Typography>
              <Typography sx={{ ...navbarStyles.signInUpBtn }} onClick={() => setShowPopup(true)}>
                Sign In 
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Box>


     {/* signin popup */}
    <Popup
        width={650}
        show={showPopup}
        onClose={handlePopupClose}
      >
        <Box sx={{ mb: 2 }}>
        <form onSubmit={handleSubmit}> 
          <Typography variant="h4" fontWeight="bold" color="primary" textAlign={"center"} sx={{ mb: 6}}>
                  Sign In
            </Typography>
            <Box sx={{ mb: 5 ,m: 2}}>
              <TextField
                id="outlined-basic"
                variant="filled"
                label="Email"
                fullWidth
                value={inputs.email}
                onChange={(e) =>
                  setInputs({
                    ...inputs,
                    email:e.target.value,
                  })
                }
              />
              {errors["email"] && (
                  <Typography color="error">{errors["email"]}</Typography>
                )}
            </Box>

            <Box sx={{ mb: 5,m: 2,mt:6}}>
              <TextField
                id="outlined-password-input"
                variant="filled"
                label="Password"
                type="password"
                  fullWidth
                  value={inputs.password}
                  onChange={(e) =>
                    setInputs({
                      ...inputs,
                      password:e.target.value,
                    })
                }
              />
              {errors["password"] && (
                <Typography color="error">{errors["password"]}</Typography>
              )}
            </Box>

            <Box sx={{ml:50}}>
                <Typography variant="h7" color="primary" >
                      Forget Your Password ? 
                </Typography>
            </Box>
            <Box sx={{m: 2}}>
                <Button  type="submit"
                  variant="contained"
                  fullWidth 
                  disabled={loading}>
                     {loading ? <CircularProgress color="secondary" /> : "Sign In"}
                    </Button>
            </Box>
            </form>
            <Box textAlign={"center"}>
                <Typography variant="h7" color="primary" >
                      Do you need to create an account? 
                </Typography>
            </Box>
          </Box>
      </Popup>


    {/* register popup */}
    <Popup
        width={650}
        show={showRegiserPopup}
        onClose={handleRegisterPopupClose}
      >
        <Box sx={{ mb: 2 }}>
          <Typography variant="h4" fontWeight="bold" color="primary" textAlign={"center"} sx={{ mb: 6}}>
                  Register
            </Typography>
            <Box sx={{ mb: 2 ,m: 3}}>
            <TextField
                id="outlined-basic"
                variant="filled"
                label="Email"
                fullWidth
              />
            </Box>

            <Box sx={{ mb: 5,m: 2,mt:6}}>
              <TextField
                id="outlined-password-input"
                variant="filled"
                label="Password"
                type="password"
                  fullWidth
              />
            </Box>
          </Box>
      </Popup> 
    </React.Fragment>
  );
};

export default NavBar;
