import Project from '../models/Project.js';

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({}); // Fetch all projects from MongoDB
    res.status(200).json(projects);
  } catch (error) {
    console.error(`Error fetching projects: ${error.message}`);
    res.status(500).json({ message: 'Server Error: Could not retrieve projects.' });
  }
};

// @desc    Create a new project
// @route   POST /api/projects
// @access  Public (or Private if you add authentication)
export const createProject = async (req, res) => {
  const { title, description, github, demo, imageUrl, techStack, category, completionYear } = req.body;

  // Basic validation for required fields
  if (!title || !description || !github) {
    return res.status(400).json({ message: 'Please include a title, description, and GitHub link for the project.' });
  }

  try {
    // Check if a project with the same GitHub link already exists (due to unique: true in schema)
    const existingProject = await Project.findOne({ github: github.trim() });
    if (existingProject) {
      return res.status(409).json({ message: 'A project with this GitHub link already exists.' });
    }

    const newProject = await Project.create({
      title: title.trim(),
      description: description.trim(),
      github: github.trim(),
      demo: demo ? demo.trim() : '', // Trim if present, otherwise empty string
      imageUrl: imageUrl ? imageUrl.trim() : undefined, // Let schema default if not provided
      techStack: techStack || [], // Ensure it's an array
      category: category ? category.trim() : undefined, // Let schema default if not provided
      completionYear: completionYear,
    });
    res.status(201).json(newProject); // 201 Created status
  } catch (error) {
    console.error(`Error creating project: ${error.message}`);
    // Handle specific Mongoose errors, e.g., duplicate unique fields or validation errors
    if (error.code === 11000) { // Duplicate key error (for unique fields like github)
      return res.status(409).json({ message: 'A project with this GitHub link already exists.' });
    }
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: 'Server Error: Could not create project.' });
  }
};

// @desc    Get a single project by ID
// @route   GET /api/projects/:id
// @access  Public
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found.' });
    }
    res.status(200).json(project);
  } catch (error) {
    console.error(`Error fetching project by ID: ${error.message}`);
    // Check for invalid MongoDB ID format
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid project ID format.' });
    }
    res.status(500).json({ message: 'Server Error: Could not retrieve project.' });
  }
};

// @desc    Update a project by ID
// @route   PUT /api/projects/:id
// @access  Public (or Private)
export const updateProject = async (req, res) => {
  const { title, description, github, demo, imageUrl, techStack, category, completionYear } = req.body;

  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found.' });
    }

    // Prepare update object to apply only provided fields
    const updateFields = {};
    if (title !== undefined) updateFields.title = title.trim();
    if (description !== undefined) updateFields.description = description.trim();
    if (github !== undefined) updateFields.github = github.trim();
    if (demo !== undefined) updateFields.demo = demo.trim();
    if (imageUrl !== undefined) updateFields.imageUrl = imageUrl.trim();
    if (techStack !== undefined) updateFields.techStack = techStack; // Assuming techStack is already an array
    if (category !== undefined) updateFields.category = category.trim();
    if (completionYear !== undefined) updateFields.completionYear = completionYear;

    // Use findByIdAndUpdate with { new: true, runValidators: true }
    // new: true returns the modified document rather than the original
    // runValidators: true runs schema validators on the update operation
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedProject);
  } catch (error) {
    console.error(`Error updating project: ${error.message}`);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid project ID format.' });
    }
    if (error.code === 11000) { // Duplicate key error (for unique fields like github)
      return res.status(409).json({ message: 'A project with this GitHub link already exists.' });
    }
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: 'Server Error: Could not update project.' });
  }
};

// @desc    Delete a project by ID
// @route   DELETE /api/projects/:id
// @access  Public (or Private)
export const deleteProject = async (req, res) => {
  try {
    // Find and delete the project by ID
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found.' });
    }

    res.status(200).json({ message: 'Project removed successfully.' });
  } catch (error) {
    console.error(`Error deleting project: ${error.message}`);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid project ID format.' });
    }
    res.status(500).json({ message: 'Server Error: Could not delete project.' });
  }
};

// @desc    Bulk create projects
// @route   POST /api/projects/bulk
// @access  Public (or Private)
export const bulkCreateProjects = async (req, res) => {
  const projects = req.body; // Expecting an array of project objects
  if (!Array.isArray(projects)) {
    return res.status(400).json({ message: 'Request body must be an array of projects.' });
  }
  try {
    // Ensure all projects have unique GitHub links
    const githubLinks = projects.map(p => p.github);
    const existing = await Project.find({ github: { $in: githubLinks } });
    if (existing.length > 0) {
      return res.status(409).json({ message: 'Some projects have duplicate GitHub links.' });
    }
    const created = await Project.insertMany(projects);
    res.status(201).json(created);
  } catch (error) {
    console.error(`Error bulk creating projects: ${error.message}`);
    res.status(500).json({ message: 'Server Error: Could not bulk create projects.' });
  }
};

