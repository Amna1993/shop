// const express = require('express');
// const { getAllProducts, addProduct } = require('../controllers/productController');
// const { upload } = require('../utils/cloudinary');


// const router = express.Router();

// router.get('/', getAllProducts);

// router.post('/', upload.single('image'), addProduct);

// module.exports = router;


const express = require('express');
const { getAllProducts, addProduct } = require('../controllers/productController');
const { upload } = require('../utils/cloudinary');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

// Route to get all products
router.get('/', getAllProducts);

// Route to add a product with an image (Admins only)
router.post('/', protect, adminOnly, upload.single('image'), addProduct);

module.exports = router;

