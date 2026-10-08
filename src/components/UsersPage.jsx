import React, { useState, useMemo } from 'react';
import UserModal from './UserModal';
import AddUserModal from './AddUserModal';

const SORT_OPTIONS = [
  { value: 'orders-desc', label: 'Most Orders' },
  { value: 'orders-asc', label: 'Least Orders' },
  { value: 'name-asc', label: 'Name (A to Z)' },
  { value: 'name-desc', label: 'Name (Z to A)' },
  { value: 'newest', label: 'Newest First' }
];

export default function UsersPage({
  users,
  loading,
  error,
  lastFetched,
  onRefresh,
  onAddUser,
  onTriggerError,
  onIncrementOrders
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('ALL');
  const [sortBy, setSortBy] = useState('orders-desc');
  const [activeUserModal, setActiveUserModal] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Available unique roles for filter
  const roles = useMemo(() => {
    const list = Array.from(new Set(users.map((u) => u.role)));
    return ['ALL', ...list];
  }, [users]);

  // Filtered and sorted users list following best practices
  const filteredUsers = useMemo(() => {
    const filtered = users.filter((user) => {
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        String(user.name || '').toLowerCase().includes(query) ||
        String(user.email || '').toLowerCase().includes(query) ||
        (user.favoriteBurger && String(user.favoriteBurger).toLowerCase().includes(query));
      const matchesRole = selectedRole === 'ALL' || user.role === selectedRole;
      return matchesSearch && matchesRole;
    });

    return [...filtered].sort((a, b) => {
      const activeSort = SORT_OPTIONS.some((opt) => opt.value === sortBy) ? sortBy : 'orders-desc';
      switch (activeSort) {
        case 'orders-desc':
          return (Number(b.ordersCount) || 0) - (Number(a.ordersCount) || 0);
        case 'orders-asc':
          return (Number(a.ordersCount) || 0) - (Number(b.ordersCount) || 0);
        case 'name-asc':
          return String(a.name || '').localeCompare(String(b.name || ''));
        case 'name-desc':
          return String(b.name || '').localeCompare(String(a.name || ''));
        case 'newest':
          return (Number(b.id) || 0) - (Number(a.id) || 0);
        default:
          return 0;
      }
    });
  }, [users, searchQuery, selectedRole, sortBy]);

  // Keep modal data fresh when orders count changes
  const selectedUser = useMemo(() => {
    if (!activeUserModal) return null;
    return users.find((u) => u.id === activeUserModal.id) || activeUserModal;
  }, [users, activeUserModal]);

  const handleSelectUser = (user) => {
    setActiveUserModal(user);
  };

  return (
    <div className="users-page">
      {/* Top Header */}
      <div className="page-header">
        <div>
          <div className="header-subtitle">Alpha Portal Management</div>
          <h1 className="page-title">Users & Crafters Directory</h1>
          <p className="page-desc">
            Fetched via mock API call with simulated network latency, loading states, and error handling.
          </p>
        </div>

        <div className="header-controls">
          <button 
            className="secondary-btn" 
            onClick={onRefresh} 
            disabled={loading}
            title="Re-run mock API fetch"
          >
            <span className={`refresh-icon ${loading ? 'spinning' : ''}`}>🔄</span>
            <span>{loading ? 'Fetching...' : 'Refresh API'}</span>
          </button>
          
          <button
            className="secondary-btn error-toggle-btn"
            onClick={onTriggerError}
            disabled={loading}
            title="Simulate 500 Network API failure"
          >
            ⚠️ Test Error
          </button>

          <button className="primary-btn" onClick={() => setIsAddModalOpen(true)}>
            <span>+ Add Member</span>
          </button>
        </div>
      </div>

      {/* API status bar */}
      <div className="api-info-bar">
        <div className="info-item">
          <span className="dot dot-success"></span>
          <span>Endpoint: <code>/api/v1/mock/users</code></span>
        </div>
        {lastFetched && (
          <div className="info-item">
            <span>Last fetched: {lastFetched}</span>
          </div>
        )}
        <div className="info-item">
          <span>Total Records: <strong>{users.length}</strong></span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="search-filter-card">
        <div className="search-input-wrap">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search by name, email, or favorite burger..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="clear-search-btn" onClick={() => setSearchQuery('')}>✕</button>
          )}
        </div>

        <div className="filter-controls-group">
          <div className="role-filter-wrap">
            <label htmlFor="role-filter">Filter by Role:</label>
            <select
              id="role-filter"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="role-select"
            >
              {roles.map(r => (
                <option key={r} value={r}>
                  {r === 'ALL' ? 'All Roles' : r}
                </option>
              ))}
            </select>
          </div>

          <div className="sort-filter-wrap">
            <label htmlFor="sort-select">Sort By:</label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="role-select sort-select"
              aria-label="Sort members"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="error-banner">
          <div className="error-icon">⚠️</div>
          <div className="error-text">
            <strong>Mock API Request Failed</strong>
            <p>{error}</p>
          </div>
          <button className="primary-btn error-retry-btn" onClick={onRefresh}>
            Retry Request
          </button>
        </div>
      )}

      {/* Loading Skeleton State */}
      {loading && !error && (
        <div className="users-grid">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="user-card skeleton-card">
              <div className="skeleton-avatar"></div>
              <div className="skeleton-line title"></div>
              <div className="skeleton-line subtitle"></div>
              <div className="skeleton-line tag"></div>
            </div>
          ))}
        </div>
      )}

      {/* Data Loaded View */}
      {!loading && !error && (
        <>
          {filteredUsers.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🍔</div>
              <h3>No members match your search</h3>
              <p>Try searching for a different keyword or resetting your role filter.</p>
              <button 
                className="secondary-btn" 
                onClick={() => { setSearchQuery(''); setSelectedRole('ALL'); }}
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="users-grid">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="user-card"
                  onClick={() => handleSelectUser(user)}
                >
                  <div className="card-top">
                    <div 
                      className="user-avatar" 
                      style={{ background: user.avatarBg || 'var(--accent)' }}
                    >
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className={`status-pill ${user.status.toLowerCase().replace(' ', '-')}`}>
                      ● {user.status}
                    </span>
                  </div>

                  <div className="card-info">
                    <h3 className="user-name">{user.name}</h3>
                    <div className="user-handle">@{user.username}</div>
                    <div className="user-email" title={user.email}>{user.email}</div>
                  </div>

                  <div className="role-chip-row">
                    <span className="role-tag">{user.role}</span>
                    <span className="orders-count">{user.ordersCount} orders</span>
                  </div>

                  <div className="card-fav-burger">
                    <span className="fav-label">Favorite:</span>
                    <span className="fav-val" title={user.favoriteBurger}>
                      🍔 {user.favoriteBurger || 'Classic Burger'}
                    </span>
                  </div>

                  <div className="card-actions">
                    <button
                      type="button"
                      className="craft-quick-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        onIncrementOrders?.(user.id);
                      }}
                      title={`Craft another burger for ${user.name}`}
                      aria-label={`Craft order for ${user.name}`}
                    >
                      🍔 +1 Order
                    </button>
                    <button 
                      type="button"
                      className="view-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectUser(user);
                      }}
                    >
                      View Details →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* User Details Modal */}
      <UserModal
        user={selectedUser}
        onClose={() => setActiveUserModal(null)}
        onIncrementOrders={onIncrementOrders}
      />

      {/* Add User Modal */}
      <AddUserModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddUser={onAddUser}
      />
    </div>
  );
}
