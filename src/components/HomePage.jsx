import { useGetAllProductsQuery } from "../StoreApi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import SingleProduct from "./singleProduct";
import ProductDisplay from "./ProductDisplay";

const HomePage = () => {
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetAllProductsQuery();
  const [productId, setProductId] = useState(null);

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
  console.log(data);
  return (
    <>
      <div className="ProductDisplayContainer">
        <ProductDisplay />
      </div>
      <div className="Container">
        {data &&
          data.map((product) => (
            <div key={product.id} className="ProductCard">
              <img
                onClick={() => handleClick(product.id)}
                className="ProductImage"
                src={product.imageUrl}
                alt={product.name}
              />

              <div className="infoDiv">
                <h4>{product.name}</h4>
                <div className="PriceandCartDisplay">
                  <p>{product.price}</p>
                  <span>
                    <button>Add to Cart</button>
                  </span>
                </div>
              </div>
            </div>
          ))}
        {productId && <SingleProduct productId={productId} />}
      </div>
    </>
  );
};
export default HomePage;
