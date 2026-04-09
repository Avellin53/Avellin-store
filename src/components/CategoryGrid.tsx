import React from 'react';
import { Link } from 'react-router-dom';
import './CategoryGrid.css';

const categories = [
  { name: 'Clothing', img: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=600&auto=format&fit=crop', colSpan: 2 },
  { name: 'Skincare', img: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=600&auto=format&fit=crop', colSpan: 1 },
  { name: 'Bags', img: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=600&auto=format&fit=crop', colSpan: 1 },
  { name: 'Makeup', img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600&auto=format&fit=crop', colSpan: 1 },
  { name: 'Shoes', img: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=600&auto=format&fit=crop', colSpan: 1 },
  { name: 'Accessories', img: 'https://images.unsplash.com/photo-1509319117193-57bab727e09d?q=80&w=600&auto=format&fit=crop', colSpan: 1 },
];

const CategoryGrid: React.FC = () => {
  return (
    <section className="categories-section" id="shop">
      <div className="container">
        <h2 className="section-title text-center">Curated Departments</h2>
        <p className="section-subtitle text-center">Discover unique storefronts competing to bring you the best.</p>
        
        <div className="cat-grid">
          {categories.map((cat, i) => (
            <Link to={`/department/${cat.name.toLowerCase()}`} key={i} className="cat-card" style={{ gridColumn: `span ${cat.colSpan}`, textDecoration: 'none' }}>
              <img src={cat.img} alt={cat.name} className="cat-img" />
              <div className="cat-overlay">
                <h3 className="cat-name">{cat.name}</h3>
                <span className="cat-tooltip">View independent sellers →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
