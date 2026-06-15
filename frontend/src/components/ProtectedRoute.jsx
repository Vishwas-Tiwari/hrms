import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children, role }){
  const token = localStorage.getItem('token')
  const currentRole = localStorage.getItem('role')
  if (!token) return <Navigate to="/login" replace />
  if (role && role !== currentRole) return <Navigate to="/login" replace />
  return children
}
