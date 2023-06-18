import { configureStore } from "@reduxjs/toolkit";
import userSlice from "@/slice/userSlice";

export const store = configureStore({
  reducer: {
    userSliceInfo: userSlice,
  },
});

export default store.getState;
