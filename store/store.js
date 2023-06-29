import { configureStore } from "@reduxjs/toolkit";

import errorSlice from "./errorSlice";

import authSlice from "./authSlice";

export const store = configureStore({
  reducer: {
    errorSlice,
    authSlice,
  },
});
