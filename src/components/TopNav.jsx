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

  return (
    <div className="TopNav">
      <Link to="/">Home</Link>

      <a href="/Account" onClick={accountOrLoginRedirect}>
        Account
      </a>

      <Link to="/">Cart</Link>
      <Link to="/login">LogIn</Link>
      <Link to="/Register">Register</Link>
    </div>
  );
}

export default TopNav;
