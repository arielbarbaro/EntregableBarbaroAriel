const express = require('express');
const router = express.Router();
const CartManager = require('../managers/CartManager');

router.post('/', async (req, res) => {
  const newCart = await CartManager.createCart();
  res.status(201).json(newCart);
});

router.get('/:cid', async (req, res) => {
  const cart = await CartManager.getCartById(Number(req.params.cid));
  if (!cart) return res.status(404).send('Carrito no encontrado');
  res.json(cart);
});

router.post('/:cid/product/:pid', async (req, res) => {
  const { quantity } = req.body;
  const updatedCart = await CartManager.addProductToCart(Number(req.params.cid), Number(req.params.pid), quantity || 1);
  if (!updatedCart) return res.status(404).send('Carrito no encontrado');
  res.json(updatedCart);
});

module.exports = router;
