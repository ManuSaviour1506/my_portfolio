import Certificate from '../models/Certificate.js';

// @desc    Get all certificates
// @route   GET /api/certificates
// @access  Public
export const getAllCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find({});
    res.status(200).json(certificates);
  } catch (error) {
    console.error(`Error fetching certificates: ${error.message}`);
    // Use a more generic message for client, log specific error on server
    res.status(500).json({ message: 'Server Error: Could not retrieve certificates.' });
  }
};

// @desc    Create a new certificate
// @route   POST /api/certificates
// @access  Public
export const createCertificate = async (req, res) => {
  // Destructure and trim string fields, handle date separately
  const { name, issuer, fileUrl } = req.body;
  const date = req.body.date; // Date comes as string, will be converted

  // Basic validation for required fields
  if (!name || !issuer || !date) {
    return res.status(400).json({ message: 'Please include certificate name, issuer, and date.' });
  }

  try {
    // Check if a certificate with the same name and issuer already exists to prevent duplicates
    const existing = await Certificate.findOne({ name: name.trim(), issuer: issuer.trim() });
    if (existing) {
      return res.status(409).json({ message: 'Certificate with this name and issuer already exists.' });
    }

    // Create a new certificate instance
    const newCertificate = await Certificate.create({
      name: name.trim(),
      issuer: issuer.trim(),
      date: new Date(date), // Ensure date is stored as a Date object
      fileUrl: fileUrl ? fileUrl.trim() : '', // Trim fileUrl if present, otherwise default to empty string
    });

    // Respond with the newly created certificate and 201 Created status
    res.status(201).json(newCertificate);
  } catch (error) {
    console.error(`Error creating certificate: ${error.message}`);
    // Handle Mongoose validation errors (e.g., if a required field is missing despite initial check)
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    // Generic server error for other issues
    res.status(500).json({ message: 'Server Error: Could not create certificate.' });
  }
};

// @desc    Get a certificate by ID
// @route   GET /api/certificates/:id
// @access  Public
export const getCertificateById = async (req, res) => {
  try {
    // Find certificate by ID
    const certificate = await Certificate.findById(req.params.id);

    // If no certificate found, return 404
    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found.' });
    }

    // Respond with the found certificate
    res.status(200).json(certificate);
  } catch (error) {
    console.error(`Error fetching certificate by ID: ${error.message}`);
    // Handle CastError if the ID format is invalid (e.g., not a valid MongoDB ObjectId)
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid certificate ID format.' });
    }
    // Generic server error
    res.status(500).json({ message: 'Server Error: Could not retrieve certificate.' });
  }
};

// @desc    Update a certificate by ID
// @route   PUT /api/certificates/:id
// @access  Public
export const updateCertificate = async (req, res) => {
  const { name, issuer, date, fileUrl } = req.body;

  try {
    // Find the certificate by ID
    const certificate = await Certificate.findById(req.params.id);

    // If no certificate found, return 404
    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found.' });
    }

    // Update fields only if they are provided in the request body
    // Trim string fields to remove whitespace
    if (name !== undefined) certificate.name = name.trim();
    if (issuer !== undefined) certificate.issuer = issuer.trim();
    if (date !== undefined) certificate.date = new Date(date); // Ensure date is updated as a Date object
    if (fileUrl !== undefined) certificate.fileUrl = fileUrl.trim(); // Trim fileUrl

    // Save the updated certificate. Mongoose will run validators before saving.
    const updatedCertificate = await certificate.save();

    // Respond with the updated certificate
    res.status(200).json(updatedCertificate);
  } catch (error) {
    console.error(`Error updating certificate: ${error.message}`);
    // Handle CastError for invalid ID format
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid certificate ID format.' });
    }
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    // Generic server error
    res.status(500).json({ message: 'Server Error: Could not update certificate.' });
  }
};

// @desc    Delete a certificate by ID
// @route   DELETE /api/certificates/:id
// @access  Public
export const deleteCertificate = async (req, res) => {
  try {
    // Find and delete the certificate by ID
    // Using findByIdAndDelete is often more direct than findById then deleteOne
    const certificate = await Certificate.findByIdAndDelete(req.params.id);

    // If no certificate found, return 404
    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found.' });
    }

    // Respond with a success message
    res.status(200).json({ message: 'Certificate removed successfully.' });
  } catch (error) {
    console.error(`Error deleting certificate: ${error.message}`);
    // Handle CastError for invalid ID format
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid certificate ID format.' });
    }
    // Generic server error
    res.status(500).json({ message: 'Server Error: Could not delete certificate.' });
  }
};

