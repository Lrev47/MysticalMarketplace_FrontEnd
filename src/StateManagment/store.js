import { configureStore } from "@reduxjs/toolkit";
import { ProductsApi } from "../StoreApi/ProductsApi";
import { UserApi } from "../StoreApi/userApi";
import { OrderItemApi } from "../StoreApi/OrderItemApi";
import { OrderApi } from "../StoreApi/OrderApi";

export const store = configureStore({
  reducer: {
    [ProductsApi.reducerPath]: ProductsApi.reducer,
    [UserApi.reducerPath]: UserApi.reducer,
    [OrderItemApi.reducerPath]: OrderItemApi.reducer,
    [OrderApi.reducerPath]: OrderApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      ProductsApi.middleware,
      UserApi.middleware,
      OrderItemApi.middleware,
      OrderApi.middleware
    ),
});

export default store;
