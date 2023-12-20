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

export async function getProductsByCategoryId(cat_id:string): Promise<IProduct[]> {
  try {
    const response = await instance.get<IProduct[]>(`product/${cat_id}/category`);
    return response.data;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export async function getProductsBySearch(name:string): Promise<IProduct[]> {
  try {
    const response = await instance.get<IProduct[]>(`product/search?name=${name}`);
    return response.data;
  } catch (err) {
    console.log(err);
    return [];
  }
}
