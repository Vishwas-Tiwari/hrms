import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../services/authService'

export default function Login(){
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    try {
      const data = await login(username, password)
      localStorage.setItem('token', data.token)
      if (data.role) localStorage.setItem('role', data.role)
      navigate('/')
    } catch (err) {
      setError(err?.response?.data || 'Login failed')
    }
  }

  return (
    <div className="row justify-content-center">
      <div className="col-xl-4 col-lg-5 col-md-7">
        <div className="card shadow-sm border-0 login-card">
          <div className="card-body p-4">
            <div className="text-center mb-4">
              <h4 className="fw-bold">Welcome back</h4>
              <p className="text-muted">Sign in to access NIC HRMS performance tools.</p>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={submit}>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  className="form-control"
                  placeholder="Enter your username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
