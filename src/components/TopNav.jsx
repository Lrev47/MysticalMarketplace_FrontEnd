import { Link, useNavigate } from "react-router-dom";

export function TopNav({ token, userId }) {
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
      <Link className="TopNavLinks" to="/Register">
        Register
      </Link>
      <Link className="TopNavLinks" to="/">
        <img
          className="CartImageIcon"
          src="https://imagizer.imageshack.com/img924/4575/QZpV8d.png"
        />
      </Link>
      {/* need to find out how to search */}
      <form className="searchBarForm">
        <img
          src="https://imagizer.imageshack.com/img923/7796/1WvexY.png"
          alt="Search"
          className="SearchBarButton"
        />
        <input className="SearchBar" />
      </form>
    </div>
    // need to find out how to search
  );
}

export default TopNav;
