import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, CheckCircle2, Upload, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL, getUploadUrl } from '../../config/api';

import { upcomingEvents as defaultUpcoming, previousEvents as defaultPrevious } from '../../data/events';

export default function ManageEvents() {
  const { authFetch } = useAuth();
  const [events, setEvents] = useState([
    ...defaultUpcoming.map(e => ({ ...e, isUpcoming: true, isPublished: true })),
    ...defaultPrevious.map(e => ({ ...e, isUpcoming: false, isPublished: true }))
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '09:00 AM - 02:00 PM',
    location: 'MPSA School Campus',
    image: '',
    description: '',
    isUpcoming: true,
    isPublished: true
  });

  const [message, setMessage] = useState('');

  const fetchEvents = async () => {
    try {
      const res = await authFetch(`${API_BASE_URL}/admin/events`);
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) setEvents(data);
      }
    } catch (err) {}
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleOpenAdd = () => {
    setEditingEvent(null);
    setFormData({
      title: '',
      date: 'October 20, 2026',
      time: '09:00 AM - 02:00 PM',
      location: 'MPSA School Campus',
      image: '',
      description: '',
      isUpcoming: true,
      isPublished: true
    });
    setShowModal(true);
  };

  const handleOpenEdit = (e) => {
    setEditingEvent(e);
    setFormData(e);
    setShowModal(true);
  };

  const handleSave = async (evt) => {
    evt.preventDefault();

    try {
      if (editingEvent && editingEvent._id) {
        await authFetch(`${API_BASE_URL}/admin/events/${editingEvent._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      } else {
        await authFetch(`${API_BASE_URL}/admin/events`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      }
    } catch (err) {}

    if (editingEvent) {
      setEvents(prev => prev.map(e => (e.id === editingEvent.id || e._id === editingEvent._id) ? { ...e, ...formData } : e));
    } else {
      setEvents(prev => [{ ...formData, id: 'e_' + Date.now() }, ...prev]);
    }

    setShowModal(false);
    setMessage('Event saved successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this event?')) return;

    try {
      await authFetch(`${API_BASE_URL}/admin/events/${id}`, { method: 'DELETE' });
    } catch (err) {}

    setEvents(prev => prev.filter(e => e.id !== id && e._id !== id));
    setMessage('Event deleted!');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div>
      <div className="admin-card-header">
        <div>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--primary-navy)' }}>Events & Activities Management</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Manage upcoming events and past event highlights displayed on the public site.</p>
        </div>
        <button className="btn btn-primary" onClick={handleOpenAdd}>
          <Plus size={18} /> Add New Event
        </button>
      </div>

      {message && (
        <div className="alert-success-custom" style={{ marginBottom: '1.5rem' }}>
          <CheckCircle2 size={20} /> {message}
        </div>
      )}

      <div className="admin-card-box">
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Banner</th>
                <th>Event Name</th>
                <th>Date</th>
                <th>Time & Venue</th>
                <th>Type</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map(e => (
                <tr key={e._id || e.id}>
                  <td><img src={e.image} alt={e.title} style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} /></td>
                  <td style={{ fontWeight: '700', color: 'var(--primary-navy)' }}>{e.title}</td>
                  <td style={{ fontSize: '0.85rem' }}>{e.date}</td>
                  <td style={{ fontSize: '0.85rem' }}>{e.time} ({e.location})</td>
                  <td>
                    <span className="degree-tag">
                      {e.isUpcoming ? 'Upcoming' : 'Past Event'}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${e.isPublished !== false ? 'published' : 'draft'}`}>
                      {e.isPublished !== false ? 'Published' : 'Hidden'}
                    </span>
                  </td>
                  <td>
                    <div className="action-btn-group">
                      <button className="btn-icon" onClick={() => handleOpenEdit(e)}><Edit2 size={16} /></button>
                      <button className="btn-icon danger" onClick={() => handleDelete(e._id || e.id)}><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="admin-modal-backdrop">
          <div className="admin-modal-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.35rem', color: 'var(--primary-navy)' }}>
                {editingEvent ? 'Edit Event' : 'Add New Event'}
              </h3>
              <button className="btn-icon" onClick={() => setShowModal(false)}><X size={20} /></button>
            </div>

            <form onSubmit={handleSave}>
              <div className="form-group">
                <label>Event Name *</label>
                <input type="text" className="form-control" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label>Event Date *</label>
                  <input type="text" className="form-control" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label>Event Time</label>
                  <input type="text" className="form-control" value={formData.time} onChange={e => setFormData({ ...formData, time: e.target.value })} />
                </div>
              </div>

              <div className="form-group">
                <label>Venue / Location</label>
                <input type="text" className="form-control" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} />
              </div>

              <div className="form-group">
                <label>Banner Image URL *</label>
                <input type="text" className="form-control" value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} required />
              </div>

              <div className="form-group">
                <label>Description *</label>
                <textarea rows="4" className="form-control" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} required></textarea>
              </div>

              <div style={{ display: 'flex', gap: '2rem', marginBottom: '1.5rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input type="checkbox" checked={formData.isUpcoming} onChange={e => setFormData({ ...formData, isUpcoming: e.target.checked })} />
                  Upcoming Event (or unchecked for Past Event)
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input type="checkbox" checked={formData.isPublished} onChange={e => setFormData({ ...formData, isPublished: e.target.checked })} />
                  Published on Public Website
                </label>
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Event</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
