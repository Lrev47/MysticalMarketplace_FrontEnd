import React, { useState, useEffect } from "react";
import {
  useGetAllProductsQuery,
  useGetAllOrdersQuery,
  useGetAllOrderItemsQuery,
  useUpdateOrderItemQuantityMutation,
} from "../StoreApi";

export const CartPage = ({ token, userId }) => {
  console.log("YOUR TOKEN IS", token);
  console.log("YOUR UserID IS", userId);

  const {
    data: ProductData,
    error: ProductError,
    isLoading: productLoading,
  } = useGetAllProductsQuery();

  const {
    data: allOrdersData,
    error: ordersError,
    isLoading: ordersLoading,
  } = useGetAllOrdersQuery({ token: token });

  const {
    data: orderItemsData,
    error: orderItemsError,
    isLoading: orderItemsLoading,
  } = useGetAllOrderItemsQuery();

  console.log({ ProductDataType: typeof ProductData });
  console.log({ allOrdersDataType: typeof allOrdersData });
  console.log({ orderItemsDataType: typeof orderItemsData });

  console.log({ ProductData, ProductError, productLoading });
  console.log({ allOrdersData, ordersError, ordersLoading });
  console.log({ orderItemsData, orderItemsError, orderItemsLoading });

  const [updateOrderItemQuantity] = useUpdateOrderItemQuantityMutation();

  const [productDisplayArray, setProductDisplayArray] = useState([]);

  useEffect(() => {
    console.log("USE EFFECT TRIGGERED");
    //IF ALL THE DATA LOADS
    if (ProductData && allOrdersData && orderItemsData) {
      console.log("ALL CONDITIONS MET");

      //GET ALL ORDERS FROM USER BY USERID THAT WAS PASSED AS PROP, STATUS HAS TO BE PENDING
      console.log("ALL ORDERS DATA BEFOR FILTER", allOrdersData);
      const userOrders = allOrdersData.filter(
        (order) => order.userId === userId && order.status == "pending"
      );
      console.log("ALL ORDERS DATA AFTER FILTER", userOrders);
      //NOW I A M GRABBING THE ORDER ID NUMBER FROM THE USERORDER JUST MADE -- CAN I PREFORM ARRAY METHODS ON AN ARRAY OF 1 ITEM?

      const userOrderIds = userOrders.map((order) => order.id);
      console.log("USER ORDER IDS", userOrderIds);
      //NOW I AM GOING TO GET ALL ORDERITEMS WITH THIS ORDERID
      const filteredOrderItems = orderItemsData.filter((orderItem) =>
        userOrderIds.includes(orderItem.orderId)
      );
      console.log("FILTERED ORDER ITEMS", filteredOrderItems);

      //NOW I AM GOING TO GET ALL PROFUCTS WITH FROM THE ORDERITEMS
      const matchProductToOrder = ProductData.filter((product) =>
        filteredOrderItems.some(
          (orderItem) => orderItem.productId === product.id
        )
      ).map((product) => {
        const orderItem = filteredOrderItems.find(
          (orderItem) => orderItem.productId === product.id
        );
        return {
          ...product,

          quantity: orderItem ? orderItem.quantity : 0,
          orderItemId: orderItem ? orderItem.id : null,
        };
      });

      console.log("THIS SHOULD SHOW THE FINAL ARRAY", matchProductToOrder);
      setProductDisplayArray(matchProductToOrder);
    }
  }, [userId, ProductData, allOrdersData, orderItemsData]);

  const updateQuantity = (productId, NewQuantity) => {
    const productInCart = productDisplayArray.find(
      (product) => product.id === productId
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
  if (productLoading || ordersLoading || orderItemsLoading) {
    return <div>Loading ..</div>;
  }

  if (ProductError || ordersError || orderItemsError) {
    const errorMessage = [ProductError, ordersError, orderItemsError]
      .filter(Boolean)
      .map((e) => e.message)
      .join(", ");
    return <div>{errorMessage}</div>;
  }

  return (
    <div className="CartContainer">
      {productDisplayArray.map((product) => (
        <div key={product.id} className="CartItemContainer">
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
    </div>
  );
};

export default CartPage;
