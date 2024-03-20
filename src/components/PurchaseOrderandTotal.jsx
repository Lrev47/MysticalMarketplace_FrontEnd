import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetOrderItemsByOrderIdQuery,
  useUpdateMultipleProductQuantitiesMutation,
  useUpdateMoneyByUserIdMutation,
  useCreateOrderMutation,
  useUpdateOrderStatusByIdMutation,
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
      await updateQuantities(productToUpdate).unwrap();
      console.log("TOTAL BALANCE FOR ORDER:", totalBalance);
      // console.log("USER ID LOWER IN THE CODE:", userId);
      await updateUserBalance({ userId, totalBalance }).unwrap();

      await updateStatus({
        orderId: pendingOrder.id,
        status: "completed",
      }).unwrap();

      await createOrder({ userId }).unwrap();

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
