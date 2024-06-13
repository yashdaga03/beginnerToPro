const { verifyToken } = require('../utils/jwt');

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(403).json({"success": false, "message": "Authentication Failed, No Token Provided!"});
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(403).json({"success": false, "message": "Authentication Failed, Invalid Token"});
    }
};

module.exports = authenticate;