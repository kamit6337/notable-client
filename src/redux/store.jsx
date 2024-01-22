import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slice/authSlice";
import { initialUserDataReducer } from "./slice/initialUserDataSlice";
import { makeNoteReducer } from "./slice/makeNoteSlice";
import { globalErrorReducer } from "./slice/globalErrorSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    initialUserData: initialUserDataReducer,
    makeNote: makeNoteReducer,
    globalError: globalErrorReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable strict mode
    }),
});
