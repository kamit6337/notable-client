import { configureStore } from "@reduxjs/toolkit";
import { userNotableDataReducer } from "./slice/initialUserDataSlice";
import { toggleReducer } from "./slice/toggleSlice";

export const store = configureStore({
  reducer: {
    notable: userNotableDataReducer,
    toggle: toggleReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable strict mode
    }),
});
