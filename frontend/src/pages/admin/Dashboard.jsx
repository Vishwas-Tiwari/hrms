import React, { useEffect, useState } from 'react'
import api from '../../services/api'

export default function AdminDashboard(){
  const [stats, setStats] = useState({ employees: 0, managers: 0, assessments: 0 })
  const [employees, setEmployees] = useState([])
  const [managers, setManagers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      
      // Fetch employees
      const empResponse = await api.get('/admin/employees')
      const empData = empResponse.data || []
      setEmployees(empData)
      
      // Fetch managers
      const mgrResponse = await api.get('/admin/managers')
      const mgrData = mgrResponse.data || []
      setManagers(mgrData)
      
      // Set stats
      setStats({
        employees: empData.length,
        managers: mgrData.length,
        assessments: empData.length // Placeholder; could be actual count
      })
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load admin data')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="alert alert-info">Loading dashboard...</div>
  if (error) return <div className="alert alert-danger">{error}</div>

  return (
    <div>
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start gap-3 mb-4">
        <div>
          <h2>Admin Dashboard</h2>
          <p className="text-muted">Monitor the HRMS environment, teams, and assessment workflows from one central screen.</p>
        </div>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="card shadow-sm border-0 bg-primary text-white">
            <div className="card-body">
              <h3 className="card-title">{stats.employees}</h3>
              <p className="card-text">Total Employees</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm border-0 bg-success text-white">
            <div className="card-body">
              <h3 className="card-title">{stats.managers}</h3>
              <p className="card-text">Managers</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm border-0 bg-info text-white">
            <div className="card-body">
              <h3 className="card-title">{stats.assessments}</h3>
              <p className="card-text">Assessments Cycle</p>
            </div>
          </div>
        </div>
      </div>

      <ul className="nav nav-tabs mb-4" role="tablist">
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'employees' ? 'active' : ''}`}
            onClick={() => setActiveTab('employees')}
          >
            Employees ({employees.length})
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'managers' ? 'active' : ''}`}
            onClick={() => setActiveTab('managers')}
          >
            Managers ({managers.length})
          </button>
        </li>
      </ul>

      {activeTab === 'overview' && (
        <div className="row g-4">
          <div className="col-md-6">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title">System Health</h5>
                <p className="mb-2"><strong>Active Assessments:</strong> {stats.assessments}</p>
                <p className="mb-2"><strong>Pending Reviews:</strong> N/A</p>
                <p className="mb-0"><strong>Completion Rate:</strong> 0%</p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title">Quick Actions</h5>
                <button className="btn btn-primary btn-sm me-2 mb-2">Create Assessment Cycle</button>
                <button className="btn btn-outline-primary btn-sm me-2 mb-2">Export Reports</button>
                <button className="btn btn-outline-secondary btn-sm mb-2">System Settings</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'employees' && (
        <div className="card shadow-sm border-0">
          <div className="card-body">
            <h5 className="card-title mb-3">Employees List</h5>
            {employees.length === 0 ? (
              <div className="alert alert-info mb-0">No employees found.</div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Code</th>
                      <th>Name</th>
                      <th>Designation</th>
                      <th>Department</th>
                      <th>Manager</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map(emp => (
                      <tr key={emp.id}>
                        <td>{emp.employeeCode}</td>
                        <td>{emp.name}</td>
                        <td>{emp.designation}</td>
                        <td>{emp.departmentId || 'Unassigned'}</td>
                        <td>{emp.managerId || 'Unassigned'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'managers' && (
        <div className="card shadow-sm border-0">
          <div className="card-body">
            <h5 className="card-title mb-3">Managers List</h5>
            {managers.length === 0 ? (
              <div className="alert alert-info mb-0">No managers found.</div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Designation</th>
                      <th>Department</th>
                      <th>User ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {managers.map(mgr => (
                      <tr key={mgr.id}>
                        <td>{mgr.id}</td>
                        <td>{mgr.name}</td>
                        <td>{mgr.designation}</td>
                        <td>{mgr.departmentId || 'Unassigned'}</td>
                        <td>{mgr.userId || 'Not linked'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
