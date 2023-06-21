import { configureStore } from "@reduxjs/toolkit";
import userSlice from "@/slice/userSlice";
import projectSlice from "@/slice/projectSlice";
// import characterSlice from "@/slice/characterSlice";

export const store = configureStore({
  reducer: {
    userSliceInfo: userSlice,
    projectSlice: projectSlice,
  },
});

export default store.getState;
