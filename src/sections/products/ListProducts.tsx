import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState, lazy } from "react";
import { db } from "../../firebase/appConfig";

const MainModal = lazy(() => import("../../components/modals/MainModal"));
import { useDisclosure } from "@chakra-ui/react";
import { ProductItem } from "../../components/products/ProductItem";
import { MoEditProduct } from "../../components/products/MoEditProducts";
import { MoDeleteProduct } from "../../components/products/MoDeleteProducts";
import { MoAddProduct } from "../../components/products/MoAddProduct";
import { MotionDiv } from "../../components/content/MotionDiv";

interface Products {
  id: string;
  title: string;
  imgUrl: string | null;
  price: number;
}

export const ListProducts = () => {
  const [products, setProducts] = useState<Products[]>();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [action, setAction] = useState<"edit" | "delete" | "add" | null>(null);
  const { onClose, isOpen, onOpen } = useDisclosure();

  useEffect(() => {
    onSnapshot(collection(db, "products"), (snapshot) => {
      // Set default arguments in an array.
      const arrayProducts: Products[] = snapshot.docs?.map((product) => ({
        ...product.data(),
        id: product.id,
      })) as unknown as Products[];

      setProducts(arrayProducts);
      return () => {
        onClose(); // Optionally close when unmounted to reset state
      };
    });
  }, [onClose]);

  const handleEditProduct = (id: string) => {
    setSelectedId(id);
    setAction("edit");
    onOpen();
  };

  const handleDeleteProduct = (id: string) => {
    setSelectedId(id);
    setAction("delete");
    onOpen();
  };

  const handleAddProduct = () => {
    setAction("add");
    onOpen();
  };
  return (
    <>
      {/* Modals */}
      <MainModal
        title={"Edit Product"}
        size="md"
        isOpen={isOpen && action === "edit"}
        onClose={onClose}
        closeText="Close"
        content={
          <MoEditProduct id={selectedId} onOpen={onOpen} onClose={onClose} />
        }
      />
      <MainModal
        title={"Delete Product"}
        size="md"
        isOpen={isOpen && action === "delete"}
        onClose={onClose}
        closeText="Close"
        content={
          <MoDeleteProduct id={selectedId} onOpen={onOpen} onClose={onClose} />
        }
      />
      <MainModal
        title={"Add Product"}
        size="3xl"
        isOpen={isOpen && action === "add"}
        onClose={onClose}
        closeText="Close"
        content={<MoAddProduct onOpen={onOpen} onClose={onClose} />}
      />

      {/* Content */}
      <section className="m-6 flex flex-col gap-4">
        <h2 className="text-2xl font-semibold">Product List</h2>
        <button className="myPrimaryBtn" onClick={handleAddProduct}>
          Add Product
        </button>
        {!products?.length ? (
          <></>
        ) : (
          <MotionDiv animation="slideFade">
            <div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:justify-center">
              {products?.map(({ price, title, id, imgUrl }) => (
                <ProductItem
                  imgUrl={
                    imgUrl ??
                    "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png"
                  }
                  key={id}
                  id={id}
                  title={title}
                  price={price}
                  handleEditProduct={handleEditProduct}
                  handleDeleteProduct={handleDeleteProduct}
                />
              ))}
            </div>
          </MotionDiv>
        )}
      </section>
    </>
  );
};
