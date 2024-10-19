import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { signInSchema } from "../../schemas";

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

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  return (
    <>
      <section className="flex flex-col items-center justify-center px-4 py-14">
        <div className="myCard">
          <form
            id="signInForm"
            className="flex w-[80vw] flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
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
            <button className="myPrimaryBtn">Log In</button>
          </form>
        </div>
      </section>
    </>
  );
};
