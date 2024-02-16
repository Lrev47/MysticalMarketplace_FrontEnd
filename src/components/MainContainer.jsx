import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import SingleProduct from "./singleProduct";

function MainContainer({ token, setToken }) {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products/:productId" element={<SingleProduct />} />
      </Routes>
    </div>
  );
}

export default MainContainer;
