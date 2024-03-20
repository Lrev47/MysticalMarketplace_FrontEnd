import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import SingleProduct from "./singleProduct";
import LogInUser from "./LogIn";
import CategoryLinks from "./SelectCategories";
import AccountPage from "./AccountPage";
import CategoriesProductDisplay from "./categoryDisplay";
import CartPage from "./Cart";

function MainContainer({
  token,
  setToken,
  userName,
  setUserName,
  userId,
  setUserId,
  orderId,
  setOrderId,
  setOrders,
  orders,
}) {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/products/:productId"
          element={
            <SingleProduct
              userId={userId}
              token={token}
              setOrderId={setOrderId}
            />
          }
        />
        <Route
          path="/Account/:userId"
          element={
            <AccountPage
              userId={userId}
              userName={userName}
              token={token}
              orderId={orderId}
            />
          }
        />
        <Route
          path="/login"
          element={
            <LogInUser
              userId={userId}
              setUserName={setUserName}
              setToken={setToken}
              setUserId={setUserId}
              setOrders={setOrders}
            />
          }
        />

        <Route
          path="/Cart"
          element={<CartPage orders={orders} userId={userId} token={token} />}
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
