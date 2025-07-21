import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';

// --- Import routes using ES module syntax ---
import authRoutes from './routes/authRoutes.js';
import adminAuthRoutes from './routes/adminAuthRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import certificateRoutes from './routes/certificateRoutes.js';
import contactRoutes from './routes/contactRoutes.js';

const app = express();

// --- Global Middleware Setup ---
app.use(express.json());
app.use(cors());

// --- MongoDB Database Connection ---
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully!');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        process.exit(1);
    }
};
connectDB();

// --- Link Your API Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminAuthRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/contact', contactRoutes);

// --- Basic Test Route (Optional) ---
app.get('/', (req, res) => {
    res.send('Backend API is running...');
});

// --- Error Handling Middleware ---
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke! (Internal Server Error)');
});

// --- Start the Express Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));