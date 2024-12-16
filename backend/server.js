const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const testRoutes = require('./routes/testRoutes');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const orderRoutes = require('./routes/orderRoutes'); // Import order routes
const adminRoutes = require('./routes/adminRoutes');
// const cartRoutes = require('./routes/cartRoutes');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
app.get('/', (req, res) => {
    res.send("Server is running");
});

app.use('/api', testRoutes);

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
// Add payment routes
app.use('/api/payments', paymentRoutes);
app.use('/api/admin/orders', orderRoutes);


app.use('/api/admin', adminRoutes);


const PORT = process.env.PORT || 5006;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
