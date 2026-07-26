import "./Hero.css";
import heroImage from "../../assets/hero.png";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Craft, Discover & Share Amazing Recipes</h1>

        <p>
          FlavorForge is a cloud-native recipe platform built with React,
          Express, Docker, Kubernetes, Azure, and DevSecOps best practices.
        </p>

        <div className="hero-buttons">
          <button className="btn btn-primary">Get Started</button>
          <button className="btn btn-secondary">Learn More</button>
        </div>
      </div>

      <div className="hero-image">
        <img src={heroImage} alt="FlavorForge Hero" />
      </div>
    </section>
  );
}

export default Hero;