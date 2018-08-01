const jwt = require('jsonwebtoken');
const config = require('config');
module.exports = function auth(req,res,next) {
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).json('Access denied.No token provided.');
    try {
        const payload = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user=payload;
        next();
    }catch(ex) {
        res.status(400).json('Invalid token.');
    }
};
