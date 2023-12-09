import { instance } from "./index";

interface ICategory {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}
//export const createCategories = (data:any) => (await instance.post('/dashboard/pallet', data).data);
export async function getCategories(): Promise<ICategory[]> {
  try {
    const url = "https://be-ask.tanaypratap.repl.co/playlist";
    const response = await instance.get<any>(url);
    return response.data;
  } catch (err) {
    console.log(err);
    return [];
  }
}
