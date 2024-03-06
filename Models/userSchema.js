const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        street: String,
        city: String,
        state: String,
        zip: String,
        country: String
    },
    dateOfBirth: {
        type: Date
    },
    profilePicture: {
        type: String,
        default: 'default.jpg'
    },
    preferences: {
        type: [String],
        default: []
    },
    bookings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'HotelBooking' // Adjusted model name
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationToken: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date
});

userSchema.methods.updatePassword = async function(newPassword) {
    this.password = newPassword;
    return this.save();
};

const User = mongoose.model('User', userSchema);
module.exports = User;