import { configureStore } from "@reduxjs/toolkit";
import { userNotableDataReducer } from "./slice/initialUserDataSlice";
import { toggleReducer } from "./slice/toggleSlice";
import environment from "../utils/environment";

export const store = configureStore({
  reducer: {
    notable: userNotableDataReducer,
    toggle: toggleReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable strict mode
    }),
  devTools: environment.NODE_ENV === "production" ? false : true,
});
