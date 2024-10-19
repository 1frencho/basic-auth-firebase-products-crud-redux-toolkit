import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  authFailure,
  authRequest,
  authSuccess,
  logout,
} from "../stores/auth.slice";
import { userAuth } from "../firebase/appConfig";
import { isValidAccount } from "../config/validAccounts";

export const useFBAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Listen for authentication state changes
    onAuthStateChanged(userAuth, (user) => {
      if (user) {
        user
          .getIdToken()
          .then((token) => {
            const isValidAdmin = isValidAccount(user.email ?? null);
            console.log(isValidAdmin);

            dispatch(
              authSuccess({
                userInfo: {
                  displayName: user.displayName,
                  email: user.email,
                  photoURL: user.photoURL,
                  uid: user.uid,
                  emailVerified: user.emailVerified,
                  isAnonymous: user.isAnonymous,
                  metadata: {
                    creationTime: user.metadata.creationTime,
                    lastSignInTime: user.metadata.lastSignInTime,
                  },
                },
                userToken: token,
                validAdmin: isValidAdmin,
              }),
            );
          })
          .catch((error) => {
            dispatch(authFailure(error.message));
          });
      } else {
        // No user is signed in
        dispatch(logout());
      }
    });

    // Dispatch a loading state while auth is being checked
    dispatch(authRequest());
  }, [dispatch]);
};
