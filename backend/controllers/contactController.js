import dotenv from 'dotenv';
dotenv.config();

import Contact from '../models/Contact.js';
import nodemailer from 'nodemailer';

export const submitContact = async (req, res) => {
  const { name, email, subject, message } = req.body;
  try {
    // Save to MongoDB
    const contact = new Contact({ name, email, subject, message });
    await contact.save();

    // Send email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: email,
      to: 'manusaviour5@gmail.com', // your email
      subject: `Portfolio Contact: ${subject || 'No Subject'}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`
    });

    res.status(200).json({ msg: 'Contact submitted successfully!' });
  } catch (error) {
    console.error('Contact error:', error.message);
    res.status(500).json({ msg: 'Failed to submit contact.' });
  }
};