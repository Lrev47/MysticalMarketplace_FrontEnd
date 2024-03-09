import { useParams } from "react-router-dom";
import { useGetSingleProductQuery } from "../StoreApi/index.js";
import { useGetAllProductsQuery } from "../StoreApi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SingleProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  //IF I DONT NEED TO RENDER ALL PRODUCTS DO I NEED  allProductsError and allProductsAreLoading,
  const {
    data: allProducts,
    allProductsError,
    allProductsAreLoading,
  } = useGetAllProductsQuery();

  const {
    data: productDetails,
    error,
    isLoading,
  } = useGetSingleProductQuery(productId);

  const [productCategory, setProductCategory] = useState("");
  const [similarProductsArray, setsimilarProductsArray] = useState([]);
  const [displayedProductsArray, setdisplayedProductsArray] = useState([]);

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

  const handleClick = (productId) => {
    navigate(`/products/${productId}`);
    setProductId(productId);
    console.log("You Clicked Product Number ", productId);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  console.log("Product Details:", productDetails);
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
            <p className="SingleProductPrice">${productDetails.price}.00</p>
            <button className="SingleProductCartButton">Add to Cart</button>
          </div>

          <p className="SingleProductDescription">
            {productDetails.description}
          </p>
          <div className="SingleProductInStockandQuantityContainer">
            <p className="SingleProductInStock">
              {productDetails.inStock ? "In Stock" : "Out of Stock"}
            </p>
            <p className="SingleProductQuantity">
              {" "}
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
          {/* {productId && <SingleProduct productId={productId} />} */}
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
