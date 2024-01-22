import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showError: false,
};

const globalErrorSlice = createSlice({
  name: "globalErrorSlice",
  initialState,
  reducers: {
    showErrorMsg: (state) => {
      state.showError = true;
    },
    disabledError: (state) => {
      state.showError = false;
    },
  },
});

export const { showErrorMsg, disabledError } = globalErrorSlice.actions;

export const globalErrorReducer = globalErrorSlice.reducer;

export const globalErrorInitialState = (state) => state.globalError;
