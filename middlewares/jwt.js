const jwt = require('jsonwebtoken');
const secretKey = 'a1b1c1';

function generateToken(payload) {
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
    return token;
}

function verifyToken(allowedRoles) {
    return (req, res, next) => {
        try {
            const token = req.headers.authorization.replace('Bearer ', '');
            const verifiedToken = jwt.verify(token, secretKey);
             if(verifiedToken) {
                if(verifiedToken.role == allowedRoles) {
                    next();
                } else {
                    res.status(403).json({ success: false, message: 'Missing permission for access' });
                }
            } else {
                res.status(400).json({ success: false, message: 'Invalid token'});
            }
        } catch (err) {
            res.status(500).json({ success: false, message: 'Invalid token'})
        }
    
    }
}

module.exports = { generateToken, verifyToken };