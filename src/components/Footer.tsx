import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

interface Props {
  currentLang: string;
  setLanguage: (l: string) => void;
}

const Footer: React.FC<Props> = ({ currentLang }) => {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-col brand-col">
          <h2 className="footer-logo">AVELLIN</h2>
          <p className="footer-tagline">Premium but Accessible.</p>
          <div className="footer-controls">
            <span>Lang: {currentLang}</span> | <span>Currency: USD</span>
          </div>
        </div>

        <div className="footer-col">
          <h4>Departments</h4>
          <ul>
            <li><Link to="/department/clothing">Clothing</Link></li>
            <li><Link to="/department/shoes">Shoes</Link></li>
            <li><Link to="/department/bags">Bags</Link></li>
            <li><Link to="/department/makeup">Makeup</Link></li>
            <li><Link to="/department/skincare">Skincare</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Network</h4>
          <ul>
            <li><Link to="/page/open-store">Open a Storefront</Link></li>
            <li><Link to="/admin">Admin Portal</Link></li>
            <li><Link to="/page/community-guidelines">Community Guidelines</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Trust & Safety</h4>
          <ul>
            <li><Link to="/page/buyer-protection">Buyer Protection</Link></li>
            <li><Link to="/page/secure-chat-policy">Secure Chat Policy</Link></li>
            <li><Link to="/page/help-desk">Help Desk</Link></li>
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>&copy; {new Date().getFullYear()} Avellin Marketplace. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
