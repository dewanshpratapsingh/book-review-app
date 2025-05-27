const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    userType: {
        type: String,
        enum: ['R', 'A'],
        default: 'R',
    },
    active: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });



const userAuthSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    refreshTokenExpiresAt: {
      type: Date,
      required: true,
    },
  }, { timestamps: true });
  

const UserAuth = mongoose.model('UserAuth', userAuthSchema);

const User = mongoose.model('User', userSchema);
module.exports = {
    User,
    UserAuth
};