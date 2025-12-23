const express = require('express');
const router = express.Router();
const products = require('../data/products.json');

// Get All Products
router.get('/', (req, res) => {
    const category = req.query.category;
    if (category) {
        const filtered = products.filter(p => p.category.toLowerCase() === category.toLowerCase());
        return res.json(filtered);
    }
    res.json(products);
});

// Get Single Product
router.get('/:id', (req, res) => {
    const product = products.find(p => p.id === req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
});

module.exports = router;
