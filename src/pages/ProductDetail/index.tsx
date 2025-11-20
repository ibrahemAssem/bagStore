import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext';
import { useCart } from '../../context/CartContext';
import { ShoppingBag, ArrowLeft, Check } from 'lucide-react';
import './ProductDetail.css';

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById, loading } = useProducts();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const product = getProductById(id);

  if (loading) return <div className="container" style={{padding: '4rem', textAlign: 'center'}}>Loading...</div>;
  
  if (!product) {
    return (
      <div className="container product-not-found">
        <h2>Product not found</h2>
        <button onClick={() => navigate('/shop')} className="btn btn-primary">
          Back to Shop
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="product-detail-page container section">
      <button onClick={() => navigate(-1)} className="back-btn">
        <ArrowLeft size={20} /> Back
      </button>

      <div className="product-detail-grid">
        <div className="product-detail-image">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="product-detail-info">
          <span className="detail-category">{product.category}</span>
          <h1 className="detail-title">{product.name}</h1>
          <p className="detail-price">${product.price}</p>
          
          <p className="detail-description">{product.description}</p>

          <div className="detail-actions">
            <div className="quantity-selector">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>

            <button 
              className={`btn btn-primary add-cart-lg ${added ? 'success' : ''}`}
              onClick={handleAddToCart}
            >
              {added ? (
                <>
                  <Check size={20} /> Added to Cart
                </>
              ) : (
                <>
                  <ShoppingBag size={20} /> Add to Cart
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
