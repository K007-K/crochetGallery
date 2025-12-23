const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { authenticateToken } = require('../middleware/authMiddleware');

const CARTS_FILE = path.join(__dirname, '../data/carts.json');

// Helper to read/write carts
const getCarts = () => JSON.parse(fs.readFileSync(CARTS_FILE, 'utf8') || '[]');
const saveCarts = (carts) => fs.writeFileSync(CARTS_FILE, JSON.stringify(carts, null, 2));

// Get User Cart
router.get('/', authenticateToken, (req, res) => {
    const carts = getCarts();
    // Find cart for logged in user
    let userCart = carts.find(c => c.userId === req.user.id);
    if (!userCart) {
        userCart = { userId: req.user.id, items: [] };
        // We don't necessarily need to save empty cart yet, but we return it
    }
    res.json(userCart);
});

// Add to Cart
router.post('/add', authenticateToken, (req, res) => {
    const { productId, quantity } = req.body;
    let carts = getCarts();
    let userCart = carts.find(c => c.userId === req.user.id);

    if (!userCart) {
        userCart = { userId: req.user.id, items: [] };
        carts.push(userCart);
    }

    const existingItem = userCart.items.find(i => i.productId === productId);
    if (existingItem) {
        existingItem.quantity += (quantity || 1);
    } else {
        userCart.items.push({ productId, quantity: quantity || 1 });
    }

    saveCarts(carts);
    res.json(userCart);
});

// Remove from Cart
router.delete('/remove/:productId', authenticateToken, (req, res) => {
    let carts = getCarts();
    let userCart = carts.find(c => c.userId === req.user.id);

    if (userCart) {
        userCart.items = userCart.items.filter(i => i.productId !== req.params.productId);
        saveCarts(carts);
    }

    res.json(userCart || { userId: req.user.id, items: [] });
});

// Update Quantity
router.put('/update', authenticateToken, (req, res) => {
    const { productId, quantity } = req.body;
    let carts = getCarts();
    let userCart = carts.find(c => c.userId === req.user.id);

    if (userCart) {
        const item = userCart.items.find(i => i.productId === productId);
        if (item) {
            item.quantity = quantity;
            if (item.quantity <= 0) {
                userCart.items = userCart.items.filter(i => i.productId !== productId);
            }
            saveCarts(carts);
        }
    }
    res.json(userCart);
});

module.exports = router;
