const mongoose = require('mongoose');

const roomHotelSchema = new mongoose.Schema({
    roomNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    roomType: {
        type: String,
        required: true,
        enum: ['Standard', 'Deluxe', 'Suite']
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    available: {
        type: Boolean,
        default: true
    },
    capacity: {
        type: Number,
        required: true,
        min: 1
    },
    floor: {
        type: String,
        required: true,
        enum: ['Ground Floor', 'First Floor', 'Second Floor', 'Third Floor'] 
    },
    amenities: {
        type: [String],
        default: [],
        validate: {
            validator: function(amenities) {
                // Custom validation to ensure all amenities are unique
                return new Set(amenities).size === amenities.length;
            },
            message: props => `${props.value} contains duplicate amenities`
        }
    },
    description: {
        type: String,
        default: ""
    }
});

const RoomHotel = mongoose.model('RoomHotel', roomHotelSchema);

module.exports = RoomHotel;