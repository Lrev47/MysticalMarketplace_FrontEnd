import { Link } from "react-router-dom";

export function TopNav() {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/">Account</Link>
      <Link to="/">Cart</Link>
      <Link to="/login">LogIn</Link>
    </div>
  );
}

export default TopNav;
