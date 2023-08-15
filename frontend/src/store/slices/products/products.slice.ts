import { createSlice, PayloadAction } from '@reduxjs/toolkit';
//import { productApi } from 'services';
//import { HttpError } from 'exceptions';
//import { IProduct } from 'common/interfaces';
import { AppThunk } from '../types';
import { DataStatus } from '../../enum/data-status.enum';
import { ReducerName } from '../../enum/reducer-name.enum';

type ProductsState = {
  products: /* IProduct */any[];
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
    setProducts: (state, action: PayloadAction</* IProduct */any[]>) => {
      state.products = action.payload;
      state.dataStatus = DataStatus.SUCCESS;
    },
  },
});

const getProductsAsync = (): AppThunk => async (
  dispatch,
) => {
  try {
    /* const products = await productApi.getProducts();
    dispatch(actions.setProducts(products)); */
  } catch (error) {
   /*  if (error instanceof HttpError) {
      return notificationService.error(`Error ${error.status}`, error.messages);
    }
    throw error; */
    console.log(error);
  }
};

const ProductsActionCreator = {
  ...actions,
  getProductsAsync,
};

export { ProductsActionCreator, reducer };
