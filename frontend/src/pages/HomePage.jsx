import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const buyCar = (product) => {
    navigate('/checkout', { state: { product } }); // Pass product data to checkout
  };

  return (
    <div>
      <h1 className="text-center text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-7 justify-between gap-4 p-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} buyCar={buyCar} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
