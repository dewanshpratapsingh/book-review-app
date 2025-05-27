const userService = require('../services/user.service');
class UserController{

    async register(userRegistrationData){
        if(!userRegistrationData || !userRegistrationData.email || !userRegistrationData.password || !userRegistrationData.name || !userRegistrationData.userType){ 
            throw new Error('Invalid registration data');
        }
        return userService.registerUser(userRegistrationData);
    }
    async login(credentials){
        // Logic for user login
    }
    async getProfile(user){

        // Logic to get user profile
    }
    async deleteProfile(user){
        // Logic to delete user profile
    }
}

module.exports = new UserController();