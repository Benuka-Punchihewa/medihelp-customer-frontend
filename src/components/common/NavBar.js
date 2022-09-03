import { Grid, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import colors from "../../assets/styles/colors";
import navbarStyles from "../../assets/styles/components/navbar";

const NavBar = () => {
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
              <Typography sx={{ ...navbarStyles.signInUpBtn }}>
                Sign In
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default NavBar;
