import { ICategory } from '../interfaces';

export const getCurrentCategoryById = (
  categories: ICategory[],
  id: string,
): ICategory | undefined => categories.find((cat) => cat.id === id);
