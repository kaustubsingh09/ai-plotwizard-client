"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  characterCount: 0,
};

const characterSlice = createSlice({
  name: "character",
  initialState,
  reducers: {
    triggerCharacterRender: (state, action) => {
      state.characterCount = state.characterCount + 1;
    },
  },
});

export default characterSlice.reducer;
export const { triggerCharacterRender } = characterSlice.actions;
