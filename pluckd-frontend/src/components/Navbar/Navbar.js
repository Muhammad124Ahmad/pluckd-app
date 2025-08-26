import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { urlConfig } from "../../config";
import { useAppContext } from "../../context/AuthContext";
import "./Navbar.css"

export default function Navbar() {
  const { isLoggedIn, setIsLoggedIn, userName, setUserName } = useAppContext();

  const navigate = useNavigate();
  useEffect(() => {
    const authTokenFromSession = sessionStorage.getItem("auth-token");
    const nameFromSession = sessionStorage.getItem("name");
    if (authTokenFromSession) {
      if (isLoggedIn && nameFromSession) {
        setUserName(nameFromSession);
      } else {
        sessionStorage.removeItem("auth-token");
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("email");
        setIsLoggedIn(false);
      }
    }
  }, [isLoggedIn, setIsLoggedIn, setUserName]);

  useEffect(() => {
  const navContent = document.querySelector(".pluckd-nav-content");
  const navLinks = document.querySelectorAll(".pluckd-nav-content a");

  const handleLinkClick = () => {
    navContent.classList.remove("show");
  };

  navLinks.forEach(link => link.addEventListener("click", handleLinkClick));

  return () => {
    navLinks.forEach(link => link.removeEventListener("click", handleLinkClick));
  };
}, []);

  
  const handleLogout = () => {
    sessionStorage.removeItem("auth-token");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("email");
    setIsLoggedIn(false);
    navigate(`/app`);
  };
  
  const profileSection = () => {
    navigate(`/app/profile`);
  };

  const handleBrandClick = () => {
    navigate("/");
  };

  return (
    <>
      <nav className="pluckd-navbar" id="navbar_container">
        <div className="pluckd-navbar-container">
          <div className="pluckd-brand" onClick={handleBrandClick}>
            PluckD
          </div>

          <button
            className="pluckd-navbar-toggle"
            type="button"
            onClick={() => {
              const navContent = document.querySelector(".pluckd-nav-content");
              navContent.classList.toggle("show");
            }}
            aria-label="Toggle navigation"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div className="pluckd-nav-content" id="navbarNav">
            <ul className="pluckd-nav-links">
              <li className="pluckd-nav-item">
                <Link className="pluckd-nav-link" to="/app">
                  Gifts
                </Link>
              </li>
              <li className="pluckd-nav-item">
                <Link className="pluckd-nav-link" to="/app/search">
                  Search
                </Link>
              </li>
            </ul>

            <div className="pluckd-user-section">
              {isLoggedIn ? (
                <>
                  <span className="pluckd-welcome" onClick={profileSection}>
                    Welcome, {userName}
                  </span>
                  <button
                    className="pluckd-logout-btn"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    className="pluckd-login-btn"
                    to="/app/login"
                  >
                    Login
                  </Link>
                  <Link
                    className="pluckd-register-btn"
                    to="/app/register"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}