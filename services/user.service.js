const authUtils = require('../util/authentication');
const userRepository = require('../repository/user.repository');
const validEmailDomains = ['example.com', 'test.com'];
class UserService{
    async registerUser(userData) {
        const { email, password, name, userType } = userData;
        const emailDomain = email.split('@')[1];
        if(!validEmailDomains.includes(emailDomain)){
            throw new Error('Invalid email');
        }
        if(name.length < 3 || name.length > 50){
            throw new Error('Name must be between 3 and 50 characters');
        }
        if(!['A','R'].includes(userType)){
            throw new Error('User type must be either A (Author) or R (Reader)');
        }
        const hashedPassword = await authUtils.generateHash(password);
        userData.hashedPassword = hashedPassword;
        return userRepository.saveNewUserData(userData);
    }
    
    async loginUser(credentials) {
        const { email, password } = credentials;
        if (!email || !password) {
            throw new Error('Email and password are required');
        }
        const user = await userRepository.checkUserExists(email);
        if (!user) {
            throw new Error('Invalid email or password');
        }
        const isPasswordValid = await authUtils.compareHash(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }
        const access_token = authUtils.generateToken(user);
        const refresh_token = authUtils.generateRefreshToken(user);
        const refreshTokenExpiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
        
        await userRepository.saveTokenDetails(user._id,refresh_token, refreshTokenExpiresAt);
        return { user, access_token };
    }
}

module.exports = new UserService();