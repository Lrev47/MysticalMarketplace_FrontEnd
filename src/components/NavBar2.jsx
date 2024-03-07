import { Link, useNavigate } from "react-router-dom";

export function TopNavTwo({ token, userId }) {
  const navigate = useNavigate();

  const accountOrLoginRedirect = (e) => {
    e.preventDefault();
    if (!token) {
      navigate("/login");
    } else {
      navigate(`/Account`);
    }
  };

  return (
    <div className="TopNavTwo">
      <Link className="TopNavTwoLinks" to="/">
        Home
      </Link>

      <a
        className="TopNavTwoLinks"
        href="/Account"
        onClick={accountOrLoginRedirect}
      >
        Account
      </a>

      <Link className="TopNavTwoLinks" to="/">
        Cart
      </Link>
      <Link className="TopNavTwoLinks" to="/login">
        LogIn
      </Link>
      <Link className="TopNavTwoLinks" to="/Register">
        Register
      </Link>
    </div>
  );
}

export default TopNavTwo;
