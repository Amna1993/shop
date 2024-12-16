const express = require('express');
const { signup, login, getAllUsers } = require('../controllers/authController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

// User authentication routes
router.post('/signup', signup);
router.post('/login', login);

// Admin route to get all users
router.get('/getAll', protect, adminOnly, getAllUsers);

module.exports = router;
