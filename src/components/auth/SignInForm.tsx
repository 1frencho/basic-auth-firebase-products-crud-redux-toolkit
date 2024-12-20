import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { signInSchema } from "../../schemas";
import { MyLogo } from "../content/MyLogo";
import { signIn, signInWithGoogle } from "../../firebase/services/authSession";
import { MySmallLoading } from "../content/MySmallLoading";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertMotion } from "../content/AlertMotion";
import { FirebaseError } from "firebase/app";

interface IFormInput {
  email: string;
  password: string;
}

export const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(signInSchema),
  });

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const { user } = await signIn(data.email, data.password);

      // Check if email is verified - Boolean
      // if (!user.emailVerified) {
      //   toast.warning("Please verify your email");
      //   return;
      // }
      if (!user.email) {
        return;
      }
      navigate("/");
    } catch (error) {
      //
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/user-disabled":
            setAuthError("User disabled");
            break;
          case "auth/invalid-credential":
            setAuthError("Invalid credentials");
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
    setAuthError(null);
    try {
      const response = await signInWithGoogle();
      if (response.user.email) {
        navigate("/");
        localStorage.setItem("firebaseUser", JSON.stringify(response.user));
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
            id="signInForm"
            className="flex w-[60vw] flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col items-center gap-4">
              <MyLogo />
              <h2 className="text-2xl font-semibold">Sign into your account</h2>
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
                type="text"
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
            <button className="myPrimaryBtn" type="submit">
              {isLoading && <MySmallLoading />}
              Log In
            </button>
            <button
              className="myWhiteBtn"
              disabled={isLoading}
              type="button"
              onClick={handleLoginWithGoogle}
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
