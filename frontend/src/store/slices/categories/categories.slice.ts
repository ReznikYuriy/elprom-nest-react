import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../../types";
import { ReducerName } from "../../enum/reducer-name.enum";
import { DataStatus } from "../../enum/data-status.enum";
import { getCategories } from "../../../api/category.api";
import { ICategory } from "../../../common/interfaces";

type CategoriesState = {
  categories: ICategory[];
  dataStatus: DataStatus;
};

const initialState: CategoriesState = {
  categories: [],
  dataStatus: DataStatus.PENDING,
};

const { reducer, actions } = createSlice({
  name: ReducerName.CATEGORIES,
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<ICategory[]>) => {
      state.categories = action.payload;
      state.dataStatus = DataStatus.SUCCESS;
    },
  },
});

const getCategoriesAsync = (): AppThunk => async (dispatch) => {
  try {
    const categories = await getCategories();
    dispatch(actions.setCategories(categories));
  } catch (error) {
    throw error;
  }
};

const CategoriesActionCreator = {
  ...actions,
  getCategoriesAsync,
};

export { CategoriesActionCreator, reducer };
