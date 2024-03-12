import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import SingleProduct from "./singleProduct";
import LogInUser from "./LogIn";
import CategoryLinks from "./SelectCategories";
import AccountPage from "./AccountPage";
import CategoriesProductDisplay from "./categoryDisplay";

function MainContainer({
  token,
  setToken,
  userName,
  setUserName,
  userId,
  setUserId,
}) {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products/:productId" element={<SingleProduct />} />
        <Route
          path="/Account"
          element={
            <AccountPage userId={userId} userName={userName} token={token} />
          }
        />
        <Route
          path="/login"
          element={
            <LogInUser
              setUserName={setUserName}
              setToken={setToken}
              setUserId={setUserId}
            />
          }
        />
        <Route path="/Categories" element={<CategoryLinks />} />
        <Route
          path="/Categories/:category"
          element={<CategoriesProductDisplay />}
        />
      </Routes>
    </div>
  );
}

export default MainContainer;
