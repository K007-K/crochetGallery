const jwt = require('jsonwebtoken');

const JWT_SECRET = 'crochet_gallery_super_secret_key_123'; // In production, use .env

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    // Format: "Bearer <token>"
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access Denied: No Token Provided' });
    }

    try {
        const verified = jwt.verify(token, JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(403).json({ error: 'Invalid Token' });
    }
};

module.exports = { authenticateToken, JWT_SECRET };
