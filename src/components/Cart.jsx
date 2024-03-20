import React, { useState, useEffect } from "react";
import {
  useGetAllProductsQuery,
  useUpdateOrderItemQuantityMutation,
  useGetOrderItemsByOrderIdQuery,
} from "../StoreApi";
import PurchaseandTotalSection from "./PurchaseOrderandTotal";

//importing stuff
export const CartPage = ({ token, userId, orders }) => {
  console.log("YOUR TOKEN IS", token);
  console.log("YOUR UserID IS", userId);
  const [filteredOrderItems, setFilteredOrderItems] = useState([]);
  //using useState to set the final array of products i will be displaying
  const [productDisplayArray, setProductDisplayArray] = useState([]);
  // i should only ever have 1 pending order made.
  const pendingOrder = orders.find((order) => order.status === "pending");
  console.log(
    "THIS IS THE ORDER ID TO SEARCH FOR ORDER ITEMS",
    pendingOrder.id
  );
  const {
    data: ProductData,
    error: ProductError,
    isLoading: productLoading,
  } = useGetAllProductsQuery();

  const {
    data: orderItemsData,
    isLoading: orderItemsLoading,
    error: orderItemsError,
  } = useGetOrderItemsByOrderIdQuery(pendingOrder.id);

  const [updateOrderItemQuantity] = useUpdateOrderItemQuantityMutation();

  console.log("OrderItems before filter", orderItemsData);

  useEffect(() => {
    if (orderItemsData && pendingOrder) {
      const filteredItems = orderItemsData.filter(
        (item) => item.orderId === pendingOrder.id
      );
      setFilteredOrderItems(filteredItems);
    }
  }, [orderItemsData, pendingOrder]);

  useEffect(() => {
    if (orderItemsData && ProductData && filteredOrderItems) {
      const itemsToDisplay = filteredOrderItems.map((orderItem) => {
        const productDetails = ProductData.find(
          (product) => product.id === orderItem.productId
        );

        return {
          ...orderItem,
          ...productDetails,
          quantity: orderItem.quantity,
        };
      });
      setProductDisplayArray(itemsToDisplay);
    }
  }, [filteredOrderItems, ProductData]);
  console.log(
    "This should have all the products I am going to dispaly",
    productDisplayArray
  );
  console.log({ ProductDataType: typeof ProductData });
  console.log({ orderItemsDataType: typeof orderItemsData });
  console.log("HERE ARE ALL THE ORDERS", orders);
  console.log({ ProductData, ProductError, productLoading });
  console.log({ orderItemsData, orderItemsError, orderItemsLoading });

  const updateQuantity = (productId, NewQuantity) => {
    const productInCart = productDisplayArray.find(
      (product) => product.orderId === productId
    );

    if (NewQuantity < 1) {
      console.log("To remove item click delte");
      return;
    }

    const product = ProductData.find((product) => product.id === productId);
    if (!product || NewQuantity > product.quantity) {
      console.log("Not enough in stock");
      return;
    }

    updateOrderItemQuantity({
      orderItemId: productInCart.orderItemId,
      quantity: NewQuantity,
      token: token,
    })
      .unwrap()
      .then(() => {
        const updatedDisplayArray = productDisplayArray.map((product) =>
          product.id === productId
            ? { ...product, quantity: NewQuantity }
            : product
        );
        setProductDisplayArray(updatedDisplayArray);
      })

      .catch((error) => {
        console.error("update not working", error);
      });
  };
  if (productLoading || orderItemsLoading) {
    return <div>Loading ..</div>;
  }

  if (ProductError || orderItemsError) {
    const errorMessage = [ProductError, ordersError, orderItemsError]
      .filter(Boolean)
      .map((e) => e.message)
      .join(", ");
    return <div>{errorMessage}</div>;
  }

  return (
    <div className="CartContainer">
      {productDisplayArray.map((product, index) => (
        <div key={product.id || index} className="CartItemContainer">
          <div className="CartItemInfoDiv">
            <p>{product.name}</p>
            <p>Product Id: {product.id}</p>
            <p>Category: {product.category}</p>
            <p>Munny: ${product.price.toFixed(2)}</p>
            <p>Rating: {product.rating}</p>
            <p>{product.inStock ? "In Stock" : "Out of Stock"}</p>
            <p>Description: {product.description}</p>
          </div>
          <div className="CartItemImageAndQuantDiv">
            <img className="CartItemImage" src={product.imageUrl} />
            <button
              onClick={() => updateQuantity(product.id, product.quantity - 1)}
            >
              -
            </button>

            <p>Quantity: {product.quantity}</p>
            <button
              onClick={() => updateQuantity(product.id, product.quantity + 1)}
            >
              +
            </button>
          </div>
        </div>
      ))}
      <PurchaseandTotalSection orders={orders} />
    </div>
  );
};

export default CartPage;
