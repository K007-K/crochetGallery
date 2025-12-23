const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { authenticateToken } = require('../middleware/authMiddleware');

const ORDERS_FILE = path.join(__dirname, '../data/orders.json');
const CARTS_FILE = path.join(__dirname, '../data/carts.json');

const getOrders = () => JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf8') || '[]');
const saveOrders = (orders) => fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));

const getCarts = () => JSON.parse(fs.readFileSync(CARTS_FILE, 'utf8') || '[]');
const saveCarts = (carts) => fs.writeFileSync(CARTS_FILE, JSON.stringify(carts, null, 2));

// Place Order (Checkout)
router.post('/checkout', authenticateToken, (req, res) => {
    const { items, total, shippingDetails } = req.body;

    // Strict Validation
    if (!shippingDetails.mobile || !/^[0-9]{10}$/.test(shippingDetails.mobile)) {
        return res.status(400).json({ error: 'Invalid Mobile Number. Must be exactly 10 digits.' });
    }
    if (!shippingDetails.zip || !/^[0-9]{6}$/.test(shippingDetails.zip)) {
        return res.status(400).json({ error: 'Invalid Pincode. Must be exactly 6 digits.' });
    }
    if (!shippingDetails.fullName || !shippingDetails.address || !shippingDetails.city || !shippingDetails.state) {
        return res.status(400).json({ error: 'All address fields are required.' });
    }

    // Create Order
    const newOrder = {
        id: Date.now().toString(),
        userId: req.user.id,
        items,
        total,
        shippingDetails,
        status: 'Placed',
        date: new Date().toISOString()
    };

    // Save Order
    const orders = getOrders();
    orders.push(newOrder);
    saveOrders(orders);

    // Clear User Cart
    let carts = getCarts();
    carts = carts.filter(c => c.userId !== req.user.id);
    saveCarts(carts);

    res.status(201).json({ message: 'Order placed successfully', orderId: newOrder.id });
});

// Get User Orders
router.get('/history', authenticateToken, (req, res) => {
    const orders = getOrders();
    const userOrders = orders.filter(o => o.userId === req.user.id);
    res.json(userOrders);
});

// Get Single Order (Tracking)
router.get('/:id', authenticateToken, (req, res) => {
    const orders = getOrders();
    const order = orders.find(o => o.id === req.params.id && o.userId === req.user.id);

    if (!order) {
        return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
});

module.exports = router;
