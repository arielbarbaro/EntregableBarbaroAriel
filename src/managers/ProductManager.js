const fs = require('fs');
const path = './data/products.json';

class ProductManager {
  static async getAllProducts() {
    const products = await fs.promises.readFile(path, 'utf-8');
    return JSON.parse(products);
  }

  static async getProductById(id) {
    const products = await this.getAllProducts();
    return products.find(product => product.id === id);
  }

  static async addProduct(product) {
    const products = await this.getAllProducts();
    product.id = products.length ? products[products.length - 1].id + 1 : 1;
    products.push(product);
    await fs.promises.writeFile(path, JSON.stringify(products, null, 2));
  }

  static async updateProduct(id, updatedProduct) {
    const products = await this.getAllProducts();
    const index = products.findIndex(product => product.id === id);
    if (index === -1) return null;
    products[index] = { ...products[index], ...updatedProduct };
    await fs.promises.writeFile(path, JSON.stringify(products, null, 2));
    return products[index];
  }

  static async deleteProduct(id) {
    const products = await this.getAllProducts();
    const newProducts = products.filter(product => product.id !== id);
    await fs.promises.writeFile(path, JSON.stringify(newProducts, null, 2));
    return newProducts;
  }
}

module.exports = ProductManager;
