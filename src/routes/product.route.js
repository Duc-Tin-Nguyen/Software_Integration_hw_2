// src/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

router.get('/products', async (req, res) => {
  try {
    const products = await productController.getAllProducts();
    res.json({
      products,
      status: 200,
      message: "Products retrieved successfully!",
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      products: null,
      status: err.code || err.statusCode || 500,
      message: err.message || "Something went wrong while retrieving products!",
    });
  }
});

router.post('/products', async (req, res) => {
  try {
    const product = await productController.createProduct(req.body);
    res.json({
      product,
      status: 200,
      message: "Product created successfully!",
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      product: null,
      status: err.code || err.statusCode || 500,
      message: err.message || "Something went wrong while creating the product!",
    });
  }
});

module.exports = router;
