import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Login from './components/Login/Login.js';
import Dashboard from './components/Dashboard';
import Summary from './components/Summary';
import Reports from './components/Reports.js';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import './App.css'; 

const App = () => {
  const location = useLocation();

  return (
    <div className={location.pathname === '/' ? 'login-page' : 'no-background'}>
      {location.pathname !== '/' && <Navbar />} 
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/summary"
          element={
            <PrivateRoute>
              <Summary />
            </PrivateRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <PrivateRoute>
              <Reports />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
