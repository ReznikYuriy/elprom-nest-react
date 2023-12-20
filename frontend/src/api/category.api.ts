import { ICategory } from "../common/interfaces";
import { instance } from "./axios.instance";

//export const createCategories = (data:any) => (await instance.post('/dashboard/pallet', data).data);
export async function getCategories(): Promise<ICategory[]> {
  try {
    const url = "/category/non-zero-balance";
    const response = await instance.get<any>(url);
    return response.data;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export async function getCategoryById(id: string): Promise<ICategory | null> {
  try {
    const response = await instance.get<any>(`/category/${id}`);
    return response.data;
  } catch (err) {
    console.log(err);
    return null;
  }
}
