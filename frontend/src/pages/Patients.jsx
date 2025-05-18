import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    phone: '',
    address: '',
    sex: ''
  });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState(null);

  const fetchPatients = async () => {
    try {
      const res = await api.get('api/patients');
      setPatients(res.data);
      setError(null);
    } catch (error) {
      setError(error.response?.data?.message || 'Error fetching patients');
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`api/patients/${editId}`, formData);
        setEditId(null);
      } else {
        await api.post('api/patients', formData);
      }
      setFormData({ name: '', dob: '', phone: '', address: '', sex: '' });
      setError(null);
      fetchPatients();
    } catch (error) {
      setError(error.response?.data?.message || 'Error submitting form');
    }
  };

  const handleEdit = (patient) => {
    setFormData({
      name: patient.name,
      dob: patient.dob,
      phone: patient.phone,
      address: patient.address,
      sex: patient.sex
    });
    setEditId(patient.id);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`api/patients/${id}`);
      setError(null);
      fetchPatients();
    } catch (error) {
      setError(error.response?.data?.message || 'Error deleting patient');
    }
  };

  const formatDate = (dob) => {
    const date = new Date(dob);
    return date.toLocaleDateString();
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
      <div className="ml-64 flex flex-col p-6 bg-gray-50 min-h-screen">
    <div className="w-full max-w-40xl">
        <h2 className="text-3xl font-bold text-amber-700 mb-6 text-center">Patients Management</h2>

        {error && <div className="text-red-600 mb-6 text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 shadow-md rounded-lg border border-amber-200 mb-10">
          <input className="border border-amber-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-400" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
          <input className="border border-amber-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-400" type="date" name="dob" value={formData.dob} onChange={handleChange} required />
          <input className="border border-amber-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-400" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
          <input className="border border-amber-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-400" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
          <select className="border border-amber-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-400" name="sex" value={formData.sex} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
          <button type="submit" className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600 transition col-span-full font-semibold">
            {editId ? 'Update Patient' : 'Add Patient'}
          </button>
        </form>

       <div className="overflow-x-auto">
<table className="min-w-full table-auto bg-white shadow rounded-lg">   
            <thead className="bg-amber-100 text-amber-800 font-semibold">
              <tr>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Age</th>
                <th className="px-4 py-2 border">DOB</th>
                <th className="px-4 py-2 border">Phone</th>
                <th className="px-4 py-2 border">Address</th>
                <th className="px-4 py-2 border">Gender</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((p) => (
                <tr key={p.id} className="hover:bg-amber-50 transition">
                  <td className="px-4 py-2 border">{p.name}</td>
                  <td className="px-4 py-2 border">{calculateAge(p.dob)}</td>
                  <td className="px-4 py-2 border">{formatDate(p.dob)}</td>
                  <td className="px-4 py-2 border">{p.phone}</td>
                  <td className="px-4 py-2 border">{p.address}</td>
                  <td className="px-4 py-2 border">{p.sex === 'M' ? 'Male' : 'Female'}</td>
                  <td className="px-4 py-2 border">{p.sex === 'M' ? 'Male' : 'Female'}</td>
                  <td className="px-4 py-2 border space-x-2 text-center">
                    <button onClick={() => handleEdit(p)} className="bg-amber-400 text-white px-3 py-1 rounded hover:bg-amber-500 transition">Edit</button>
                    <button onClick={() => handleDelete(p.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">Delete</button>
                  </td>
                </tr>
              ))}
              {patients.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center text-gray-500 py-6">No patients found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      </div>
    
  );
};

export default Patients;
