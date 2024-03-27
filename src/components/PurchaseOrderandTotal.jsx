import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useUpdateMultipleProductQuantitiesMutation,
  useUpdateMoneyByUserIdMutation,
  useCreateOrderMutation,
  useUpdateOrderStatusByIdMutation,
  useUpdateOrderTotalByIdMutation,
} from "../StoreApi";

export const PurchaseandTotalSection = ({ cartData, userId }) => {
  const navigate = useNavigate();
  const [totalBalance, setTotalBalance] = useState(0);

  const [updateQuantities] = useUpdateMultipleProductQuantitiesMutation();
  const [updateMoneyByUserId] = useUpdateMoneyByUserIdMutation();
  const [createOrder] = useCreateOrderMutation();
  const [updateStatus] = useUpdateOrderStatusByIdMutation();
  const [updateTotal] = useUpdateOrderTotalByIdMutation();

  useEffect(() => {
    console.log(cartData);
    if (cartData) {
      const total = cartData.orderItems.reduce((runningTotal, currentItem) => {
        return runningTotal + currentItem.product.price * currentItem.quantity;
      }, 0);
      setTotalBalance(total);
    }
  }, [cartData]);

  const handleClick = async () => {
    const productToUpdate = cartData.orderItems.map((item) => ({
      productId: item.product.id,
      quantityToSubtract: item.quantity,
    }));
    try {
      await updateQuantities(productToUpdate);
      await updateMoneyByUserId({ userId, totalBalance });

      await updateTotal({
        orderId: cartData.id,
        total: totalBalance,
      });

      await updateStatus({
        orderId: cartData.id,
        status: "completed",
      });

      await createOrder({ userId });
      navigate(`/orderComplete`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error(error);
    }
  };

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
