const express = require('express');
const router = express.Router();
const Hotel = require('../Models/hotelDetailSchema');
const Room = require('../Models/roomDetailSchema');
const {jwtAuthMiddleware} = require('../jwt');

// Add Room
router.post('/:hotelID/rooms', async (req, res) => {
    try {
        const hotelID = req.params.hotelID;
        const existingHotel = await Hotel.findById(hotelID);
        if (!existingHotel) {
            return res.status(404).json({ message: "Hotel not found with the provided details" });
        }

        const newRoom = new Room(req.body);
        await newRoom.save();

        existingHotel.rooms.push(newRoom);
        await existingHotel.save();

        return res.status(201).json({ message: "Room created successfully", room_details: newRoom });
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

// Get all room details
router.get('/:hotelID/rooms', jwtAuthMiddleware,async (req, res) => {
    try {
        const hotelID = req.params.hotelID;
        const existingHotel = await Hotel.findById(hotelID).populate('rooms');
        if (!existingHotel) {
            return res.status(404).json({ message: "Hotel not found with the provided details" });
        }

        const rooms = existingHotel.rooms;
        return res.status(200).json({ message: `Rooms fetched successfully from ${existingHotel.name}`, rooms: rooms });
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

// Get single room
router.get('/:hotelID/rooms/:roomID', jwtAuthMiddleware,async (req, res) => {
    try {
        const { hotelID, roomID } = req.params;
        const existingHotel = await Hotel.findById(hotelID).populate('rooms');
        if (!existingHotel) {
            return res.status(404).json({ message: "Hotel not found with the provided details" });
        }

        const existingRoom = existingHotel.rooms.find(room => room._id.toString() === roomID);
        if (!existingRoom) {
            return res.status(404).json({ message: "Room not found with the provided details" });
        }

        return res.status(200).json({ message: `Room fetched successfully from ${existingHotel.name}`, room: existingRoom });
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

// Update room details
router.put('/:hotelID/rooms/:roomID', jwtAuthMiddleware,async (req, res) => {
    try {
        const { roomID } = req.params;
        const updatedDetails = req.body;

        const updatedRoom = await Room.findByIdAndUpdate(roomID, updatedDetails, { new: true });
        if (!updatedRoom) {
            return res.status(404).json({ message: 'Room not found' });
        }

        return res.json({ message: 'Room details updated successfully', updatedRoom });
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

// Delete room
router.delete('/:hotelID/rooms/:roomID', jwtAuthMiddleware,async (req, res) => {
    try {
        const { roomID } = req.params;
        const deletedRoom = await Room.findByIdAndDelete(roomID);
        if (!deletedRoom) {
            return res.status(404).json({ message: 'Room not found' });
        }

        return res.json({ message: 'Room deleted successfully' });
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;