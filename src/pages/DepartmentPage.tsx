import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartPayment from '../components/CartPayment';
import { useStore } from '../store/useStore';
import { ArrowLeft } from 'lucide-react';
import '../components/CategoryGrid.css';

const DepartmentPage: React.FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const { products, addToCart } = useStore();
  const [language, setLanguage] = React.useState('English');

  // Filter products by category (case insensitive)
  const categoryProducts = products.filter(
    p => p.category.toLowerCase() === categoryName?.toLowerCase()
  );

  return (
    <div className="app-container">
      <Navbar currentLang={language} setLanguage={setLanguage} />
      
      <main style={{ paddingTop: '100px', minHeight: '70vh' }}>
        <div className="container" style={{ paddingBottom: '4rem' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <Link to="/" style={{ color: 'var(--color-midnight-navy)' }}>
              <ArrowLeft size={24} />
            </Link>
            <h1 style={{ textTransform: 'capitalize', fontSize: '2.5rem', color: 'var(--color-midnight-navy)' }}>
              {categoryName} Department
            </h1>
          </div>

          <p style={{ marginBottom: '3rem', color: 'var(--color-gray-800)' }}>
            Explore the latest premium curations from our verified sellers in the {categoryName} category.
          </p>

          {categoryProducts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem', background: 'var(--color-gray-50)', borderRadius: '8px' }}>
              <h3>No products currently available in {categoryName}.</h3>
              <p>Check back later or add some from the Admin Dashboard!</p>
            </div>
          ) : (
            <div className="cat-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gridAutoRows: '320px' }}>
              {categoryProducts.map(product => (
                <div key={product.id} className="cat-card" style={{ gridColumn: 'span 1' }}>
                  <img src={product.image} alt={product.name} className="cat-img" />
                  <div className="cat-overlay" style={{ background: 'linear-gradient(to top, rgba(10, 25, 47, 0.9) 0%, rgba(10, 25, 47, 0) 60%)' }}>
                    <h3 className="cat-name" style={{ fontSize: '1.2rem' }}>{product.name}</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', width: '100%', marginBottom: '1rem' }}>
                      <span style={{ color: 'var(--color-champagne)', fontWeight: 500 }}>${product.price}</span>
                      <span style={{ color: 'var(--color-gray-200)', fontSize: '0.8rem' }}>by {product.seller}</span>
                    </div>
                    <button 
                      className="btn btn-secondary" 
                      style={{ width: '100%', borderColor: 'var(--color-clean-white)', color: 'var(--color-clean-white)' }}
                      onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer currentLang={language} setLanguage={setLanguage} />
      <CartPayment />
    </div>
  );
};

export default DepartmentPage;
