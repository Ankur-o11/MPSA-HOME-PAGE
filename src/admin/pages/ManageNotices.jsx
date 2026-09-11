import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, CheckCircle2, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL, getUploadUrl } from '../../config/api';

import { noticesData as defaultNotices } from '../../data/notices';

export default function ManageNotices() {
  const { authFetch } = useAuth();
  const [notices, setNotices] = useState(defaultNotices);
  const [showModal, setShowModal] = useState(false);
  const [editingNotice, setEditingNotice] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    date: '',
    category: 'Admissions',
    description: '',
    isImportant: false,
    isPublished: true,
    downloadUrl: '#'
  });

  const [message, setMessage] = useState('');

  const fetchNotices = async () => {
    try {
      const res = await authFetch(`${API_BASE_URL}/admin/notices`);
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) setNotices(data);
      }
    } catch (err) {}
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleOpenAdd = () => {
    setEditingNotice(null);
    setFormData({
      title: '',
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }),
      category: 'Admissions',
      description: '',
      isImportant: false,
      isPublished: true,
      downloadUrl: '#'
    });
    setShowModal(true);
  };

  const handleOpenEdit = (n) => {
    setEditingNotice(n);
    setFormData(n);
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      if (editingNotice && editingNotice._id) {
        await authFetch(`${API_BASE_URL}/admin/notices/${editingNotice._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      } else {
        await authFetch(`${API_BASE_URL}/admin/notices`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      }
    } catch (err) {}

    if (editingNotice) {
      setNotices(prev => prev.map(n => (n.id === editingNotice.id || n._id === editingNotice._id) ? { ...n, ...formData } : n));
    } else {
      setNotices(prev => [{ ...formData, id: 'n_' + Date.now() }, ...prev]);
    }

    setShowModal(false);
    setMessage('Notice saved successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this notice?')) return;

    try {
      await authFetch(`${API_BASE_URL}/admin/notices/${id}`, { method: 'DELETE' });
    } catch (err) {}

    setNotices(prev => prev.filter(n => n.id !== id && n._id !== id));
    setMessage('Notice deleted successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div>
      <div className="admin-card-header">
        <div>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--primary-navy)' }}>Notice Board Management</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Publish or modify official announcements and circulars displayed on the website.</p>
        </div>
        <button className="btn btn-primary" onClick={handleOpenAdd}>
          <Plus size={18} /> Add New Notice
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
                <th>Title</th>
                <th>Category</th>
                <th>Date</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {notices.map(n => (
                <tr key={n._id || n.id}>
                  <td style={{ fontWeight: '700', color: 'var(--primary-navy)' }}>{n.title}</td>
                  <td><span className="category-tag">{n.category}</span></td>
                  <td style={{ fontSize: '0.85rem' }}>{n.date}</td>
                  <td>
                    {n.isImportant ? (
                      <span className="status-badge inactive">High Priority</span>
                    ) : (
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Normal</span>
                    )}
                  </td>
                  <td>
                    <span className={`status-badge ${n.isPublished !== false ? 'published' : 'draft'}`}>
                      {n.isPublished !== false ? 'Published' : 'Hidden'}
                    </span>
                  </td>
                  <td>
                    <div className="action-btn-group">
                      <button className="btn-icon" onClick={() => handleOpenEdit(n)}><Edit2 size={16} /></button>
                      <button className="btn-icon danger" onClick={() => handleDelete(n._id || n.id)}><Trash2 size={16} /></button>
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
                {editingNotice ? 'Edit Notice' : 'Add New Notice'}
              </h3>
              <button className="btn-icon" onClick={() => setShowModal(false)}><X size={20} /></button>
            </div>

            <form onSubmit={handleSave}>
              <div className="form-group">
                <label>Notice Title *</label>
                <input type="text" className="form-control" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label>Category *</label>
                  <select className="form-control" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}>
                    <option value="Admissions">Admissions</option>
                    <option value="Examination">Examination</option>
                    <option value="Academic">Academic</option>
                    <option value="General">General</option>
                    <option value="Event">Event</option>
                    <option value="Holiday">Holiday</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Publish Date *</label>
                  <input type="text" className="form-control" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} required />
                </div>
              </div>

              <div className="form-group">
                <label>Notice Content / Details *</label>
                <textarea rows="4" className="form-control" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} required></textarea>
              </div>

              <div style={{ display: 'flex', gap: '2rem', marginBottom: '1.5rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input type="checkbox" checked={formData.isImportant} onChange={e => setFormData({ ...formData, isImportant: e.target.checked })} />
                  High Priority Notice (Gold Highlight)
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input type="checkbox" checked={formData.isPublished} onChange={e => setFormData({ ...formData, isPublished: e.target.checked })} />
                  Published on Public Website
                </label>
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Notice</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
