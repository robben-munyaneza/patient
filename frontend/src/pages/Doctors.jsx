import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    phone: '',
    email: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);

  const fetchDoctors = async () => {
    try {
      const res = await api.get('api/doctors');
      setDoctors(res.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch doctors');
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`api/doctors/${editingId}`, formData);
      } else {
        await api.post('api/doctors', formData);
      }
      setFormData({ name: '', specialization: '', phone: '', email: '' });
      setEditingId(null);
      setError(null);
      fetchDoctors();
    } catch (err) {
      setError(err.response?.data?.message || 'Operation failed');
    }
  };

  const handleEdit = (doctor) => {
    setFormData(doctor);
    setEditingId(doctor.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this doctor?')) return;
    try {
      await api.delete(`api/doctors/${id}`);
      setError(null);
      fetchDoctors();
    } catch (err) {
      setError('Failed to delete doctor');
    }
  };

  return (
   <div className="ml-64 flex flex-col p-6 bg-gray-50 min-h-screen">
    <div className="w-full max-w-4xl">
      <h2 className="text-3xl font-bold text-amber-700 mb-6 text-center">Doctors Management</h2>

      {error && <div className="text-red-600 mb-6 text-center">{error}</div>}

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 shadow-md rounded-lg border border-amber-200 mb-10"
      >
        <input
          className="border border-amber-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
          name="name"
          placeholder="Doctor Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          className="border border-amber-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
          name="specialization"
          placeholder="Specialization"
          value={formData.specialization}
          onChange={handleChange}
          required
        />
        <input
          className="border border-amber-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <input
          className="border border-amber-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700 transition col-span-full font-semibold"
        >
          {editingId ? 'Update Doctor' : 'Add Doctor'}
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="w-full table-auto bg-white shadow rounded-lg overflow-hidden">
          <thead className="bg-amber-100 text-amber-800 font-semibold">
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Specialization</th>
              <th className="px-4 py-2 border">Phone</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doc) => (
              <tr key={doc.id} className="hover:bg-amber-50 transition">
                <td className="px-4 py-2 border">{doc.name}</td>
                <td className="px-4 py-2 border">{doc.specialization}</td>
                <td className="px-4 py-2 border">{doc.phone}</td>
                <td className="px-4 py-2 border">{doc.email}</td>
                 <td className="px-4 py-2 border">{doc.email}</td>
                <td className="px-4 py-2 border space-x-2 text-center">
                  <button
                    onClick={() => handleEdit(doc)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(doc.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {doctors.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 py-6">
                  No doctors found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default Doctors;