const express = require('express');
const router = express.Router();
const ProductManager = require('../managers/ProductManager');

router.get('/', async (req, res) => {
  const products = await ProductManager.getAllProducts();
  res.json(products);
});

router.get('/:pid', async (req, res) => {
  const product = await ProductManager.getProductById(Number(req.params.pid));
  if (!product) return res.status(404).send('Producto no encontrado');
  res.json(product);
});

router.post('/', async (req, res) => {
  const newProduct = req.body;
  await ProductManager.addProduct(newProduct);
  res.status(201).send('Producto agregado con éxito');
});

router.put('/:pid', async (req, res) => {
  const updatedProduct = await ProductManager.updateProduct(Number(req.params.pid), req.body);
  if (!updatedProduct) return res.status(404).send('Producto no encontrado');
  res.json(updatedProduct);
});

router.delete('/:pid', async (req, res) => {
  await ProductManager.deleteProduct(Number(req.params.pid));
  res.status(204).send();
});

module.exports = router;
