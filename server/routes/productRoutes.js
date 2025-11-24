const express = require('express');
const router = express.Router();
const { getProducts, getProductById } = require('../controllers/productController');
const Product = require('../models/Product');
const products = require('../data/products');

router.route('/').get(getProducts);

// Temporary Seeding Route
router.post('/seed', async (req, res) => {
  try {
    await Product.deleteMany({});
    await Product.insertMany(products);
    res.json({ message: 'Database seeded successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.route('/:id').get(getProductById);

module.exports = router;
