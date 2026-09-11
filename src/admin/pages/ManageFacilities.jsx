import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, CheckCircle2, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { facilitiesData as defaultFacilities } from '../../data/facilities';

export default function ManageFacilities() {
  const { authFetch } = useAuth();
  const [facilities, setFacilities] = useState(defaultFacilities);
  const [showModal, setShowModal] = useState(false);
  const [editingFacility, setEditingFacility] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Infrastructure',
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=800&auto=format&fit=crop',
    description: '',
    displayOrder: 1,
    isActive: true
  });

  const [message, setMessage] = useState('');

  const fetchFacilities = async () => {
    try {
      const res = await authFetch('http://localhost:5000/api/admin/facilities');
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
      image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=800&auto=format&fit=crop',
      description: '',
      displayOrder: facilities.length + 1,
      isActive: true
    });
    setShowModal(true);
  };

  const handleOpenEdit = (f) => {
    setEditingFacility(f);
    setFormData(f);
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      if (editingFacility && editingFacility._id) {
        await authFetch(`http://localhost:5000/api/admin/facilities/${editingFacility._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      } else {
        await authFetch('http://localhost:5000/api/admin/facilities', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      }
    } catch (err) {}

    if (editingFacility) {
      setFacilities(prev => prev.map(f => (f.id === editingFacility.id || f._id === editingFacility._id) ? { ...f, ...formData } : f));
    } else {
      setFacilities(prev => [{ ...formData, id: 'f_' + Date.now() }, ...prev]);
    }

    setShowModal(false);
    setMessage('Facility saved successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this facility card?')) return;
    try {
      await authFetch(`http://localhost:5000/api/admin/facilities/${id}`, { method: 'DELETE' });
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
                  <td><img src={f.image} alt={f.title} style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} /></td>
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

              <div className="form-group">
                <label>Category *</label>
                <input type="text" className="form-control" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} required />
              </div>

              <div className="form-group">
                <label>Image URL *</label>
                <input type="text" className="form-control" value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} required />
              </div>

              <div className="form-group">
                <label>Description *</label>
                <textarea rows="4" className="form-control" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} required></textarea>
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
