import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { FaHeartbeat, FaHome, FaFileAlt, FaChartBar, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };
  const handleDashboardClick = () => {
    navigate('/dashboard');
  };

  // if (!token) return null;

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={handleDashboardClick} style={{ cursor: 'pointer' }}>
        
        <FaHeartbeat size={24} color="#4CAF50" />
        <span className="navbar-title">HealthConnect</span>
      </div>
      <div className="navbar-menu">
        <ul className="navbar-links">
          <li>
            <Link to="/dashboard">
              <FaHome /> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/summary">
              <FaFileAlt /> Summary
            </Link>
          </li>
          <li>
            <Link to="/reports">
              <FaChartBar /> Reports
            </Link>
          </li>
        </ul>
        <button className="logout-button" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
