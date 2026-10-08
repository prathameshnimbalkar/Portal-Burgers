import React from 'react';

export default function WelcomePage({ onGoToUsers, userCount, onTriggerApiTest, isApiLoading }) {
  return (
    <div className="welcome-page">
      {/* Hero Section */}
      <section className="hero-card">
        <div className="hero-content">
          <div className="hero-tag">
            <span className="sparkle">✨</span> Welcome to Alpha Portal
          </div>
          <h1 className="hero-title">
            The Hub for Gourmet <span className="highlight-text">Burger Crafters</span> & Members
          </h1>
          <p className="hero-subtitle">
            A fast, lightweight web application showcasing mock API integration,
            interactive user directory management, and modern responsive design.
          </p>

          <div className="hero-actions">
            <button className="primary-btn" onClick={onGoToUsers}>
              <span>Explore Users Directory</span>
              <span className="btn-arrow">→</span>
            </button>
            <button 
              className="secondary-btn" 
              onClick={onTriggerApiTest} 
              disabled={isApiLoading}
            >
              {isApiLoading ? (
                <>
                  <span className="mini-spinner"></span>
                  <span>Fetching Mock API...</span>
                </>
              ) : (
                <>
                  <span>⚡ Test Mock API Call</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="hero-visual">
          <div className="burger-badge-card">
            <div className="big-burger-emoji">🍔</div>
            <div className="specialty-label">Today's Special</div>
            <div className="specialty-name">Truffle Umami Smash</div>
            <div className="specialty-tags">
              <span>Wagyu Beef</span>
              <span>Black Truffle Aioli</span>
              <span>Smoked Gouda</span>
            </div>
            <div className="badge-rating">
              ⭐ 4.95 / 5.0 (340+ Reviews)
            </div>
          </div>
        </div>
      </section>

      {/* Metrics / Stats Row */}
      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <div className="stat-number">{userCount}</div>
            <div className="stat-label">Registered Members</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⚡</div>
          <div className="stat-info">
            <div className="stat-number">~650ms</div>
            <div className="stat-label">Simulated API Latency</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🔥</div>
          <div className="stat-info">
            <div className="stat-number">640+</div>
            <div className="stat-label">Orders Crafted</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🛡️</div>
          <div className="stat-info">
            <div className="stat-number">100%</div>
            <div className="stat-label">Zero Bloat Architecture</div>
          </div>
        </div>
      </section>

      {/* Highlights Grid */}
      <section className="highlights-section">
        <h2 className="section-title">What's Inside This App</h2>
        <div className="cards-grid">
          <div className="feature-card">
            <div className="feature-icon-wrap" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b' }}>
              📡
            </div>
            <h3>Mock API Layer</h3>
            <p>
              Asynchronous Promise-based data source providing realistic latency, response objects,
              error simulations, and create mutations.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrap" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
              📋
            </div>
            <h3>Live Users List</h3>
            <p>
              View members with roles, emails, favorite burgers, and stats. Supports instant search,
              role filtering, detail modal, and adding new members.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrap" style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8' }}>
              🎨
            </div>
            <h3>Pure Vanilla CSS</h3>
            <p>
              Custom responsive design system featuring sleek dark mode tones, subtle glassmorphism cards,
              and micro-animations without heavy styling libraries.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
