// app.js
const express = require('express');
const productRoutes = require('./routes/product.route');
const healthRoutes = require('health/health.route');
const app = express();

app.use(express.json());
app.use('/api', productRoutes);
app.use('/api', healthRoutes);

module.exports = app;
