import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {Box } from "@mui/material";
import colors from '../../assets/styles/colors';

const img1 = 'https://img.freepik.com/free-photo/two-african-american-pharmacist-working-drugstore-hospital-pharmacy-african-healthcare_627829-3378.jpg?w=740&t=st=1662667567~exp=1662668167~hmac=e7e203d082041f79b21a2ec1f136ab8dc0f9a7c260c5dfabdc130ed8e3c19a37'

const MediaCard = ({name , contactNumber}) => {
  return (
    <Card sx={{ borderRadius: 4,
                boxShadow: "0px 8px 25px rgba(0, 0, 0, 0.25)",
                //  "&:hover":{backgroundColor:colors.primary},
          }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="190"
        boxShadow= "0px 8px 25px rgba(0, 0, 0, 0.25)"
        image="https://img.freepik.com/free-photo/young-woman-pharmacist-pharmacy_1303-25541.jpg?w=2000"
      />
    
      <CardActions sx={{ height: 55 }}>
        <Box sx={{ mb:0, textAlign: 'right', fontWeight: 'bold' }} >
            <Typography gutterBottom variant="h7" component="div" >
                {name}
            </Typography>
        </Box>
        <Box sx={{display:'flex' ,alignItems:'center' ,justifyContent:'center'}}>
            <Typography gutterBottom variant="h7" component="div" textAlign={'right'}>
                {contactNumber}
            </Typography>
        </Box>
       
      </CardActions>
      
      
    </Card>
  );
}
export default MediaCard