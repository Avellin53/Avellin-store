import React from 'react';
import './Hero.css';

const Hero: React.FC = () => {
  return (
    <section className="hero">
      <div className="hero-content container">
        <h2 className="hero-title">The World's Market,<br/>Elegantly Curated.</h2>
        <p className="hero-subtitle">
          Explore thousands of independent sellers across fashion and skincare in one seamless, premium space. Compare options freely, chat in your native language, and shop without borders.
        </p>
        <div className="hero-actions">
          <button className="btn btn-primary">Enter the Marketplace</button>
          <button className="btn btn-secondary">Open Your Storefront</button>
        </div>
      </div>
      <div className="hero-bg">
        {/* Placeholder for high-quality fashion/beauty imagery */}
      </div>
    </section>
  );
};

export default Hero;
