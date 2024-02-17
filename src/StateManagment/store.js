import { configureStore } from "@reduxjs/toolkit";
import { ProductsApi } from "../StoreApi/ProductsApi";
import { UserApi } from "../StoreApi/userApi";

export const store = configureStore({
  reducer: {
    [ProductsApi.reducerPath]: ProductsApi.reducer,
    [UserApi.reducerPath]: UserApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ProductsApi.middleware, UserApi.middleware),
});

export default store;
