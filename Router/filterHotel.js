const express = require('express');
const router = express.Router();
const Hotel = require('../Models/hotelDetailSchema');

// Hotel search with filters
router.get('/search', async (req, res) => {
    try {
        let query = {};
        
        // Search by name
        if (req.query.name) {
            query.name = { $regex: req.query.name, $options: 'i' };
        }
        // Additional filters
        if (req.query.city) {
            query.city = { $regex: req.query.city, $options: 'i' };
        }

        const hotels = await Hotel.find(query);
        res.json(hotels);
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ message: 'Internal server error'});
    }
});

// Hotel filter route
router.get('/filter', async (req, res) => {
    try {
        let query = {};

        // Apply filters
        if (req.query.rating) {
            query.rating = req.query.rating;
        }
        if (req.query.minPrice && req.query.maxPrice) {
            query.price = { $gte: req.query.minPrice, $lte: req.query.maxPrice };
        }
        if (req.query.minCapacity) {
            query.capacity = { $gte: req.query.minCapacity };
        }
        if (req.query.amenities) {
            // Assuming amenities is an array of strings
            query.amenities = { $all: req.query.amenities };
        }

        const hotels = await Hotel.find(query);
        res.json(hotels);
    } catch (err) {
        console.error(err.message);
        res.status(500).send({message : 'Internel server error'});
    }
});

module.exports = router;
