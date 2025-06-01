import { Link } from 'react-router-dom';
import './NavBar.css';

export default function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <img src="/assets/logo/pasifika-logo.svg" alt="Pasifika Hub logo" />
      </div>

      <ul className="navbar__links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/things-to-do">Things to do</Link></li>
        <li><Link to="/language">Language</Link></li>
        <li><Link to="/history">History</Link></li>
        <li><Link to="/kids">Kids</Link></li>
      </ul>

      <div className="navbar__profile">
       
        <span role="img" aria-label="profile">👤</span>
      </div>
    </nav>
  );
}
