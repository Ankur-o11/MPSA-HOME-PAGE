import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Upload, CheckCircle2, X, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL, getUploadUrl } from '../../config/api';
import { galleryData as defaultGallery, galleryCategories } from '../../data/gallery';

export default function ManageGallery() {
  const { authFetch } = useAuth();
  const [gallery, setGallery] = useState(defaultGallery);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'School',
    image: '',
    caption: '',
    date: '',
    displayOrder: 1,
    isPublished: true
  });

  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const fetchGallery = async () => {
    try {
      const res = await authFetch(`${API_BASE_URL}/admin/gallery`);
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) setGallery(data);
      }
    } catch (err) {}
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      category: 'School',
      image: '',
      caption: '',
      date: 'Annual Campus Tour',
      displayOrder: gallery.length + 1,
      isPublished: true
    });
    setShowModal(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData(item);
    setShowModal(true);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const data = new FormData();
    data.append('image', file);
    setUploading(true);

    try {
      const res = await authFetch(`${API_BASE_URL}/admin/upload`, {
        method: 'POST',
        body: data
      });
      const result = await res.json();
      if (result.success) {
        setFormData(prev => ({ ...prev, image: getUploadUrl(result.url) }));
      }
    } catch (err) {
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      if (editingItem && editingItem._id) {
        await authFetch(`${API_BASE_URL}/admin/gallery/${editingItem._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      } else {
        await authFetch(`${API_BASE_URL}/admin/gallery`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      }
    } catch (err) {}

    if (editingItem) {
      setGallery(prev => prev.map(item => (item.id === editingItem.id || item._id === editingItem._id) ? { ...item, ...formData } : item));
    } else {
      setGallery(prev => [{ ...formData, id: 'g_' + Date.now() }, ...prev]);
    }

    setShowModal(false);
    setMessage('Gallery image saved successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this gallery photo?')) return;

    try {
      await authFetch(`${API_BASE_URL}/admin/gallery/${id}`, { method: 'DELETE' });
    } catch (err) {}

    setGallery(prev => prev.filter(item => item.id !== id && item._id !== id));
    setMessage('Gallery item deleted!');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div>
      <div className="admin-card-header">
        <div>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--primary-navy)' }}>Campus Gallery Management</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Upload high-resolution campus photos, manage categories, and edit Lightbox captions.</p>
        </div>
        <button className="btn btn-primary" onClick={handleOpenAdd}>
          <Plus size={18} /> Upload New Photo
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
                <th>Preview</th>
                <th>Title</th>
                <th>Category</th>
                <th>Caption</th>
                <th>Event / Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {gallery.map(item => (
                <tr key={item._id || item.id}>
                  <td>
                    <img src={item.image} alt={item.title} style={{ width: '60px', height: '45px', objectFit: 'cover', borderRadius: '4px' }} />
                  </td>
                  <td style={{ fontWeight: '700', color: 'var(--primary-navy)' }}>{item.title}</td>
                  <td><span className="category-tag">{item.category}</span></td>
                  <td style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{item.caption || '—'}</td>
                  <td style={{ fontSize: '0.85rem' }}>{item.date || '—'}</td>
                  <td>
                    <span className={`status-badge ${item.isPublished !== false ? 'published' : 'draft'}`}>
                      {item.isPublished !== false ? 'Published' : 'Hidden'}
                    </span>
                  </td>
                  <td>
                    <div className="action-btn-group">
                      <button className="btn-icon" onClick={() => handleOpenEdit(item)}><Edit2 size={16} /></button>
                      <button className="btn-icon danger" onClick={() => handleDelete(item._id || item.id)}><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form */}
      {showModal && (
        <div className="admin-modal-backdrop">
          <div className="admin-modal-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.35rem', color: 'var(--primary-navy)' }}>
                {editingItem ? 'Edit Gallery Photo' : 'Upload New Gallery Photo'}
              </h3>
              <button className="btn-icon" onClick={() => setShowModal(false)}><X size={20} /></button>
            </div>

            <form onSubmit={handleSave}>
              <div className="form-group">
                <label>Photo Title *</label>
                <input type="text" className="form-control" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label>Category *</label>
                  <select className="form-control" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}>
                    {galleryCategories.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
                    <option value="Facilities">Facilities</option>
                    <option value="Founder">Founder</option>
                    <option value="Teachers">Teachers</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Event / Date Label</label>
                  <input type="text" className="form-control" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} />
                </div>
              </div>

              <div className="form-group">
                <label>Image URL or File Upload *</label>
                <input type="text" className="form-control" value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} required />
                <div className="image-upload-preview">
                  <img src={formData.image} alt="Preview" className="preview-thumbnail" />
                  <div>
                    <label className="btn btn-outline btn-sm" style={{ cursor: 'pointer' }}>
                      <Upload size={14} /> Upload Image File {uploading && '...'}
                      <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                    </label>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>Lightbox Caption</label>
                <textarea rows="3" className="form-control" value={formData.caption} onChange={e => setFormData({ ...formData, caption: e.target.value })}></textarea>
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Photo</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
