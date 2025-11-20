import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { Trash2, ArrowRight } from 'lucide-react';
import './Cart.css';

const Cart: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="cart-page container section empty-cart">
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added any bags to your collection yet.</p>
        <Link to="/shop" className="btn btn-primary">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page container section">
      <h1 className="page-title">Shopping Cart</h1>

      <div className="cart-grid">
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item._id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p className="cart-item-price">${item.price}</p>
              </div>
              <div className="cart-item-quantity">
                <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
              </div>
              <button 
                className="cart-item-remove"
                onClick={() => removeFromCart(item._id)}
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${getCartTotal()}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>${getCartTotal()}</span>
          </div>
          
          <Link to="/checkout" className="btn btn-primary checkout-btn">
            Proceed to Checkout <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
