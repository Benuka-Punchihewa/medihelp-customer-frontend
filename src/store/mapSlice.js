import {createSlice} from "@reduxjs/toolkit";

const mapSlice = createSlice({
  name: "map",
  initialState: {
    latitude: null,
    longitude: null,
  },
  reducers: {
    setLocation(state, action) {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
    },
  },
});

export const setMap = mapSlice.actions;

export default mapSlice;
