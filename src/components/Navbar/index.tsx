import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, User, Search, Menu, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useProducts } from '../../context/ProductContext';
import './Navbar.css';

const Navbar: React.FC = () => {
  const { getCartCount } = useCart();
  const { products } = useProducts();
  const navigate = useNavigate();
  
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter products based on search query
  const filteredProducts = searchQuery.trim()
    ? products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // Handle click outside to close search
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
        setSearchQuery('');
      }
    };

    if (searchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchOpen]);

  // Handle escape key to close search
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSearchOpen(false);
        setSearchQuery('');
      }
    };

    if (searchOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [searchOpen]);

  // Focus input when search opens
  useEffect(() => {
    if (searchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchOpen]);

  const handleSearchToggle = () => {
    setSearchOpen(!searchOpen);
    if (searchOpen) {
      setSearchQuery('');
    }
  };

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
    setSearchOpen(false);
    setSearchQuery('');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container container">
        <div className="navbar-logo">
          <Link to="/">
            <span className="logo-text">ELEGANT</span>
            <span className="logo-accent">BAGS</span>
          </Link>
        </div>

        <div className="navbar-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/shop" className="nav-link">Shop</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </div>

        <div className="navbar-actions">
          <div className="search-container" ref={searchRef}>
            <button 
              className="icon-btn" 
              aria-label="Search"
              onClick={handleSearchToggle}
            >
              {searchOpen ? <X size={20} /> : <Search size={20} />}
            </button>

            {searchOpen && (
              <div className="search-dropdown">
                <input
                  ref={inputRef}
                  type="text"
                  className="search-input"
                  placeholder="Search for bags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />

                {searchQuery.trim() && (
                  <div className="search-results">
                    {filteredProducts.length > 0 ? (
                      <>
                        <div className="search-results-header">
                          Found {filteredProducts.length} {filteredProducts.length === 1 ? 'result' : 'results'}
                        </div>
                        {filteredProducts.map((product) => (
                          <div
                            key={product._id}
                            className="search-result-item"
                            onClick={() => handleProductClick(product._id)}
                          >
                            <img 
                              src={product.image} 
                              alt={product.name}
                              className="search-result-image"
                            />
                            <div className="search-result-info">
                              <h4 className="search-result-name">{product.name}</h4>
                              <p className="search-result-category">{product.category}</p>
                              <p className="search-result-price">${product.price}</p>
                            </div>
                          </div>
                        ))}
                      </>
                    ) : (
                      <div className="search-no-results">
                        No products found for "{searchQuery}"
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          <Link to="/cart" className="icon-btn cart-btn" aria-label="Cart">
            <ShoppingBag size={20} />
            <span className="cart-badge">{getCartCount()}</span>
          </Link>
          <Link to="/login" className="icon-btn" aria-label="Account">
            <User size={20} />
          </Link>
          <button className="icon-btn mobile-menu-btn" aria-label="Menu">
            <Menu size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
