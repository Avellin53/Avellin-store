import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import './Navbar.css';

interface NavbarProps {
  currentLang: string;
  setLanguage: (lang: string) => void;
}

const LANGUAGES = [
  { code: 'EN', name: 'English' },
  { code: 'FR', name: 'Français' },
  { code: 'ES', name: 'Español' },
  { code: 'IT', name: 'Italiano' },
  { code: 'DE', name: 'Deutsch' },
  { code: 'YR', name: 'Yorùbá' },
  { code: 'IG', name: 'Ndi Igbo' },
  { code: 'HA', name: 'Hausa' },
];

const Navbar: React.FC<NavbarProps> = ({ currentLang, setLanguage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const { cart, toggleCart } = useStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentLangObj = LANGUAGES.find(l => l.name === currentLang) || LANGUAGES[0];

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container nav-content">
        <div className="nav-left">
          <ul className="nav-links">
            <li><a href="#new-arrivals">Shop</a></li>
            <li><a href="#sellers">Sellers</a></li>
            <li><a href="#about">About</a></li>
          </ul>
        </div>
        
        <div className="nav-logo">
          <h1>AVELLIN</h1>
        </div>

        <div className="nav-right">
          <div className="lang-switcher" onMouseLeave={() => setShowLangMenu(false)}>
            <button 
              className="lang-toggle" 
              onMouseEnter={() => setShowLangMenu(true)}
            >
              {currentLangObj.code} ▼
            </button>
            {showLangMenu && (
              <div className="lang-dropdown">
                {LANGUAGES.map(lang => (
                  <button 
                    key={lang.code}
                    className={currentLang === lang.name ? 'active' : ''}
                    onClick={() => {
                      setLanguage(lang.name);
                      setShowLangMenu(false);
                    }}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            )}
          </div>
          <a href="#search" className="nav-icon" onClick={(e) => e.preventDefault()}>Search</a>
          <button className="nav-icon cart-trigger" onClick={toggleCart} style={{background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-primary)'}}>
            Cart ({cart.reduce((a, b) => a + b.quantity, 0)})
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
