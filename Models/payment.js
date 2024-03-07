const mongoose = require('mongoose');

const paymentSchemaHotelBooking = mongoose.Schema({
    bookingId: {
        type: String,
        required: true,
        unique: true
    },
    amount: {
        type: Number,
        required: true
    },
    method: {
        type: String,
        required: true
    },
    // Payment status (e.g., Paid, Pending, Failed)
    paymentStatus: {
        type: String,
        enum: ['Paid', 'Pending', 'Failed'],
        default: 'Pending'
    },
    // Date of payment
    paymentDate: {
        type: Date,
        default: Date.now
    }
});

const PaymentHotel = mongoose.model('PaymentHotel', paymentSchemaHotelBooking);
module.exports = PaymentHotel;