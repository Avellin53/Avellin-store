import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import './CartPayment.css';

const CartPayment: React.FC = () => {
  const { cart, isCartOpen, isPaymentOpen, toggleCart, removeFromCart, togglePayment, clearCart } = useStore();
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
      {/* Cart Drawer */}
      <div className={`cart-drawer-overlay ${isCartOpen ? 'open' : ''}`} onClick={toggleCart}></div>
      <div className={`cart-drawer ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h3>Your Bag ({cart.length})</h3>
          <button className="close-btn" onClick={toggleCart}>✕</button>
        </div>
        
        <div className="cart-items">
          {cart.length === 0 ? (
            <p className="empty-cart">Your bespoke collection awaits. Let's find something beautiful.</p>
          ) : (
            cart.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-img" />
                <div className="cart-item-details">
                  <h4>{item.name}</h4>
                  <p className="cart-item-seller">Seller: {item.seller}</p>
                  <p className="cart-item-price">${item.price} x {item.quantity}</p>
                </div>
                <button className="remove-item" onClick={() => removeFromCart(item.id)}>✕</button>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total</span>
              <span>${cartTotal.toLocaleString()}</span>
            </div>
            <button className="btn btn-primary cart-checkout-btn" onClick={handleCheckout}>
              Proceed to Secure Checkout
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
                  <p>Order Total: <strong>${cartTotal.toLocaleString()}</strong></p>
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
                  {isProcessing ? 'Processing securely...' : `Pay $${cartTotal.toLocaleString()}`}
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
