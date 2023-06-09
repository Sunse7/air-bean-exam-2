const bcrypt = require('bcrypt');

async function hashPassword(password) {
    const hashedPassord = await bcrypt.hash(password, 10);
    return hashedPassord;
}

async function comparePassword(password, hashedPassord) {
    const isMatch = await bcrypt.compare(password, hashedPassord);
    return isMatch;
}

module.exports = { hashPassword, comparePassword }