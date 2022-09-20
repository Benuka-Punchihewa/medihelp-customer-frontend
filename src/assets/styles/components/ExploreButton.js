import React from "react";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Box, Button } from "@mui/material";
import colors from "../../styles/colors";

const ExploreButton = ({ onClick }) => {
  return (
    <React.Fragment>
      <Box>
        <Button
          variant="contained"
          size="large"
          onClick={onClick}
          sx={{
            height: 40,
            borderRadius: "5px 5px 5px 5px",
            boxShadow: "0px 8px 25px rgba(0, 0, 0, 0.25)",
            "&:hover": { backgroundColor: colors.primary },
            ml:7
          }}>
         Explore <ArrowForwardIcon sx={{m:3}} />
        </Button>
      </Box>
    </React.Fragment>
  );
};

export default ExploreButton;
