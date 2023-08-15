import { createSlice, PayloadAction } from "@reduxjs/toolkit";
//import { categoryApi } from "services";
//import { ReducerName, DataStatus } from "common/enums";
//import { ICategory } from "common/interfaces";
import { AppThunk } from "../types";
import { ReducerName } from "../../enum/reducer-name.enum";
import { DataStatus } from "../../enum/data-status.enum";

type CategoriesState = {
  categories: any[]; //ICategory[];
  activeCategoryName: string;
  dataStatus: DataStatus;
};

const initialState: CategoriesState = {
  categories: [],
  activeCategoryName: "",
  dataStatus: DataStatus.PENDING,
};

const { reducer, actions } = createSlice({
  name: ReducerName.CATEGORIES,
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction</* ICategory */ any[]>) => {
      state.categories = action.payload;
      state.dataStatus = DataStatus.SUCCESS;
    },
    setActiveCategoryName: (state, action: PayloadAction<string>) => {
      state.activeCategoryName = action.payload;
    },
  },
});

const getCategoriesAsync = (): AppThunk => async (dispatch) => {
  try {
    /* const categories = await categoryApi.getCategories(); 
    dispatch(actions.setCategories(categories)); */
  } catch (error) {
    /* if (error instanceof HttpError) {
      return notificationService.error(`Error ${error.status}`, error.messages);
    }
    throw error; */
    console.log(error);
  }
};

const CategoriesActionCreator = {
  ...actions,
  getCategoriesAsync,
};

export { CategoriesActionCreator, reducer };
