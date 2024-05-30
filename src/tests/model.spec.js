const chai = require('chai');
const mongoose = require('mongoose');
const Product = require('../models/Product');

chai.should();

describe('Product Model', () => {
  before(async () => {
    // Connect to a test database before running the tests
    await mongoose.connect('mongodb://localhost:27017/test', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  });

  after(async () => {
    // Close the database connection after running all the tests
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    // Clear the products collection before each test
    await Product.deleteMany({});
  });

  describe('Validation', () => {
    it('should be invalid if name is empty', async () => {
      const product = new Product({ price: 10 });
      await product.validate((err) => {
        err.errors.name.should.exist;
      });
    });

    it('should be invalid if price is empty', async () => {
      const product = new Product({ name: 'Test Product' });
      await product.validate((err) => {
        err.errors.price.should.exist;
      });
    });
  });

  describe('Save', () => {
    it('should save a product', async () => {
      const productData = { name: 'Test Product', price: 10 };
      const product = new Product(productData);
      const savedProduct = await product.save();
      savedProduct.should.include(productData);
    });
  });
});
