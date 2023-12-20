import { IProduct } from "../../../../common/interfaces/product.interface";

export const productsToTableData = (
  products: IProduct[]
): Partial<IProduct>[] => {
  return products.map((el) => {
    return {
      id: el.id,
      name: el.name,
      price: el.price,
      quantity: el.quantity,
      imagepath: el.imagepath,
    };
  });
};
