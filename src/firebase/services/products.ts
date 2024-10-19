import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { IFormInput } from "../../components/products/MoEditProducts";
import { db } from "../appConfig";

export const getProductById = async (
  id: string | null,
): Promise<IFormInput | null> => {
  if (!id) return null;
  const productDoc = await getDoc(doc(db, "products", id));
  // Valid document
  return productDoc.exists()
    ? (productDoc.data() as unknown as IFormInput)
    : null;
};

export const updateProduct = async (
  id: string | null,
  data: IFormInput,
): Promise<void> => {
  if (!id) throw new Error("Invalid product ID");
  // This does not return anything
  await updateDoc(doc(db, "products", id), {
    ...data,
  });
};

export const deleteProduct = async (id: string | null): Promise<void> => {
  if (!id) throw new Error("Invalid product ID");
  await deleteDoc(doc(db, "products", id));
};

export const addProduct = async (data: IFormInput): Promise<void> => {
  if (!data.title || !data.price || !data.imgUrl)
    throw new Error("Invalid data");
  addDoc(collection(db, "products"), data);
};
