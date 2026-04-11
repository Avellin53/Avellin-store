import { Link, useLocation } from 'react-router-dom';
import CurrencySwitcher from './CurrencySwitcher';
import { ShoppingBag, Search, Globe, User } from 'lucide-react';
import './Navbar.css';

interface NavbarProps {
  currentLang: string;
  setLanguage: (lang: string) => void;
}

const LANGUAGES = [
  { code: 'EN', name: 'English' },
  { code: 'FR', name: 'Français' },
  { code: 'ES', name: 'Español' },
  { code: 'YR', name: 'Yorùbá' },
  { code: 'IG', name: 'Ndi Igbo' },
];

const Navbar: React.FC<NavbarProps> = ({ currentLang, setLanguage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const { cart, toggleCart } = useStore();
  const location = useLocation();

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
            <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link></li>
            <li><Link to="/auth" className={location.pathname === '/auth' ? 'active' : ''}>Sign In</Link></li>
            <li><Link to="/vendor-dashboard" className={location.pathname === '/vendor-dashboard' ? 'active' : ''}>Vendors</Link></li>
          </ul>
        </div>
        
        <div className="nav-logo">
          <Link to="/"><h1>AVELLIN</h1></Link>
        </div>

        <div className="nav-right">
          <CurrencySwitcher />
          
          <div className="lang-switcher" onMouseLeave={() => setShowLangMenu(false)}>
            <button className="lang-toggle" onMouseEnter={() => setShowLangMenu(true)}>
              <Globe size={16} /> {currentLangObj.code}
            </button>
            {showLangMenu && (
              <div className="lang-dropdown">
                {LANGUAGES.map(lang => (
                  <button 
                    key={lang.code}
                    className={currentLang === lang.name ? 'active' : ''}
                    onClick={() => { setLanguage(lang.name); setShowLangMenu(false); }}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="nav-actions">
            <button className="nav-icon"><Search size={18} /></button>
            <Link to="/auth" className="nav-icon"><User size={18} /></Link>
            <button className="nav-icon cart-trigger" onClick={toggleCart}>
              <ShoppingBag size={18} />
              <span className="cart-badge">{cart.reduce((a, b) => a + b.quantity, 0)}</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
