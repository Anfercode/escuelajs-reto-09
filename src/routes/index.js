const express = require('express');
const path = require('path');
const ProductService = require('../services');
const receipt = '../assets/receipt.pdf'

const platziStore = (app) => {
  const router = express.Router();
  const productRouter = 'products';
  app.use('/api/', router);

  const productService = new ProductService();

  router.get('/', (req, res) => {
    res.send(`API v2`);
  });

  router.get('/receipts', (req, res, next) => {
    let file = path.join(__dirname, receipt);
    res.sendFile(file);
  });

  router.get(`/${productRouter}`, async (req, res, next) => {
    const storeProducts = await productService.getProducts()
    res.status(200).json(storeProducts);
  });

  router.get(`/${productRouter}/:id`, async (req, res, next) => {
    const { id } = req.params;

    try {
      const product = await productService.getProduct(id);

      res.status(200).json({
        data: product,
        message: 'product retrieved'
      });
    } catch (err) {
      next(err);
    }
  });

  router.post(`/${productRouter}/create/`, async (req, res, next) => {
    const { body: product } = req;

    try {
      const createdProductId = await productService.createProduct({ product });
      res.status(201).json({
        data: createdProductId,
        message: 'product created'
      });
    } catch (err) {
      next(err);
    }
  });

  router.post(`/${productRouter}/mass-create/`, async (req, res, next) => {
    const { body: product } = req;
    try {
      const createdProductId = await productService.massCreateProduct(product);

      res.status(201).json({
        data: createdProductId,
        message: 'products created'
      });
    } catch (err) {
      next(err);
    }
  });

  router.put(`/${productRouter}/:id/`, async (req, res, next) => {
    const { id } = req.params;
    const { body: product } = req;

    try {
      const updatedProductId = await productService.updateProduct(id, product);

      res.status(200).json({
        data: updatedProductId,
        message: 'Product updated'
      });
    } catch (err) {
      next(err);
    }
  });

  router.delete(`/${productRouter}/:id`, async (req, res, next) => {
    const { id } = req.params;
    try {
      const deletedProductId = await productService.deleteProduct({ id });

      res.status(200).json({
        data: deletedProductId,
        message: 'product deleted'
      });
    } catch (err) {
      next(err);
    }
  });

  router.get('*', (req, res) => {
    res.status(404).send('Error 404');
  });
}

module.exports = platziStore;