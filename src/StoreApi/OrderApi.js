import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://localhost:8080/api";

export const OrderApi = createApi({
  reducerPath: "OrderApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: "/Order",
        method: "POST",
        body: order,
      }),
    }),

    getAllOrders: builder.query({
      query: () => ({
        url: "/Order",
        method: "GET",
      }),
    }),
  }),
});

export const { useCreateOrderMutation, useGetAllOrdersQuery } = OrderApi;
