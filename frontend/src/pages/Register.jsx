import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post('http://localhost:5000/api/users/register', formData);
      alert('User registered successfully!');
      navigate('/login');
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed';
      setError(msg);
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-amber-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-amber-600 mb-6">Register</h2>
        {error && <div className="text-red-600 mb-4 text-center">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full p-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="w-full p-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            <option value="">Select Role</option>
            <option value="Doctor">Doctor</option>
            <option value="Staff">Staff</option>
          </select>
          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm">
            Already have an account?{' '}
            <a href="/login" className="text-amber-600 hover:underline">
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;