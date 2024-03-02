const mongoose = require('mongoose');

const hotelDetailSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    amenities: {
        type: [String],
        default: []
    },
    contact: {
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        }
    },
    rooms: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'RoomHotel'
        }
    ],
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const HotelInfo = mongoose.model('HotelInfo', hotelDetailSchema);
module.exports = HotelInfo;
