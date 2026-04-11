import React from 'react';
import './SellerSpotlight.css';

const sellers = [
  { name: 'Maison D\'Or', category: 'High Fashion', rating: '4.9', img: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=600&auto=format&fit=crop' },
  { name: 'Alara Skincare', category: 'Organic Skincare', rating: '4.8', img: 'https://images.unsplash.com/photo-1556228720-192a6af4e86e?q=80&w=600&auto=format&fit=crop' },
  { name: 'Onyx Leather', category: 'Accessories', rating: '5.0', img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=600&auto=format&fit=crop' },
];

const SellerSpotlight: React.FC = () => {
  return (
    <section className="seller-section" id="sellers">
      <div className="container">
        <div className="seller-header">
          <div>
            <h2 className="section-title">Independent Brands,<br/>One Trusted Ecosystem.</h2>
            <p className="seller-subtitle">Support local artisans and international boutiques side-by-side.</p>
          </div>
          <button className="btn btn-secondary">Explore Top Sellers</button>
        </div>

        <div className="seller-container">
          {sellers.map((s, i) => (
            <div key={i} className="seller-card">
              <div className="seller-img-wrapper">
                <img src={s.img} alt={s.name} className="seller-img" />
              </div>
              <div className="seller-info">
                <div>
                  <h4 className="seller-name">{s.name}</h4>
                  <span className="seller-category">{s.category}</span>
                </div>
                <div className="seller-rating">⭐ {s.rating}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SellerSpotlight;
