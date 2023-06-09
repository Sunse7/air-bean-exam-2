const jwt = require('jsonwebtoken');
const secretKey = 'a1b1c1';

function generateToken(payload) {
    console.log('This');
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
    console.log('Generate token', token);
    return token;
}

function verifyToken(allowedRoles) {
    return (req, res, next) => {
    const token = req.headers.authorization.replace('Bearer ', '');
    const verifiedToken = jwt.verify(token, secretKey);
        if(verifiedToken) {
            if(allowedRoles.includes(verifiedToken.role)) {
                next();
            } else {
                res.status(403).json({ success: false, message: 'Missing permission for access' });
            }
        } else {
            res.status(400).json({ success: false, message: 'Invalid token'});
        }
    }
}

module.exports = { generateToken, verifyToken };