import React, { useState, useEffect } from 'react';
import api from '../services/api';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await api.get('/api/doctors');
        setDoctors(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch doctors');
      }
    };
    fetchDoctors();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-amber-600 mb-4">Doctors List</h2>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      <ul className="space-y-2">
        {doctors.map((doctor) => (
          <li key={doctor.id} className="p-3 bg-white rounded shadow">
            {doctor.name} - {doctor.specialization} - {doctor.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorList;