// src/pages/AdminLogin.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // FIX: Changed from process.env to import.meta.env for Vite compatibility
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post(`${API_BASE_URL}/api/admin/login`, { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed. Please check your email and password.');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#e0e0e0] flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Admin Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <div>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-800 placeholder-gray-500"
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-800 placeholder-gray-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}