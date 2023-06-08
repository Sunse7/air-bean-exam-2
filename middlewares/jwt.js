const jwt = require('jsonwebtoken');
const secretKey = 'a1b1c1';

function generateToken(payload) {
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
    return token;
}

function verifyToken(req, res, next) {
    try {
        const token = req.headers.authorization.replace('Bearer ', '');
        const verified = jwt.verify(token, secretKey);

        if(verified) {
            next();
        } else {
            res.status(400).json({ success: false, message: 'Invalid token'});
        }
    } catch (err) {
        res.status(500).json({ success: false, message: 'Invalid token', error: err.code,})
    }
}

module.exports = { generateToken, verifyToken };