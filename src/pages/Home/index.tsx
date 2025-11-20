import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext';
import ProductCard from '../../components/ProductCard';
import './Home.css';

const Home: React.FC = () => {
  const { getFeaturedProducts, loading } = useProducts();
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Redefine Your Style</h1>
          <p className="hero-subtitle">
            Discover our exclusive collection of handcrafted luxury bags.
            Designed for the modern minimalist.
          </p>
          <Link to="/shop" className="btn btn-primary">
            Shop Now <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Featured Categories (Placeholder) */}
      <section className="featured-section container">
        <h2 className="section-title">Featured Collections</h2>
        {loading ? (
           <div style={{textAlign: 'center'}}>Loading...</div>
        ) : (
          <div className="product-grid">
            {getFeaturedProducts().map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
