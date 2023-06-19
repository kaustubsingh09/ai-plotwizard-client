"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    triggerRender: (state, action) => {
      state.count = state.count + 1;
    },
  },
});

export default projectSlice.reducer;
export const { triggerRender } = projectSlice.actions;
