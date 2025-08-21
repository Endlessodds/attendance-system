const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            return res.status(401).json({ message: 'Authorization header is missing' });
        }
        const token = authHeader.replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if(!decoded.userID) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        req.user = { userID: decoded.userID, role: decoded.role};
        next();
    } catch(error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = authMiddleware;