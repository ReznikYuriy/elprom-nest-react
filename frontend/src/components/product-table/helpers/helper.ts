import { IProduct } from '../../../common/interfaces/product.interface';

export const productsToTableData = (products: IProduct[], id: string | undefined): Partial<IProduct>[] => {
  const arrayToPartialArray = (array: IProduct[]): Partial<IProduct>[] => {
    return array.map(arr => {
      return {
        id: arr.id,
        name: arr.name,
        price: arr.price,
        quantity: arr.quantity,
        imagepath: arr.imagepath,
      };
    },
    );
  };
  if (id && id !== undefined) {
    const filtered_products = products.filter((prod) => prod.categoryid === id);
    return arrayToPartialArray(filtered_products);
  }

  return arrayToPartialArray(products);
};
