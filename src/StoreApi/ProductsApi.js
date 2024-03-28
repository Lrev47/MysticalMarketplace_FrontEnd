import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://capstone-backend-87g4.onrender.com/api";

export const ProductsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => "/products",
    }),
    getSingleProduct: builder.query({
      query: (id) => `/products/${id}`,
    }),
    updateMultipleProductQuantities: builder.mutation({
      query: (productsToUpdate) => ({
        url: "/products//updateQuantities",
        method: "PATCH",
        body: productsToUpdate,
      }),
    }),
  }),
});
export const {
  useGetAllProductsQuery,
  useGetSingleProductQuery,
  useUpdateMultipleProductQuantitiesMutation,
} = ProductsApi;
