import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

interface ProductItem {
  id: string;
  title: string;
  price: number;
  imgUrl: string;
  handleEditProduct: (id: string) => void;
  handleDeleteProduct: (id: string) => void;
}

export const ProductItem = ({
  id,
  title,
  price,
  imgUrl,
  handleEditProduct,
  handleDeleteProduct,
}: ProductItem) => {
  return (
    <>
      <div className="relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
        <a
          className="relative mx-3 mt-3 flex h-60 rounded-xl"
          href="#"
          onClick={() => handleEditProduct(id)}
        >
          <img
            className="object-cover"
            src={imgUrl}
            alt="product image"
            width={500}
            height={500}
          />
          <span className="absolute left-0 top-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
            Admin Product
          </span>
        </a>
        <div className="mt-4 px-5 pb-5">
          <h5 className="text-xl tracking-tight text-slate-900">{title}</h5>
          <div className="mb-5 mt-2 flex items-center justify-between">
            <p>
              <span className="text-3xl font-bold text-slate-900">
                ${price}
              </span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              aria-label="Edit"
              className="flex items-center rounded-md bg-orange-400 px-4 py-2 font-semibold text-white transition-all duration-300 ease-in-out hover:bg-orange-500"
              onClick={() => handleEditProduct(id)}
            >
              <FaEdit className="mr-2 text-white" />
              Edit Product
            </button>
            <button
              aria-label="Delete"
              onClick={() => handleDeleteProduct(id)}
              className="flex items-center rounded-md bg-gray-300 px-4 py-2 font-semibold text-gray-500 transition-all duration-300 ease-in-out hover:bg-red-500 hover:text-white"
            >
              <MdDelete className="" size={25} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
