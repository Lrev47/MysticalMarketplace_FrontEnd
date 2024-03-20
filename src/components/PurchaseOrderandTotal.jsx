import { useEffect, useState } from "react";
import { useGetOrderItemsByOrderIdQuery } from "../StoreApi";

export const PurchaseandTotalSection = ({ orders }) => {
  const pendingOrder = orders.find((order) => order.status === "pending");
  const [totalBalance, setTotalBalance] = useState(0);

  const {
    data: OrderItemsData,
    error: OrderItemsError,
    isLoading: OrderItemsLoading,
  } = useGetOrderItemsByOrderIdQuery(pendingOrder.id);

  useEffect(() => {
    if (OrderItemsData) {
      const total = OrderItemsData.reduce((runningTotal, currentItem) => {
        return runningTotal + currentItem.price * currentItem.quantity;
      }, 0);
      setTotalBalance(total);
    }
  }, [OrderItemsData]);

  console.log({ OrderItemsData: typeof OrderItemsData });
  console.log(OrderItemsData);

  if (OrderItemsLoading) {
    return <div>Loading...</div>;
  }
  if (OrderItemsError) {
    return <div>{OrderItemsError}</div>;
  }
  return (
    <div className="PurchaseOrderandTotalContainer">
      <h1>
        Total Balance: $
        {totalBalance.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </h1>
      <button className="PurchaseItemsButton">Purchase Items</button>
    </div>
  );
};

export default PurchaseandTotalSection;
