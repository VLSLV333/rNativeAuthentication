import { createSlice } from "@reduxjs/toolkit";

const initialState = { errorMessage: null };

const errorSlice = createSlice({
  initialState,
  name: "errorSlice",
  reducers: {
    setError: (state, { payload }) => {
      state.errorMessage = payload;
    },
  },
});

export default errorSlice.reducer;

export const { setError } = errorSlice.actions;
