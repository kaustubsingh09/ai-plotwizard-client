"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: "ssdd",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state, action) => {
      state.user = "";
    },
  },
});

export default userSlice.reducer;
export const { logoutUser } = userSlice.actions;
