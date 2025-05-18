import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaUserInjured, FaUserMd, FaFileMedicalAlt, FaSignOutAlt } from 'react-icons/fa';
import { setAuthToken } from '../services/api';

const Sidebar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuthToken(null);
    navigate('/login');
  };

  return (
    <div className="h-full w-64 bg-amber-600 text-white p-5 flex flex-col justify-between fixed top-0 left-0">
      <div>
        <h3 className="text-2xl font-bold mb-8">Kabutare HMS</h3>
        <ul className="space-y-4">
          <li>
            <Link to="/dashboard" className="flex items-center gap-2 hover:text-amber-200">
              <FaTachometerAlt /> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/patients" className="flex items-center gap-2 hover:text-amber-200">
              <FaUserInjured /> Patients
            </Link>
          </li>
          {user?.role === 'Admin' && (
            <li>
              <Link to="/doctors" className="flex items-center gap-2 hover:text-amber-200">
                <FaUserMd /> Doctors
              </Link>
            </li>
          )}
          <li>
            <Link to="/reports" className="flex items-center gap-2 hover:text-amber-200">
              <FaFileMedicalAlt /> Reports
            </Link>
          </li>
        </ul>
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 bg-white text-amber-700 py-2 px-4 rounded hover:bg-amber-100 transition mt-10"
      >
        <FaSignOutAlt /> Logout
      </button>
    </div>
  );
};

export default Sidebar;