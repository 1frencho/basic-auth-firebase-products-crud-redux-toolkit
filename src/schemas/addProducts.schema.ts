import * as yup from "yup";

export const addProductsSchema = yup
  .object({
    title: yup
      .string()
      .required("Title is required")
      .min(3, "Title must be at least 3 characters long")
      .max(35, "Title must not exceed 35 characters")
      .trim(),
    imgUrl: yup
      .string()
      .url("Please enter a valid URL")
      .required("Image URL is required")
      .max(2000, "URL must not exceed 2000 characters"),
    price: yup
      .number()
      .typeError("Price must be a number")
      .required("Price is required")
      .min(0.25, "Price must be at least $0.25")
      .max(10000, "Price must not exceed $10,000")
      .test(
        "is-decimal",
        "Price cannot have more than 2 decimal places",
        (value) => value == null || /^\d+(\.\d{1,2})?$/.test(value.toString()),
      )
      .transform((originalValue) => Number(Number(originalValue).toFixed(2))),
  })
  .required();
