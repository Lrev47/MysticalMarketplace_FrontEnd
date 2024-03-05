import { useState, useEffect } from "react";
import { useGetAllProductsQuery } from "../StoreApi";

const ProductDisplay = () => {
  const [productIndex, setProductIndex] = useState(0);
  const [randomProducts, setRandomProducts] = useState([]);
  const { data: products, error, isLoading } = useGetAllProductsQuery();

  // Function to shuffle an array and pick the first 20 elements
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
    }, 10000); // Change product every 10 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [randomProducts]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching products.</p>;

  return (
    <div className="ProductDisplayContainer">
      <div className="ProductDisplayImage">
        <img
          className="displayImage"
          src={randomProducts[productIndex].imageUrl}
        />
      </div>
      <div className="ProductDisplayInfo">
        <h2>{randomProducts[productIndex].name}</h2>
      </div>
    </div>
  );
};

export default ProductDisplay;
