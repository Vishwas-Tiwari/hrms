import React, { useState, useEffect } from 'react'
import api from '../../services/api'
import ReviewList from './ReviewList'

export default function ManagerDashboard(){
  const [stats, setStats] = useState({ employees: 0, pending: 0, approved: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [managerId, setManagerId] = useState(null)

  useEffect(() => {
    fetchManagerStats()
  }, [])

  const fetchManagerStats = async () => {
    try {
      setLoading(true)
      // Get first manager ID
      const managersResponse = await api.get('/admin/managers')
      if (managersResponse.data && managersResponse.data.length > 0) {
        const mgrId = managersResponse.data[0].id
        setManagerId(mgrId)
        
        // Get assigned employees
        const empResponse = await api.get(`/manager/employees/${mgrId}`)
        const employees = empResponse.data || []
        
        // Get assessments for this manager
        const assessResponse = await api.get(`/manager/assessments/pending/${mgrId}`)
        const assessments = assessResponse.data || []
        
        setStats({
          employees: employees.length,
          pending: assessments.filter(a => a.status === 'SUBMITTED' || a.status === 'UNDER_REVIEW').length,
          approved: assessments.filter(a => a.status === 'APPROVED').length
        })
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load dashboard')
    } finally {
      setLoading(false)
    }
  }

  if (error) return <div className="alert alert-danger">{error}</div>

  return (
    <div>
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start gap-3 mb-4">
        <div>
          <h2>Manager Dashboard</h2>
          <p className="text-muted">Manage pending reviews and provide timely feedback for your team members.</p>
        </div>
      </div>

      {!loading && (
        <div className="row g-4 mb-4">
          <div className="col-md-4">
            <div className="card shadow-sm border-0 bg-primary text-white">
              <div className="card-body">
                <h3 className="card-title">{stats.employees}</h3>
                <p className="card-text">Assigned Employees</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm border-0 bg-warning text-dark">
              <div className="card-body">
                <h3 className="card-title">{stats.pending}</h3>
                <p className="card-text">Pending Reviews</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm border-0 bg-success text-white">
              <div className="card-body">
                <h3 className="card-title">{stats.approved}</h3>
                <p className="card-text">Approved Assessments</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <ReviewList />
    </div>
  )
}
