const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Signup
const signup = async (req, res) => {
  try {
    const { name, email, password, isAdmin } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const user = new User({
      name,
      email,
      password,
      isAdmin: isAdmin || false,
    });

    console.log('User before saving:', user); // Debugging
    await user.save();

    res.status(201).json({
      message: 'User created successfully',
      user: { id: user._id, name, email, isAdmin: user.isAdmin },
    });
  } catch (error) {
    console.error('Signup Error:', error); // Debugging
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!password) {
      return res.status(400).json({ message: 'Password is required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: { id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin },
    });
  } catch (error) {
    console.error('Login Error:', error); // Debugging
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

// Get All Users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    res.status(200).json(users);
  } catch (error) {
    console.error('Get Users Error:', error); // Debugging
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};

module.exports = { signup, login, getAllUsers };
