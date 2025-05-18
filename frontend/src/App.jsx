import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import Doctors from './pages/Doctors';
import Report from './pages/Reports';
import Unauthorized from './components/Unauthorized';
import ProtectedRoute from './components/ProtectedRoutes';
import { setAuthToken } from './services/api';

const App = () => {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
    }
  }, []);

  return (
    <Router>
      <div className="flex h-screen overflow-hidden">
        <Routes>
          {/* Public Routes */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          
          {/* Protected Routes with Sidebar */}
          <Route element={<ProtectedRoute allowedRoles={['Admin', 'Doctor', 'Staff']} />}>
            <Route
              path="/*"
              element={
                <div className="flex h-screen overflow-hidden">
                  <Sidebar />
                  <div className="flex-1 overflow-auto bg-amber-50">
                    <Routes>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/patients" element={<Patients />} />
                      <Route path="/reports" element={<Report />} />
                      {/* Admin-Only Route */}
                      <Route element={<ProtectedRoute allowedRoles={['Admin']} />}>
                        <Route path="/doctors" element={<Doctors />} />
                      </Route>
                    </Routes>
                  </div>
                </div>
              }
            />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;