import "./Header.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <nav>
        <div className="logo">🍽️ FlavorForge</div>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/recipes">Recipes</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;