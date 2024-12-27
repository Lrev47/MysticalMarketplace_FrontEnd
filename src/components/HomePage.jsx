import { useGetAllProductsQuery } from "../StoreApi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import SingleProduct from "./singleProduct";
import ProductDisplay from "./ProductDisplay";

const HomePage = () => {
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetAllProductsQuery();
  const [productId, setProductId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const handleClick = (productId) => {
    navigate(`/products/${productId}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setProductId(productId);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = data ? data.slice(startIndex, endIndex) : [];

  const totalPages = data ? Math.ceil(data.length / itemsPerPage) : 0;

  return (
    <>
      <div>
        <ProductDisplay />
      </div>

      <div className="HomePageProductsContainer">
        {currentItems.map((product) => (
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

      <div className="Pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            className="PageButton"
            key={index}
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </>
  );
};

export default HomePage;
