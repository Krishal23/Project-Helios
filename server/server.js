// server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import connectDB from './db.js';
import User from './User.js';

dotenv.config();
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true,
}));
app.use(cookieParser());

// Signup Route
app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    console.log("signiig user")

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const newUser = await User.create({ username, email, password: hashedPassword });
        res.status(201).json({ success: true, user: newUser });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// Login Route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log("logging 1")
    
    
    try {
        const user = await User.findOne({ email });
        
        console.log("logging 2")
        
        if (!user) {
            return res.status(400).json({ success: false, message: 'User not found' });
        }
        console.log("logging 3")
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid password' });
        }
        
        // Create JWT token
        
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log("logging 4")
        res.status(200).json({ success: true, token });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Test Route
app.get('/test', (req, res) => {
    res.status(200).json({ success: true, message: "API is working" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
