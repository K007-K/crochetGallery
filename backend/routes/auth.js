const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { readUsers, writeUsers } = require('../utils/fileStorage');
const { authenticateToken, JWT_SECRET } = require('../middleware/authMiddleware');

const router = express.Router();

// REGISTER
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    // 1. Validation
    if (!name || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const users = readUsers();

    // 2. Check if user exists
    if (users.find(u => u.email === email)) {
        return res.status(400).json({ error: 'Email already exists' });
    }

    // 3. Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Create User Object
    const newUser = {
        id: Date.now().toString(), // Simple ID generation
        name,
        email,
        password: hashedPassword
    };

    // 5. Save to JSON
    users.push(newUser);
    writeUsers(users);

    res.status(201).json({ message: 'User registered successfully' });
});

// LOGIN
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const users = readUsers();

    // 1. Find User
    const user = users.find(u => u.email === email);
    if (!user) {
        return res.status(400).json({ error: 'Invalid Credentials' });
    }

    // 2. Check Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ error: 'Invalid Credentials' });
    }

    // 3. Generate Token
    const token = jwt.sign(
        { id: user.id, email: user.email, name: user.name },
        JWT_SECRET,
        { expiresIn: '1h' }
    );

    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
});

// GET PROFILE (Protected)
router.get('/profile', authenticateToken, (req, res) => {
    // req.user is populated by middleware
    res.json({ message: `Welcome back, ${req.user.name}`, user: req.user });
});

module.exports = router;
