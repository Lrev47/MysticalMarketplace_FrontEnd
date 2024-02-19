import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import SingleProduct from "./singleProduct";
import LogInUser from "./LogIn";
import RegisterForm from "./Register";
import AccountPage from "./AccountPage";

function MainContainer({
  token,
  setToken,
  userId,
  setUserId,
  userName,
  setUserName,
}) {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products/:productId" element={<SingleProduct />} />
        <Route
          path="/Account/:userId"
          element={
            <AccountPage
              userName={userName}
              userId={userId}
              setUserId={setUserId}
              token={token}
            />
          }
        />
        <Route
          path="/login"
          element={<LogInUser setUserName={setUserName} setToken={setToken} />}
        />
        <Route
          path="/Register"
          element={<RegisterForm setToken={setToken} />}
        />
      </Routes>
    </div>
  );
}

export default MainContainer;
