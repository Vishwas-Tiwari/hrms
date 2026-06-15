import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import EmployeeDashboard from './pages/employee/Dashboard'
import Profile from './pages/employee/Profile'
import AssessmentForm from './pages/employee/AssessmentForm'
import AssessmentHistory from './pages/employee/AssessmentHistory'
import ManagerDashboard from './pages/manager/Dashboard'
import AdminDashboard from './pages/admin/Dashboard'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'

export default function App(){
  const RedirectToRole = () => {
    const role = localStorage.getItem('role')
    if (!role) return <Navigate to="/login" replace />
    if (role === 'EMPLOYEE') return <Navigate to="/employee" replace />
    if (role === 'MANAGER') return <Navigate to="/manager" replace />
    if (role === 'ADMIN') return <Navigate to="/admin" replace />
    return <Navigate to="/login" replace />
  }

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/" element={<RedirectToRole/>} />

          <Route path="/employee" element={<ProtectedRoute role="EMPLOYEE"><EmployeeDashboard/></ProtectedRoute>} />
          <Route path="/employee/profile" element={<ProtectedRoute role="EMPLOYEE"><Profile/></ProtectedRoute>} />
          <Route path="/employee/assessment" element={<ProtectedRoute role="EMPLOYEE"><AssessmentForm/></ProtectedRoute>} />
          <Route path="/employee/history" element={<ProtectedRoute role="EMPLOYEE"><AssessmentHistory/></ProtectedRoute>} />

          <Route path="/manager" element={<ProtectedRoute role="MANAGER"><ManagerDashboard/></ProtectedRoute>} />

          <Route path="/admin" element={<ProtectedRoute role="ADMIN"><AdminDashboard/></ProtectedRoute>} />

        </Routes>
      </div>
    </div>
  )
}
