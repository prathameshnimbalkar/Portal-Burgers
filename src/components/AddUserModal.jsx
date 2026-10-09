import React, { useState } from 'react';

export default function AddUserModal({ isOpen, onClose, onAddUser }) {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+1-555-0100');
  const [address, setAddress] = useState('100 Main St, Suite 4B');
  const [role, setRole] = useState('VIP Member');
  const [favoriteBurger, setFavoriteBurger] = useState('Smoky BBQ Double Smash');
  const [bio, setBio] = useState('');
  const [customNote, setCustomNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setIsSubmitting(true);
    await onAddUser({
      name: name.trim(),
      username: username.trim() || name.toLowerCase().replace(/\s+/g, '.'),
      email: email.trim(),
      phone: phone.trim(),
      address: address.trim(),
      role,
      status: 'Active',
      favoriteBurger,
      bio: bio.trim() || 'Burger connoisseur and Alpha Portal member.',
      customNote: customNote.trim()
    });
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          ✕
        </button>

        <div className="modal-title-row">
          <h2>Add New Member</h2>
          <p className="modal-desc">Simulate a POST mutation to the mock API layer</p>
        </div>

        <form onSubmit={handleSubmit} className="add-user-form">
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              id="name"
              type="text"
              required
              placeholder="e.g. Gordon Ramsay"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              placeholder="e.g. gramsay"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              id="email"
              type="email"
              required
              placeholder="e.g. chef@burgerhub.io"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                type="text"
                placeholder="+1-555-0100"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                id="address"
                type="text"
                placeholder="100 Main St"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="Head Chef">Head Chef</option>
                <option value="Sous Chef">Sous Chef</option>
                <option value="Store Manager">Store Manager</option>
                <option value="Shift Lead">Shift Lead</option>
                <option value="Food Critic">Food Critic</option>
                <option value="VIP Member">VIP Member</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="favBurger">Favorite Burger</label>
              <input
                id="favBurger"
                type="text"
                value={favoriteBurger}
                onChange={(e) => setFavoriteBurger(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="bio">Bio / Note</label>
            <textarea
              id="bio"
              rows="2"
              placeholder="Short description..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="customNote">Special Chef Tasting Note / Badge (Supports Rich-Text)</label>
            <input
              id="customNote"
              type="text"
              placeholder="e.g. <b>Head Grillmaster Special</b>"
              value={customNote}
              onChange={(e) => setCustomNote(e.target.value)}
            />
          </div>

          <div className="modal-footer">
            <button type="button" className="secondary-btn" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </button>
            <button type="submit" className="primary-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Add Member'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
