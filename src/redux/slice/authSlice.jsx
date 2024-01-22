import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  name: null,
  photo: null,
  email: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    isAuthenticated: (state, { payload }) => {
      const { auth, name, photo, email } = payload;

      if (!auth) {
        return {
          ...state,
          isAuth: false,
          name: null,
          photo: null,
          email: null,
        };
      } else if (auth) {
        return { ...state, isAuth: true, name, photo, email };
      }
    },
  },
});

export const { isAuthenticated } = authSlice.actions;

export const authReducer = authSlice.reducer;

export const authInitialState = (state) => state.auth;
