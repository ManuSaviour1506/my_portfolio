// routes/adminAuthRoutes.js

import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from '../models/admin.js'; // Use correct filename and extension

const router = express.Router();

// Test route to verify router is working
router.get('/test', (req, res) => {
    res.send('Admin route working!');
});

// @route   POST /api/admin/login
// @desc    Authenticate admin & get token
// @access  Public
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log('Login attempt:', email, password);

    // 1. Basic Validation: Check if email and password are provided
    if (!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    try {
        // 2. Find Admin by Email
        const admin = await Admin.findOne({ email });
        console.log('Admin found:', admin);

        // Check if admin exists
        if (!admin) {
            return res.status(400).json({ msg: 'Invalid credentials (email not found)' });
        }

        // 3. Compare Passwords
        const isMatch = await bcrypt.compare(password, admin.password);
        console.log('Password match:', isMatch);

        // Check if passwords match
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials (password incorrect)' });
        }

        // 4. Generate JWT
        const payload = {
            admin: {
                id: admin.id,
                role: 'admin'
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({
                    msg: 'Admin logged in successfully!',
                    token,
                    admin: {
                        id: admin.id,
                        email: admin.email,
                    }
                });
            }
        );

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error during admin login' });
    }
});

export default router;