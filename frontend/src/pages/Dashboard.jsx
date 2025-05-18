import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserMd, FaFileMedical, FaUserInjured } from 'react-icons/fa';

const Dashboard = () => {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.username) {
      setUsername(user.username);
      setRole(user.role);
    }
  }, []);

  return (
  <div className="flex">
  {/* Add left margin to avoid being hidden behind sidebar */}
  <div className="ml-64 flex flex-col justify-center w-full min-h-screen p-6 bg-gray-50">
    <div className="w-full max-w-4xl">
      {/* Your existing welcome message */}
      <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-amber-600 mb-6 text-center">
        <h2 className="text-3xl font-bold text-amber-700">Welcome, {username}!</h2>
        <p className="mt-2 text-gray-700 text-lg">
          You are in the <span className="font-semibold">Hospital Management System</span>.
        </p>
      </div>

      {/* Dashboard cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/patients"
          className="bg-white hover:bg-amber-100 transition border border-amber-300 shadow-md rounded-xl p-6 flex items-center space-x-4"
        >
          <FaUserInjured className="text-amber-600 text-4xl" />
          <div>
            <h3 className="text-xl font-semibold text-amber-800">Patients</h3>
            <p className="text-gray-600">Manage all patient records</p>
          </div>
        </Link>

        {role === 'Admin' && (
          <Link
            to="/doctors"
            className="bg-white hover:bg-amber-100 transition border border-amber-300 shadow-md rounded-xl p-6 flex items-center space-x-4"
          >
            <FaUserMd className="text-amber-600 text-4xl" />
            <div>
              <h3 className="text-xl font-semibold text-amber-800">Doctors</h3>
              <p className="text-gray-600">Manage your medical staff</p>
            </div>
          </Link>
        )}

        <Link
          to="/reports"
          className="bg-white hover:bg-amber-100 transition border border-amber-300 shadow-md rounded-xl p-6 flex items-center space-x-4"
        >
          <FaFileMedical className="text-amber-600 text-4xl" />
          <div>
            <h3 className="text-xl font-semibold text-amber-800">Reports</h3>
            <p className="text-gray-600">Access medical reports</p>
          </div>
        </Link>
      </div>
    </div>
  </div>
</div>
  );
};

export default Dashboard;
