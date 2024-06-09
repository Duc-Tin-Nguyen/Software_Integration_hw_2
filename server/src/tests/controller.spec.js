const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { getAllProducts, createProduct } = require('../controllers/product.controller');
const Product = require('../models/product.model');

chai.use(sinonChai);
const expect = chai.expect;

describe('Product Controller', () => {
  describe('getAllProducts', () => {
    it('should return all products', async () => {
      const products = [{ name: 'Product 1' }, { name: 'Product 2' }];
      sinon.stub(Product, 'find').resolves(products);

      const result = await getAllProducts();

      expect(result).to.deep.equal(products);
      sinon.restore();
    });

    it('should throw an error if fetching products fails', async () => {
      const errorMessage = 'Error fetching products';
      sinon.stub(Product, 'find').rejects(new Error(errorMessage));

      try {
        await getAllProducts();
      } catch (error) {
        expect(error.statusCode).to.equal(500);
        expect(error.message).to.equal(errorMessage);
      }

      sinon.restore();
    });
  });

  describe('createProduct', () => {
    it('should create a new product', async () => {
      const productData = { name: 'New Product' };
      const newProduct = { _id: '1', ...productData };
      sinon.stub(Product.prototype, 'save').resolves(newProduct);

      const result = await createProduct(productData);

      expect(result).to.deep.equal(newProduct);
      sinon.restore();
    });

    it('should throw an error if creating product fails', async () => {
      const productData = { name: 'New Product' };
      const errorMessage = 'Error creating product';
      sinon.stub(Product.prototype, 'save').rejects(new Error(errorMessage));

      try {
        await createProduct(productData);
      } catch (error) {
        expect(error.statusCode).to.equal(500);
        expect(error.message).to.equal(errorMessage);
      }

      sinon.restore();
    });
  });
});
