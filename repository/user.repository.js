const { User } = require('../models/user.model');

class UserRepository {

  async saveNewUserData(userData) {
    const newUser = await User.create({
      email: userData.email,
      password: userData.password,
      name: userData.name,
      userType: userData.userType || 'R',
    });
    if (!newUser) {
      throw new Error('Error creating user');
    }
    return newUser;
  }

  async login(params) {
  }

  async delete(userId) {
  }

  async getProfile(userId) {
  }
}

module.exports = new UserRepository(); // Adjust the path as necessary