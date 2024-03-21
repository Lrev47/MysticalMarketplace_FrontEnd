import {
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useGetCurrentOrderQuery,
  useUpdateOrderStatusByIdMutation,
  useUpdateOrderTotalByIdMutation,
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
  useUpdateMultipleProductQuantitiesMutation,
} from "./ProductsApi";
import {
  useLoginUserMutation,
  useGetUserByIdQuery,
  useGetAllUsersQuery,
  useUpdateMoneyByUserIdMutation,
} from "./userApi";

export {
  useGetAllProductsQuery,
  useGetSingleProductQuery,
  useLoginUserMutation,
  useGetCurrentOrderQuery,
  useGetOrderItemsByOrderIdQuery,
  useUpdateMoneyByUserIdMutation,
  useUpdateOrderStatusByIdMutation,
  useUpdateOrderTotalByIdMutation,
  useUpdateMultipleProductQuantitiesMutation,
  // useGetUserOrder,
  useGetUserByIdQuery,
  useGetAllUsersQuery,
  useAddOrderItemMutation,
  useGetAllOrderItemsQuery,
  useUpdateOrderItemQuantityMutation,
  useCreateOrderMutation,
  useGetAllOrdersQuery,
};
