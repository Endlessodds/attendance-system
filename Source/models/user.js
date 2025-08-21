const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'super_admin'],
        default:'user'
    },
    phone: String,
    address: String,
    city: String,
    emergencyContact: String,
    profilePhotoUrl: String,
}, {timestamps: true});

module.exports = mongoose.model('user', userSchema);