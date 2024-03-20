import React from "react";

export function OrderHistory({ orders }) {
  const completedOrders = orders.filter(
    (order) => order.status === "completed"
  );
  console.log("THESE ARE THE COMPLETED ORDERS", completedOrders);

  return (
    <>
      <div className="OrderHistoryContainer">
        {completedOrders.map((order) => (
          <div key={order.id} className="OrderContainer">
            <p>Order Id:{order.id}</p>
            <p>
              Date Created: {new Date(order.createdAt).toLocaleDateString()}
            </p>
            <p>Order Status:{order.status}</p>
            <p>
              Order Total: $
              {typeof order.total === "number" ? order.total.toFixed(2) : "N/A"}
            </p>
            <button className="viewDetailsButton">View Details</button>
          </div>
        ))}
      </div>
    </>
  );
}
export default OrderHistory;
