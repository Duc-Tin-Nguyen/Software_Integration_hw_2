// app.js
const express = require('express');
const productRoutes = require('./routes/product.route');
const healthRoutes = require('./routes/health.route');

const app = express();

app.use(express.json());
app.use('/api', productRoutes);

module.exports = app;
