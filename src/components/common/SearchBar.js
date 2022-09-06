import * as React from 'react';

import { styled   } from '@mui/material/styles';
import { TextField , Button ,Box} from '@mui/material';

const SerachBox = styled(Box)(({ theme }) => ({
    display:'flex',
    width:'100%',
    borderRadius: "5px 0px 0px 5px",
}));

const SearchBar = () =>  {
  return (
    <React.Fragment>
        <SerachBox >
        <TextField
            sx={{
              input: {
                fontWeight: "700",
                border:'0',
                borderRadius: "5px 0px 0px 5px",
              },
              width:'80%',
              backgroundColor: "#fff",
              boxShadow: "0px 8px 25px rgba(0, 0, 0, 0.25)",
            }}
            height="76px"
            
            // value={search}
            // onChange={(e)=> setSearch(e.target.value.toLowerCase())}
            placeholder="Search Pharmacies.."
            type="text"
          />
          <Button
            variant="contained"
            sx={{
              borderRadius: "0px 5px 5px 0px",
              boxShadow: "0px 8px 25px rgba(0, 0, 0, 0.25)",
              textTransform: "none",
              width: { lg: "175px", xs: "80px" },
              fontSize: { lg: "20px", xs: "14px" },
              height: "56px",
              color: "#ffff",
            }}
            // onClick={handleSearch}
          >
            Search
          </Button>
        </SerachBox>
    </React.Fragment>
  );
}
 export default SearchBar