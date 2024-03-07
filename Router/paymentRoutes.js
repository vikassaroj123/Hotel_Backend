const express = require('express');
const router = express.Router();
const Payment = require('../Models/payment');
const Booking = require('../Models/bookingSchema');

// Create a new payment
router.post('/', async (req, res) => {
    try {
        const paymentData = req.body;
        const newPayment = await Payment.create(paymentData);
        // Assuming you have a bookingId in your request body or some other way to associate the payment with a booking
        const bookingId = req.body.bookingId;
        // Update the booking with the payment ID
        await Booking.findByIdAndUpdate(bookingId, { $push: { paymentIds: newPayment._id } });
        res.status(201).json({ message: "Payment done successfully", Payment_Details: newPayment });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get payment details by ID
router.get('/:paymentId', async (req, res) => {
    try {
        const paymentId = req.params.paymentId;
        const paymentDetails = await Payment.findById(paymentId);
        console.log(paymentDetails);
        if (paymentDetails) {
            res.json({ message: "Payment details fetch succesfully", Payment_Details: paymentDetails });
        } else {
            res.status(404).json({ error: 'Payment not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update payment details by ID
router.put('/:paymentId', async (req, res) => {
    try {
        const paymentId = req.params.paymentId;
        const updatedPaymentData = req.body;
        const updatedPayment = await Payment.findByIdAndUpdate(
            paymentId,
            updatedPaymentData,
            { new: true }
        );
        if (updatedPayment) {
            res.json({ message: "Payment details update succesfully", Updated_Details: updatedPayment });
        } else {
            res.status(404).json({ error: 'Payment not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete payment by ID
router.delete('/:paymentId', async (req, res) => {
    try {
        const paymentId = req.params.paymentId;
        await Payment.findByIdAndDelete(paymentId);
        res.status(200).json({ message: "Payment delete with provided details" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;