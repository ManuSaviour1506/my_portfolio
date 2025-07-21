// src/pages/AdminDashboard.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // FIX: Changed from process.env to import.meta.env for Vite compatibility
  const API_BASE_URL = import.meta.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setError('');
      const token = localStorage.getItem('token');

      if (!token) {
        navigate('/admin');
        return;
      }

      try {
        axios.defaults.headers.common['x-auth-token'] = token;
        const res = await axios.get(`${API_BASE_URL}/api/auth/me`);
        setUser(res.data);
      } catch (err) {
        console.error('Error fetching user for dashboard:', err);
        setError('Session expired or invalid. Please log in again.');
        localStorage.removeItem('token');
        navigate('/admin');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin');
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-gray-700 text-xl">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-600 text-xl">{error}</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#e0e0e0] flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-2xl text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Welcome, {user.username}!</h2>
        <p className="text-lg text-gray-600 mb-8">Admin Dashboard - Manage Your Portfolio Content</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Link
            to="/admin/projects"
            className="bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center text-lg"
          >
            Manage Projects
          </Link>
          <Link
            to="/admin/certifications"
            className="bg-green-600 text-white py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center text-lg"
          >
            Manage Certifications
          </Link>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
}