import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://localhost:8080/api";

export const OrderApi = createApi({
  reducerPath: "OrderApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: "/Order/createOrder",
        method: "POST",
        body: order,
      }),
    }),

    getPendingOrderByUserId: builder.query({
      query: ({ userId }) => ({
        url: `/Order?userId=${userId}`,
        method: "GET",
      }),
    }),

    updateOrderStatusById: builder.mutation({
      query: (order) => ({
        url: "/Order/updateStatus",
        method: "PATCH",
        body: order,
      }),
    }),

    updateOrderTotalById: builder.mutation({
      query: (order) => ({
        url: "/Order/updateTotal",
        method: "PATCH",
        body: order,
      }),
    }),

    getCurrentOrder: builder.query({
      query: ({ token, userId }) => ({
        url: `/Order/current/?userId=${userId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getAllOrders: builder.query({
      query: ({ token }) => ({
        url: "/Order",
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useGetCurrentOrderQuery,
  useUpdateOrderTotalByIdMutation,
  useGetPendingOrderByUserIdQuery,
  useUpdateOrderStatusByIdMutation,
} = OrderApi;
