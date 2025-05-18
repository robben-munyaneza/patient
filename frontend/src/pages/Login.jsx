import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api, { setAuthToken } from '../services/api';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  // Handle form data changes
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // Handle form submission (login)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/api/users/login', formData); // Make sure the backend is responding with user & token
      const { token, user } = res.data;

      // Store token and user info in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user)); // Save the user object

      // Set the authorization token in axios headers
      setAuthToken(token);

      // Redirect to dashboard
      navigate('/dashboard');
    } catch (err) {
      alert('Login failed: ' + err.response?.data?.message || 'Unknown error');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-amber-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-amber-600 mb-6">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="username"
            placeholder="Username"
            onChange={handleChange}
            value={formData.username}
            required
            className="w-full p-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            value={formData.password}
            required
            className="w-full p-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
          />

          <button
            type="submit"
            className="w-full p-3 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm">
            Don't have an account?{' '}
            <a href="/register" className="text-amber-600 hover:underline">
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
