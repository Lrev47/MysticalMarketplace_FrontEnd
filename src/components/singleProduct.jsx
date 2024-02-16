import { useParams } from "react-router-dom";
import { useGetSingleProductQuery } from "../StoreApi/index.js";

const SingleProduct = () => {
  const { productId } = useParams();
  console.log("PRODUCT ID", productId);
  const {
    data: productDetails,
    error,
    isLoading,
  } = useGetSingleProductQuery(productId);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  console.log(productDetails);
  console.log(typeof productDetails);
  return (
    <>
      <div>
        <h1>{productDetails.title}</h1>
        <img className="ProductImage" src={productDetails.image} />
        <p>{productDetails.category}</p>
        <p>{productDetails.price}</p>
        <p>{productDetails.price}</p>
        <p>{productDetails.rating.rate}</p>
        <p>{productDetails.rating.count}</p>
        <p>{productDetails.title}</p>
      </div>
    </>
  );
};

export default SingleProduct;
