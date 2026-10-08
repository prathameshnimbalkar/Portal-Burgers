import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import WelcomePage from './components/WelcomePage';
import UsersPage from './components/UsersPage';
import { fetchUsersApi, createUserApi } from './services/mockApi';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('welcome');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastFetched, setLastFetched] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Helper to show momentary feedback toast
  const showToast = useCallback((msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  }, []);

  // API Call function
  const loadUsers = useCallback(async ({ shouldFail = false } = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchUsersApi({ delay: 650, shouldFail });
      setUsers(response.data);
      const timeStr = new Date().toLocaleTimeString();
      setLastFetched(timeStr);
      showToast(`Mock API resolved: ${response.data.length} users fetched at ${timeStr}`);
    } catch (err) {
      setError(err.message || 'Failed to load users from mock API.');
      showToast(`⚠️ API Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  // Initial load on mount
  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  // Handle adding user
  const handleAddUser = async (newUser) => {
    try {
      const created = await createUserApi(newUser);
      setUsers(prev => [created, ...prev]);
      showToast(`✅ Member "${created.name}" created successfully!`);
    } catch {
      showToast('⚠️ Failed to create member.');
    }
  };

  // Welcome page test mock API button
  const handleTriggerApiTest = async () => {
    await loadUsers();
    setActiveTab('users');
  };

  return (
    <div className="app-container">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast-banner">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userCount={users.length}
      />

      {/* Main Content View */}
      <main className="main-content">
        {activeTab === 'welcome' ? (
          <WelcomePage
            onGoToUsers={() => setActiveTab('users')}
            userCount={users.length}
            onTriggerApiTest={handleTriggerApiTest}
            isApiLoading={loading}
          />
        ) : (
          <UsersPage
            users={users}
            loading={loading}
            error={error}
            lastFetched={lastFetched}
            onRefresh={() => loadUsers({ shouldFail: false })}
            onAddUser={handleAddUser}
            onTriggerError={() => loadUsers({ shouldFail: true })}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p>
            🍔 <strong>Burger Hub</strong> Alpha Portal • Lightweight React + Vite App with Mock API Integration
          </p>
          <div className="footer-links">
            <button className="footer-link-btn" onClick={() => setActiveTab('welcome')}>Welcome</button>
            <span>•</span>
            <button className="footer-link-btn" onClick={() => setActiveTab('users')}>Users List</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
