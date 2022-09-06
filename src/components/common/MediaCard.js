import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {Box } from "@mui/material";
import colors from '../../assets/styles/colors';

export default function ImgMediaCard() {
  return (
    <Card sx={{ borderRadius: "5px 5px 5px 5px",
                boxShadow: "0px 8px 25px rgba(0, 0, 0, 0.25)",
                "&:hover":{backgroundColor:colors.primary},
          }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="190"
        image="https://img.freepik.com/free-photo/young-woman-pharmacist-pharmacy_1303-25541.jpg?w=2000"
      />
    
      <CardActions sx={{ height: 55 }}>
        <Box >
            <Typography gutterBottom variant="h7" component="div" >
                Samarashingha Pharmacy
            </Typography>
        </Box>
        <Box sx={{ mb:0, textAlign: 'right', fontWeight: 'bold' }}>
            <Typography gutterBottom variant="h7" component="div">
                700 m Away
            </Typography>
        </Box>
       
      </CardActions>
      
      
    </Card>
  );
}
