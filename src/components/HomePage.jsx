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
    window.scrollTo({ top: 0, behavior: "smooth" });
    setProductId(productId);
    // console.log("You Clicked Product Number ", productId);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  // console.log(data);
  return (
    <>
      <div className="ProductDisplayContainer">
        {/* <div className="VectorImageOverLay">
          <svg
            className="HomePageMoon"
            fill="#FFFFFF"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="800px"
            height="800px"
            viewBox="0 0 30.457 30.457"
            xml:space="preserve"
          >
            <path d="M29.693,14.49c-0.469-0.174-1-0.035-1.32,0.353c-1.795,2.189-4.443,3.446-7.27,3.446c-5.183,0-9.396-4.216-9.396-9.397 c0-2.608,1.051-5.036,2.963-6.835c0.366-0.347,0.471-0.885,0.264-1.343c-0.207-0.456-0.682-0.736-1.184-0.684 C5.91,0.791,0,7.311,0,15.194c0,8.402,6.836,15.238,15.238,15.238c8.303,0,14.989-6.506,15.219-14.812 C30.471,15.118,30.164,14.664,29.693,14.49z" />
          </svg>
        </div> */}
        <ProductDisplay />
      </div>

      <div className="HomePageProductsContainer">
        {data &&
          data.map((product) => (
            <div
              onClick={() => handleClick(product.id)}
              className="ProductContainer"
              key={product.id}
            >
              <img
                className="HomePageProductImage"
                src={product.imageUrl}
                alt={product.name}
              />
              <div className="ImageOverlay">{product.name}</div>
            </div>
          ))}
        {productId && <SingleProduct productId={productId} />}
      </div>
    </>
  );
};
export default HomePage;
