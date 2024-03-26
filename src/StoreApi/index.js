import {
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useGetCurrentOrderQuery,
  useUpdateOrderStatusByIdMutation,
  useUpdateOrderTotalByIdMutation,
  useGetPendingOrderByUserIdQuery,
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
  useUpdateUserMoneyMutation,
} from "./userApi";

export {
  useGetAllProductsQuery,
  useGetSingleProductQuery,
  useLoginUserMutation,
  useGetCurrentOrderQuery,
  useGetPendingOrderByUserIdQuery,
  useGetOrderItemsByOrderIdQuery,
  useUpdateUserMoneyMutation,
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
