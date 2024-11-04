// server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcryptjs';
import session from 'express-session';
import dotenv from 'dotenv';
import connectDB from './db.js';
import MongoStore from 'connect-mongo';
import Membership from './Membership.js';


import User from './User.js';
import Contact from './Contact.js';


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
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
    cookie: { secure: false }, // Set to true if using HTTPS
}));

// Middleware to authenticate user
const authenticateSession = (req, res, next) => {
    console.log("authenticating32")
    if (req.session.user) {
        console.log("authenticating done")
        next();
    } else {
        console.log("authenticating deni")
        res.status(401).json({ success: false, message: 'Access denied' });
    }
};

// Signup Route
app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    console.log("Username:", username);
    console.log("Email:", email);

    console.log("signinign upp")

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("signinign upp2")

    try {
        console.log("signinign upp3")
        const newUser = await User.create({ username, email, password: hashedPassword });
        console.log("signinign upp4")
        res.status(201).json({ success: true, user: newUser });
    } catch (error) {
        console.log("signinign upp5")
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
        console.log(req.session.user)

        res.status(200).json({ success: true, user: req.session.user });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Logout Route
app.post('/logout', authenticateSession, (req, res) => {

    console.log(req.session.user)

    // Destroy the session
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Could not log out' });
        }

        // Clear the session cookie on the client-side
        res.clearCookie('connect.sid', { path: '/' });

        console.log("logout successfully")

        // Send a successful logout response
        res.json({ success: true, message: 'Logged out successfully' });
    });
});


// Me Route
app.get('/me', authenticateSession, async (req, res) => {
    try {
        console.log(req.session.user)
        const user = await User.findById(req.session.user.id).select('-password'); // Exclude password from response
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});


// Contact form submission endpoint
app.post('/contactus', async (req, res) => {
    const { name, email, query } = req.body;

    try {
        const newContact = new Contact({ name, email, query });
        await newContact.save();
        res.status(201).json({ message: 'Contact information submitted successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error submitting contact information', error });
    }
});


// src/server.js or wherever your server is defined
app.post('/membership', async (req, res) => {
    const { name, email, phone, interests, feedback } = req.body;

    try {
        const newMembership = new Membership({ name, email, phone, interests, feedback });
        await newMembership.save();
        res.status(201).json({ message: 'Membership information submitted successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error submitting membership information', error });
    }
});



// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
