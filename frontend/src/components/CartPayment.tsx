import { useState } from 'react';
import { useStore } from '../store/useStore';
import { formatPrice } from '../utils/currencyUtils';
import { useCurrencyStore } from '../store/currencyStore';
import { ShoppingBag, X, Trash2, ArrowRight } from 'lucide-react';
import './CartPayment.css';

const CartPayment: React.FC = () => {
  const { cart, isCartOpen, isPaymentOpen, toggleCart, removeFromCart, togglePayment, clearCart } = useStore();
  const currentCurrency = useCurrencyStore(state => state.currentCurrency);
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    togglePayment();
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        clearCart();
        togglePayment(); 
      }, 3000);
    }, 2000);
  };

  return (
    <>
      <div className={`cart-drawer-overlay ${isCartOpen ? 'open' : ''}`} onClick={toggleCart}></div>
      <div className={`cart-drawer shadow-glass ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <div className="header-title">
            <ShoppingBag size={20} />
            <h3>Your Selection ({cart.length})</h3>
          </div>
          <button className="close-btn-circle" onClick={toggleCart}><X size={18} /></button>
        </div>
        
        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="empty-cart-state">
              <ShoppingBag size={48} />
              <p>Your bespoke collection awaits.</p>
              <button className="btn btn-secondary mt-1" onClick={toggleCart}>Discover Products</button>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="cart-item-luxury">
                <div className="item-img-container">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="cart-item-details">
                  <h4>{item.name}</h4>
                  <p className="cart-item-seller">{item.seller}</p>
                  {(item.selectedSize || item.selectedColor) && (
                    <div className="cart-item-variants">
                      {item.selectedSize && <span>{item.selectedSize}</span>}
                      {item.selectedColor && <span className="dot-color" style={{background: item.selectedColor}}></span>}
                    </div>
                  )}
                  <div className="price-row">
                    <span className="price">{formatPrice(item.price, currentCurrency)}</span>
                    <span className="qty">Qty: {item.quantity}</span>
                  </div>
                </div>
                <button className="remove-item-luxury" onClick={() => removeFromCart(item.id)}><Trash2 size={16} /></button>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer-luxury">
            <div className="cart-total-luxury">
              <span>Subtotal</span>
              <span className="amount">{formatPrice(cartTotal, currentCurrency)}</span>
            </div>
            <button className="checkout-btn-luxury" onClick={handleCheckout}>
              Proceed to Secure Checkout <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>

      {/* Payment Modal */}
      {isPaymentOpen && (
        <div className="modal-overlay">
          <div className="payment-modal">
            <div className="modal-header">
              <h2>Secure Checkout</h2>
              <button className="close-btn" onClick={togglePayment}>✕</button>
            </div>
            
            {success ? (
              <div className="success-message">
                <div className="success-icon">✓</div>
                <h3>Payment Successful!</h3>
                <p>Your premium items are on their way. An email receipt has been sent.</p>
              </div>
            ) : (
              <form className="payment-form" onSubmit={handlePaymentSubmit}>
                <div className="order-summary">
                  <p>Order Total: <strong>{formatPrice(cartTotal, currentCurrency)}</strong></p>
                </div>

                <div className="payment-methods">
                  <h4>Select Payment Method</h4>
                  <div className="methods-grid">
                    <label className={`method-card ${paymentMethod === 'Credit Card' ? 'active' : ''}`}>
                      <input type="radio" name="payment" value="Credit Card" checked={paymentMethod === 'Credit Card'} onChange={(e) => setPaymentMethod(e.target.value)} />
                      <span>Credit Card</span>
                    </label>
                    <label className={`method-card ${paymentMethod === 'Paystack' ? 'active' : ''}`}>
                      <input type="radio" name="payment" value="Paystack" checked={paymentMethod === 'Paystack'} onChange={(e) => setPaymentMethod(e.target.value)} />
                      <span>Paystack</span>
                    </label>
                    <label className={`method-card ${paymentMethod === 'PayPal' ? 'active' : ''}`}>
                      <input type="radio" name="payment" value="PayPal" checked={paymentMethod === 'PayPal'} onChange={(e) => setPaymentMethod(e.target.value)} />
                      <span>PayPal</span>
                    </label>
                  </div>
                </div>

                {paymentMethod === 'Credit Card' && (
                  <div className="card-details">
                    <input type="text" placeholder="Card Number" required />
                    <div className="card-row">
                      <input type="text" placeholder="MM/YY" required />
                      <input type="text" placeholder="CVC" required />
                    </div>
                  </div>
                )}
                
                <button type="submit" className="btn btn-primary pay-btn" disabled={isProcessing}>
                  {isProcessing ? 'Processing securely...' : `Pay ${formatPrice(cartTotal, currentCurrency)}`}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CartPayment;
