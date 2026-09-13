import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, CheckCircle2, Upload, X, ImageOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL, getUploadUrl } from '../../config/api';
import ImageInputSelector from '../components/ImageInputSelector';

import { facilitiesData as defaultFacilities } from '../../data/facilities';

export default function ManageFacilities() {
  const { authFetch } = useAuth();
  const [facilities, setFacilities] = useState(defaultFacilities);
  const [showModal, setShowModal] = useState(false);
  const [editingFacility, setEditingFacility] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Infrastructure',
    image: '',
    description: '',
    displayOrder: 1,
    isActive: true
  });

  const [message, setMessage] = useState('');

  const fetchFacilities = async () => {
    try {
      const res = await authFetch(`${API_BASE_URL}/admin/facilities`);
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) setFacilities(data);
      }
    } catch (err) {}
  };

  useEffect(() => {
    fetchFacilities();
  }, []);

  const handleOpenAdd = () => {
    setEditingFacility(null);
    setFormData({
      title: '',
      category: 'Infrastructure',
      image: '',
      description: '',
      displayOrder: facilities.length + 1,
      isActive: true
    });
    setShowModal(true);
  };

  const handleOpenEdit = (f) => {
    setEditingFacility(f);
    setFormData({
      title: f.title || '',
      category: f.category || 'Infrastructure',
      image: f.image || '',
      description: f.description || '',
      displayOrder: f.displayOrder || 1,
      isActive: f.isActive !== false
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
          setMessage('Facility image uploaded successfully!');
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
      if (editingFacility && editingFacility._id) {
        await authFetch(`${API_BASE_URL}/admin/facilities/${editingFacility._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      } else {
        await authFetch(`${API_BASE_URL}/admin/facilities`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      }
    } catch (err) {}

    fetchFacilities();
    setShowModal(false);
    setMessage('Facility saved successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this facility card?')) return;
    try {
      await authFetch(`${API_BASE_URL}/admin/facilities/${id}`, { method: 'DELETE' });
    } catch (err) {}
    setFacilities(prev => prev.filter(f => f.id !== id && f._id !== id));
    setMessage('Facility deleted!');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div>
      <div className="admin-card-header">
        <div>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--primary-navy)' }}>School Facilities Management</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Manage smart classrooms, science labs, library, and sports facility cards.</p>
        </div>
        <button className="btn btn-primary" onClick={handleOpenAdd}>
          <Plus size={18} /> Add New Facility
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
                <th>Facility Name</th>
                <th>Category</th>
                <th>Description</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {facilities.map(f => (
                <tr key={f._id || f.id}>
                  <td><img src={getUploadUrl(f.image)} alt={f.title} style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} /></td>
                  <td style={{ fontWeight: '700', color: 'var(--primary-navy)' }}>{f.title}</td>
                  <td><span className="category-tag">{f.category || 'Infrastructure'}</span></td>
                  <td style={{ fontSize: '0.85rem', color: 'var(--text-muted)', maxWidth: '300px' }}>{f.description}</td>
                  <td>
                    <span className={`status-badge ${f.isActive !== false ? 'published' : 'draft'}`}>
                      {f.isActive !== false ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>
                    <div className="action-btn-group">
                      <button className="btn-icon" onClick={() => handleOpenEdit(f)}><Edit2 size={16} /></button>
                      <button className="btn-icon danger" onClick={() => handleDelete(f._id || f.id)}><Trash2 size={16} /></button>
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
                {editingFacility ? 'Edit Facility' : 'Add New Facility'}
              </h3>
              <button className="btn-icon" onClick={() => setShowModal(false)}><X size={20} /></button>
            </div>

            <form onSubmit={handleSave}>
              <div className="form-group">
                <label>Facility Name *</label>
                <input type="text" className="form-control" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label>Category *</label>
                  <input type="text" className="form-control" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label>Display Priority Order</label>
                  <input type="number" className="form-control" value={formData.displayOrder} onChange={e => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 1 })} />
                </div>
              </div>

              <ImageInputSelector 
                label="Facility Photo"
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
                  <input type="checkbox" checked={formData.isActive !== false} onChange={e => setFormData({ ...formData, isActive: e.target.checked })} />
                  Active / Visible on Public Website
                </label>
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Facility</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
