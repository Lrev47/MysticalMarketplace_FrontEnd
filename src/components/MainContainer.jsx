import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import SingleProduct from "./singleProduct";
import LogInUser from "./LogIn";
import CategoryLinks from "./SelectCategories";
import AccountPage from "./AccountPage";

function MainContainer({ token, setToken, userName, setUserName }) {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products/:productId" element={<SingleProduct />} />
        <Route
          path="/Account"
          element={<AccountPage userName={userName} token={token} />}
        />
        <Route
          path="/login"
          element={<LogInUser setUserName={setUserName} setToken={setToken} />}
        />
        <Route path="/Categories" element={<CategoryLinks />} />
      </Routes>
    </div>
  );
}

export default MainContainer;
