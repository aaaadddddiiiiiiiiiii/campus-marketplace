import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="brand">CampusMart</Link>
      <div className="nav-links">
        {user ? (
          <>
            <Link to="/sell">Sell an Item</Link>
            <Link to="/my-listings">My Listings</Link>
            <span className="nav-user">Hi, {user.name.split(" ")[0]}</span>
            <button className="btn btn-outline" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register" className="btn">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
