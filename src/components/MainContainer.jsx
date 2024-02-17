import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import SingleProduct from "./singleProduct";
import LogInUser from "./LogIn";

function MainContainer({ token, setToken }) {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products/:productId" element={<SingleProduct />} />
        <Route path="/login" element={<LogInUser setToken={setToken} />} />
      </Routes>
    </div>
  );
}

export default MainContainer;
