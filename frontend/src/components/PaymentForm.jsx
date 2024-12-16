import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const PaymentForm = ({ product }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!stripe || !elements) {
      setMessage('Stripe has not loaded yet.');
      setIsLoading(false);
      return;
    }

    // Create payment intent on the server
    try {
      const response = await fetch('http://localhost:5006/api/payments/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: Math.round(product.price * 100) }), // Price in cents
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to create payment intent.');
      }

      const clientSecret = data.clientSecret;

      // Confirm card payment
      const cardElement = elements.getElement(CardElement);
      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: 'Customer Name', // Replace with actual customer name
          },
        },
      });

      if (paymentResult.error) {
        setMessage(`Payment failed: ${paymentResult.error.message}`);
      } else if (paymentResult.paymentIntent.status === 'succeeded') {
        setMessage('Payment successful!');
      }
    } catch (error) {
      console.error('Error submitting payment:', error.message);
      setMessage(`An error occurred: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="payment-form">
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4">Enter Payment Details</h2>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-600"
          disabled={isLoading || !stripe || !elements}
        >
          {isLoading ? 'Processing...' : 'Pay Now'}
        </button>
      </form>
      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
};

export default PaymentForm;
