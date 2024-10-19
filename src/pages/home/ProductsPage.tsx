import { BreadCrumb } from "../../components/content/BreadCrumb";
import { ListProducts } from "../../sections/products";

function ProductsPage() {
  return (
    <>
      <BreadCrumb title="Products" description="All products in sale" />
      <ListProducts />
    </>
  );
}
export default ProductsPage;
