import { useCreateOrderMutation, useGetAllOrdersQuery } from "./OrderApi";
import {
  useAddOrderItemMutation,
  useGetAllOrderItemsQuery,
  useUpdateOrderItemQuantityMutation,
} from "./OrderItemApi";
import {
  useGetAllProductsQuery,
  useGetSingleProductQuery,
} from "./ProductsApi";
import {
  useLoginUserMutation,
  useGetUserByIdQuery,
  useGetAllUsersQuery,
} from "./userApi";

export {
  useGetAllProductsQuery,
  useGetSingleProductQuery,
  useLoginUserMutation,
  // useGetUserOrder,
  useGetUserByIdQuery,
  useGetAllUsersQuery,
  useAddOrderItemMutation,
  useGetAllOrderItemsQuery,
  useUpdateOrderItemQuantityMutation,
  useCreateOrderMutation,
  useGetAllOrdersQuery,
};
