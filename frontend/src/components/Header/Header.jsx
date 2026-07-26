import "./Header.css";

function Header() {
  return (
    <header>
      <nav>
        <div className="logo">🍽️ FlavorForge</div>

        <div className="nav-links">
          <a href="#">Home</a>
          <a href="#">Recipes</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </div>
      </nav>
    </header>
  );
}

export default Header;