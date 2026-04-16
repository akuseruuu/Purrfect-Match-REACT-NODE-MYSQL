import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="brand">
        Purrfect Match
      </Link>
      <div className="nav-links">
        {!user && <Link to="/login">Login</Link>}
        {!user && <Link to="/signup">Signup</Link>}
        {user?.role === "admin" && <Link to="/admin">Admin</Link>}
        {user && (
          <button type="button" onClick={handleLogout} className="btn-secondary">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
