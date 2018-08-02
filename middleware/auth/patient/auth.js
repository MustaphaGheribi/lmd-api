const jwt = require('jsonwebtoken');
const config = require('config');
module.exports = function auth(req,res,next) {
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).json('Access denied.No token provided.');
    try {
        const payload = jwt.verify(token, config.get('jwtPrivateKey'));
        if(payload.isPatient) {
            req.user=payload;
            next();
        } else {
            res.status(403).json('Access denied.');
        }
    }catch(ex) {
        res.status(400).json('Invalid token.');
    }
};
