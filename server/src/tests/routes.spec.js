const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('../routes/productRoutes');
const productController = require('../controllers/product.controller');

const app = express();

// Parse JSON bodies for POST requests
app.use(bodyParser.json());

// Use the product routes in the test app
app.use('/api', productRoutes);

describe('Product Routes', () => {
  it('should get all products', async () => {
    // Mock the getAllProducts function of the product controller
    productController.getAllProducts = jest.fn().mockResolvedValue([{ name: 'Product 1', price: 10 }]);
    
    // Send a GET request to the /api/products route
    const response = await request(app).get('/api/products');
    
    // Expect the response to have status code 200 and contain the products
    expect(response.status).toBe(200);
    expect(response.body.products).toEqual([{ name: 'Product 1', price: 10 }]);
  });

  it('should create a product', async () => {
    // Mock the createProduct function of the product controller
    productController.createProduct = jest.fn().mockResolvedValue({ name: 'New Product', price: 20 });
    
    // Send a POST request to the /api/products route with product data
    const response = await request(app)
      .post('/api/products')
      .send({ name: 'New Product', price: 20 });
    
    // Expect the response to have status code 200 and contain the created product
    expect(response.status).toBe(200);
    expect(response.body.product).toEqual({ name: 'New Product', price: 20 });
  });
});
