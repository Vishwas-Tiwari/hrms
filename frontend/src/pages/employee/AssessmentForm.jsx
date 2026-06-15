import React, { useState, useEffect } from 'react'
import api from '../../services/api'

export default function AssessmentForm(){
  const currentYear = new Date().getFullYear()
  const [formData, setFormData] = useState({
    assessmentYear: currentYear,
    selfAssessment: '',
    keyAchievements: '',
    challenges: '',
    trainingUndertaken: '',
    goalsForNextYear: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      setError(null)
      setSuccess(null)
      
      // Get employee ID from employees list (or use a proper endpoint to get current employee)
      const empResponse = await api.get('/employees')
      if (!empResponse.data || empResponse.data.length === 0) {
        throw new Error('Employee not found')
      }
      
      const employeeId = empResponse.data[0].id
      const payload = {
        ...formData,
        employeeId: employeeId
      }
      
      await api.post('/assessments', payload)
      setSuccess('Assessment saved successfully!')
      setFormData({
        assessmentYear: currentYear,
        selfAssessment: '',
        keyAchievements: '',
        challenges: '',
        trainingUndertaken: '',
        goalsForNextYear: ''
      })
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Failed to save assessment')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="card-title mb-3">Assessment Form</h2>
        <p className="text-muted mb-4">Fill in your self-review area, strengths, and goals for the current assessment period.</p>

        {success && <div className="alert alert-success">{success}</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Assessment Year</label>
            <input 
              type="number" 
              className="form-control" 
              name="assessmentYear" 
              value={formData.assessmentYear}
              onChange={handleChange}
              disabled
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Self Assessment</label>
            <textarea 
              className="form-control" 
              rows="4" 
              name="selfAssessment"
              value={formData.selfAssessment}
              onChange={handleChange}
              placeholder="Describe your overall performance and contributions...">
            </textarea>
          </div>

          <div className="mb-3">
            <label className="form-label">Key Achievements</label>
            <textarea 
              className="form-control" 
              rows="4" 
              name="keyAchievements"
              value={formData.keyAchievements}
              onChange={handleChange}
              placeholder="Describe your top accomplishments...">
            </textarea>
          </div>

          <div className="mb-3">
            <label className="form-label">Challenges</label>
            <textarea 
              className="form-control" 
              rows="3" 
              name="challenges"
              value={formData.challenges}
              onChange={handleChange}
              placeholder="Share any roadblocks or opportunities...">
            </textarea>
          </div>

          <div className="mb-3">
            <label className="form-label">Training Undertaken</label>
            <textarea 
              className="form-control" 
              rows="3" 
              name="trainingUndertaken"
              value={formData.trainingUndertaken}
              onChange={handleChange}
              placeholder="List any training or professional development you completed...">
            </textarea>
          </div>

          <div className="mb-3">
            <label className="form-label">Goals for Next Year</label>
            <textarea 
              className="form-control" 
              rows="3" 
              name="goalsForNextYear"
              value={formData.goalsForNextYear}
              onChange={handleChange}
              placeholder="Set your next performance goals...">
            </textarea>
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Saving...' : 'Save Assessment'}
          </button>
        </form>
      </div>
    </div>
  )
}
