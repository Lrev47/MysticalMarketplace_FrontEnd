import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetOrderItemsByOrderIdQuery,
  useUpdateMultipleProductQuantitiesMutation,
  useUpdateMoneyByUserIdMutation,
  useCreateOrderMutation,
  useUpdateOrderStatusByIdMutation,
  useUpdateOrderTotalByIdMutation,
} from "../StoreApi";

export const PurchaseandTotalSection = ({ orders, userId }) => {
  const navigate = useNavigate();
  const pendingOrder = orders.find((order) => order.status === "pending");
  const [totalBalance, setTotalBalance] = useState(0);
  const [filteredOrderItems, setFilteredOrderItems] = useState([]);

  const {
    data: OrderItemsData,
    error: OrderItemsError,
    isLoading: OrderItemsLoading,
  } = useGetOrderItemsByOrderIdQuery(pendingOrder.id);

  const [updateQuantities] = useUpdateMultipleProductQuantitiesMutation();
  const [updateUserBalance] = useUpdateMoneyByUserIdMutation();
  const [createOrder] = useCreateOrderMutation();
  const [updateStatus] = useUpdateOrderStatusByIdMutation();
  const [updateTotal] = useUpdateOrderTotalByIdMutation();
  // const updatedStatus = "completed";
  console.log("USER ID HIGHER IN THE CODE:", userId);
  useEffect(() => {
    if (OrderItemsData && pendingOrder) {
      const filteredItems = OrderItemsData.filter(
        (item) => item.orderId === pendingOrder.id
      );
      setFilteredOrderItems(filteredItems);
    }
  }, [OrderItemsData, pendingOrder]);

  useEffect(() => {
    if (filteredOrderItems) {
      const total = filteredOrderItems.reduce((runningTotal, currentItem) => {
        return runningTotal + currentItem.price * currentItem.quantity;
      }, 0);
      setTotalBalance(total);
    }
  }, [filteredOrderItems]);
  console.log("USER ID HIGHER IN THE CODE2:", userId);

  const handleClick = async () => {
    const productToUpdate = filteredOrderItems.map((item) => ({
      productId: item.productId,
      quantityToSubtract: item.quantity,
    }));
    try {
      console.log("CALCULATING BALANCE");
      await updateQuantities(productToUpdate).unwrap();
      console.log("TOTAL BALANCE FOR ORDER:", totalBalance);
      console.log("USER ID BEFORE UPDATE_USER_BALANCE", userId);
      await updateUserBalance({ userId, totalBalance }).unwrap();
      console.log("USER BALANCE UPDATED");
      console.log("UPDATING ORDER TOTAL");

      await updateTotal({
        orderId: pendingOrder.id,
        total: totalBalance,
      }).unwrap();
      console.log("ORDER TOTAL UPDATED");
      console.log("SWITCHING ORDER STATUS FROM PENDING TO COMPLETED");
      await updateStatus({
        orderId: pendingOrder.id,
        status: "completed",
      }).unwrap();
      console.log("ORDER STATUS SWITCHED TO COMPLETED");
      console.log("CREATING A NEW PENDING ORDER");
      await createOrder({ userId }).unwrap();
      console.log("NEW PENDING ORDER CREATED");
      console.log("NAVIGATING TO ORDER COMPELTE PAGE");
      navigate(`/orderComplete`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error(error);
    }
  };

  console.log({ filteredOrderItems: typeof filteredOrderItems });
  console.log(filteredOrderItems);

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
      <button className="PurchaseItemsButton" onClick={handleClick}>
        Purchase Items
      </button>
    </div>
  );
};

export default PurchaseandTotalSection;
