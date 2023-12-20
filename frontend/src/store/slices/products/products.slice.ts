import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../../types";
import { DataStatus } from "../../enum/data-status.enum";
import { ReducerName } from "../../enum/reducer-name.enum";
import {
  getProductsByCategoryId,
  getProductsBySearch,
} from "../../../api/product.api";
import { IProduct } from "../../../common/interfaces";
import { getCategoryById } from "../../../api/category.api";

type ProductsState = {
  products: IProduct[];
  dataStatus: DataStatus;
  activeCategoryName: string;
  searchInputText: string;
};

const initialState: ProductsState = {
  products: [],
  dataStatus: DataStatus.PENDING,
  activeCategoryName: "",
  searchInputText: "поиск по складу",
};

const { reducer, actions } = createSlice({
  name: ReducerName.PRODUCTS,
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.products = action.payload;
      state.dataStatus = DataStatus.SUCCESS;
    },
    setActiveCategory: (state, action: PayloadAction<string>) => {
      state.activeCategoryName = action.payload;
    },
    setSearchInputText: (state, action: PayloadAction<string>) => {
      state.searchInputText = action.payload;
    },
  },
});

const getProductsAsync =
  (id: string): AppThunk =>
  async (dispatch) => {
    try {
      const products = await getProductsByCategoryId(id);
      dispatch(actions.setProducts(products));
    } catch (error) {
      throw error;
    }
  };

const getProductsBySearchAsync =
  (name: string): AppThunk =>
  async (dispatch) => {
    try {
      const products = await getProductsBySearch(name);
      dispatch(actions.setProducts(products));
      dispatch(actions.setSearchInputText(name));
      dispatch(actions.setActiveCategory("Результаты поиска:"));
    } catch (error) {
      throw error;
    }
  };

const setActiveCategoryNameAsync =
  (id: string): AppThunk =>
  async (dispatch) => {
    try {
      const category = await getCategoryById(id);
      dispatch(actions.setActiveCategory(category?.name || ""));
      dispatch(actions.setSearchInputText(''));
    } catch (error) {
      throw error;
    }
  };

const ProductsActionCreator = {
  ...actions,
  getProductsAsync,
  getProductsBySearchAsync,
  setActiveCategoryNameAsync,
};

export { ProductsActionCreator, reducer };
