import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    username: '',
    password: '',
    position: 'EMPLOYEE'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({ type: '', message: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.username.trim() || !form.password) {
      setAlert({ type: 'error', message: 'Please fill in all fields' });
      return;
    }

    if (form.password.length < 6) {
      setAlert({ type: 'error', message: 'Password must be at least 6 characters long' });
      return;
    }

    setIsLoading(true);
    setAlert({ type: '', message: '' });

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      setAlert({ type: 'success', message: 'Registration successful! Redirecting to login...' });
      
      // Redirect to login after 1.5 seconds
      setTimeout(() => {
        navigate('/login');
      }, 1500);

    } catch (err) {
      setAlert({ type: 'error', message: err.message || 'Connection failed. Ensure backend is running.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h1 className="card-title">Register</h1>
        <p className="card-subtitle">Create your profile</p>
      </div>

      {alert.message && (
        <div className={`alert alert-${alert.type}`}>
          <span>{alert.message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-input"
            placeholder="Enter your name"
            value={form.name}
            onChange={handleChange}
            disabled={isLoading}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            className="form-input"
            placeholder="Choose a username"
            value={form.username}
            onChange={handleChange}
            disabled={isLoading}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-input"
            placeholder="Min 6 characters"
            value={form.password}
            onChange={handleChange}
            disabled={isLoading}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="position">Position</label>
          <select
            id="position"
            name="position"
            className="form-select"
            value={form.position}
            onChange={handleChange}
            disabled={isLoading}
            required
          >
            <option value="HR">HR</option>
            <option value="MANAGER">Manager</option>
            <option value="EMPLOYEE">Employee</option>
          </select>
        </div>

        <button type="submit" className="btn" disabled={isLoading}>
          {isLoading ? <div className="spinner"></div> : 'Create Account'}
        </button>
      </form>

      <p className="toggle-text">
        Already have an account? 
        <span className="toggle-link" onClick={() => navigate('/login')}>Sign In</span>
      </p>
    </div>
  );
}