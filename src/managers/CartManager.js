const fs = require('fs');
const path = './data/carts.json';

class CartManager {
  static async getAllCarts() {
    const carts = await fs.promises.readFile(path, 'utf-8');
    return JSON.parse(carts);
  }

  static async getCartById(id) {
    const carts = await this.getAllCarts();
    return carts.find(cart => cart.id === id);
  }

  static async createCart() {
    const carts = await this.getAllCarts();
    const newCart = { id: carts.length + 1, products: [] };
    carts.push(newCart);
    await fs.promises.writeFile(path, JSON.stringify(carts, null, 2));
    return newCart;
  }

  static async addProductToCart(cid, pid, quantity) {
    const carts = await this.getAllCarts();
    const cart = carts.find(cart => cart.id === cid);
    if (!cart) return null;

    const productIndex = cart.products.findIndex(product => product.id === pid);
    if (productIndex !== -1) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({ id: pid, quantity });
    }

    await fs.promises.writeFile(path, JSON.stringify(carts, null, 2));
    return cart;
  }
}

module.exports = CartManager;
