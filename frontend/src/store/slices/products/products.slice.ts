import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../../types";
import { DataStatus } from "../../enum/data-status.enum";
import { ReducerName } from "../../enum/reducer-name.enum";
import { getProducts } from "../../../api/product.api";
import { IProduct } from "../../../common/interfaces";

type ProductsState = {
  products: IProduct[];
  dataStatus: DataStatus;
};

const initialState: ProductsState = {
  products: [],
  dataStatus: DataStatus.PENDING,
};

const { reducer, actions } = createSlice({
  name: ReducerName.PRODUCTS,
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.products = action.payload;
      state.dataStatus = DataStatus.SUCCESS;
    },
  },
});

const getProductsAsync = (): AppThunk => async (dispatch) => {
  try {
    const products = await getProducts();
    dispatch(actions.setProducts(products));
  } catch (error) {
    throw error;
  }
};

const ProductsActionCreator = {
  ...actions,
  getProductsAsync,
};

export { ProductsActionCreator, reducer };
