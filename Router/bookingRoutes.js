const express = require('express');
const router = express.Router();
const User = require('../Models/userSchema');
const Hotel = require('../Models/hotelDetailSchema')
const Booking = require('../Models/bookingSchema');

const { jwtAuthMiddleware } = require('../jwt');

// Booking Create
router.post('/', async (req, res) => {
    try {
        const { userId, hotelId, roomId } = req.body; 
        const newBooking = new Booking(req.body);
        const savedBooking = await newBooking.save();
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.bookings.push(savedBooking._id);
        await user.save();
        res.status(201).json({ message: 'Booking created successfully', booking: savedBooking });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Get all bookings by user ID
router.get('/user/:userID', async (req, res) => {
    try {
        const userID = req.params.userID;
        // Fetch the user by userID
        const user = await User.findById(userID);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Extract booking IDs from the user object
        const bookingIDs = user.bookings;
        // Fetch bookings associated with the user based on the extracted booking IDs
        const userBookings = await Booking.find({ _id: { $in: bookingIDs } });
        res.status(200).json(userBookings);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

//Update the details
router.put('/:bookingID', async (req, res) => {
    try {
        const bookingID = req.params.bookingID;
        // Assuming you have some logic to retrieve the existing booking from your database
        const existingBooking = await Booking.findById(bookingID);
        if (!existingBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        const updatedBookingData = req.body;
        // Update the existing booking object with the new data
        Object.assign(existingBooking, updatedBookingData);
        // Assuming you have some logic to save the updated booking back to your database
        await existingBooking.save();
        res.status(200).json({message: "Hotel booking details update sucessfuly", Booking: existingBooking}); // Sending back the updated booking as the response
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Get all bookings
router.get('/', async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.status(200).json({message: "All booking details fetch sucessfully", Booking_Details: bookings});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

//Delete booking details
router.delete('/:bookingID', async (req, res) => {
    try {
        const bookingID = req.params.bookingID;
        const booking = await Booking.findByIdAndDelete(bookingID);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;