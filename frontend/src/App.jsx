import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

export default function App() {
  const [user, setUser] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const navigate = useNavigate();

  // Load user session on startup
  useEffect(() => {
    const savedUser = localStorage.getItem('auth_user');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setUser(parsed);
        // Save token separately so ProtectedRoute can inspect it
        localStorage.setItem('auth_token', parsed.token);
        localStorage.setItem('token', parsed.token);
      } catch (e) {
        localStorage.removeItem('auth_user');
        localStorage.removeItem('auth_token');
        localStorage.removeItem('token');
      }
    }
    setIsInitializing(false);
  }, []);

  // Handle successful login
  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem('auth_user', JSON.stringify(userData));
    localStorage.setItem('auth_token', userData.token);
    localStorage.setItem('token', userData.token);
  };

  // Handle user logout
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('auth_user');
    localStorage.removeItem('auth_token');
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Show a blank loading screen while reading localStorage on startup
  if (isInitializing) {
    return <div className="spinner" style={{ margin: 'auto' }}></div>;
  }

  return (
    <div>
      {/* 1. Global Navigation Bar */}
      <Navbar user={user} onLogout={handleLogout} />

      {/* 2. Page Content Container */}
      <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', width: '100vw' }}>
        <Routes>
          {/* Default Route: Redirect based on authentication status */}
          <Route 
            path="/" 
            element={user ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />} 
          />

          {/* Login Route: Redirect to dashboard if already logged in */}
          <Route 
            path="/login" 
            element={user ? <Navigate to="/dashboard" replace /> : <Login onLoginSuccess={handleLoginSuccess} />} 
          />

          {/* Register Route */}
          <Route 
            path="/register" 
            element={user ? <Navigate to="/dashboard" replace /> : <Register />} 
          />

          {/* Secure Dashboard Route: Protected by Route Guard */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard user={user} />
              </ProtectedRoute>
            } 
          />

          {/* Fallback Route: Redirect invalid URLs back to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}
