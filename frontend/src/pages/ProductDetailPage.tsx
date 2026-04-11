import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { useCurrencyStore } from '../store/currencyStore';
import { formatPrice } from '../utils/currencyUtils';
import { 
  ShoppingBag, 
  ArrowLeft, 
  ShieldCheck, 
  Truck, 
  RefreshCw,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartPayment from '../components/CartPayment';
import './ProductDetailPage.css';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, addToCart } = useStore();
  const currentCurrency = useCurrencyStore(state => state.currentCurrency);
  
  const product = products.find(p => p.id === id);

  const [selectedSize, setSelectedSize] = useState<string>(product?.sizes?.[0] || '');
  const [selectedColor, setSelectedColor] = useState<string>(product?.colors?.[0]?.name || '');
  const [activeImage, setActiveImage] = useState<string>(product?.image || '');

  if (!product) {
    return (
      <div className="error-page">
        <h2>Product not found.</h2>
        <button onClick={() => navigate('/')}>Return Home</button>
      </div>
    );
  }

  const stockStatus = product.stockCount > 5 ? 'In Stock' : product.stockCount > 0 ? 'Low Stock' : 'Out of Stock';

  return (
    <div className="pdp-container">
      <Navbar currentLang="English" setLanguage={() => {}} />
      <CartPayment />

      <main className="pdp-main container">
        <button className="back-link" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} /> Back to Collection
        </button>

        <div className="product-layout">
          {/* Gallery Section */}
          <div className="product-gallery">
            <div className="main-image-wrapper shadow-glass">
              <img src={activeImage} alt={product.name} key={activeImage} className="fade-in" />
            </div>

            {/* AI Multi-Body Type Visualizer */}
            {product.visualizations && (
              <div className="ai-visualizer">
                <p className="visualizer-label">View on Body Type (AI):</p>
                <div className="visualizer-options">
                  {product.visualizations.map((viz, idx) => (
                    <button 
                      key={idx}
                      className={`viz-btn ${activeImage === viz.url ? 'active' : ''}`}
                      onClick={() => setActiveImage(viz.url)}
                    >
                      {viz.bodyType}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Info Section */}
          <div className="product-info">
            <div className="brand-badge">{product.seller}</div>
            <h1 className="product-title">{product.name}</h1>
            <div className="product-price">
              {formatPrice(product.price, currentCurrency)}
            </div>

            <p className="product-description">{product.description}</p>

            <div className="product-meta">
               <div className="meta-item">
                  <strong>Material:</strong> {product.material}
               </div>
               <div className="meta-item">
                  <strong>Status:</strong> 
                  <span className={`stock-status ${stockStatus.toLowerCase().replace(' ', '-')}`}>
                    {stockStatus === 'In Stock' && <CheckCircle size={14} />}
                    {stockStatus === 'Low Stock' && <AlertTriangle size={14} />}
                    {stockStatus}
                  </span>
               </div>
            </div>

            {/* Variation Selectors */}
            <div className="variations">
              {product.colors && (
                <div className="variation-group">
                  <label>Color: <span>{selectedColor}</span></label>
                  <div className="color-swatches">
                    {product.colors.map(color => (
                      <button 
                        key={color.name}
                        className={`swatch ${selectedColor === color.name ? 'active' : ''}`}
                        style={{ backgroundColor: color.hex }}
                        onClick={() => setSelectedColor(color.name)}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>
              )}

              {product.sizes && (
                <div className="variation-group">
                  <label>Size</label>
                  <div className="size-options">
                    {product.sizes.map(size => (
                      <button 
                        key={size}
                        className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button 
              className="add-to-bag-btn" 
              onClick={() => addToCart(product, selectedSize, selectedColor)}
              disabled={product.stockCount === 0}
            >
              <ShoppingBag size={20} /> Add to Bag
            </button>

            <div className="trust-signals">
               <div className="trust-item">
                  <Truck size={18} />
                  <div>
                    <p className="trust-title">Complimentary Shipping</p>
                    <p className="trust-sub">On all orders over {formatPrice(500, currentCurrency)}</p>
                  </div>
               </div>
               <div className="trust-item">
                  <RefreshCw size={18} />
                  <div>
                    <p className="trust-title">Bespoke Returns</p>
                    <p className="trust-sub">30-day effortless exchange policy</p>
                  </div>
               </div>
               <div className="trust-item">
                  <ShieldCheck size={18} />
                  <div>
                    <p className="trust-title">Authenticity Guaranteed</p>
                    <p className="trust-sub">Verified Luxury Marketplace</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </main>

      <Footer currentLang="English" setLanguage={() => {}} />
    </div>
  );
};

export default ProductDetailPage;
