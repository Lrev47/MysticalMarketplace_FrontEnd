import { useGetUserOrder } from "./OrderApi";
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
  useGetUserOrder,
  useGetUserByIdQuery,
  useGetAllUsersQuery,
};
