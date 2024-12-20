import * as yup from "yup";

export const signUpSchema = yup
  .object({
    email: yup
      .string()
      .required("Field required")
      .email("Invalid Email")
      .matches(
        /^[a-zA-ZñÑ0-9._%+-]+@[a-zA-ZñÑ0-9-]+(\.[a-zA-ZñÑ]{2,})(\.[a-zA-ZñÑ]{2,})?$/,
        "Invalid Email Format",
      ),
    password: yup.string().required("Field required"),
    confirmPassword: yup
      .string()
      .required("Field required")
      .oneOf([yup.ref("password")], "Passwords must match"),
  })
  .required();
