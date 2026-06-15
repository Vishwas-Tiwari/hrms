import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar(){
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')

  const logout = ()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    navigate('/login')
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">NIC HRMS</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbar" aria-controls="mainNavbar" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {token && role === 'EMPLOYEE' && <li className="nav-item"><Link className="nav-link" to="/employee">Dashboard</Link></li>}
            {token && role === 'EMPLOYEE' && <li className="nav-item"><Link className="nav-link" to="/employee/profile">Profile</Link></li>}
            {token && role === 'EMPLOYEE' && <li className="nav-item"><Link className="nav-link" to="/employee/assessment">Assessment</Link></li>}
            {token && role === 'EMPLOYEE' && <li className="nav-item"><Link className="nav-link" to="/employee/history">History</Link></li>}
            {token && role === 'MANAGER' && <li className="nav-item"><Link className="nav-link" to="/manager">Manager</Link></li>}
            {token && role === 'ADMIN' && <li className="nav-item"><Link className="nav-link" to="/admin">Admin</Link></li>}
          </ul>
          <div className="d-flex align-items-center gap-2">
            {token && role && <span className="badge bg-light text-primary text-uppercase py-2 px-3">{role}</span>}
            {!token ? (
              <Link className="btn btn-outline-light btn-sm" to="/login">Login</Link>
            ) : (
              <button className="btn btn-light btn-sm" onClick={logout}>Logout</button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
