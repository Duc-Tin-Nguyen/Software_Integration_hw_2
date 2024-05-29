// src/controllers/product.controller.js
const Product = require('../models/product.model');

exports.getAllProducts = async () => {
  try {
    const products = await Product.find();
    return products;
  } catch (err) {
    throw { statusCode: 500, message: err.message };
  }
};

exports.createProduct = async (productData) => {
  try {
    const newProduct = new Product(productData);
    const product = await newProduct.save();
    return product;
  } catch (err) {
    throw { statusCode: 500, message: err.message };
  }
};
