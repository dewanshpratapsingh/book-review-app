const mongooose = require('mongoose');


const userSchema = new mongooose.Schema({
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
        enum: ['admin', 'user'],
        default: 'user',
    },
}, { timestamps: true });

const User = mongooose.model('User', userSchema);
module.exports = User;