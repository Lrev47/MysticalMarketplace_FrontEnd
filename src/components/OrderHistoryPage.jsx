import {
  useGetAllProductsQuery,
  useGetOrderItemsByOrderIdQuery,
} from "../StoreApi/index";
import React, { useState, useEffect } from "react";

export function OrderHistory({ orders }) {
  const completedOrders = orders.filter(
    (order) => order.status === "completed"
  );
  console.log("THESE ARE THE COMPLETED ORDERS", completedOrders);

  const {
    data: ProductData,
    error: ProductError,
    isLoading: productLoading,
  } = useGetAllProductsQuery();

  const {
    data: orderItemsData,
    isLoading: orderItemsLoading,
    error: orderItemsError,
  } = useGetOrderItemsByOrderIdQuery();

  return <>Test</>;
}
export default OrderHistory;
