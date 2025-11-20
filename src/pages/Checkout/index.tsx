import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './Checkout.css';

const Checkout: React.FC = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Mock payment processing
    setTimeout(() => {
      clearCart();
      setIsProcessing(false);
      alert('Order placed successfully! Thank you for your purchase.');
      navigate('/');
    }, 2000);
  };

  return (
    <div className="checkout-page container section">
      <h1 className="page-title">Checkout</h1>
      
      <div className="checkout-grid">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h3>Shipping Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <input 
                  type="text" 
                  name="firstName" 
                  required 
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input 
                  type="text" 
                  name="lastName" 
                  required 
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="form-group">
              <label>Email</label>
              <input 
                type="email" 
                name="email" 
                required 
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Address</label>
              <input 
                type="text" 
                name="address" 
                required 
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                <input 
                  type="text" 
                  name="city" 
                  required 
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>ZIP Code</label>
                <input 
                  type="text" 
                  name="zip" 
                  required 
                  value={formData.zip}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Payment Details</h3>
            <div className="form-group">
              <label>Card Number</label>
              <input 
                type="text" 
                name="cardNumber" 
                required 
                placeholder="0000 0000 0000 0000"
                value={formData.cardNumber}
                onChange={handleChange}
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Expiry Date</label>
                <input 
                  type="text" 
                  name="expiry" 
                  required 
                  placeholder="MM/YY"
                  value={formData.expiry}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>CVV</label>
                <input 
                  type="text" 
                  name="cvv" 
                  required 
                  placeholder="123"
                  value={formData.cvv}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary place-order-btn" disabled={isProcessing}>
            {isProcessing ? 'Processing...' : `Place Order ($${getCartTotal()})`}
          </button>
        </form>

        <div className="order-summary">
          <h3>Order Summary</h3>
          <div className="summary-items">
            {cartItems.map(item => (
              <div key={item.id} className="summary-item">
                <span>{item.name} x {item.quantity}</span>
                <span>${item.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="summary-total">
            <span>Total</span>
            <span>${getCartTotal()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
