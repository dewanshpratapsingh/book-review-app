const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateHash = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (error) {
        throw new Error('Error generating hash: ' + error.message);
    }
}

const compareHash = async (password, hash) => {
    try {
        const isMatch = await bcrypt.compare(password, hash);
        return isMatch;
    } catch (error) {
        throw new Error('Error comparing hash: ' + error.message);
    }
}

const generateToken = (user) => {
    try {
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return token;
    } catch (error) {
        throw new Error('Error generating token: ' + error.message);
    }
}


const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (error) {
        throw new Error('Error verifying token: ' + error.message);
    }
}

module.exports = {
    generateHash,
    compareHash,
    generateToken,
    verifyToken
};