const express = require('express');
const router = express.Router();
const User = require('../Models/userSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const { jwtAuthMiddleware, generateToken } = require('../jwt');

// Register route
router.post('/register', async (req, res) => {
    try {
        // Data validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const userData = req.body;
        const newUser = new User(userData);

        // Hash the password before saving
        newUser.password = await bcrypt.hash(newUser.password, 10);

        const savedUser = await newUser.save();
        const payload = {
            id: savedUser._id,
        };
        const token = generateToken(payload);

        console.log('User data saved successfully.');
        res.status(201).json({ message: 'Data saved', user: savedUser, token });
    } catch (error) {
        console.error('Error occurred at user register route:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Login Routes
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }

        const payload = {
            id: user._id, // Use _id instead of id
        };
        const token = generateToken(payload);

        console.log('Login successful.');
        res.status(200).json({ token, message: 'Login successful' });
    } catch (err) {
        console.error('Error occurred at login route.', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update Password Route
router.put('/profile/password', jwtAuthMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const existingUser = await User.findById(userId);
        if (!existingUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        const isPasswordValid = await bcrypt.compare(req.body.currentPassword, existingUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Current password is incorrect' });
        }
        const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);
        // Assuming you have a method called updatePassword in your User model
        existingUser.password = hashedPassword;
        const updatedUser = await existingUser.save();
        res.status(200).json({ message: 'Password updated successfully', user: updatedUser });
    } catch (err) {
        console.error('Error occurred at password update route.', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Profile GET Routes
router.get('/profile', jwtAuthMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'Profile retrieved successfully', user });
    } catch (err) {
        console.error('Error occurred at profile retrieval route.', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Profile Delete routes
router.delete('/profile', jwtAuthMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            // If user not found, return 404
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'Profile deleted successfully' });
    } catch (err) {
        console.error('Error occurred at profile deletion route.', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;