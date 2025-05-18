import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Report = () => {
  const [reports, setReports] = useState([]);
  const [patients, setPatients] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    patientId: '',
    date: '',
    findings: ''
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReports();
    fetchPatients();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await api.get('api/reports');
      setReports(res.data);
      setError(null);
    } catch (error) {
      setError(error.response?.data?.message || 'Error fetching reports');
    }
  };

  const fetchPatients = async () => {
    try {
      const res = await api.get('api/patients');
      setPatients(res.data);
      setError(null);
    } catch (error) {
      setError(error.response?.data?.message || 'Error fetching patients');
    }
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`api/reports/${editingId}`, formData);
      } else {
        await api.post('api/reports', formData);
      }
      setFormData({ patientId: '', date: '', findings: '' });
      setEditingId(null);
      setError(null);
      fetchReports();
    } catch (error) {
      setError(error.response?.data?.message || 'Error saving report');
    }
  };

  const handleEdit = (report) => {
    setFormData({
      patientId: report.patientId,
      date: report.date.slice(0, 10),
      findings: report.findings
    });
    setEditingId(report.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this report?')) {
      try {
        await api.delete(`api/reports/${id}`);
        setError(null);
        fetchReports();
      } catch (error) {
        setError(error.response?.data?.message || 'Error deleting report');
      }
    }
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
    <div className="w-full max-w-4xl">
      <h2 className="text-3xl font-bold text-amber-700 mb-6 text-center">
        {editingId ? 'Edit Medical Report' : 'Add Medical Report'}
      </h2>

      {error && <div className="text-red-600 mb-6 text-center">{error}</div>}

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 shadow-md rounded-lg border border-amber-200 mb-10"
      >
        <select
          name="patientId"
          value={formData.patientId}
          onChange={handleChange}
          required
          className="w-full border border-amber-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
        >
          <option value="">Select Patient</option>
          {patients.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} (Age: {calculateAge(p.dob)})
            </option>
          ))}
        </select>

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="w-full border border-amber-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
        />

        <textarea
          name="findings"
          placeholder="Findings"
          value={formData.findings}
          onChange={handleChange}
          required
          className="w-full border border-amber-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
        ></textarea>

        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700 font-semibold"
          >
            {editingId ? 'Update Report' : 'Add Report'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setFormData({ patientId: '', date: '', findings: '' });
              }}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 font-semibold"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <h3 className="text-xl font-semibold text-amber-700 mb-4">Reports List</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-amber-200 rounded-lg shadow">
          <thead>
            <tr className="bg-amber-100 text-left text-amber-700">
              <th className="py-2 px-4 border-b">Patient</th>
              <th className="py-2 px-4 border-b">Age</th>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Findings</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.length > 0 ? (
              reports.map((r) => {
                const patient = patients.find((p) => p.id === r.patientId);
                return (
                  <tr key={r.id} className="hover:bg-amber-50">
                    <td className="py-2 px-4 border-b">
                      {patient ? patient.name : 'Unknown'}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {patient ? calculateAge(patient.dob) : '-'}
                    </td>
                    <td className="py-2 px-4 border-b">{r.date.slice(0, 10)}</td>
                    <td className="py-2 px-4 border-b">{r.findings}</td>
                    <td className="py-2 px-4 border-b">{r.findings}</td>
                    <td className="py-2 px-4 border-b space-x-2">
                      <button
                        onClick={() => handleEdit(r)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(r.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 py-4">
                  No reports available.
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

export default Report;