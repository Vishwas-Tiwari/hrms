import React, { useState, useEffect } from 'react'
import api from '../../services/api'

export default function AssessmentHistory(){
  const [assessments, setAssessments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedAssessment, setSelectedAssessment] = useState(null)

  useEffect(() => {
    fetchHistory()
  }, [])

  const fetchHistory = async () => {
    try {
      setLoading(true)
      // Get employee ID first
      const empResponse = await api.get('/employees')
      if (empResponse.data && empResponse.data.length > 0) {
        const employeeId = empResponse.data[0].id
        const response = await api.get(`/assessments/employee/${employeeId}`)
        setAssessments(response.data || [])
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load assessment history')
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status) => {
    const colors = {
      DRAFT: 'secondary',
      SUBMITTED: 'info',
      UNDER_REVIEW: 'warning',
      APPROVED: 'success',
      REJECTED: 'danger',
      RETURNED: 'warning'
    }
    return <span className={`badge bg-${colors[status] || 'secondary'}`}>{status || 'Unknown'}</span>
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-start mb-4">
        <div>
          <h2>Assessment History</h2>
          <p className="text-muted">Review past self-assessments, scores, and manager feedback in one place.</p>
        </div>
      </div>

      {loading && <div className="alert alert-info">Loading assessments...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && assessments.length === 0 && (
        <div className="alert alert-info">No assessments found. Start your first assessment!</div>
      )}

      {!loading && assessments.length > 0 && (
        <div className="row">
          <div className="col-lg-8">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Year</th>
                        <th>Status</th>
                        <th>Submitted</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {assessments.map((assessment) => (
                        <tr key={assessment.id}>
                          <td>{assessment.assessmentYear}</td>
                          <td>{getStatusBadge(assessment.status)}</td>
                          <td>{assessment.createdAt ? new Date(assessment.createdAt).toLocaleDateString() : 'N/A'}</td>
                          <td>
                            <button 
                              className="btn btn-sm btn-outline-primary"
                              onClick={() => setSelectedAssessment(assessment)}
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {selectedAssessment && (
            <div className="col-lg-4">
              <div className="card shadow-sm border-0">
                <div className="card-header bg-light d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Assessment {selectedAssessment.assessmentYear}</h5>
                  <button className="btn-close" onClick={() => setSelectedAssessment(null)}></button>
                </div>
                <div className="card-body small">
                  <h6>Key Achievements</h6>
                  <p className="text-muted">{selectedAssessment.keyAchievements || 'N/A'}</p>

                  <h6>Challenges</h6>
                  <p className="text-muted">{selectedAssessment.challenges || 'N/A'}</p>

                  <h6>Goals for Next Year</h6>
                  <p className="text-muted">{selectedAssessment.goalsForNextYear || 'N/A'}</p>

                  <h6>Manager Remarks</h6>
                  <p className="text-muted">{selectedAssessment.managerRemarks || 'Pending review'}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
