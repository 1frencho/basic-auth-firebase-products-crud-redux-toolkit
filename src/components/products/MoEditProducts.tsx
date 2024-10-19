import React, { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { addProductsSchema } from "../../schemas";
import { toast } from "react-toastify";
import { MotionDiv } from "../content/MotionDiv";
import { getProductById, updateProduct } from "../../firebase/services";

export interface IFormInput {
  title: string;
  price: number;
  imgUrl: string;
}

interface ModAddProduct {
  id: string | null;
  onOpen: () => void;
  onClose: () => void;
}

export const MoEditProduct: React.FC<ModAddProduct> = ({
  onOpen,
  onClose,
  id,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(addProductsSchema),
  });

  useEffect(() => {
    getProductById(id).then((product) => {
      if (product) {
        setValue("title", product.title);
        setValue("price", product.price);
        setValue("imgUrl", product.imgUrl);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onOpen, id]);

  const imgUrl = watch("imgUrl");

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);
    try {
      setIsLoading(true);
      await toast.promise(updateProduct(id, data), {
        pending: "Updating...",
        success: "Product updated!",
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
          {imgUrl?.length > 5 && (
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
            <input
              {...register("imgUrl")}
              className="myInput"
              type="url"
              id="imgUrl"
            />
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
            {isLoading ? "Updating..." : "Update Product"}
          </button>
        </form>
      </div>
    </section>
  );
};
