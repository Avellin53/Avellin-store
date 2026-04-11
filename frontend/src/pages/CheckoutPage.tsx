import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Check, ChevronRight, Lock, Truck, CreditCard, ShoppingBag } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { formatPrice } from '../utils/currencyUtils';
import { useCurrencyStore } from '../store/currencyStore';
import './CheckoutPage.css';

type Step = 'shipping' | 'review' | 'payment' | 'success';

const CheckoutPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<Step>('shipping');
  const { cart, clearCart } = useStore();
  const currentCurrency = useCurrencyStore(state => state.currentCurrency);
  const navigate = useNavigate();

  const [shippingData, setShippingData] = useState({
    fullName: '',
    address: '',
    city: '',
    country: 'United States',
    zipCode: '',
    phone: ''
  });

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shippingCost = 15.00;
  const tax = cartTotal * 0.08;
  const grandTotal = cartTotal + shippingCost + tax;

  const handleNext = () => {
    if (currentStep === 'shipping') setCurrentStep('review');
    else if (currentStep === 'review') setCurrentStep('payment');
  };

  const handleBack = () => {
    if (currentStep === 'review') setCurrentStep('shipping');
    else if (currentStep === 'payment') setCurrentStep('review');
  };

  const finalizeOrder = () => {
    // Simulated tokenized payment happens here in real life
    setCurrentStep('success');
    setTimeout(() => {
        clearCart();
    }, 100);
  };

  return (
    <div className="checkout-page">
      <Navbar currentLang="English" setLanguage={() => {}} />
      
      <main className="checkout-main">
        <div className="checkout-header">
           <div className="checkout-progress">
              <div className={`step-node ${['shipping', 'review', 'payment', 'success'].includes(currentStep) ? 'active' : ''}`}>
                <div className="node-icon">{currentStep === 'shipping' ? <Truck size={16}/> : <Check size={16}/>}</div>
                <span>Shipping</span>
              </div>
              <div className="step-line"></div>
              <div className={`step-node ${['review', 'payment', 'success'].includes(currentStep) ? 'active' : ''}`}>
                <div className="node-icon">{['payment', 'success'].includes(currentStep) ? <Check size={16}/> : <ShoppingBag size={16}/>}</div>
                <span>Review</span>
              </div>
              <div className="step-line"></div>
              <div className={`step-node ${['payment', 'success'].includes(currentStep) ? 'active' : ''}`}>
                <div className="node-icon">{currentStep === 'success' ? <Check size={16}/> : <CreditCard size={16}/>}</div>
                <span>Payment</span>
              </div>
           </div>
        </div>

        <div className="checkout-grid">
          {currentStep !== 'success' && (
            <section className="checkout-form-container">
              {currentStep === 'shipping' && (
                <div className="step-content">
                  <h2>Shipping Information</h2>
                  <div className="checkout-form">
                    <div className="form-group">
                      <label>Full Name</label>
                      <input 
                        type="text" 
                        value={shippingData.fullName} 
                        onChange={(e) => setShippingData({...shippingData, fullName: e.target.value})}
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="form-group">
                      <label>Street Address</label>
                      <input 
                        type="text" 
                        value={shippingData.address} 
                        onChange={(e) => setShippingData({...shippingData, address: e.target.value})}
                        placeholder="123 Luxury Ave"
                      />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>City</label>
                        <input type="text" value={shippingData.city} onChange={(e) => setShippingData({...shippingData, city: e.target.value})} />
                      </div>
                      <div className="form-group">
                        <label>Zip Code</label>
                        <input type="text" value={shippingData.zipCode} onChange={(e) => setShippingData({...shippingData, zipCode: e.target.value})} />
                      </div>
                    </div>
                    <button className="premium-action-btn" onClick={handleNext}>
                        Review Items <ChevronRight size={18}/>
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 'review' && (
                <div className="step-content">
                  <h2>Review Order</h2>
                  <div className="review-items">
                    {cart.map(item => (
                      <div key={item.id} className="review-item">
                        <img src={item.image} alt={item.name} />
                        <div className="item-info">
                          <h4>{item.name}</h4>
                          <p>Qty: {item.quantity}</p>
                          <p className="price">{formatPrice(item.price, currentCurrency)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="action-row">
                    <button className="back-btn" onClick={handleBack}>Back to Shipping</button>
                    <button className="premium-action-btn" onClick={handleNext}>
                        Secure Payment <Lock size={16} />
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 'payment' && (
                <div className="step-content">
                  <h2>Secure Payment</h2>
                  <div className="payment-security-notice">
                    <Lock size={14} /> Transactions are encrypted. We never store your card details.
                  </div>
                  <div className="mock-payment-element shadow-glass">
                    <label>Card Number</label>
                    <input type="text" disabled value="**** **** **** 4242" />
                    <div className="form-row">
                        <input type="text" disabled value="12/26" />
                        <input type="text" disabled value="***" />
                    </div>
                    <p className="token-hint">Secure token <code>tok_visa_4242</code> will be generated.</p>
                  </div>
                  <div className="action-row">
                    <button className="back-btn" onClick={handleBack}>Back</button>
                    <button className="premium-action-btn" onClick={finalizeOrder}>
                        Complete Purchase
                    </button>
                  </div>
                </div>
              )}
            </section>
          )}

          {currentStep === 'success' ? (
            <section className="checkout-success">
               <div className="success-lottie-mock">
                    <Check size={48} />
               </div>
               <h2>Order Confirmed</h2>
               <p>Reference: #AVL-{Math.floor(Math.random() * 1000000)}</p>
               <p>Your minimalist luxury items are being prepared.</p>
               <button className="premium-action-btn" onClick={() => navigate('/')}>Return to Store</button>
            </section>
          ) : (
            <aside className="checkout-summary shadow-glass">
              <h3>Summary</h3>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>{formatPrice(cartTotal, currentCurrency)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>{formatPrice(shippingCost, currentCurrency)}</span>
              </div>
              <div className="summary-row">
                <span>Estimated Tax</span>
                <span>{formatPrice(tax, currentCurrency)}</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>{formatPrice(grandTotal, currentCurrency)}</span>
              </div>
              <div className="security-badges">
                <span className="badge">PCI-DSS Compliant</span>
                <span className="badge">SSL Encrypted</span>
              </div>
            </aside>
          )}
        </div>
      </main>

      <Footer currentLang="English" setLanguage={() => {}} />
    </div>
  );
};

export default CheckoutPage;
