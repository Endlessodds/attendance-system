const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {
        // Accept both 'authorization' and 'Authorization' headers for flexibility
        const authHeader = req.headers['authorization'] || req.headers['Authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Authorization header missing or malformed' });
        }

        const token = authHeader.split(' ')[1]; // Extract token after 'Bearer '
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
        } catch (err) {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }

        if (!decoded.userID) {
            return res.status(401).json({ message: 'Invalid token payload' });
        }

        req.user = { userID: decoded.userID, role: decoded.role };
        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = authMiddleware;
