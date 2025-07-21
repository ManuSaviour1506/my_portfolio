import mongoose from 'mongoose';

// Define the schema for a Project
const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'], // Title is mandatory
    trim: true, // Remove leading/trailing whitespace
  },
  description: {
    type: String,
    required: [true, 'Project description is required'], // Description is mandatory
    trim: true, // Remove leading/trailing whitespace
  },
  github: {
    type: String,
    required: [true, 'GitHub link is required'], // GitHub link is mandatory
    unique: true, // Ensure unique GitHub links
    trim: true, // Remove leading/trailing whitespace
  },
  demo: {
    type: String,
    default: '', // Optional: default to empty string if no demo link
    trim: true, // Trim whitespace from URL
  },
  imageUrl: {
    type: String,
    default: 'https://placehold.co/600x400/CCCCCC/000000?text=No+Image', // Default placeholder image
    trim: true, // Trim whitespace from URL
  },
  techStack: {
    type: [String], // Array of strings for technologies used
    default: [], // Defaults to an empty array
  },
  category: {
    type: String,
    default: 'Uncategorized', // Default category
    trim: true, // Trim whitespace
  },
  completionYear: {
    type: Number,
    min: [1900, 'Completion year must be 1900 or later'], // Reasonable minimum year
    max: [new Date().getFullYear() + 5, 'Completion year cannot be too far in the future'], // Allow for future projects
    required: [true, 'Completion year is required'], // Added required for completion year
  },
}, {
  // timestamps: true automatically adds createdAt and updatedAt fields
  timestamps: true,
});

// Create and export the Project model
const Project = mongoose.model('Project', projectSchema);

export default Project;

