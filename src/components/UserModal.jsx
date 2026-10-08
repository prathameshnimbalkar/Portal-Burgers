import React, { useEffect } from 'react';
import { logUserProfileView } from '../services/logger';

export default function UserModal({ user, onClose }) {
  useEffect(() => {
    if (user) {
      logUserProfileView(user);
    }
  }, [user]);

  if (!user) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          ✕
        </button>

        <div className="modal-header">
          <div className="modal-avatar" style={{ background: user.avatarBg || 'var(--accent)' }}>
            {user.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h2 className="modal-name">{user.name}</h2>
            <div className="modal-sub">@{user.username} • <span className="role-tag">{user.role}</span></div>
          </div>
        </div>

        <div className="modal-body">
          <div className="modal-field">
            <span className="field-label">Email Address</span>
            <span className="field-value">{user.email}</span>
          </div>

          <div className="modal-field">
            <span className="field-label">Phone Number</span>
            <span className="field-value">{user.phone || '+1-555-0199'}</span>
          </div>

          <div className="modal-field full-width">
            <span className="field-label">Home / Delivery Address</span>
            <span className="field-value">{user.address || '123 Burger Lane'}</span>
          </div>

          <div className="modal-field">
            <span className="field-label">Status</span>
            <span className={`status-pill ${user.status.toLowerCase().replace(' ', '-')}`}>
              ● {user.status}
            </span>
          </div>

          <div className="modal-field">
            <span className="field-label">Favorite Burger Specialty</span>
            <span className="field-highlight">🍔 {user.favoriteBurger || 'Chef Special'}</span>
          </div>

          <div className="modal-field">
            <span className="field-label">Total Orders Crafted</span>
            <span className="field-value">{user.ordersCount} orders</span>
          </div>

          {user.bio && (
            <div className="modal-field full-width">
              <span className="field-label">Bio</span>
              <p className="bio-text">"{user.bio}"</p>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="secondary-btn" onClick={onClose}>
            Close
          </button>
          <a href={`mailto:${user.email}`} className="primary-btn">
            Send Email
          </a>
        </div>
      </div>
    </div>
  );
}
