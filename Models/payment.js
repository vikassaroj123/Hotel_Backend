const mongoose = require('mongoose');

const paymentSchemaHotelBooking = mongoose.Schema({
    // Name of the cardholder
    cardholderName: {
        type: String,
        required: true
    },
    // Card number (usually encrypted in production)
    cardNumber: {
        type: String,
        required: true
    },
    // Expiry date of the card
    cardExpiry: {
        type: String,
        required: true
    },
    // CVV/CVC security code
    cardCvc: {
        type: String,
        required: true
    },
    // Billing address
    billingAddress: {
        type: String,
        required: true
    },
    // Total amount paid
    totalAmount: {
        type: Number,
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
