import { FcGoogle } from "react-icons/fc";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { signUpSchema } from "../../schemas";
import { MyLogo } from "../content/MyLogo";
import { createUser } from "../../firebase/services/";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { MySmallLoading } from "../content/MySmallLoading";
import { signInWithGoogle } from "../../firebase/services/authSession";
import { AlertMotion } from "../content/AlertMotion";
import { FirebaseError } from "firebase/app";

interface IFormInput {
  email: string;
  password: string;
  confirmPassword: string;
}

export const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(signUpSchema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);

    setIsLoading(true);
    try {
      const user = await createUser(data.email, data.password);
      if (user.user) {
        navigate("/");
        console.log(user.user);
      }
    } catch (error) {
      console.log(error);
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/email-already-in-use":
            setAuthError("Email already in use");
            break;
          case "auth/invalid-email":
            setAuthError("Invalid email");
            break;
          case "auth/operation-not-allowed":
            setAuthError("Operation not allowed");
            break;
          case "auth/weak-password":
            setAuthError("Weak password");
            break;
          default:
            setAuthError(error.message);
            break;
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginWithGoogle = async () => {
    try {
      const response = await signInWithGoogle();
      if (response.user.email) {
        navigate("/");
        // localStorage.setItem("firebaseUser", JSON.stringify(response.user));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="flex flex-col items-center justify-center px-4 py-14">
        <div className="myCard">
          <form
            id="signUpForm"
            className="flex w-[60vw] flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col items-center gap-4">
              <MyLogo />
              <h2 className="text-2xl font-semibold">Create test account</h2>
            </div>
            {authError && (
              <AlertMotion
                message={authError}
                props={{ variant: "subtle", status: "error" }}
              />
            )}

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email:
                <span className="text-myPrimary">
                  * {errors.email && `(${errors.email.message})`}
                </span>
              </label>{" "}
              <input
                {...register("email")}
                className="myInput"
                type="email"
                id="email"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password:
                <span className="text-myPrimary">
                  * {errors.password && `(${errors.password.message})`}
                </span>
              </label>{" "}
              <input
                {...register("password")}
                className="myInput"
                type="password"
                id="password"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-sm font-medium">
                Confirm Password:
                <span className="text-myPrimary">
                  *{" "}
                  {errors.confirmPassword &&
                    `(${errors.confirmPassword.message})`}
                </span>
              </label>{" "}
              <input
                {...register("confirmPassword")}
                className="myInput"
                type="password"
                id="confirmPassword"
              />
            </div>
            <button className="myPrimaryBtn" type="submit" disabled={isLoading}>
              {isLoading && <MySmallLoading />}
              Sign Up
            </button>
            <button
              className="myWhiteBtn"
              disabled={isLoading}
              onClick={handleLoginWithGoogle}
              type="button"
            >
              {isLoading && <MySmallLoading />}
              <FcGoogle />
              Sign Up with Google
            </button>
          </form>
        </div>
      </section>
    </>
  );
};
