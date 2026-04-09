import React from 'react';
import { useStore } from '../store/useStore';
import './CategoryGrid.css'; // Reuse existing nice grid styling or add custom

const NewArrivals: React.FC = () => {
  const { products, addToCart } = useStore();

  if (products.length === 0) return null;

  return (
    <section className="categories-section" style={{ backgroundColor: 'var(--color-gray-50)' }} id="new-arrivals">
      <div className="container">
        <h2 className="section-title text-center">New Arrivals</h2>
        <p className="section-subtitle text-center">Freshly added by our top global sellers.</p>
        
        <div className="cat-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gridAutoRows: '300px' }}>
          {products.map((product) => (
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
      </div>
    </section>
  );
};

export default NewArrivals;
