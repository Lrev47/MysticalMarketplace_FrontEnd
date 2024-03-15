import React, { useState, useEffect } from "react";
import { useGetAllProductsQuery } from "../StoreApi";
import {
  useGetAllOrderItemsQuery,
  useUpdateOrderItemQuantityMutation,
} from "../StoreApi/OrderItemApi";

export const CartPage = () => {
  const {
    data: ProductData,
    error: ProductError,
    isLoading: productLoading,
  } = useGetAllProductsQuery();

  const {
    data: orderData,
    error: orderError,
    isLoading: orderLoading,
  } = useGetAllOrderItemsQuery();

  console.log({ ProductData, ProductError, productLoading });
  console.log({ orderData, orderError, orderLoading });

  const filterByOrderId = orderData?.filter((item) => item.orderId === 3);
  console.log(filterByOrderId);

  const productIdsAry = filterByOrderId?.map((item) => item.productId);
  console.log(productIdsAry);

  const [productDisplayArray, setProductDisplayArray] = useState([]);

  useEffect(() => {
    if (ProductData && orderData) {
      const productIdsAry = orderData
        ?.filter((item) => item.orderId === 3)
        .map((item) => item.productId);

      const matchProductToOrder = ProductData.filter((product) =>
        productIdsAry.includes(product.id)
      );
      console.log("THIS SHOULD SHOW THE FINAL ARRAY", matchProductToOrder);
      setProductDisplayArray(matchProductToOrder);
    }
  }, [ProductData, orderData]);

  if (productLoading || orderLoading) {
    return <div>Loading ..</div>;
  }
  if (ProductError || orderError) {
    return <div>{error.message}</div>;
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
            <p>Quantity: {product.quantity}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartPage;
