import { configureStore } from "@reduxjs/toolkit";
import userSlice from "@/slice/userSlice";
import projectSlice from "@/slice/projectSlice";

export const store = configureStore({
  reducer: {
    userSliceInfo: userSlice,
    projectSlice: projectSlice,
  },
});

export default store.getState;
