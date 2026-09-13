import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, CheckCircle2, Upload, X, ImageOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL, getUploadUrl } from '../../config/api';
import ImageInputSelector from '../components/ImageInputSelector';

import { achievementsData as defaultAchievements } from '../../data/achievements';

export default function ManageAchievements() {
  const { authFetch } = useAuth();
  const [achievements, setAchievements] = useState(defaultAchievements);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    year: '2026',
    category: 'Academic',
    image: '',
    description: '',
    isPublished: true
  });

  const [message, setMessage] = useState('');

  const fetchAchievements = async () => {
    try {
      const res = await authFetch(`${API_BASE_URL}/admin/achievements`);
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) setAchievements(data);
      }
    } catch (err) {}
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      year: '2026',
      category: 'Academic',
      image: '',
      description: '',
      isPublished: true
    });
    setShowModal(true);
  };

  const handleOpenEdit = (a) => {
    setEditingItem(a);
    setFormData({
      title: a.title || '',
      year: a.year || '2026',
      category: a.category || 'Academic',
      image: a.image || '',
      description: a.description || '',
      isPublished: a.isPublished !== false
    });
    setShowModal(true);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const bodyData = new FormData();
    bodyData.append('image', file);

    try {
      const res = await authFetch(`${API_BASE_URL}/admin/upload`, {
        method: 'POST',
        body: bodyData
      });
      if (res.ok) {
        const result = await res.json();
        if (result?.url) {
          setFormData(prev => ({ ...prev, image: result.url }));
          setMessage('Image uploaded successfully!');
        }
      }
    } catch (err) {
      console.error('Image upload error:', err);
    } finally {
      setUploading(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      if (editingItem && editingItem._id) {
        await authFetch(`${API_BASE_URL}/admin/achievements/${editingItem._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      } else {
        await authFetch(`${API_BASE_URL}/admin/achievements`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      }
    } catch (err) {}

    fetchAchievements();
    setShowModal(false);
    setMessage('Achievement saved successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this achievement?')) return;
    try {
      await authFetch(`${API_BASE_URL}/admin/achievements/${id}`, { method: 'DELETE' });
    } catch (err) {}
    setAchievements(prev => prev.filter(a => a.id !== id && a._id !== id));
    setMessage('Achievement deleted!');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div>
      <div className="admin-card-header">
        <div>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--primary-navy)' }}>Achievements &amp; Awards Management</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Manage academic honors, sports titles, and awards displayed on the website.</p>
        </div>
        <button className="btn btn-primary" onClick={handleOpenAdd}>
          <Plus size={18} /> Add New Achievement
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
                <th>Image</th>
                <th>Achievement Title</th>
                <th>Year</th>
                <th>Category</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {achievements.map(a => (
                <tr key={a._id || a.id}>
                  <td><img src={getUploadUrl(a.image)} alt={a.title} style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} /></td>
                  <td style={{ fontWeight: '700', color: 'var(--primary-navy)' }}>{a.title}</td>
                  <td><span className="category-tag">{a.year}</span></td>
                  <td>{a.category}</td>
                  <td>
                    <span className={`status-badge ${a.isPublished !== false ? 'published' : 'draft'}`}>
                      {a.isPublished !== false ? 'Published' : 'Hidden'}
                    </span>
                  </td>
                  <td>
                    <div className="action-btn-group">
                      <button className="btn-icon" onClick={() => handleOpenEdit(a)}><Edit2 size={16} /></button>
                      <button className="btn-icon danger" onClick={() => handleDelete(a._id || a.id)}><Trash2 size={16} /></button>
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
                {editingItem ? 'Edit Achievement' : 'Add New Achievement'}
              </h3>
              <button className="btn-icon" onClick={() => setShowModal(false)}><X size={20} /></button>
            </div>

            <form onSubmit={handleSave}>
              <div className="form-group">
                <label>Achievement Title *</label>
                <input type="text" className="form-control" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label>Year (Editable String) *</label>
                  <input type="text" className="form-control" value={formData.year} onChange={e => setFormData({ ...formData, year: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label>Category *</label>
                  <select className="form-control" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}>
                    <option value="Academic">Academic</option>
                    <option value="Sports">Sports</option>
                    <option value="Competition">Competition</option>
                    <option value="School Award">School Award</option>
                  </select>
                </div>
              </div>

              <ImageInputSelector 
                label="Achievement / Certificate Image"
                value={formData.image}
                onChange={(newUrl) => setFormData(prev => ({ ...prev, image: newUrl }))}
                placeholder="Paste photo URL (or upload from computer below)"
              />

              <div className="form-group">
                <label>Description *</label>
                <textarea rows="4" className="form-control" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} required></textarea>
              </div>

              <div className="form-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input type="checkbox" checked={formData.isPublished !== false} onChange={e => setFormData({ ...formData, isPublished: e.target.checked })} />
                  Published on Public Website
                </label>
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Achievement</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
