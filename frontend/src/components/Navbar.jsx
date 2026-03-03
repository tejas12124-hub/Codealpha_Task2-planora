import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles/navbar.css";

function Navbar() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <img src={logo} alt="Planora" />
      </div>

      <div className="nav-right">
        {!token ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register" className="btn">
              Get Started
            </Link>
          </>
        ) : (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <button className="btn logout" onClick={() => {
        localStorage.clear();
        window.location.reload();
      }}
>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
