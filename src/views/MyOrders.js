import React, { useState, useEffect } from "react";
import ProfileSidebar from "../assets/styles/components/ProfileSideBar";
import { Box, Grid, Pagination, Tab, Tabs, Typography } from "@mui/material";
import OrderCard from "../assets/styles/components/OrderCart";
import { useSelector } from "react-redux";
import { getAllOrders } from "../service/order.service";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const MyOrders = () => {
  const authState = useSelector((state) => state.auth);

  const [value, setValue] = useState(0);
  const [page, setPage] = useState(1);
  const [orders, setOrders] = useState([]);
  const [totalPages, setTotalPages] = useState();
  const [status, setStatus] = useState("pending");

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
    setPage(1);
    if (newValue === 0) {
      setStatus("pending");
    } else if (newValue === 1) {
      setStatus("ongoing");
    } else if (newValue === 2) {
      setStatus("completed");
    } else if (newValue === 3) {
      setStatus("cancelled");
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleOrderCardBtnClick = (orderId) => {
    console.log(orderId);
  };

  useEffect(() => {
    let unmounted = false;

    const fetchAndSet = async () => {
      const response = await getAllOrders(page, 10, "desc", status);

      if (response.success) {
        if (!unmounted) {
          setOrders(response?.data?.content || []);
          setTotalPages(response?.data?.totalPages || 0);
        }
      }
    };

    fetchAndSet();

    return () => {
      unmounted = true;
    };
  }, [authState, page, status]);

  return (
    <React.Fragment>
      <Grid container>
        <Grid item md={3}>
          <ProfileSidebar />
        </Grid>
        <Grid item md={9} sx={{ px: 5, py: 2 }}>
          <Box>
            <Box sx={{ my: 3 }}>
              <Typography variant="h4" fontWeight={"bold"}>
                All Orders
              </Typography>
            </Box>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleTabChange}
                aria-label="basic tabs example"
              >
                <Tab label="Pending" {...a11yProps(0)} />
                <Tab label="Ongoing" {...a11yProps(1)} />
                <Tab label="Completed" {...a11yProps(2)} />
                <Tab label="Rejected" {...a11yProps(3)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              {orders.map((order) => {
                return (
                  <OrderCard
                    key={order?._id}
                    id={order?._id}
                    pharmacy={order?.pharmacy?.name}
                    price={order?.payment?.total}
                    onButtonClick={handleOrderCardBtnClick}
                  />
                );
              })}
            </TabPanel>
            <TabPanel value={value} index={1}>
              Item Two
            </TabPanel>
            <TabPanel value={value} index={2}>
              Item Three
            </TabPanel>
            <TabPanel value={value} index={3}>
              Item Four
            </TabPanel>
          </Box>
          <Box display={"flex"} justifyContent="flex-end">
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              fontWeight={"bold"}
            />
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default MyOrders;
