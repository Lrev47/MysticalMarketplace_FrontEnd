import { useState, useEffect } from "react";
import { useGetAllProductsQuery } from "../StoreApi";
import { useNavigate } from "react-router-dom";

const ProductDisplay = () => {
  const [productIndex, setProductIndex] = useState(0);
  const [randomProducts, setRandomProducts] = useState([]);
  const { data: products, error, isLoading } = useGetAllProductsQuery();
  const navigate = useNavigate();

  const pickRandomProducts = (productsArray, numProducts = 20) => {
    const shuffled = [...productsArray].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numProducts);
  };

  useEffect(() => {
    if (products) {
      const selectedProducts = pickRandomProducts(products);
      setRandomProducts(selectedProducts);
    }
  }, [products]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setProductIndex((prevIndex) =>
        prevIndex === randomProducts.length - 1 ? 0 : prevIndex + 1
      );
    }, 10000);

    return () => clearInterval(intervalId);
  }, [randomProducts]);

  const handleClick = (productId) => {
    navigate(`/products/${productId}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading || !randomProducts.length) return <p>Loading...</p>;
  if (error) return <p>Error fetching products.</p>;

  return (
    <div className="ProductDisplayContainer">
      <div className="ProductDisplayImage">
        <img
          onClick={() => handleClick(randomProducts[productIndex].id)}
          className="displayImage"
          src={randomProducts[productIndex].imageUrl}
        />
      </div>
      <div className="ProductDisplayInfo">
        <h2 className="ProductDisplayHeader">
          {randomProducts[productIndex].name}
        </h2>
        <p className="ProductDisplayDescription">
          {randomProducts[productIndex].description}
        </p>
      </div>
    </div>
  );
};

export default ProductDisplay;
