import React, { useState, useEffect, useMemo } from "react";
import ProfileSidebar from "../assets/styles/components/ProfileSideBar";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Pagination,
  Radio,
  RadioGroup,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import OrderCard from "../assets/styles/components/OrderCard";
import { useSelector } from "react-redux";
import { getAllOrders } from "../service/order.service";
import Popup from "../components/common/Popup";
import Medicine from "../assets/styles/components/Medicine";

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

const boxStyles = {
  borderRadius: 5,
  boxShadow: "0px 8px 25px rgba(0, 0, 0, 0.25)",
  p: 3,
};

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
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cash_on_delivery");

  const handleOrderConfrim = (orderId) => {
    console.log(orderId);
  };

  const handleOrderCancel = (orderId) => {
    console.log(orderId);
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
    setPage(1);
    if (newValue === 0) {
      setStatus("pending");
    } else if (newValue === 1) {
      setStatus("requires_customer_confimation");
    } else if (newValue === 2) {
      setStatus("confirmed");
    } else if (newValue === 3) {
      setStatus("completed");
    } else if (newValue === 4) {
      setStatus("cancelled");
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleOrderCardBtnClick = (orderId) => {
    setSelectedOrderId(orderId);
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const selectedOrder = useMemo(
    () => orders.find((order) => order._id === selectedOrderId),
    [selectedOrderId, orders]
  );

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) setLoading(true);
    const fetchAndSet = async () => {
      const response = await getAllOrders(page, 10, "desc", status);

      if (response.success) {
        if (!unmounted) {
          setOrders(response?.data?.content || []);
          setTotalPages(response?.data?.totalPages || 0);
        }
      }

      if (!unmounted) setLoading(false);
    };

    fetchAndSet();

    return () => {
      unmounted = true;
    };
  }, [authState, page, status]);

  return (
    <React.Fragment>
      <Grid container>
        <Grid item md={3} display={"flex"} justifyContent={"center"}>
          <ProfileSidebar active={"my-orders"} />
        </Grid>
        <Grid item md={9} sx={{ pr: 5, py: 2 }}>
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
                <Tab label="To Be Approved" {...a11yProps(1)} />
                <Tab label="Ongoing" {...a11yProps(2)} />
                <Tab label="Completed" {...a11yProps(3)} />
                <Tab label="Rejected" {...a11yProps(4)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={value}>
              {loading ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CircularProgress />
                  &nbsp;&nbsp; Please Wait Until We Load Your Orders..
                </Box>
              ) : orders?.length > 0 ? (
                orders.map((order) => {
                  return (
                    <OrderCard
                      key={order?._id}
                      id={order?._id}
                      pharmacy={order?.pharmacy?.name}
                      price={order?.payment?.total}
                      onButtonClick={handleOrderCardBtnClick}
                    />
                  );
                })
              ) : (
                <Typography variant="h5" fontWeight={"bold"}>
                  Oops! Nothing in the list.
                </Typography>
              )}
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
      <Popup
        title={selectedOrder?._id}
        width={1200}
        show={showPopup}
        onClose={handlePopupClose}
      >
        <Grid container sx={{ py: 3 }} spacing={2}>
          <Grid item md={6}>
            <Box
              sx={{
                ...boxStyles,
              }}
            >
              <Typography variant="h6" fontWeight={"bold"} sx={{ pb: 1 }}>
                Medicines
              </Typography>
              {selectedOrder?.medicines.length > 0 ? (
                selectedOrder?.medicines?.map((medicine, key) => {
                  return (
                    <Box key={key}>
                      <Medicine
                        medicine={medicine}
                        onClose={handlePopupClose}
                      />
                      <Divider />
                    </Box>
                  );
                })
              ) : (
                <Typography variant="h7" fontWeight={"bold"}>
                  Oops! Nothing in the list.
                </Typography>
              )}
            </Box>
          </Grid>
          <Grid item md={6}>
            <Grid container spacing={2}>
              <Grid item>
                <Box
                  sx={{
                    ...boxStyles,
                  }}
                >
                  <Typography variant="h6" fontWeight={"bold"} sx={{ pb: 1 }}>
                    Delivery
                  </Typography>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <Box display="flex" width={"100%"}>
                        <Box
                          display="flex"
                          justifyContent={"flex-start"}
                          width={"100%"}
                        >
                          <Typography variant="p" fontWeight={"bold"}>
                            Receiver's Name:
                          </Typography>
                        </Box>
                        <Box
                          display="flex"
                          justifyContent={"flex-end"}
                          width={"100%"}
                        >
                          <Typography
                            textOverflow={"ellipsis"}
                            whiteSpace={"nowrap"}
                          >
                            {selectedOrder?.patient?.name || "N/A"}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box display="flex" width={"100%"}>
                        <Box
                          display="flex"
                          justifyContent={"flex-start"}
                          width={"100%"}
                        >
                          <Typography variant="p" fontWeight={"bold"}>
                            Receiver's NIC:
                          </Typography>
                        </Box>
                        <Box
                          display="flex"
                          justifyContent={"flex-end"}
                          width={"100%"}
                        >
                          <Typography
                            textOverflow={"ellipsis"}
                            whiteSpace={"nowrap"}
                          >
                            {selectedOrder?.patient?.NIC || "N/A"}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box display="flex" width={"100%"}>
                        <Box
                          display="flex"
                          justifyContent={"flex-start"}
                          width={"100%"}
                        >
                          <Typography variant="p" fontWeight={"bold"}>
                            Receiver's Address:
                          </Typography>
                        </Box>
                        <Box
                          display="flex"
                          justifyContent={"flex-end"}
                          width={"100%"}
                        >
                          <Typography
                            textOverflow={"ellipsis"}
                            whiteSpace={"nowrap"}
                          >
                            {selectedOrder?.delivery?.address || "N/A"}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    ...boxStyles,
                  }}
                >
                  <Typography variant="h6" fontWeight={"bold"} sx={{ pb: 1 }}>
                    Payment
                  </Typography>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <Box display="flex" width={"100%"}>
                        <Box
                          display="flex"
                          justifyContent={"flex-start"}
                          width={"100%"}
                        >
                          <Typography variant="p" fontWeight={"bold"}>
                            Status:
                          </Typography>
                        </Box>
                        <Box
                          display="flex"
                          justifyContent={"flex-end"}
                          width={"100%"}
                        >
                          <Typography
                            textOverflow={"ellipsis"}
                            whiteSpace={"nowrap"}
                          >
                            {selectedOrder?.payment?.status ? "Yes" : "No"}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box display="flex" width={"100%"}>
                        <Box
                          display="flex"
                          justifyContent={"flex-start"}
                          width={"100%"}
                        >
                          <Typography variant="p" fontWeight={"bold"}>
                            Sub Total:
                          </Typography>
                        </Box>
                        <Box
                          display="flex"
                          justifyContent={"flex-end"}
                          width={"100%"}
                        >
                          <Typography
                            textOverflow={"ellipsis"}
                            whiteSpace={"nowrap"}
                          >
                            {(selectedOrder?.payment?.subtotal &&
                              `Rs.${selectedOrder.payment.subtotal.toLocaleString(
                                "en-us"
                              )}`) ||
                              "N/A"}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box display="flex" width={"100%"}>
                        <Box
                          display="flex"
                          justifyContent={"flex-start"}
                          width={"100%"}
                        >
                          <Typography variant="p" fontWeight={"bold"}>
                            Delivery Charges:
                          </Typography>
                        </Box>
                        <Box
                          display="flex"
                          justifyContent={"flex-end"}
                          width={"100%"}
                        >
                          <Typography
                            textOverflow={"ellipsis"}
                            whiteSpace={"nowrap"}
                          >
                            {(selectedOrder?.payment?.subtotal &&
                              `Rs.${selectedOrder.payment.delivery.toLocaleString(
                                "en-us"
                              )}`) ||
                              "N/A"}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box display="flex" width={"100%"}>
                        <Box
                          display="flex"
                          justifyContent={"flex-start"}
                          width={"100%"}
                        >
                          <Typography variant="p" fontWeight={"bold"}>
                            Total:
                          </Typography>
                        </Box>
                        <Box
                          display="flex"
                          justifyContent={"flex-end"}
                          width={"100%"}
                        >
                          <Typography
                            textOverflow={"ellipsis"}
                            whiteSpace={"nowrap"}
                          >
                            {(selectedOrder?.payment?.subtotal &&
                              `Rs.${selectedOrder.payment.total.toLocaleString(
                                "en-us"
                              )}`) ||
                              "N/A"}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    ...boxStyles,
                  }}
                >
                  <Typography variant="h6" fontWeight={"bold"} sx={{ pb: 1 }}>
                    Order Actions
                  </Typography>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">
                          Payment Method
                        </FormLabel>
                        <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                          value={paymentMethod}
                          onChange={handlePaymentMethodChange}
                        >
                          <FormControlLabel
                            value="online"
                            control={<Radio />}
                            label="Online"
                          />
                          <FormControlLabel
                            value="cash_on_delivery"
                            control={<Radio />}
                            label="Cash On Delivery"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <Box display="flex" justifyContent={"flex-end"}>
                        <Button
                          variant="contained"
                          onClick={() => handleOrderConfrim(selectedOrder._id)}
                          sx={{
                            borderRadius: "8px",
                            mr: 1,
                          }}
                          color="error"
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="contained"
                          onClick={() => handleOrderCancel(selectedOrder._id)}
                          sx={{
                            borderRadius: "8px",
                          }}
                        >
                          Confirm
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Popup>
    </React.Fragment>
  );
};

export default MyOrders;
