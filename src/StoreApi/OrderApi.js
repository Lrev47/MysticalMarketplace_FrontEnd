import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://localhost:8080/api";
//STILL NEED TO MAKE SURE THIS WORKS
export const OrderApi = createApi({
  reducerPath: "OrderApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getUserOrder: builder.query({
      query: () => "/carts/:id",
    }),
  }),
});

export const { useGetUserOrder } = OrderApi;
