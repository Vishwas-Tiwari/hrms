import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'

export default function EmployeeDashboard(){
  const currentYear = new Date().getFullYear()
  const [employee, setEmployee] = useState(null)
  const [currentAssessment, setCurrentAssessment] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      // Fetch employee profile
      const empResponse = await api.get('/employees')
      if (empResponse.data && empResponse.data.length > 0) {
        const emp = empResponse.data[0]
        setEmployee(emp)
        
        // Fetch current year assessment
        const assessResponse = await api.get(`/assessments/employee/${emp.id}`)
        if (assessResponse.data && assessResponse.data.length > 0) {
          const current = assessResponse.data.find(a => a.assessmentYear === currentYear)
          setCurrentAssessment(current || assessResponse.data[0])
        }
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load dashboard')
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status) => {
    const colors = {
      DRAFT: 'secondary',
      SUBMITTED: 'info',
      UNDER_REVIEW: 'warning',
      APPROVED: 'success',
      REJECTED: 'danger',
      RETURNED: 'warning'
    }
    return colors[status] || 'secondary'
  }

  return (
    <div>
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start gap-3 mb-4">
        <div>
          <h2>Employee Dashboard</h2>
          <p className="text-muted">Track your assessment progress, update your profile, and submit self-performance reviews.</p>
        </div>
        <div className="text-md-end">
          <Link to="/employee/assessment" className="btn btn-primary me-2 mb-2">Start Assessment</Link>
          <Link to="/employee/history" className="btn btn-outline-primary mb-2">View History</Link>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
      {loading && <div className="alert alert-info">Loading dashboard...</div>}

      {!loading && employee && (
        <>
          <div className="row g-4 mb-4">
            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body">
                  <h5 className="card-title">Current Review</h5>
                  <p className="card-text text-muted">
                    {currentAssessment 
                      ? `Status: ${currentAssessment.status || 'DRAFT'}` 
                      : 'Start your assessment for this period'}
                  </p>
                  <Link to="/employee/assessment" className="stretched-link text-decoration-none">Submit now</Link>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body">
                  <h5 className="card-title">My Profile</h5>
                  <p className="card-text text-muted">
                    {employee.name || 'Update your information'}
                  </p>
                  <Link to="/employee/profile" className="stretched-link text-decoration-none">Edit profile</Link>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body">
                  <h5 className="card-title">Assessment History</h5>
                  <p className="card-text text-muted">Review past assessments and feedback</p>
                  <Link to="/employee/history" className="stretched-link text-decoration-none">See history</Link>
                </div>
              </div>
            </div>
          </div>

          <div className="row g-4">
            <div className="col-lg-6">
              <div className="card shadow-sm border-0">
                <div className="card-body">
                  <h5 className="card-title">Current Assessment Status</h5>
                  {currentAssessment ? (
                    <div>
                      <p className="mb-2">
                        <strong>Year:</strong> {currentAssessment.assessmentYear}
                      </p>
                      <p className="mb-2">
                        <strong>Status:</strong> 
                        <span className={`badge bg-${getStatusColor(currentAssessment.status)} ms-2`}>
                          {currentAssessment.status || 'DRAFT'}
                        </span>
                      </p>
                      <p className="text-muted mb-0">
                        {currentAssessment.status === 'DRAFT' 
                          ? 'Your assessment is in draft. Complete and submit it for manager review.' 
                          : 'Your assessment has been submitted. Await manager feedback.'}
                      </p>
                    </div>
                  ) : (
                    <p className="text-muted mb-0">No assessment created yet. Click "Start Assessment" to begin.</p>
                  )}
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card shadow-sm border-0">
                <div className="card-body">
                  <h5 className="card-title">Employee Information</h5>
                  <p className="mb-2"><strong>Name:</strong> {employee.name || 'N/A'}</p>
                  <p className="mb-2"><strong>Code:</strong> {employee.employeeCode || 'N/A'}</p>
                  <p className="mb-2"><strong>Designation:</strong> {employee.designation || 'N/A'}</p>
                  <p className="mb-0"><strong>Department:</strong> {employee.departmentId ? `Dept #${employee.departmentId}` : 'Unassigned'}</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
