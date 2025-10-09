const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      validate: {
        validator: (value) => validator.isEmail(value),
        message: 'Invalid email format'
      }
    },
    password: { type: String, required: true },
    role: { type: String, default: 'user' },

    // Employee profile fields
    phone: String,
    address: String,
    city: String,
    village: String,

    // Gender selection (male or female only)
    gender: { type: String, enum: ['male', 'female'] },

    // Date of birth
    dateOfBirth: { type: Date },

    // Car status
    carStatus: { 
        type: String, 
        enum: ['have', 'not'], 
        default: 'not' 
    },
    plateNumber: { 
        type: String,
        required: function() { return this.carStatus === 'have'; }
    },

    // Upload photo and CV file (store file paths or URLs)
    photo: { type: String }, // e.g., '/uploads/photos/user123.jpg'
    cvFile: { type: String }, // e.g., '/uploads/cv/user123.pdf'

    // Emergency contact
    emergencyContact: {
        name: String,
        phone: String
    },

    // Activation feature
    isActive: { type: Boolean, default: false }

  // Super admin verification
  , verified: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', userSchema);