// server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcryptjs';
import session from 'express-session';
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

// Session middleware
app.use(session({
    secret: process.env.SESSION_SECRET || 'your_secret_key', // Use a strong secret key
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Set to true if using HTTPS
}));

// Middleware to authenticate user
const authenticateSession = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.status(401).json({ success: false, message: 'Access denied' });
    }
};

// Signup Route
app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

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

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid password' });
        }

        // Store user information in session
        req.session.user = {
            id: user._id,
            username: user.username,
            email: user.email
        };

        res.status(200).json({ success: true, user: req.session.user });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Me Route
app.get('/me', authenticateSession, async (req, res) => {
    try {
        const user = await User.findById(req.session.user.id).select('-password'); // Exclude password from response
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Logout Route
app.post('/logout',authenticateSession, (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Could not log out' });
        }
        res.json({ success: true, message: 'Logged out successfully' });
    });
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
