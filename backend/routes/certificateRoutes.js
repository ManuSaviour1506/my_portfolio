import express from 'express';
import {
  getAllCertificates,
  createCertificate,
  getCertificateById,
  updateCertificate,
  deleteCertificate,
} from '../controllers/certificateController.js'; // Correct import path for controller functions

const router = express.Router(); // Create an Express router instance

// Define routes for certificates
// Route for getting all certificates and creating a new one
router.route('/').get(getAllCertificates).post(createCertificate);
// Route for operations on a single certificate by ID
router.route('/:id').get(getCertificateById).put(updateCertificate).delete(deleteCertificate);

export default router; // Export the router as a default export

