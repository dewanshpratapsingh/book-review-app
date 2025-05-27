const {User,UserAuth}  = require('./../models/user.model')

class UserRepository {
  
  
  async saveNewUserData(userData) {
    const newUser = await User.create({
      email: userData.email,
      password: userData.hashedPassword,
      name: userData.name,
      userType: userData.userType || 'R',
    });
    if (!newUser) {
      throw new Error('Error creating user');
    }
    return newUser;
  }
  async checkUserExists(email) {
    const user = await User.findOne({
      email: email,
      active : true
    });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
  async saveTokenDetails(userId, refreshToken, expiresAt) {
    try{
      const authDetails = {
        userId: userId,
        refreshToken: refreshToken,
        refreshTokenExpiresAt: expiresAt
      }
      const userAuthDataUpdate =  await UserAuth.findOneAndUpdate(
        {
          userId: userId
        },
        authDetails,
        { new: true, upsert: true }
      )
      if (!userAuthDataUpdate) {
        throw new Error('Error saving token details');
      }
      return userAuthDataUpdate;
    }catch (error) {
      console.log('Error saving token details:', error);
      throw error;
    }
  }
}

module.exports = new UserRepository(); // Adjust the path as necessary