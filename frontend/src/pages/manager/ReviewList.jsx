import React, { useEffect, useState } from 'react'
import api from '../../services/api'

export default function ReviewList(){
  const [assessments, setAssessments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [managerId, setManagerId] = useState(null)
  const [selectedAssessment, setSelectedAssessment] = useState(null)

  useEffect(() => {
    fetchManagerAndAssessments()
  }, [])

  const fetchManagerAndAssessments = async () => {
    try {
      setLoading(true)
      // Get the current manager's employees and pending assessments
      // For now, we'll use the first manager's ID from the backend
      // In a real app, you'd get this from the authenticated user's profile
      const managersResponse = await api.get('/admin/managers')
      if (managersResponse.data && managersResponse.data.length > 0) {
        const mgrId = managersResponse.data[0].id
        setManagerId(mgrId)
        
        const assessResponse = await api.get(`/manager/assessments/pending/${mgrId}`)
        setAssessments(assessResponse.data || [])
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load assessments')
    } finally {
      setLoading(false)
    }
  }

  const handleAction = async (assessmentId, action) => {
    const remarks = prompt(`Enter remarks for ${action}ing this assessment (optional):`)
    if (remarks === null) return // User cancelled
    
    try {
      await api.post(`/manager/assessments/${assessmentId}/${action}`, { managerRemarks: remarks })
      setAssessments(prev => prev.filter(a => a.id !== assessmentId))
      setSelectedAssessment(null)
      alert(`Assessment ${action}ed successfully!`)
    } catch (err) {
      alert(`Failed to ${action} assessment: ${err.response?.data?.error || err.message}`)
    }
  }

  const getStatusBadge = (status) => {
    const colors = {
      DRAFT: 'secondary',
      SUBMITTED: 'warning',
      UNDER_REVIEW: 'info',
      APPROVED: 'success',
      REJECTED: 'danger',
      RETURNED: 'warning'
    }
    return <span className={`badge bg-${colors[status] || 'secondary'}`}>{status || 'PENDING'}</span>
  }

  if (loading) return <div className="alert alert-info">Loading reviews...</div>
  if (error) return <div className="alert alert-danger">{error}</div>

  return (
    <div className="row g-4">
      <div className="col-lg-8">
        <div className="card shadow-sm border-0">
          <div className="card-body">
            <h3 className="card-title mb-4">Pending Reviews</h3>
            {assessments.length === 0 ? (
              <div className="alert alert-info mb-0">No pending reviews available. Check back after employees submit assessments.</div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Employee ID</th>
                      <th>Year</th>
                      <th>Status</th>
                      <th className="text-end">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assessments.map(a => (
                      <tr key={a.id} onClick={() => setSelectedAssessment(a)} style={{cursor: 'pointer'}}>
                        <td>{a.id}</td>
                        <td>{a.employeeId}</td>
                        <td>{a.assessmentYear}</td>
                        <td>{getStatusBadge(a.status)}</td>
                        <td className="text-end">
                          <button 
                            className="btn btn-sm btn-success me-2" 
                            onClick={(e) => { e.stopPropagation(); handleAction(a.id, 'approve') }}
                          >
                            Approve
                          </button>
                          <button 
                            className="btn btn-sm btn-danger me-2" 
                            onClick={(e) => { e.stopPropagation(); handleAction(a.id, 'reject') }}
                          >
                            Reject
                          </button>
                          <button 
                            className="btn btn-sm btn-outline-secondary"
                            onClick={(e) => { e.stopPropagation(); handleAction(a.id, 'return') }}
                          >
                            Return
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedAssessment && (
        <div className="col-lg-4">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-light d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Assessment Details</h5>
              <button className="btn-close" onClick={() => setSelectedAssessment(null)}></button>
            </div>
            <div className="card-body small">
              <p className="mb-2"><strong>Employee ID:</strong> {selectedAssessment.employeeId}</p>
              <p className="mb-2"><strong>Year:</strong> {selectedAssessment.assessmentYear}</p>
              <p className="mb-2"><strong>Status:</strong> {getStatusBadge(selectedAssessment.status)}</p>

              <hr />

              <h6>Key Achievements</h6>
              <p className="text-muted">{selectedAssessment.keyAchievements || 'Not provided'}</p>

              <h6>Challenges</h6>
              <p className="text-muted">{selectedAssessment.challenges || 'Not provided'}</p>

              <h6>Goals</h6>
              <p className="text-muted">{selectedAssessment.goalsForNextYear || 'Not provided'}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
