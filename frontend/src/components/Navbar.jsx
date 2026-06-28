import React from 'react';

export default function Navbar({ user, onLogout }) {
  return (
    <nav className="navbar" style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px 40px',
      background: 'hsla(224, 25%, 12%, 0.6)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid hsla(225, 20%, 30%, 0.3)',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100
    }}>
      <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.4rem', letterSpacing: '-0.5px' }}>
        HRMS <span style={{ color: 'var(--primary)', fontWeight: 400 }}>Portal</span>
      </div>
      {user && (
        <button 
          onClick={onLogout}
          style={{
            background: 'transparent',
            border: '1px solid hsla(350, 80%, 60%, 0.4)',
            color: 'var(--error)',
            padding: '8px 16px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '0.9rem',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = 'hsla(350, 80%, 60%, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
          }}
        >
          Sign Out
        </button>
      )}
    </nav>
  );
}