import React from 'react';
import { useLocation } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from '../components/PaymentForm';

// Access environment variable correctly
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const CheckoutPage = () => {
  const location = useLocation();
  const { product } = location.state || {};

  if (!product) {
    return <p className="text-center text-red-500">No product selected for checkout.</p>;
  }

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <div className="w-full max-w-md">
        <p className="text-lg mb-2">Product: {product.name}</p>
        <p className="text-lg mb-2">Price: ${product.price}</p>
      </div>
      <Elements stripe={stripePromise}>
        <PaymentForm product={product} />
      </Elements>
    </div>
  );
};

export default CheckoutPage;
