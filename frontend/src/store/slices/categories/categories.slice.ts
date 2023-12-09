import { Action, /* AnyAction, */ createSlice, PayloadAction,/*  ThunkAction  */} from "@reduxjs/toolkit";
//import { categoryApi } from "services";
//import { ReducerName, DataStatus } from "common/enums";
//import { ICategory } from "common/interfaces";
import { AppThunk, RootState } from "../../types";
import { ReducerName } from "../../enum/reducer-name.enum";
import { DataStatus } from "../../enum/data-status.enum";
import { getCategories } from "../../../api/categories";
import { categoryApi } from "../../../services";
import { ICategory } from "../../../common/interfaces";


type CategoriesState = {
  categories: ICategory[];
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
    setCategories: (state, action: PayloadAction<ICategory[]>) => {
      state.categories = action.payload;
      state.dataStatus = DataStatus.SUCCESS;
    },
    setActiveCategoryName: (state, action: PayloadAction<string>) => {
      state.activeCategoryName = action.payload;
    },
  },
});

const getCategoriesAsync = ():AppThunk => async (dispatch) => {
  try {
    const categories = await categoryApi.getCategories(); 
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
