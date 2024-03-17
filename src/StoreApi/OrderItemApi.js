import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://localhost:8080/api";

export const OrderItemApi = createApi({
  reducerPath: "OrderItemApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    addOrderItem: builder.mutation({
      query: (orderItem) => ({
        url: "/OrderItem",
        method: "POST",
        body: orderItem,
      }),
    }),

    getAllOrderItems: builder.query({
      query: () => ({
        url: "/OrderItem",
        method: "GET",
      }),
    }),

    getOrderItemsByOrderId: builder.query({
      query: (orderId) => ({
        url: `/OrderItem?orderId=${orderId}`,
        method: "GET",
      }),
    }),

    updateOrderItemQuantity: builder.mutation({
      query: ({ orderItemId, quantity, token }) => ({
        url: `/OrderItem/${orderItemId}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          quantity,
        },
      }),
    }),
  }),
});

export const {
  useAddOrderItemMutation,
  useGetAllOrderItemsQuery,
  useUpdateOrderItemQuantityMutation,
  useGetOrderItemsByOrderId,
} = OrderItemApi;
