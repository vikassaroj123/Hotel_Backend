const mongoose = require('mongoose');

const roomHotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['Single', 'Double', 'Suite'], // Example room types, you can customize as needed
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    amenities: {
        type: [String], // Array of strings representing amenities
        default: []
    },
    capacity: {
        type: Number,
        required: true
    },
    bookedDates: {
        type: [Date], // Array of dates when the room is booked
        default: []
    },
    imageUrl: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

const RoomHotel = mongoose.model('RoomHotel', roomHotelSchema);
module.exports = RoomHotel;
