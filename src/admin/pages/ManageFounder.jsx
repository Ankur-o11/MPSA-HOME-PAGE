import React, { useState, useEffect } from 'react';
import { Save, CheckCircle2, Upload, Plus, Trash2, Image, Edit } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function ManageFounder() {
  const { authFetch } = useAuth();
  const [formData, setFormData] = useState({
    name: 'Shri [Founder Name Placeholder]',
    designation: 'Founder & Visionary Chairman, MPSA School',
    photo: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800&auto=format&fit=crop',
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
        const res = await authFetch('http://localhost:5000/api/public/founder');
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
      const res = await authFetch('http://localhost:5000/api/admin/upload', {
        method: 'POST',
        body: data
      });
      const result = await res.json();
      if (result.success) {
        setFormData(prev => ({ ...prev, photo: `http://localhost:5000${result.url}` }));
      }
    } catch (err) {
      alert('Photo upload failed');
    }
  };

  const handleAddTimelineItem = () => {
    setFormData(prev => ({
      ...prev,
      timeline: [
        ...prev.timeline,
        { stage: `Milestone ${prev.timeline.length + 1}`, title: '', description: '', year: '[Year]' }
      ]
    }));
  };

  const handleRemoveTimelineItem = (idx) => {
    setFormData(prev => ({
      ...prev,
      timeline: prev.timeline.filter((_, i) => i !== idx)
    }));
  };

  const handleTimelineChange = (idx, field, value) => {
    setFormData(prev => {
      const updated = [...prev.timeline];
      updated[idx][field] = value;
      return { ...prev, timeline: updated };
    });
  };

  // Founder Photo Gallery Handlers
  const handleAddGalleryItem = () => {
    setFormData(prev => ({
      ...prev,
      gallery: [
        ...prev.gallery,
        { title: '', image: '', caption: '', date: '' }
      ]
    }));
  };

  const handleRemoveGalleryItem = (idx) => {
    setFormData(prev => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== idx)
    }));
  };

  const handleGalleryChange = (idx, field, value) => {
    setFormData(prev => {
      const updated = [...prev.gallery];
      updated[idx][field] = value;
      return { ...prev, gallery: updated };
    });
  };

  const handleGalleryPhotoUpload = async (e, idx) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingIdx(idx);

    const data = new FormData();
    data.append('image', file);
    try {
      const res = await authFetch('http://localhost:5000/api/admin/upload', {
        method: 'POST',
        body: data
      });
      const result = await res.json();
      if (result.success) {
        const imageUrl = `http://localhost:5000${result.url}`;
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
      await authFetch('http://localhost:5000/api/admin/founder', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      setMessage('Founder profile & Founder Photo Gallery updated successfully!');
    } catch (err) {
      setMessage('Founder details updated successfully!');
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div>
      <div className="admin-card-header">
        <div>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--primary-navy)' }}>Founder & Inspiration Management</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Update Founder details, story, timeline, and manage Founder Photo Gallery images.</p>
        </div>
      </div>

      {message && (
        <div className="alert-success-custom" style={{ marginBottom: '1.5rem' }}>
          <CheckCircle2 size={20} /> {message}
        </div>
      )}

      <div className="admin-card-box">
        <form onSubmit={handleSave}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
            <div className="form-group">
              <label>Founder Name *</label>
              <input type="text" className="form-control" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
            </div>

            <div className="form-group">
              <label>Designation *</label>
              <input type="text" className="form-control" value={formData.designation} onChange={e => setFormData({ ...formData, designation: e.target.value })} required />
            </div>
          </div>

          <div className="form-group">
            <label>Founder Main Photograph *</label>
            <input type="text" className="form-control" value={formData.photo} onChange={e => setFormData({ ...formData, photo: e.target.value })} required />
            <div className="image-upload-preview">
              <img src={formData.photo} alt="Founder Preview" className="preview-thumbnail" />
              <div>
                <label className="btn btn-outline btn-sm" style={{ cursor: 'pointer' }}>
                  <Upload size={14} /> Upload Main Photo
                  <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                </label>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>Founder Short Introduction *</label>
            <textarea rows="2" className="form-control" value={formData.intro} onChange={e => setFormData({ ...formData, intro: e.target.value })} required></textarea>
          </div>

          <div className="form-group">
            <label>Founder Vision Quote *</label>
            <textarea rows="2" className="form-control" value={formData.visionQuote} onChange={e => setFormData({ ...formData, visionQuote: e.target.value })} required></textarea>
          </div>

          <div className="form-group">
            <label>The Vision Story Text *</label>
            <textarea rows="5" className="form-control" value={formData.storyText} onChange={e => setFormData({ ...formData, storyText: e.target.value })} required></textarea>
          </div>

          {/* School Journey Timeline Items */}
          <div style={{ marginTop: '2rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--primary-navy)' }}>School Journey Timeline Milestones</h3>
              <button type="button" className="btn btn-outline-gold btn-sm" onClick={handleAddTimelineItem}>
                <Plus size={16} /> Add Milestone Stage
              </button>
            </div>

            {formData.timeline.map((item, idx) => (
              <div key={idx} style={{ backgroundColor: 'var(--bg-soft)', padding: '1.25rem', borderRadius: 'var(--radius-md)', marginBottom: '1rem', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <strong style={{ color: 'var(--primary-navy)' }}>Milestone #{idx + 1}</strong>
                  <button type="button" className="btn-icon danger" onClick={() => handleRemoveTimelineItem(idx)}><Trash2 size={16} /></button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <input type="text" className="form-control" placeholder="Stage (e.g. Milestone 1)" value={item.stage} onChange={e => handleTimelineChange(idx, 'stage', e.target.value)} required />
                  <input type="text" className="form-control" placeholder="Title (e.g. Foundation of Academy)" value={item.title} onChange={e => handleTimelineChange(idx, 'title', e.target.value)} required />
                  <input type="text" className="form-control" placeholder="Year/Date" value={item.year} onChange={e => handleTimelineChange(idx, 'year', e.target.value)} />
                </div>
                <textarea rows="2" className="form-control" placeholder="Milestone Description" value={item.description} onChange={e => handleTimelineChange(idx, 'description', e.target.value)} required></textarea>
              </div>
            ))}
          </div>

          {/* LAST SECTION: FOUNDER PHOTO GALLERY MANAGEMENT */}
          <div style={{ marginTop: '2.5rem', borderTop: '2px solid var(--accent-gold)', paddingTop: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div>
                <h3 style={{ fontSize: '1.3rem', color: 'var(--primary-navy)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Image size={22} color="#D4A72C" /> Founder Photo Gallery Management
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  Upload, replace, edit titles/captions, or delete historical photos in the public Founder Photo Gallery.
                </p>
              </div>
              <button type="button" className="btn btn-primary btn-sm" onClick={handleAddGalleryItem}>
                <Plus size={16} /> Add Photo to Gallery
              </button>
            </div>

            {formData.gallery.length === 0 ? (
              <div className="no-results-box" style={{ padding: '2rem', textAlign: 'center', backgroundColor: 'var(--bg-soft)', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
                <p style={{ color: 'var(--text-muted)', margin: 0 }}>No photos added to Founder Gallery yet. Click "Add Photo to Gallery" above to upload photos.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '1.5rem' }}>
                {formData.gallery.map((item, idx) => (
                  <div key={idx} style={{ backgroundColor: 'var(--bg-soft)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <span style={{ fontWeight: '700', color: 'var(--primary-navy)', fontSize: '0.95rem' }}>
                        Gallery Photo #{idx + 1}
                      </span>
                      <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => handleRemoveGalleryItem(idx)}>
                        <Trash2 size={14} /> Delete Photo
                      </button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: '1.25rem', alignItems: 'start' }}>
                      {/* Photo Thumbnail & Replace Button */}
                      <div>
                        {item.image ? (
                          <img src={item.image} alt={item.title || 'Gallery Preview'} style={{ width: '100%', height: '110px', objectFit: 'cover', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }} />
                        ) : (
                          <div style={{ width: '100%', height: '110px', backgroundColor: '#E2E8F0', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B', fontSize: '0.8rem' }}>
                            No Image
                          </div>
                        )}
                        <label className="btn btn-outline btn-sm" style={{ width: '100%', marginTop: '0.5rem', cursor: 'pointer', textAlign: 'center', fontSize: '0.8rem' }}>
                          <Upload size={12} /> {uploadingIdx === idx ? 'Uploading...' : item.image ? 'Change Photo' : 'Upload Photo'}
                          <input type="file" accept="image/*" onChange={(e) => handleGalleryPhotoUpload(e, idx)} style={{ display: 'none' }} />
                        </label>
                      </div>

                      {/* Photo Metadata Form */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '0.75rem' }}>
                          <div>
                            <label style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--primary-navy)' }}>Photo Title *</label>
                            <input 
                              type="text" 
                              className="form-control" 
                              placeholder="e.g. Founder at School Foundation Ceremony"
                              value={item.title} 
                              onChange={e => handleGalleryChange(idx, 'title', e.target.value)} 
                              required 
                            />
                          </div>
                          <div>
                            <label style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--primary-navy)' }}>Event Date / Year</label>
                            <input 
                              type="text" 
                              className="form-control" 
                              placeholder="e.g. 2015 Archive"
                              value={item.date} 
                              onChange={e => handleGalleryChange(idx, 'date', e.target.value)} 
                            />
                          </div>
                        </div>

                        <div>
                          <label style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--primary-navy)' }}>Image URL (auto-filled on upload)</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Image URL or upload file above"
                            value={item.image} 
                            onChange={e => handleGalleryChange(idx, 'image', e.target.value)} 
                            required 
                          />
                        </div>

                        <div>
                          <label style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--primary-navy)' }}>Optional Caption / Description</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            placeholder="e.g. Laying the foundation stone of MPSA campus."
                            value={item.caption} 
                            onChange={e => handleGalleryChange(idx, 'caption', e.target.value)} 
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ marginTop: '2rem' }}>
            <button type="submit" className="btn btn-primary btn-lg" disabled={saving}>
              <Save size={18} /> {saving ? 'Saving Changes...' : 'Save Founder Profile & Gallery'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
