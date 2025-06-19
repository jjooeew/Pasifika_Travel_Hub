import { Link } from "react-router-dom";
import "./NavBar.css";
import logo from "../../assets/logo/logo.png";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function NavBar() {
  const [dropdown, setDropdown] = useState(false);
  const { currentUser, logout } = useAuth();

  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  const handleLogout = async () => {
    try {
      await logout();
      alert("Logged out");
    } catch (err) {
      alert("Lougout error: " + err.message);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <img src={logo} alt="Pasifika Hub logo" />
      </div>

      <ul className="navbar__links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/things-to-do">Things to do</Link>
        </li>
        <li>
          <Link to="/language">Language</Link>
        </li>
        <li>
          <Link to="/history">History</Link>
        </li>
        <li>
          <Link to="/kids">Kids</Link>
        </li>
      </ul>

      <div className="navbar__profile">
        <button onClick={toggleDropdown} aria-label="Profile Menu">
          👤
        </button>

        {dropdown && (
          <div className="dropdownMenu">
            {!currentUser ? (
              <>
                <Link to="/login" onClick={() => setDropdown(false)} className="signIn">
                  Sign In
                </Link>

                <Link to="/register" onClick={() => setDropdown(false)} className="signOut">
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <Link to="/profile" onClick={() => setDropdown(false)}>
                  Profile
                </Link>
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
