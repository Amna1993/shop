const express = require('express');
const { getAllUsers } = require('../controllers/authController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

// Admin route to fetch all users
router.get('/users', protect, adminOnly, getAllUsers);

module.exports = router;
