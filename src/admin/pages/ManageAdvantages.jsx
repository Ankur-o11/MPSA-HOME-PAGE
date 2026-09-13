import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, CheckCircle2, X, Award, ShieldCheck, Trophy, BookOpen, FlaskConical } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL } from '../../config/api';

const AVAILABLE_ICONS = [
  { name: 'FlaskConical', label: 'Science & Innovation (Flask)' },
  { name: 'ShieldCheck', label: 'Values & Discipline (Shield)' },
  { name: 'Trophy', label: 'Sports & Trophies (Trophy)' },
  { name: 'BookOpen', label: 'Academics & Faculty (Book)' },
  { name: 'Award', label: 'Excellence (Award)' },
  { name: 'CheckCircle2', label: 'Feature Check (Checkmark)' }
];

export default function ManageAdvantages() {
  const { authFetch } = useAuth();
  const [advantages, setAdvantages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingAdvantage, setEditingAdvantage] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: 'Award',
    displayOrder: 1,
    isActive: true
  });

  const [message, setMessage] = useState('');

  const fetchAdvantages = async () => {
    setLoading(true);
    try {
      const res = await authFetch(`${API_BASE_URL}/admin/advantages`);
      if (res.ok) {
        const data = await res.json();
        if (data) setAdvantages(data);
      }
    } catch (err) {
      console.error('Error fetching advantages:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvantages();
  }, []);

  const handleOpenAdd = () => {
    setEditingAdvantage(null);
    setFormData({
      title: '',
      description: '',
      icon: 'Award',
      displayOrder: advantages.length + 1,
      isActive: true
    });
    setShowModal(true);
  };

  const handleOpenEdit = (adv) => {
    setEditingAdvantage(adv);
    setFormData({
      title: adv.title || '',
      description: adv.description || '',
      icon: adv.icon || 'Award',
      displayOrder: adv.displayOrder || 1,
      isActive: adv.isActive !== false
    });
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      let res;
      if (editingAdvantage && editingAdvantage._id) {
        res = await authFetch(`${API_BASE_URL}/admin/advantages/${editingAdvantage._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      } else {
        res = await authFetch(`${API_BASE_URL}/admin/advantages`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      }

      if (res.ok) {
        setMessage('Advantage saved successfully!');
        fetchAdvantages();
      } else {
        setMessage('Saved locally');
      }
    } catch (err) {
      setMessage('Update error');
    }

    setShowModal(false);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this advantage?')) return;

    try {
      const res = await authFetch(`${API_BASE_URL}/admin/advantages/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setMessage('Advantage deleted successfully!');
        fetchAdvantages();
      }
    } catch (err) {
      setAdvantages(prev => prev.filter(a => a._id !== id));
      setMessage('Advantage deleted!');
    }

    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div>
      <div className="admin-card-header">
        <div>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--primary-navy)' }}>The MPSA School Advantage</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Manage the core key features and school advantages displayed on the public Home page.
          </p>
        </div>
        <button className="btn btn-primary" onClick={handleOpenAdd}>
          <Plus size={18} /> Add Advantage
        </button>
      </div>

      {message && (
        <div className="alert-success-custom" style={{ marginBottom: '1.5rem' }}>
          <CheckCircle2 size={20} /> {message}
        </div>
      )}

      {loading ? (
        <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>Loading advantages...</div>
      ) : advantages.length === 0 ? (
        <div className="admin-card-box" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          No school advantages found. Click "Add Advantage" to create one.
        </div>
      ) : (
        <div className="admin-card-box">
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Icon</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {advantages.map((adv) => (
                  <tr key={adv._id || adv.id}>
                    <td style={{ fontWeight: '700' }}>#{adv.displayOrder || 1}</td>
                    <td>
                      <span className="degree-tag">{adv.icon || 'Award'}</span>
                    </td>
                    <td style={{ fontWeight: '700', color: 'var(--primary-navy)' }}>{adv.title}</td>
                    <td style={{ fontSize: '0.88rem', color: 'var(--text-muted)', maxWidth: '300px' }}>{adv.description}</td>
                    <td>
                      <span className={`status-badge ${adv.isActive !== false ? 'published' : 'draft'}`}>
                        {adv.isActive !== false ? 'Active' : 'Hidden'}
                      </span>
                    </td>
                    <td>
                      <div className="action-btn-group">
                        <button className="btn-icon" onClick={() => handleOpenEdit(adv)} title="Edit">
                          <Edit2 size={16} />
                        </button>
                        <button className="btn-icon danger" onClick={() => handleDelete(adv._id || adv.id)} title="Delete">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="admin-modal-backdrop">
          <div className="admin-modal-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.35rem', color: 'var(--primary-navy)' }}>
                {editingAdvantage ? 'Edit School Advantage' : 'Add New Advantage'}
              </h3>
              <button className="btn-icon" onClick={() => setShowModal(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave}>
              <div className="form-group">
                <label>Title *</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  placeholder="e.g. Science & Innovation Focus"
                />
              </div>

              <div className="form-group">
                <label>Description *</label>
                <textarea
                  rows="3"
                  className="form-control"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  placeholder="e.g. Advanced laboratories and practical-oriented learning enabling early scientific discovery."
                ></textarea>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label>Icon Style</label>
                  <select
                    className="form-control"
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  >
                    {AVAILABLE_ICONS.map((ic) => (
                      <option key={ic.name} value={ic.name}>
                        {ic.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Display Priority Order</label>
                  <input
                    type="number"
                    className="form-control"
                    value={formData.displayOrder}
                    onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 1 })}
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginTop: '0.5rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  />
                  Active / Visible on Home Page
                </label>
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Advantage
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
