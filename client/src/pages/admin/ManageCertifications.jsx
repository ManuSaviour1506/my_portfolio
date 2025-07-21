// src/pages/admin/ManageCertifications.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ManageCertifications() {
  const [certifications, setCertifications] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    issuer: '',
    issueDate: '',
    credentialUrl: '',
    imageUrl: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentCertificationId, setCurrentCertificationId] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // FIX: Changed from process.env to import.meta.env for Vite compatibility
  const API_BASE_URL = import.meta.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchCertifications();
  }, []);

  const fetchCertifications = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get(`${API_BASE_URL}/api/certificates`);
      setCertifications(res.data);
    } catch (err) {
      setError('Failed to fetch certifications. Please ensure the backend is running and you have access.');
      console.error('Error fetching certifications:', err);
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

    const certificationData = { ...formData };
    if (certificationData.issueDate) {
      certificationData.issueDate = new Date(certificationData.issueDate).toISOString();
    }

    try {
      if (isEditing) {
        await axios.put(`${API_BASE_URL}/api/certificates/${currentCertificationId}`, certificationData);
      } else {
        await axios.post(`${API_BASE_URL}/api/certificates`, certificationData);
      }
      setFormData({ name: '', issuer: '', issueDate: '', credentialUrl: '', imageUrl: '' });
      setIsEditing(false);
      setCurrentCertificationId(null);
      fetchCertifications();
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to save certification. Check network or server logs.');
      console.error('Error saving certification:', err);
      if (err.response && err.response.status === 401) {
        localStorage.removeItem('token');
      }
    }
  };

  const handleEdit = (certification) => {
    const formattedDate = certification.issueDate ? new Date(certification.issueDate).toISOString().split('T')[0] : '';
    setFormData({
      name: certification.name,
      issuer: certification.issuer,
      issueDate: formattedDate,
      credentialUrl: certification.credentialUrl,
      imageUrl: certification.imageUrl,
    });
    setIsEditing(true);
    setCurrentCertificationId(certification._id);
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

    if (window.confirm('Are you sure you want to delete this certification?')) {
      try {
        await axios.delete(`${API_BASE_URL}/api/certificates/${id}`);
        fetchCertifications();
      } catch (err) {
        setError(err.response?.data?.msg || 'Failed to delete certification. Check network or server logs.');
        console.error('Error deleting certification:', err);
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
          {isEditing ? 'Edit Certification' : 'Add New Certification'}
        </h2>
        {error && <p className="text-red-500 text-center text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
          <input
            type="text"
            name="name"
            placeholder="Certification Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
          <input
            type="text"
            name="issuer"
            placeholder="Issuing Organization (e.g., Coursera, Microsoft)"
            value={formData.issuer}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <label htmlFor="issueDate" className="block text-gray-700 font-medium pt-2">Issue Date:</label>
          <input
            type="date"
            id="issueDate"
            name="issueDate"
            value={formData.issueDate}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="url"
            name="credentialUrl"
            placeholder="Credential URL (link to certificate)"
            value={formData.credentialUrl}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="url"
            name="imageUrl"
            placeholder="Image URL (e.g., badge image)"
            value={formData.imageUrl}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <div className="flex justify-end space-x-4">
            {isEditing && (
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setCurrentCertificationId(null);
                  setFormData({ name: '', issuer: '', issueDate: '', credentialUrl: '', imageUrl: '' });
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
              {isEditing ? 'Update Certification' : 'Add Certification'}
            </button>
          </div>
        </form>

        <h3 className="text-2xl font-bold text-gray-800 mb-4 border-t pt-8 mt-8">Your Certifications</h3>
        {loading ? (
          <p className="text-gray-600 text-center">Loading certifications...</p>
        ) : certifications.length === 0 ? (
          <p className="text-gray-600 text-center">No certifications added yet.</p>
        ) : (
          <ul className="space-y-4">
            {certifications.map(cert => (
              <li key={cert._id} className="bg-gray-50 p-4 rounded-lg shadow-md flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0 sm:space-x-4">
                <div className="text-center sm:text-left flex-grow">
                  <h4 className="font-semibold text-xl text-gray-800">{cert.name}</h4>
                  <p className="text-gray-600">Issued by: {cert.issuer}</p>
                  {cert.issueDate && <p className="text-sm text-gray-500">Issued on: {new Date(cert.issueDate).toLocaleDateString()}</p>}
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-sm"
                    >
                      View Credential
                    </a>
                  )}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(cert)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-600 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(cert._id)}
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