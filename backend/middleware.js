const jwt = require('jsonwebtoken');
const JWT_SECRET = require('./config');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({})
    };

    const token = authHeader.split(' ')[1];
    try {
        const decodedValue = jwt.verify(token, JWT_SECRET);
        req.userId = decodedValue.userid
        next();
    } catch (error) {
        return res.status(403).json({});
    }
};

module.exports = {
    authMiddleware,
};