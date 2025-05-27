const authUtils = require('../utils/auth.utils');
const userRepository = require('../repository/user.repository');
class UserService{
    async registerUser(userData) {
        const { email, password, name, userType } = userData;
        const hashedPassword = await authUtils.generateHash(password);
        userData.password = hashedPassword;
        return userRepository.saveNewUserData(userData);
    }
    async loginUser(credentials) {

    }
    async getUserProfile(user) {

    }
    async deleteUserProfile(user) {

    }
}

module.exports = new UserService();