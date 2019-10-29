const MongoLib = require('../lib/mongo');

class ProductService {
  constructor() {
    this.collection = 'product';
    this.mongoDB = new MongoLib();
  }

  async getProducts() {
    const products = await this.mongoDB.getAll(this.collection);
    return products || [];
  }

  async getProduct(id) {
    const product = await this.mongoDB.get(this.collection, id);
    return product || {};
  }

  async createProduct(data) {
    const createdProductId = await this.mongoDB.create(this.collection, data);
    return createdProductId;
  }

  async massCreateProduct(ArrayData) {
    ArrayData.forEach(async data => {
      const createdProductId = await this.mongoDB.create(this.collection, data);
      return createdProductId;
    });
  }

  async updateProduct(id, data) {
    const updatedProductId = await this.mongoDB.update(this.collection, id, data);
    return updatedProductId;
  }

  async deleteProduct(id) {
    const deletedProductId = await this.mongoDB.delete(this.collection, id);
    return deletedProductId;
  }
}

module.exports = ProductService;
