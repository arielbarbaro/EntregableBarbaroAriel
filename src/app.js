
const express = require('express');
const app = express();
const port = 8080;

const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/carts');

app.use(express.json()); // Para parsear el cuerpo de las peticiones en formato JSON
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
