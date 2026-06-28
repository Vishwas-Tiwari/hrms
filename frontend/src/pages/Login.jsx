import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';

export default function Login({ onLoginSuccess }) {
  const [form, setForm] = useState({ username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the browser from reloading (which causes a GET request)
    if (!form.username.trim() || !form.password) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const data = await login(form.username.trim(), form.password);
      onLoginSuccess(data);
      navigate('/dashboard');

    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Connection failed. Ensure backend is running.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h1 className="card-title">Welcome</h1>
        <p className="card-subtitle">Secure portal sign-in</p>
      </div>

      {error && (
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            className="form-input"
            placeholder="Enter your username"
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
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            disabled={isLoading}
            required
          />
        </div>

        <button type="submit" className="btn" disabled={isLoading}>
          {isLoading ? <div className="spinner"></div> : 'Sign In'}
        </button>
      </form>

      <p className="toggle-text">
        Don't have an account? 
        <span className="toggle-link" onClick={() => navigate('/register')}>Sign Up</span>
      </p>
    </div>
  );
}
