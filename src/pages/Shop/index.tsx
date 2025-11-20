import React from 'react';
import { useProducts } from '../../context/ProductContext';
import ProductCard from '../../components/ProductCard';
import './Shop.css';

const Shop: React.FC = () => {
  const { products, loading, error } = useProducts();

  if (loading) return <div className="container" style={{padding: '4rem', textAlign: 'center'}}>Loading...</div>;
  if (error) return <div className="container" style={{padding: '4rem', textAlign: 'center', color: 'red'}}>{error}</div>;

  return (
    <div className="shop-page container section">
      <div className="shop-header">
        <h1 className="page-title">Shop Collection</h1>
        <p className="page-subtitle">Explore our full range of premium bags.</p>
      </div>
      
      <div className="products-grid">
        {products.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Shop;
