import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useAddOrderItemMutation,
  useGetSingleProductQuery,
  useGetAllProductsQuery,
  useGetCurrentOrderQuery,
} from "../StoreApi";

import ProductDisplay from "./ProductDisplay";

const SingleProduct = ({ token, userId }) => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [addOrderItem] = useAddOrderItemMutation();
  const {
    data: allProducts,
    error: allProductsError,
    isLoading: allProductsAreLoading,
  } = useGetAllProductsQuery();

  const {
    data: productDetails,
    error: productError,
    isLoading: productIsLoading,
  } = useGetSingleProductQuery(productId);

  const {
    data: currentOrder,
    error: currentOrderError,
    isLoading: currentOrderIsLoading,
  } = useGetCurrentOrderQuery({ token, userId });

  const [productCategory, setProductCategory] = useState("");
  const [similarProductsArray, setsimilarProductsArray] = useState([]);
  const [displayedProductsArray, setdisplayedProductsArray] = useState([]);

  console.log("Product Details:", productDetails);
  console.log("Current Order:", currentOrder);
  console.log("Token and UserId:", token, userId);

  useEffect(() => {
    if (productDetails) {
      setProductCategory(productDetails.category);
    }
  }, [productDetails]);

  useEffect(() => {
    if (productCategory && allProducts) {
      const filteredProducts = allProducts.filter(
        (product) =>
          product.category === productCategory && product.id !== productId
      );
      setsimilarProductsArray(filteredProducts);
    }
  }, [productCategory, allProducts, productId]);

  useEffect(() => {
    if (productCategory && allProducts && similarProductsArray) {
      const selectedProducts = pickRandomProducts(similarProductsArray);
      setdisplayedProductsArray(selectedProducts);
    }
  }, [similarProductsArray]);

  const pickRandomProducts = (productsArray, numProducts = 3) => {
    const shuffled = [...productsArray].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numProducts);
  };
  const addToCart = async () => {
    console.log(currentOrder);
    if (
      !currentOrder ||
      !productDetails ||
      !currentOrder.id ||
      !productDetails.id
    ) {
      console.error("Missing necessary order or product details.");
      return;
    }

    try {
      await addOrderItem({
        orderId: currentOrder.id,
        productId: productDetails.id,
        quantity: 1,
        price: productDetails.price,
        token,
      }).unwrap();
      alert("product added!");
    } catch (error) {
      console.error(error);
    }
  };
  console.log("Product ID:", productId);

  const handleClick = (productId) => {
    navigate(`/products/${productId}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (allProductsAreLoading || productIsLoading || currentOrderIsLoading) {
    return <div>Loading...</div>;
  }
  if (allProductsError || productError || currentOrderError) {
    return (
      <div>
        {allProductsError?.message ||
          productError?.message ||
          currentOrderError?.message}
      </div>
    );
  }
  return (
    <>
      <div className="singleProductContainer">
        <img className="singleProductImage" src={productDetails.imageUrl} />
        <div className="Product Information">
          <h1 className="SingleProductName">{productDetails.name}</h1>
          <p className="SingleProductraiting">
            Raiting {productDetails.rating} of 5
          </p>
          <div className="SingleProductLineOne"></div>
          <div className="SingleProductPriceandButtonContainer">
            <p className="SingleProductPrice">
              ${productDetails.price.toFixed(2)}
            </p>
            <button className="SingleProductCartButton" onClick={addToCart}>
              Add to Cart
            </button>
          </div>

          <p className="SingleProductDescription">
            {productDetails.description}
          </p>
          <div className="SingleProductInStockandQuantityContainer">
            <p className="SingleProductInStock">
              {productDetails.inStock ? "In Stock" : "Out of Stock"}
            </p>
            <p className="SingleProductQuantity">
              Only {productDetails.quantity} left
            </p>
          </div>
        </div>
      </div>
      <div className="SingleProductLineTwo"></div>

      <div className="SimilarProductsContainer">
        <h2 className="SimilarProductsHeading">Similar Products</h2>
        <div className="SimilarProductsDisplayContainer">
          {displayedProductsArray &&
            displayedProductsArray.map((product) => (
              <div
                onClick={() => handleClick(product.id)}
                className="SimilarProductContainer"
                key={product.id}
              >
                <img
                  className="SimilarProductImage"
                  src={product.imageUrl}
                  alt={product.name}
                />
                <div className="SimilarProductImageOverlay">{product.name}</div>
              </div>
            ))}
        </div>
      </div>
      <div className="ProductDisplayContainerTwo">
        <ProductDisplay />
      </div>
    </>
  );
};

export default SingleProduct;
