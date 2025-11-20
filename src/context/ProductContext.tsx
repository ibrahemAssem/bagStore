import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { API_URL } from '../config/api';

export interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  featured: boolean;
  stock?: number;
}

interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  getFeaturedProducts: () => Product[];
  getProductById: (id: string | undefined) => Product | undefined;
  getProductsByCategory: (category: string) => Product[];
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/api/products`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const getFeaturedProducts = () => {
    return products.filter(product => product.featured);
  };

  const getProductById = (id: string | undefined) => {
    if (!id) return undefined;
    return products.find(product => product._id === id);
  };

  const getProductsByCategory = (category: string) => {
    return products.filter(product => product.category === category);
  };

  return (
    <ProductContext.Provider value={{ products, loading, error, getFeaturedProducts, getProductById, getProductsByCategory }}>
      {children}
    </ProductContext.Provider>
  );
};
