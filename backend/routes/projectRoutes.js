import express from 'express';
import {
  getAllProjects,
  createProject,
  getProjectById,
  updateProject,
  deleteProject,
} from '../controllers/projectController.js';

const router = express.Router();

// Route for getting all projects and creating a new one
router.route('/').get(getAllProjects).post(createProject);
// Route for operations on a single project by ID
router.route('/:id').get(getProjectById).put(updateProject).delete(deleteProject);

export default router;

