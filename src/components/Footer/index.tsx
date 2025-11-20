import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-section">
          <h3 className="footer-logo">
            <span className="logo-text">ELEGANT</span>
            <span className="logo-accent">BAGS</span>
          </h3>
          <p className="footer-desc">
            Curated collection of premium bags for the modern individual. 
            Quality, style, and elegance in every stitch.
          </p>
        </div>
        
        <div className="footer-section">
          <h4>Shop</h4>
          <ul className="footer-links">
            <li><a href="/shop">All Products</a></li>
            <li><a href="/shop/new">New Arrivals</a></li>
            <li><a href="/shop/bestsellers">Bestsellers</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Support</h4>
          <ul className="footer-links">
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/shipping">Shipping & Returns</a></li>
            <li><a href="/faq">FAQ</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Newsletter</h4>
          <p>Subscribe to receive updates, access to exclusive deals, and more.</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Enter your email" />
            <button type="submit" className="btn btn-primary">Subscribe</button>
          </form>
        </div>
      </div>
      <div className="footer-bottom container">
        <p>&copy; {new Date().getFullYear()} Elegant Bags. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
