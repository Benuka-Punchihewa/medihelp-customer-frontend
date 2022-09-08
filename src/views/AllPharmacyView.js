import React, { useState,useEffect } from "react";
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import MediaCard from '../components/common/MediaCard';
import SearchBar from '../components/common/SearchBar';
import { getallPharmacies } from '../service/pharmacy.service';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const AllPharmacyView = () => {

const [page] = React.useState(1);

const [pharmacydata,setPharmacydata] = useState([]);

useEffect(() => {
  getallPharmacies(page,10,"desc").then((response ) =>{
    setPharmacydata(response.data.content)
  })
  
}, [page])


  return (
    <Box sx={{ flexGrow: 1 }}>
       
       <Box sx={{mt:2,
                p:3,
                width:'80%',
                ml:15,}}>
          <SearchBar/>
      </Box>
      
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {pharmacydata.map((item,index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <Item><MediaCard name={item.name} contactNumber={item.contactNumber}/></Item>
          </Grid>
        ))}
    </Grid>
  </Box>
  );
}
export default AllPharmacyView