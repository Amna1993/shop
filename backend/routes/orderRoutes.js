const express = require('express');
const { getAllOrders } = require('../controllers/orderController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

// Route to fetch all orders for admin
router.get('/', protect, adminOnly, getAllOrders);

module.exports = router;
