import { configureStore } from "@reduxjs/toolkit";

// Importing the auth slice
import authReducer from "./auth.slice";

// Initializing the store
export const store = configureStore({
  reducer: {
    auth: authReducer, // Adding the auth slice
  },
});

// Setting the RootState type
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
