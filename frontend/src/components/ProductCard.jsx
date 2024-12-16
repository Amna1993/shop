import React from 'react';

const ProductCard = ({ product, buyCar }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center text-center w-64">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-cover rounded-t-lg"
      />
      <h3 className="text-lg font-semibold mt-4">{product.name}</h3>
      <p className="text-gray-600 mt-2">{product.description}</p>
      <p className="text-blue-500 font-bold text-lg mt-2">${product.price.toFixed(2)}</p>
      <button 
      onClick={() => buyCar(product)}
      className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600">
          Buy Car
        </button>
    </div>
  );
};

export default ProductCard;
