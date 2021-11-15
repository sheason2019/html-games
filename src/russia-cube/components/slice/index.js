import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  state: 0,
};

export const RussiaCubeSlice = createSlice({
  name: "cube",
  initialState,
  reducers: {
    setState(state, payload) {
      state.state = payload.payload;
    },
  }
})

export const {
  setState,
} = RussiaCubeSlice.actions;

export default RussiaCubeSlice.reducer;
