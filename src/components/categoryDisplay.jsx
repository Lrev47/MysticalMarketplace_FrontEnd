import { useParams } from "react-router-dom";
import { useGetAllProductsQuery } from "../StoreApi";
import { useNavigate } from "react-router-dom";

const CategoriesProductDisplay = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  const { data, error, isLoading } = useGetAllProductsQuery();

  const handleClick = (productId) => {
    navigate(`/products/${productId}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) {
    return <div>Loading</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  const categoryFilter = data.filter(
    (product) => product.category === category
  );

  return (
    <>
      <div className="CategoryDisplayHeaderDiv">
        <h2 className="CategoryDisplayHeader">{category}</h2>
      </div>
      <div className="filteredByCategoryProductsContainer">
        {categoryFilter.map((product) => (
          <div
            onClick={() => handleClick(product.id)}
            className="filteredProductContainer"
            key={product.id}
          >
            <img
              className="filteredProductImage"
              src={product.imageUrl}
              alt={product.name}
            />
            <div className="filteredProductImageOverlay">{product.name}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CategoriesProductDisplay;
