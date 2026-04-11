import { ShieldCheck, Lock, Globe, CreditCard } from 'lucide-react';
import { useCurrencyStore } from '../store/currencyStore';
import './Footer.css';

interface Props {
  currentLang: string;
  setLanguage: (l: string) => void;
}

const Footer: React.FC<Props> = ({ currentLang }) => {
  const currentCurrency = useCurrencyStore(state => state.currentCurrency);
  
  return (
    <footer className="footer shadow-glass">
      <div className="container footer-grid">
        <div className="footer-col brand-col">
          <h2 className="footer-logo">AVELLIN</h2>
          <p className="footer-tagline">A Bespoke Marketplace for the Modern World.</p>
          <div className="trust-seals">
            <ShieldCheck size={20} title="Verified Merchant" />
            <Lock size={20} title="SSL Encrypted" />
            <CreditCard size={20} title="PCI-DSS Compliant" />
          </div>
        </div>

        <div className="footer-col">
          <h4>Collection</h4>
          <ul>
            <li><Link to="/">Latest Arrivals</Link></li>
            <li><Link to="/department/clothing">Clothing</Link></li>
            <li><Link to="/department/skincare">Skincare</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Portal</h4>
          <ul>
            <li><Link to="/auth">Sign In</Link></li>
            <li><Link to="/vendor-dashboard">Brand Dashboard</Link></li>
            <li><Link to="/admin">Governance</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Preferences</h4>
          <div className="preferences-status">
            <p><Globe size={14} /> Region: {currentLang}</p>
            <p>Currency: {currentCurrency.code} ({currentCurrency.symbol})</p>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>&copy; {new Date().getFullYear()} AVELLIN Luxury Marketplace. All rights reserved.</p>
        <div className="bottom-links">
           <span>Terms of Bespoke Service</span>
           <span>Privacy & Security</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
