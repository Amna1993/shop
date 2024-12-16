// const express = require('express');
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// const router = express.Router();

// router.post('/create-payment-intent', async (req, res) => {
//   const { amount } = req.body;

//   try {
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount,
//       currency: 'usd',
//     });

//     res.status(200).json({ clientSecret: paymentIntent.client_secret });
//   } catch (error) {
//     res.status(500).json({ message: 'Payment failed', error });
//   }
// });

// module.exports = router;


const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Make sure STRIPE_SECRET_KEY is set
const router = express.Router();

router.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body;

  try {
    if (!amount || typeof amount !== 'number') {
      throw new Error('Invalid amount provided');
    }

    // Create the payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // Amount in cents
      currency: 'usd',
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error.message, error.stack);
    res.status(500).json({ message: 'Error creating payment intent', error: error.message });
  }
});

module.exports = router;
