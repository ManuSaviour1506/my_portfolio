// src/pages/admin/ManageProjects.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ManageProjects() {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    projectUrl: '',
    technologies: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentProjectId, setCurrentProjectId] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // FIX: Changed from process.env to import.meta.env for Vite compatibility
  const API_BASE_URL = import.meta.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get(`${API_BASE_URL}/api/projects`);
      setProjects(res.data);
    } catch (err) {
      setError('Failed to fetch projects. Please ensure the backend is running and you have access.');
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Authentication required. Please log in.');
      return;
    }
    axios.defaults.headers.common['x-auth-token'] = token;

    const projectData = {
      ...formData,
      technologies: formData.technologies.split(',').map(tech => tech.trim()).filter(tech => tech),
    };

    try {
      if (isEditing) {
        await axios.put(`${API_BASE_URL}/api/projects/${currentProjectId}`, projectData);
      } else {
        await axios.post(`${API_BASE_URL}/api/projects`, projectData);
      }
      setFormData({ title: '', description: '', imageUrl: '', projectUrl: '', technologies: '' });
      setIsEditing(false);
      setCurrentProjectId(null);
      fetchProjects();
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to save project. Check network or server logs.');
      console.error('Error saving project:', err);
      if (err.response && err.response.status === 401) {
        localStorage.removeItem('token');
      }
    }
  };

  const handleEdit = (project) => {
    setFormData({
      title: project.title,
      description: project.description,
      imageUrl: project.imageUrl,
      projectUrl: project.projectUrl,
      technologies: project.technologies.join(', '),
    });
    setIsEditing(true);
    setCurrentProjectId(project._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    setError('');
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Authentication required. Please log in.');
      return;
    }
    axios.defaults.headers.common['x-auth-token'] = token;

    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await axios.delete(`${API_BASE_URL}/api/projects/${id}`);
        fetchProjects();
      } catch (err) {
        setError(err.response?.data?.msg || 'Failed to delete project. Check network or server logs.');
        console.error('Error deleting project:', err);
        if (err.response && err.response.status === 401) {
          localStorage.removeItem('token');
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#e0e0e0] p-4 sm:p-6 lg:p-8">
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          {isEditing ? 'Edit Project' : 'Add New Project'}
        </h2>
        {error && <p className="text-red-500 text-center text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
          <input
            type="text"
            name="title"
            placeholder="Project Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
          <textarea
            name="description"
            placeholder="Project Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 h-24 resize-y"
            required
          ></textarea>
          <input
            type="url"
            name="imageUrl"
            placeholder="Image URL (e.g., project screenshot)"
            value={formData.imageUrl}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="url"
            name="projectUrl"
            placeholder="Project URL (e.g., GitHub, Live Demo)"
            value={formData.projectUrl}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="text"
            name="technologies"
            placeholder="Technologies (e.g., React, Node.js, MongoDB - comma-separated)"
            value={formData.technologies}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <div className="flex justify-end space-x-4">
            {isEditing && (
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setCurrentProjectId(null);
                  setFormData({ title: '', description: '', imageUrl: '', projectUrl: '', technologies: '' });
                  setError('');
                }}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
              >
                Cancel Edit
              </button>
            )}
            <button
              type="submit"
              className="bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
            >
              {isEditing ? 'Update Project' : 'Add Project'}
            </button>
          </div>
        </form>

        <h3 className="text-2xl font-bold text-gray-800 mb-4 border-t pt-8 mt-8">Your Projects</h3>
        {loading ? (
          <p className="text-gray-600 text-center">Loading projects...</p>
        ) : projects.length === 0 ? (
          <p className="text-gray-600 text-center">No projects added yet.</p>
        ) : (
          <ul className="space-y-4">
            {projects.map(project => (
              <li key={project._id} className="bg-gray-50 p-4 rounded-lg shadow-md flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0 sm:space-x-4">
                <div className="text-center sm:text-left flex-grow">
                  <h4 className="font-semibold text-xl text-gray-800">{project.title}</h4>
                  <p className="text-sm text-gray-600">{project.description.substring(0, 150)}{project.description.length > 150 ? '...' : ''}</p>
                  {project.technologies && project.technologies.length > 0 && (
                    <p className="text-xs text-gray-500 mt-1">Tech: {project.technologies.join(', ')}</p>
                  )}
                  {project.projectUrl && (
                    <a
                      href={project.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-sm mt-1 block"
                    >
                      View Project
                    </a>
                  )}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(project)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-600 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}