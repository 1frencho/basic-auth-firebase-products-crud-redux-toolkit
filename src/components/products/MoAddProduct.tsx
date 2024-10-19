import React, { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { addProductsSchema } from "../../schemas";
import { toast } from "react-toastify";
import { MotionDiv } from "../content/MotionDiv";
import { addProduct } from "../../firebase/services";

interface IFormInput {
  title: string;
  price: number;
  imgUrl: string;
}

interface ModAddProduct {
  onOpen: () => void;
  onClose: () => void;
}

export const MoAddProduct: React.FC<ModAddProduct> = ({ onOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(addProductsSchema),
  });

  useEffect(() => {
    onOpen();
  }, [onOpen]);

  const imgUrl = watch("imgUrl");
  // Watch errors to show error messages

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);
    try {
      setIsLoading(true);
      await toast.promise(addProduct(data), {
        pending: "Adding...",
        success: "Product added!",
        error: "Something went wrong!",
      });
      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex flex-col justify-center px-4">
      <div className="myCard">
        <form
          id="signInForm"
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Show a preview of the image */}
          {imgUrl?.length > 5 && !errors.imgUrl && (
            <MotionDiv>
              <div className="flex flex-col items-center justify-center gap-2">
                <img
                  src={imgUrl}
                  alt="imgUrl"
                  className="h-[250px] w-[250px] rounded-xl object-cover"
                  width={250}
                  height={250}
                />
              </div>
            </MotionDiv>
          )}
          <div className="flex flex-col gap-2">
            <label htmlFor="imgUrl" className="text-sm font-medium">
              Image URL
              <span className="text-myPrimary">
                * {errors.imgUrl && `(${errors.imgUrl.message})`}
              </span>
            </label>
            <input {...register("imgUrl")} className="myInput" id="imgUrl" />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="text-sm font-medium">
              Title:
              <span className="text-myPrimary">
                * {errors.title && `(${errors.title.message})`}
              </span>
            </label>
            <input
              {...register("title")}
              className="myInput"
              type="text"
              id="title"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="price" className="text-sm font-medium">
              Price:
              <span className="text-myPrimary">
                * {errors.price && `(${errors.price.message})`}
              </span>
            </label>
            <input
              {...register("price")}
              className="myInput"
              type="number"
              step={0.01}
              maxLength={4}
              id="price"
            />
          </div>

          <button className="mySecondaryBtn" type="submit" disabled={isLoading}>
            {isLoading ? "Adding..." : "Add Product"}
          </button>
        </form>
      </div>
    </section>
  );
};
