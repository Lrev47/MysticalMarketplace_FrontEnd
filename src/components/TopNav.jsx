import { Link, useNavigate } from "react-router-dom";

export function TopNav({ token, userId }) {
  const navigate = useNavigate();

  const accountOrLoginRedirect = (e) => {
    e.preventDefault();
    if (!token) {
      navigate("/login");
    } else {
      navigate(`/Account/${userId}`);
    }
  };

  const OrderHistoryOrLoginRedirect = (e) => {
    e.preventDefault();
    if (!token) {
      navigate("/login");
    } else {
      navigate(`/orderHistory`);
    }
  };

  const cartOrLoginRedirect = (e) => {
    e.preventDefault();
    if (!token) {
      navigate("/login");
    } else {
      navigate(`/Cart`);
    }
  };

  return (
    <div className="TopNav">
      <Link className="TopNavLinks" to="/">
        Home
      </Link>

      <a
        className="TopNavLinks"
        href="/Account"
        onClick={accountOrLoginRedirect}
      >
        Account
      </a>

      <Link className="TopNavLinks" to="/login">
        LogIn
      </Link>
      <Link
        className="TopNavLinks"
        to="/orderHistory"
        onClick={OrderHistoryOrLoginRedirect}
      >
        Order History
      </Link>
      <Link className="TopNavLinks" to="/Cart" onClick={cartOrLoginRedirect}>
        Cart
      </Link>
      <Link className="TopNavLinks" to="/Categories" >
      Categories
      </Link>   </div>
    // need to find out how to search
  );
}

export default TopNav;
