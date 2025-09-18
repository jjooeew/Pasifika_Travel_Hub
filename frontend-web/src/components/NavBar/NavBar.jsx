// src/components/NavBar.jsx  
import { Link } from "react-router-dom";
import { useRef, useEffect, useState, useContext } from "react";

import logo from "../../assets/logo/logo.png";
import placeholder from "../../assets/images/avatar-placeholder.png";  
import { useAuth } from "../context/AuthContext";
import { UserContext } from "../context/UserContext";            

import "./NavBar.css";

export default function NavBar() {
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef(null)
  const { currentUser, isAdmin, logout } = useAuth();
  const { user } = useContext(UserContext);                      // { avatarUrl, … }

  const toggleDropdown = () => setDropdown((prev) => !prev);

  const handleLogout = async () => {
    try {
      await logout();
      alert("Logged out");
    } catch (err) {
      alert("Logout error: " + err.message);
    }
  };

  useEffect (() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdown(false)
      }
    }
    if (dropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside)
    
  }, [dropdown]);

  return (
    <nav className="navbar">
      
      <div className="navbar__logo">
        <Link to="/">
          <img src={logo} alt="Pasifika Hub logo" />
        </Link>
      </div>

    
      {/* <ul className="navbar__links">
        <li><Link to="/">Home</Link></li>
      </ul> */}

     
      <div className="navbar__profile">
        <button
          className="avatar-btn"
          onClick={toggleDropdown}
          aria-label="Profile menu"
        >
          <img
            src={user?.avatarUrl || placeholder}
            alt="profile"
            className="avatar-img"
          />
        </button>

        {dropdown && (
          <div className="dropdownMenu" ref={dropdownRef}>
            {!currentUser ? (
              <>
                <Link 
                  to="/login"    
                  onClick={() => setDropdown(false)}>Sign In</Link>
                <Link to="/register" onClick={() => setDropdown(false)}>Sign Up</Link>
              </>
            ) : (
              <>
                <Link to="/profile" onClick={() => setDropdown(false)}>Profile</Link>
                {isAdmin && <Link to="/admin/admin-dashboard" onClick={() => setDropdown(false)}>Admin Dashboard</Link>}
                <button
                  onClick={() => {
                    handleLogout();
                    setDropdown(false);
                  }}
                >
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
