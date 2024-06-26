import { IProduct } from "../common/interfaces";
import { instance } from "./axios.instance";

//export const createCategories = (data:any) => (await instance.post('/dashboard/pallet', data).data);
export async function getAllProducts(): Promise<IProduct[]> {
  try {
    const response = await instance.get<IProduct[]>("/product");
    return response.data;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export async function getProductsByCategoryId(
  cat_id: string
): Promise<IProduct[]> {
  try {
    const response = await instance.get<IProduct[]>(
      `product/${cat_id}/category`
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export async function getProductsBySearch(name: string): Promise<IProduct[]> {
  try {
    const response = await instance.get<IProduct[]>(
      `product/search?name=${name}`
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export async function getProductById(id: string): Promise<IProduct | null> {
  try {
    const response = await instance.get<IProduct | null>(
      `product/${id}/product`
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function getWarehouseUpdDate(): Promise<string> {
  try {
    const response = await instance.get<string>("product/warehouse-upd-date");
    return response.data;
  } catch (err) {
    console.log(err);
    return "";
  }
}

export async function getZipPriceList(): Promise<any> {
  try {
    const response = await instance.get<any>("file/pricelist", {
      responseType: "blob",
    });
    return response.data;
  } catch (err) {
    console.log(err);
    return "";
  }
}
