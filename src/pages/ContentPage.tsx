import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartPayment from '../components/CartPayment';
import { ArrowLeft, Clock } from 'lucide-react';

const ContentPage: React.FC = () => {
  const { pageName } = useParams<{ pageName: string }>();
  const [language, setLanguage] = React.useState('English');

  const formattedTitle = pageName?.replace(/-/g, ' ');

  return (
    <div className="app-container">
      <Navbar currentLang={language} setLanguage={setLanguage} />
      
      <main style={{ paddingTop: '100px', minHeight: '70vh', background: 'var(--color-gray-50)' }}>
        <div className="container" style={{ padding: '4rem 2rem' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
            <Link to="/" style={{ color: 'var(--color-midnight-navy)', textDecoration: 'none' }}>
              <ArrowLeft size={24} /> Back to Home
            </Link>
          </div>

          <div style={{ 
            background: 'var(--color-clean-white)', 
            padding: '4rem 2rem', 
            borderRadius: '12px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.05)',
            textAlign: 'center',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <Clock size={48} color="var(--color-champagne)" style={{ margin: '0 auto 1.5rem' }} />
            <h1 style={{ textTransform: 'capitalize', fontSize: '2.5rem', color: 'var(--color-midnight-navy)', marginBottom: '1rem' }}>
              {formattedTitle}
            </h1>
            <p style={{ fontSize: '1.2rem', color: 'var(--color-gray-800)', marginBottom: '2rem' }}>
              This section is currently being developed for our masterpiece platform.
            </p>
            <p style={{ color: '#a0aec0', maxWidth: '600px', margin: '0 auto' }}>
              Detailed documentation, legal guidelines, and robust portal features for <strong>{formattedTitle}</strong> are actively being built out by our engineering team to ensure they meet our standard of Minimalist Luxury.
            </p>
            
            <div style={{ marginTop: '3rem' }}>
              <Link to="/" className="btn btn-primary" style={{ display: 'inline-block' }}>
                Return to Marketplace
              </Link>
            </div>
          </div>

        </div>
      </main>

      <Footer currentLang={language} setLanguage={setLanguage} />
      <CartPayment />
    </div>
  );
};

export default ContentPage;
