import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import "../pages/Login";
import { useNavigate } from "react-router";
import { handleSuccess } from "../pages/utils";
import { ToastContainer } from "react-toastify";
const Header = ({ user }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("role");
    handleSuccess("User LoggedOut");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const [loggedInUser, setLoggedInUser] = useState("");
  const [loggedInrole, setLoggedInrole] = useState("");
  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
    setLoggedInrole(localStorage.getItem("role"));
  }, []);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/home" className="header-title">
          TMS
        </Link>
        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>
      </div>

      <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
        <Link
          to={
            loggedInrole === "manager"
              ? "/dashboard"
              : "/employee-dashboard"
          }
          onClick={() => setMenuOpen(false)}
        >
          Dashboard
        </Link>
        <Link to="/calendar" onClick={() => setMenuOpen(false)}>
          Calendar
        </Link>
        {/* <Link to="/tasks" onClick={() => setMenuOpen(false)}>Tasks</Link>
        <Link to="/leave" onClick={() => setMenuOpen(false)}>Leave</Link>
        <Link to="/reports" onClick={() => setMenuOpen(false)}>Reports</Link> */}
        {user?.role === "employee" && (
          <Link to="/conflicts" onClick={() => setMenuOpen(false)}>
            Conflicts
          </Link>
        )}
      </nav>

      <div className="user-info">
        <span>
          {loggedInUser} ({loggedInrole})
        </span>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <ToastContainer />
    </header>
  );
};

export default Header;
