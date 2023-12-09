import { IProduct } from "../../../common/interfaces";

export const getCurrentProductById = (
  products: IProduct[],
  id: string,
): IProduct | undefined => products.find((prod) => prod.id === id);
