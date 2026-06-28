import React from 'react';

export default function Dashboard({ user }) {
  if (!user) return null;

  const getBadgeClass = (pos) => {
    if (!pos) return 'employee';
    return pos.toLowerCase();
  };

  const getPositionName = (pos) => {
    switch (pos) {
      case 'HR': return 'HR Manager';
      case 'MANAGER': return 'Manager';
      case 'EMPLOYEE': return 'Employee';
      default: return pos;
    }
  };

  return (
    <div className="card dashboard-card" style={{ marginTop: '80px' }}>
      <div className="user-avatar">
        {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
      </div>
      <h2 className="welcome-msg">Welcome, {user.name}!</h2>
      <div className={`role-badge ${getBadgeClass(user.position)}`}>
        {getPositionName(user.position)}
      </div>

      <div className="info-grid">
        <div className="info-item">
          <span className="info-label">Username</span>
          <span className="info-value">{user.username}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Corporate Position</span>
          <span className="info-value">{getPositionName(user.position)}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Auth Token</span>
          <span className="info-value" style={{ fontSize: '0.75rem', opacity: 0.6, maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {user.token}
          </span>
        </div>
      </div>
    </div>
  );
}