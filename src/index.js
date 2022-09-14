import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// components
import NavBar from "./components/common/NavBar";

// views
import Home from "./views/Home";
import colors from "./assets/styles/colors";
import PharamcyView from "./views/PharmacyView";
import AllPharmacyView from "./views/AllPharmacyView";
import MapGoogle from "./views/MapGoogle";

const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: "#000",
    },
  },
  typography: {
    fontFamily: '"Poppins", sans-serif',
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <ThemeProvider theme={theme}>
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pharmacies/:pharamcyId" element={<PharamcyView />} />
          <Route path="/pharmacies" element={<AllPharmacyView />} />
          <Route path="/google-map" element={<MapGoogle/>}/>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
);
