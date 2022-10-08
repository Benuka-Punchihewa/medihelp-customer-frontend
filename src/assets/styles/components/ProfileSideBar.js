import { Box, Divider, Typography } from "@mui/material";
import React from "react";

const ProfileSidebar = () => {
  return (
    <React.Fragment>
      <Box display={"flex"} flexDirection={"column"} sx={{ m: 5 }}>
        <Box display={"flex"} flexDirection={"column"} alignItems="center">
          <img
            src="https://cdn.pixabay.com/photo/2017/07/18/23/23/user-2517433_960_720.png"
            alt=""
            style={{
              height: 200,
              width: 200,
              objectFit: "cover",
              borderRadius: "50%",
            }}
          />
          <Box sx={{ mt: 3 }}>
            <Typography variant="h5" textAlign={"center"} fontWeight={"bold"}>
              Benuka Punchihewa
            </Typography>
          </Box>
        </Box>
        <br />
        <Divider />
        <br />
        <Box sx={{ m: 1 }}>
          <Typography>Profile Settings</Typography>
        </Box>
        <Box sx={{ m: 1 }}>
          <Typography>My Orders</Typography>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default ProfileSidebar;
