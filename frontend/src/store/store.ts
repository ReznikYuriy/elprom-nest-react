import { configureStore } from "@reduxjs/toolkit";
import { categoriesReducer, productsReducer } from "./slices";
import { ReducerName } from "./enum/reducer-name.enum";

const store = configureStore({
  reducer: {
    [ReducerName.CATEGORIES]: categoriesReducer,
    [ReducerName.PRODUCTS]: productsReducer,
  }
});

export { store };
