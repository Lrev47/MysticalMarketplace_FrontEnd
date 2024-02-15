import { useGetAllProductsQuery } from "../StoreApi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const HomePage = () => {
  const { data, error, isLoading } = useGetAllProductsQuery();

  console.log(data);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  return (
    <>
      <div className="HomePageContainer">
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
      </div>
    </>
  );
};
export default HomePage;
