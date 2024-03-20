import {
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useGetCurrentOrderQuery,
} from "./OrderApi";
import {
  useAddOrderItemMutation,
  useGetAllOrderItemsQuery,
  useUpdateOrderItemQuantityMutation,
  useGetOrderItemsByOrderIdQuery,
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
  useGetCurrentOrderQuery,
  useGetOrderItemsByOrderIdQuery,
  // useGetUserOrder,
  useGetUserByIdQuery,
  useGetAllUsersQuery,
  useAddOrderItemMutation,
  useGetAllOrderItemsQuery,
  useUpdateOrderItemQuantityMutation,
  useCreateOrderMutation,
  useGetAllOrdersQuery,
};
