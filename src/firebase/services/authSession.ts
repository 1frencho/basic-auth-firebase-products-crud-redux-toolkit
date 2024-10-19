import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  UserCredential,
} from "firebase/auth";
import { googleProvider, userAuth } from "../appConfig";

export const createUser = async (
  email: string,
  password: string,
): Promise<UserCredential> => {
  const user = await createUserWithEmailAndPassword(userAuth, email, password);
  return user;
};

export const signIn = async (
  email: string,
  password: string,
): Promise<UserCredential> => {
  const user = await signInWithEmailAndPassword(userAuth, email, password);
  return user;
};

export const signInWithGoogle = async (): Promise<UserCredential> => {
  const response = await signInWithPopup(userAuth, googleProvider);
  return response;
};

export const passwordRecovery = async (email: string): Promise<void> => {
  await sendPasswordResetEmail(userAuth, email);
};

export const updateProfile = async (): Promise<void> => {};
