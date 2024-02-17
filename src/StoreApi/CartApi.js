import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://fakestoreapi.com";

export const CartApi = createApi({
  reducerPath: "CartApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getUserCart: builder.query({
      query: () => "/carts/:id",
    }),
  }),
});

export const { useGetUserCartQuery } = CartApi;
