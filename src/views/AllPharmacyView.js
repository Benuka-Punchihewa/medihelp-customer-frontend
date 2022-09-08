import React, { useState,useEffect } from "react";
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import MediaCard from '../components/common/MediaCard';
import SearchBar from '../components/common/SearchBar';
import { getallPharmacies } from '../service/pharmacy.service';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';


const AllPharmacyView = () => {

  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

const [pharmacydata,setPharmacydata] = useState([]);
const [totalPages, setTotalPages] = useState(0);

useEffect(() => {
  getallPharmacies(page,12,"desc").then((response ) =>{
    setPharmacydata(response.data.content)
    setTotalPages(response.data.totalPages)
    
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
      <Typography variant="h6" sx={{ fontWeight: "bold" ,ml:2 }}>
            Neareast Pharmacies
        </Typography>
        <Box sx={{
            m:2 ,
            borderRadius:15,
        }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} >
        {pharmacydata.map((item,index) => (
            <Grid item xs={12} sm={12} md={4} lg={3} key={index} >
              <MediaCard name={item.name} contactNumber={item.contactNumber}/>
          </Grid>
        ))}
    </Grid>
    </Box>
        <Box sx={{ml:130 }}>
        <Pagination count={totalPages} page={page} onChange={handleChange} fontWeight={"bold"}/>
        </Box>
  </Box>
  );
}
export default AllPharmacyView