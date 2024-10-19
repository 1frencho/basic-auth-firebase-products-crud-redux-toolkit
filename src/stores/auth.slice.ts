import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { signOut } from "firebase/auth";
import { userAuth } from "../firebase/appConfig";

// Set a custom firebase interface for user
export interface IUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  isAnonymous: boolean;
  metadata: {
    creationTime: string | undefined;
    lastSignInTime: string | undefined;
  };
}

// Define the shape of your auth state
interface IAuthState {
  loading: boolean;
  userInfo: IUser | null; // Firebase user object
  userToken: string | null;
  error: string | null;
  success: boolean;
  isValidAdmin: boolean;
}

const initialState: IAuthState = {
  loading: true,
  userInfo: null,
  userToken: null,
  error: null,
  success: false,
  isValidAdmin: false,
};

// Create the auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // When login is in process
    authRequest: (state) => {
      state.error = null;
      state.success = false;
    },
    // When login is successful
    authSuccess: (
      state,
      action: PayloadAction<{
        userInfo: IUser;
        userToken: string;
        validAdmin: boolean;
      }>,
    ) => {
      state.loading = false;
      state.userInfo = action.payload.userInfo;
      state.userToken = action.payload.userToken;
      state.isValidAdmin = action.payload.validAdmin;
      state.success = true;
    },
    // When there's an error in authentication
    authFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
      state.isValidAdmin = false;
    },
    // Logout user
    logout: (state) => {
      signOut(userAuth);
      state.loading = false;
      state.userInfo = null;
      state.userToken = null;
      state.error = null;
      state.success = false;
      state.isValidAdmin = false;
    },
  },
});

// Export actions
export const { authRequest, authSuccess, authFailure, logout } =
  authSlice.actions;

// Export the reducer as default
export default authSlice.reducer;
