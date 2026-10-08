import React from 'react';

export default function Navbar({ activeTab, setActiveTab, userCount }) {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="brand" onClick={() => setActiveTab('welcome')} role="button" tabIndex={0}>
          <span className="brand-icon">🍔</span>
          <div className="brand-text">
            <span className="brand-title">Burger Hub</span>
            <span className="brand-badge">Alpha Portal</span>
          </div>
        </div>

        <nav className="nav-links">
          <button
            className={`nav-btn ${activeTab === 'welcome' ? 'active' : ''}`}
            onClick={() => setActiveTab('welcome')}
          >
            <span className="nav-btn-icon">🏠</span>
            <span>Welcome</span>
          </button>
          <button
            className={`nav-btn ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            <span className="nav-btn-icon">👥</span>
            <span>Users List</span>
            {userCount > 0 && <span className="nav-count-badge">{userCount}</span>}
          </button>
        </nav>

        <div className="nav-status">
          <span className="status-dot"></span>
          <span className="status-label">Mock API Ready</span>
        </div>
      </div>
    </header>
  );
}
