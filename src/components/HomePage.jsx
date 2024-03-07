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
      <div className="HomePageProductsContainer">
        {data &&
          data.map((product) => (
            <img
              onClick={() => handleClick(product.id)}
              className="HomePageProductImage"
              src={product.imageUrl}
              alt={product.name}
              key={product.id}
            />
          ))}
        {productId && <SingleProduct productId={productId} />}
      </div>
    </>
  );
};
export default HomePage;
