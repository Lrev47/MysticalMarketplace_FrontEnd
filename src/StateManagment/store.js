import { configureStore } from "@reduxjs/toolkit";
import { ProductsApi } from "../StoreApi/ProductsApi";

export const store = configureStore({
  reducer: {
    [ProductsApi.reducerPath]: ProductsApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ProductsApi.middleware),
});

export default store;
