import {
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useGetCurrentOrderQuery,
} from "./OrderApi";
import {
  useAddOrderItemMutation,
  useGetAllOrderItemsQuery,
  useUpdateOrderItemQuantityMutation,
  useGetOrderItemsByOrderId,
} from "./OrderItemApi";
import {
  useGetAllProductsQuery,
  useGetSingleProductQuery,
} from "./ProductsApi";
import {
  useLoginUserMutation,
  useGetUserByIdQuery,
  useGetAllUsersQuery,
  useUpdateUserMoneyMutation,
} from "./userApi";

export {
  useGetAllProductsQuery,
  useGetSingleProductQuery,
  useLoginUserMutation,
  useGetCurrentOrderQuery,
  useGetOrderItemsByOrderId,
  // useGetUserOrder,
  useGetUserByIdQuery,
  useUpdateUserMoneyMutation,
  useGetAllUsersQuery,
  useAddOrderItemMutation,
  useGetAllOrderItemsQuery,
  useUpdateOrderItemQuantityMutation,
  useCreateOrderMutation,
  useGetAllOrdersQuery,
};
