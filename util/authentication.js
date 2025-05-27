const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User,UserAuth} = require('./../models/user.model'); 

function decodeToken(token) {
    try {
      return jwt.decode(token);
    } catch (err) {
      return null;
    }
  }
  
async function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const accessToken = authHeader && authHeader.split(' ')[1];

    if (!accessToken) return res.status(401).json({ message: 'Access token missing' });

    const decodedAccess = decodeToken(accessToken);

    if (!decodedAccess || !decodedAccess.exp) {
        return res.status(403).json({ message: 'Invalid access token' });
    }

    const now = Math.floor(Date.now() / 1000);
    const isAccessTokenExpired = decodedAccess.exp < now;

    if (!isAccessTokenExpired) {
        req.user = { id: decodedAccess.id, email: decodedAccess.email };
        req.body.userId = decodedAccess.id;
        return next();
    }

    try {
        const userAuthDetails = await UserAuth.findOne({ userId: decodedAccess.id});
        if (!userAuthDetails) return res.status(403).json({ message: 'User not found' });

        const refreshToken = userAuthDetails.refreshToken;
        if (!refreshToken) return res.status(401).json({ message: 'Refresh token missing' });
        
        const decodedRefresh = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

        if (decodedRefresh.exp < now) {
            return res.status(403).json({ message: 'Please sign in again' });
        }

        const newAccessToken = jwt.sign(
            { id: userAuthDetails._id, email: userAuthDetails.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        
        res.setHeader('x-access-token', newAccessToken);
        req.user = { id: userAuthDetails._id };
        
        return next();

    } catch (err) {
        console.log('Error verifying refresh token:', err);
        
        return res.status(403).json({ message: 'Invalid refresh token' });
    }
}

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
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY  || '1h' });
        return token;
    } catch (error) {
        throw new Error('Error generating token: ' + error.message);
    }
}

const generateRefreshToken = (user) => {
    return jwt.sign(
        { id: user._id },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY || '7d' }
    );
};

const refreshAccessToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '1h' }
    );
};



module.exports = {
    generateHash,
    compareHash,
    generateToken,
    authenticateToken,
    generateRefreshToken
};