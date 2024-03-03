const express = require('express');
const router = express.Router();
const Hotel = require('../Models/hotelDetailSchema');
const { jwtAuthMiddleware } = require('../jwt');
const { validationResult } = require('express-validator');

// Hotel register
router.post('/', jwtAuthMiddleware, async (req, res) => {
    try {
        // Data validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        const hotelData = req.body;
        const newHotelData = new Hotel(hotelData); // Corrected declaration
        const savedHotel = await newHotelData.save();
        console.log('Hotel added successfully.');
        res.status(201).json({ message: 'Hotel added successfully.', hotel: savedHotel });
    } catch (error) {
        console.error('Error occurred at hotel route:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get all Hotel details
router.get('/', jwtAuthMiddleware, async (req, res) => {
    try {
        const hotels = await Hotel.find();

        if (!hotels || hotels.length === 0) {
            return res.status(404).json({ error: 'No hotels found' });
        }
        res.status(200).json({ message: 'Hotels retrieved successfully', hotels });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update the Hotel details
router.put('/:hotel_id', jwtAuthMiddleware, async (req, res) => {
    try {
        const hotelId = req.params.hotel_id;
        const updatedDetails = req.body; 
        // Update the hotel details in the database
        const updatedHotel = await Hotel.findByIdAndUpdate(hotelId, updatedDetails, { new: true });
        if (!updatedHotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }
        res.json({ message: 'Hotel details updated successfully', updatedHotel });
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Delete the hotel details
router.delete('/:hotel_id', jwtAuthMiddleware,async (req, res) => {
    try {
        const hotelId = req.params.hotel_id;
        const hotelFind = await Hotel.findByIdAndDelete(hotelId);
        if (!hotelFind) {
            return res.status(404).json({ message: 'Hotel not found' });
        }
        res.json({ message: 'Hotel deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;