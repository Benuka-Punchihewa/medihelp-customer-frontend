import React, { useState } from "react";
import 
{ Grid, 
  Stack, 
  Typography,
  TextField,
  Button,} 
from "@mui/material";
import { Box } from "@mui/system";
import colors from "../../assets/styles/colors";

import navbarStyles from "../../assets/styles/components/navbar";
import Popup from "../../components/common/Popup";

const NavBar = () => {
  const [showPopup, setShowPopup] = useState(false);
  const handlePopupClose = () => setShowPopup(false);

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
              <Typography sx={{ ...navbarStyles.signInUpBtn }}>
                Register
              </Typography>
              <Typography sx={{ ...navbarStyles.signInUpBtn }} onClick={() => setShowPopup(true)}>
                Sign In 
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Box>

     {/* custom popup */}
    <Popup
        width={650}
        show={showPopup}
        onClose={handlePopupClose}
      >
        <Box sx={{ mb: 2 }}>
          <Typography variant="h4" fontWeight="bold" color="primary" textAlign={"center"} sx={{ mb: 6}}>
                  Sign In
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

            <Box sx={{ml:50}}>
                <Typography variant="h7" color="primary" >
                      Forget Your Password ? 
                </Typography>
            </Box>
            <Box sx={{m: 2}}>
                <Button fullWidth variant="contained">Sign In</Button>
            </Box>

            <Box textAlign={"center"}>
                <Typography variant="h7" color="primary" >
                      Do you need to create an account? 
                </Typography>
            </Box>
          </Box>
      </Popup>

    </React.Fragment>
  );
};

export default NavBar;
