import React, { useState, useEffect } from 'react'
import api from '../../services/api'

export default function Profile(){
  const [employee, setEmployee] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editing, setEditing] = useState(false)
  const [formData, setFormData] = useState({ name: '', designation: '' })

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      setLoading(true)
      const response = await api.get('/employees')
      if (response.data && response.data.length > 0) {
        const emp = response.data[0]
        setEmployee(emp)
        setFormData({ name: emp.name, designation: emp.designation })
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load profile')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const response = await api.put(`/employees/${employee.id}`, { ...employee, ...formData })
      setEmployee(response.data)
      setEditing(false)
      setError(null)
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update profile')
    }
  }

  if (loading) return <div className="alert alert-info">Loading profile...</div>
  if (error) return <div className="alert alert-danger">{error}</div>
  if (!employee) return <div className="alert alert-warning">No employee data found</div>

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start mb-4">
          <div>
            <h2 className="card-title">My Profile</h2>
            <p className="text-muted">Review and update your employee details for performance assessment accuracy.</p>
          </div>
          <button className="btn btn-outline-primary btn-sm" onClick={() => setEditing(!editing)}>
            {editing ? 'Cancel' : 'Edit profile'}
          </button>
        </div>

        {!editing ? (
          <div className="row">
            <div className="col-md-6 mb-3">
              <h6 className="text-uppercase text-muted small">Employee</h6>
              <p className="mb-1"><strong>Name:</strong> {employee.name || 'N/A'}</p>
              <p className="mb-1"><strong>Code:</strong> {employee.employeeCode || 'N/A'}</p>
              <p className="mb-0"><strong>Designation:</strong> {employee.designation || 'N/A'}</p>
            </div>
            <div className="col-md-6 mb-3">
              <h6 className="text-uppercase text-muted small">Organization</h6>
              <p className="mb-1"><strong>Department:</strong> {employee.departmentId ? `Dept #${employee.departmentId}` : 'Unassigned'}</p>
              <p className="mb-0"><strong>Manager:</strong> {employee.managerId ? `Manager #${employee.managerId}` : 'Unassigned'}</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleUpdate}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input type="text" className="form-control" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>
            <div className="mb-3">
              <label className="form-label">Designation</label>
              <input type="text" className="form-control" value={formData.designation} onChange={e => setFormData({...formData, designation: e.target.value})} />
            </div>
            <button type="submit" className="btn btn-primary">Save Changes</button>
          </form>
        )}
      </div>
    </div>
  )
}
