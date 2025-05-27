const userService = require('../services/user.service');
class UserController{
    
    async register(userRegistrationData){
        if(!userRegistrationData || !userRegistrationData.email || !userRegistrationData.password || !userRegistrationData.name || !userRegistrationData.userType){ 
            throw new Error('Invalid registration data');
        }
        return userService.registerUser(userRegistrationData);
    }
    async login(credentials){
        if(!credentials || !credentials.email || !credentials.password){
            throw new Error('Invalid login credentials');
        }
        return userService.loginUser(credentials);
    }
}

module.exports = new UserController();