import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { deleteProduct } from "../../firebase/services";
import { useSelector } from "react-redux";
import { RootState } from "../../stores";
import { AlertMotion } from "../content/AlertMotion";

interface MoDeleteProductProps {
  id: string | null;
  onOpen: () => void;
  onClose: () => void;
}

export const MoDeleteProduct: React.FC<MoDeleteProductProps> = ({
  id,
  onOpen,
  onClose,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const { isValidAdmin } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    onOpen();
  }, [onOpen]);

  const handleDelete = async () => {
    if (!isValidAdmin) {
      toast.error("You are not allowed to delete products");
      return;
    }

    if (!id) {
      toast.error("Invalid product ID");
      return;
    }

    setIsLoading(true);
    try {
      await toast.promise(deleteProduct(id), {
        pending: "Deleting...",
        success: "Deleted!",
        error: "Something went wrong!",
      });
      onClose();
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!id) {
    return null;
  }

  return (
    <div className="flex flex-col items-start gap-4">
      <AlertMotion
        message={
          isValidAdmin
            ? "You are allowed to delete products"
            : "You are not allowed to delete products"
        }
        props={{
          variant: "subtle",
          status: isValidAdmin ? "success" : "error",
        }}
      />
      <h2>Are you sure you want to delete this product?</h2>
      <button
        className="mySecondaryBtn"
        onClick={handleDelete}
        disabled={isLoading || !isValidAdmin}
      >
        {isLoading ? "Deleting..." : "Yes, Delete"}
      </button>
    </div>
  );
};
