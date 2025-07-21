import mongoose from 'mongoose';

// Define the schema for a Certificate
const certificateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Certificate name is required'], // Name is mandatory
    trim: true, // Remove leading/trailing whitespace
  },
  issuer: {
    type: String,
    required: [true, 'Issuer is required'], // Issuer is mandatory
    trim: true, // Remove leading/trailing whitespace
  },
  date: {
    type: Date,
    required: [true, 'Certificate date is required'], // Date of issue is mandatory
  },
  fileUrl: {
    type: String,
    default: '', // Optional: URL to the certificate file/image, defaults to empty string
    trim: true, // Trim whitespace from URL
  },
}, {
  // timestamps: true automatically adds createdAt and updatedAt fields
  // Mongoose will manage these fields, setting them on creation and update
  timestamps: true,
});

// Create and export the Certificate model
const Certificate = mongoose.model('Certificate', certificateSchema);

export default Certificate;

