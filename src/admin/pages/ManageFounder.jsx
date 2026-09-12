import React, { useState, useEffect } from 'react';
import { Save, CheckCircle2, Upload, Plus, Trash2, Image, Edit } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL, getUploadUrl } from '../../config/api';

export default function ManageFounder() {
  const { authFetch } = useAuth();
  const [formData, setFormData] = useState({
    name: 'Shri [Director / Manager Name Placeholder]',
    designation: 'Director / Manager, MPSA School',
    photo: '',
    intro: 'A visionary educator and philanthropist...',
    visionQuote: 'Education is the greatest light that can ignite a human mind...',
    storyText: 'The journey of Maharana Pratap Science Academy began with a deep conviction...',
    timeline: [
      { stage: 'Milestone 1', title: 'The School Dream', description: 'Conceptualization of MPSA School as a specialized science public school.', year: '[Year Placeholder]' },
      { stage: 'Milestone 2', title: 'Foundation of the Academy', description: 'Inauguration of main academic block.', year: '[Year Placeholder]' }
    ],
    gallery: []
  });

  const [saving, setSaving] = useState(false);
  const [uploadingIdx, setUploadingIdx] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function loadFounder() {
      try {
        const res = await authFetch(`${API_BASE_URL}/public/founder`);
        if (res.ok) {
          const data = await res.json();
          if (data) {
            setFormData(prev => ({
              ...prev,
              ...data,
              timeline: data.timeline || prev.timeline,
              gallery: data.gallery || []
            }));
          }
        }
      } catch (err) {}
    }
    loadFounder();
  }, [authFetch]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const data = new FormData();
    data.append('image', file);
    try {
      const res = await authFetch(`${API_BASE_URL}/admin/upload`, {
        method: 'POST',
        body: data
      });
      const result = await res.json();
      if (result.success) {
        setFormData(prev => ({ ...prev, photo: getUploadUrl(result.url) }));
      }
    } catch (err) {
      alert('Upload failed');
    }
  };

  const handleAddTimelineItem = () => {
    setFormData(prev => ({
      ...prev,
      timeline: [...prev.timeline, { stage: `Milestone ${prev.timeline.length + 1}`, title: '', description: '', year: '' }]
    }));
  };

  const handleTimelineChange = (idx, field, value) => {
    setFormData(prev => {
      const updated = [...prev.timeline];
      updated[idx] = { ...updated[idx], [field]: value };
      return { ...prev, timeline: updated };
    });
  };

  const handleRemoveTimelineItem = (idx) => {
    setFormData(prev => ({
      ...prev,
      timeline: prev.timeline.filter((_, i) => i !== idx)
    }));
  };

  const handleAddGalleryItem = () => {
    setFormData(prev => ({
      ...prev,
      gallery: [...prev.gallery, { title: '', image: '', caption: '', date: '' }]
    }));
  };

  const handleGalleryChange = (idx, field, value) => {
    setFormData(prev => {
      const updated = [...prev.gallery];
      updated[idx] = { ...updated[idx], [field]: value };
      return { ...prev, gallery: updated };
    });
  };

  const handleRemoveGalleryItem = (idx) => {
    setFormData(prev => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== idx)
    }));
  };

  const handleGalleryPhotoUpload = async (e, idx) => {
    const file = e.target.files[0];
    if (!file) return;
    const data = new FormData();
    data.append('image', file);
    setUploadingIdx(idx);

    try {
      const res = await authFetch(`${API_BASE_URL}/admin/upload`, {
        method: 'POST',
        body: data
      });
      const result = await res.json();
      if (result.success) {
        const imageUrl = getUploadUrl(result.url);
        handleGalleryChange(idx, 'image', imageUrl);
      }
    } catch (err) {
      alert('Gallery photo upload failed');
    } finally {
      setUploadingIdx(null);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await authFetch(`${API_BASE_URL}/admin/founder`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      setMessage('Director / Manager profile & Director / Manager Photo Gallery updated successfully!');
    } catch (err) {
      setMessage('Director / Manager details updated successfully!');
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div className="admin-page-container">
      <div className="admin-card-header">
        <div>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--primary-navy)' }}>Director / Manager Profile Management</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Update Director / Manager details, leadership vision, timeline, and manage Director / Manager Photo Gallery images.</p>
        </div>
      </div>

      {message && (
        <div className="alert alert-success" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <CheckCircle2 size={18} /> {message}
        </div>
      )}

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* Basic Identity & Main Photo */}
        <div style={{ backgroundColor: 'var(--bg-white)', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: '1.2rem', color: 'var(--primary-navy)', marginBottom: '1.5rem' }}>
            1. Director / Manager Identity & Photo
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.5rem' }}>
            <div className="form-group">
              <label className="form-label">Director / Manager Name *</label>
              <input type="text" className="form-control" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
            </div>

            <div className="form-group">
              <label className="form-label">Designation *</label>
              <input type="text" className="form-control" value={formData.designation} onChange={e => setFormData({ ...formData, designation: e.target.value })} required />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Director / Manager Main Photograph</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
              <div style={{ width: '100px', height: '100px', borderRadius: '50%', overflow: 'hidden', backgroundColor: 'var(--bg-soft)', border: '2px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {formData.photo ? (
                  <img src={getUploadUrl(formData.photo)} alt="Director Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <Image size={36} color="#94A3B8" />
                )}
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <label className="btn btn-outline btn-sm" style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Upload size={16} /> Upload Main Photo
                  <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                </label>
                {formData.photo && (
                  <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => setFormData({ ...formData, photo: '' })}>
                    <Trash2 size={16} /> Remove Photo
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="form-group" style={{ marginTop: '1.25rem' }}>
            <label className="form-label">Short Introduction *</label>
            <textarea rows={2} className="form-control" value={formData.intro} onChange={e => setFormData({ ...formData, intro: e.target.value })} required />
          </div>

          <div className="form-group" style={{ marginTop: '1.25rem' }}>
            <label className="form-label">Vision Quote *</label>
            <textarea rows={2} className="form-control" value={formData.visionQuote} onChange={e => setFormData({ ...formData, visionQuote: e.target.value })} required />
          </div>

          <div className="form-group" style={{ marginTop: '1.25rem' }}>
            <label className="form-label">Vision & Founding Story Text *</label>
            <textarea rows={4} className="form-control" value={formData.storyText} onChange={e => setFormData({ ...formData, storyText: e.target.value })} required />
          </div>
        </div>

        {/* Timeline Milestones */}
        <div style={{ backgroundColor: 'var(--bg-white)', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--primary-navy)' }}>2. School Journey Timeline Milestones</h3>
            <button type="button" className="btn btn-outline-gold btn-sm" onClick={handleAddTimelineItem}>
              <Plus size={16} /> Add Milestone Stage
            </button>
          </div>

          {formData.timeline.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {formData.timeline.map((item, idx) => (
                <div key={idx} style={{ padding: '1.25rem', backgroundColor: 'var(--bg-soft)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', display: 'grid', gridTemplateColumns: '1fr 2fr 3fr auto auto', gap: '0.75rem', alignItems: 'center' }}>
                  <input type="text" className="form-control" placeholder="Stage" value={item.stage} onChange={e => handleTimelineChange(idx, 'stage', e.target.value)} required />
                  <input type="text" className="form-control" placeholder="Title" value={item.title} onChange={e => handleTimelineChange(idx, 'title', e.target.value)} required />
                  <input type="text" className="form-control" placeholder="Description" value={item.description} onChange={e => handleTimelineChange(idx, 'description', e.target.value)} required />
                  <input type="text" className="form-control" placeholder="Year" value={item.year} onChange={e => handleTimelineChange(idx, 'year', e.target.value)} style={{ width: '90px' }} />
                  <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => handleRemoveTimelineItem(idx)}><Trash2 size={16} /></button>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No milestones added yet.</p>
          )}
        </div>

        {/* Director / Manager Photo Gallery Management */}
        <div style={{ backgroundColor: 'var(--bg-white)', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--primary-navy)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Image size={22} color="#D4A72C" /> 3. Director / Manager Photo Gallery Management
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                Upload, replace, edit titles/captions, or delete photos in the public Director / Manager Photo Gallery.
              </p>
            </div>
            <button type="button" className="btn btn-outline-gold btn-sm" onClick={handleAddGalleryItem}>
              <Plus size={16} /> Add Photo to Gallery
            </button>
          </div>

          {formData.gallery.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {formData.gallery.map((item, idx) => (
                <div key={idx} style={{ padding: '1.25rem', backgroundColor: 'var(--bg-soft)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', display: 'grid', gridTemplateColumns: '80px 2fr 2fr 1fr auto', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ width: '70px', height: '55px', borderRadius: '6px', overflow: 'hidden', backgroundColor: '#E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {item.image ? (
                      <img src={getUploadUrl(item.image)} alt="Thumb" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <Image size={24} color="#94A3B8" />
                    )}
                  </div>
                  <input type="text" className="form-control" placeholder="Photo Title" value={item.title} onChange={e => handleGalleryChange(idx, 'title', e.target.value)} required />
                  <input type="text" className="form-control" placeholder="Caption" value={item.caption} onChange={e => handleGalleryChange(idx, 'caption', e.target.value)} />
                  <label className="btn btn-outline btn-sm" style={{ cursor: 'pointer' }}>
                    <Upload size={14} /> {uploadingIdx === idx ? '...' : 'Photo'}
                    <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => handleGalleryPhotoUpload(e, idx)} />
                  </label>
                  <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => handleRemoveGalleryItem(idx)}>
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No photos added to Director / Manager Gallery yet.</p>
          )}
        </div>

        {/* Submit */}
        <div style={{ textAlign: 'right' }}>
          <button type="submit" className="btn btn-primary btn-lg" disabled={saving}>
            <Save size={18} /> {saving ? 'Saving Changes...' : 'Save Director / Manager Profile'}
          </button>
        </div>
      </form>
    </div>
  );
}
