import { IProduct } from "../common/interfaces";
import { instance } from "./index";

//export const createCategories = (data:any) => (await instance.post('/dashboard/pallet', data).data);
export async function getProducts(): Promise<IProduct[]> {
  try {
    const url = "/product";
    const response = await instance.get<any>(url);
    return response.data;
  } catch (err) {
    console.log(err);
    return [];
  }
}
