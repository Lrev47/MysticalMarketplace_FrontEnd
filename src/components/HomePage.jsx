import { useGetAllProductsQuery } from "../StoreApi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SingleProduct from "./singleProduct";

const HomePage = () => {
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetAllProductsQuery();
  const [productId, setProductId] = useState(null);

  const handleClick = (productId) => {
    navigate(`/products/${productId}`);
    setProductId(productId);
    console.log("SELECTED PRODUCT", productId);
  };

  console.log(data);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  return (
    <>
      <div className="Container">
        {data &&
          data.map((product) => (
            <div
              key={product.id}
              className="ProductCard"
              onClick={() => handleClick(product.id)}
            >
              <img
                className="ProductImage"
                src={product.image}
                alt={product.title}
              />
              <div className="infoDiv">
                <h2>{product.title}</h2>
                <p>{product.category}</p>
                <p>{product.description}</p>
                <p>{product.price}</p>
              </div>
            </div>
          ))}
        {productId && <SingleProduct productId={productId} />}
      </div>
    </>
  );
};
export default HomePage;
