import React, { useState, useEffect } from 'react';
import { Save, CheckCircle2, Upload, Trash2, Plus, Edit, Award, Image } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL, getUploadUrl } from '../../config/api';

export default function ManageFounderProfile() {
  const { authFetch } = useAuth();
  const [formData, setFormData] = useState({
    name: 'Shri [Founder Name Placeholder]',
    designation: 'Founder & Visionary Patron, MPSA School',
    photo: '',
    profession: 'Visionary Educator & Philanthropist',
    biography: 'Founder biography and inspiring educational journey details will appear here.',
    intro: 'Dedicated to establishing an educational institution built on science and moral values.',
    education: '',
    experience: '',
    contribution: 'Laid the foundation of Maharana Pratap Science Academy to provide quality education.',
    vision: 'Building nation builders through scientific temper and character discipline.',
    achievements: '',
    visionQuote: 'Education is the greatest light that can ignite a human mind.',
    storyText: 'The journey of Maharana Pratap Science Academy began with a vision to empower students through science and character.',
    timeline: [],
    gallery: []
  });

  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadingGalleryIdx, setUploadingGalleryIdx] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function loadFounderProfile() {
      try {
        const res = await authFetch(`${API_BASE_URL}/admin/founder-profile`);
        if (res.ok) {
          const data = await res.json();
          if (data) {
            setFormData(prev => ({
              ...prev,
              ...data,
              timeline: data.timeline || [],
              gallery: data.gallery || []
            }));
          }
        }
      } catch (err) {
        console.error('Error loading founder profile:', err);
      }
    }
    loadFounderProfile();
  }, [authFetch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const uploadData = new FormData();
    uploadData.append('image', file);
    setUploading(true);

    try {
      const res = await authFetch(`${API_BASE_URL}/admin/upload`, {
        method: 'POST',
        body: uploadData
      });
      const result = await res.json();
      if (result.success) {
        setFormData(prev => ({ ...prev, photo: getUploadUrl(result.url) }));
      } else {
        alert('Image upload failed');
      }
    } catch (err) {
      alert('Upload failed: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleRemovePhoto = () => {
    setFormData(prev => ({ ...prev, photo: '' }));
  };

  // Timeline handlers
  const handleAddTimelineItem = () => {
    setFormData(prev => ({
      ...prev,
      timeline: [
        ...prev.timeline,
        { stage: `Milestone ${prev.timeline.length + 1}`, title: '', description: '', year: '' }
      ]
    }));
  };

  const handleTimelineChange = (index, field, value) => {
    setFormData(prev => {
      const updated = [...prev.timeline];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, timeline: updated };
    });
  };

  const handleRemoveTimelineItem = (index) => {
    setFormData(prev => ({
      ...prev,
      timeline: prev.timeline.filter((_, idx) => idx !== index)
    }));
  };

  // Gallery handlers
  const handleAddGalleryItem = () => {
    setFormData(prev => ({
      ...prev,
      gallery: [
        ...prev.gallery,
        { title: '', image: '', caption: '', date: '' }
      ]
    }));
  };

  const handleGalleryChange = (index, field, value) => {
    setFormData(prev => {
      const updated = [...prev.gallery];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, gallery: updated };
    });
  };

  const handleGalleryImageUpload = async (index, file) => {
    if (!file) return;
    const uploadData = new FormData();
    uploadData.append('image', file);
    setUploadingGalleryIdx(index);

    try {
      const res = await authFetch(`${API_BASE_URL}/admin/upload`, {
        method: 'POST',
        body: uploadData
      });
      const result = await res.json();
      if (result.success) {
        handleGalleryChange(index, 'image', getUploadUrl(result.url));
      }
    } catch (err) {
      alert('Gallery photo upload failed');
    } finally {
      setUploadingGalleryIdx(null);
    }
  };

  const handleRemoveGalleryItem = (index) => {
    setFormData(prev => ({
      ...prev,
      gallery: prev.gallery.filter((_, idx) => idx !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      const res = await authFetch(`${API_BASE_URL}/admin/founder-profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const result = await res.json();

      if (res.ok && result.success) {
        setMessage('Founder Profile updated successfully!');
        if (result.profile) {
          setFormData(prev => ({ ...prev, ...result.profile }));
        }
      } else {
        setMessage('Error saving Founder Profile.');
      }
    } catch (err) {
      setMessage('Failed to connect to server.');
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(''), 4000);
    }
  };

  return (
    <div className="admin-page-container">
      <div className="admin-card-header">
        <div>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--primary-navy)' }}>Founder Profile Management</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Edit the separate, dedicated Founder Profile (Name, Photo, Profession, Biography, Contribution, Vision, Achievements & Message).
          </p>
        </div>
      </div>

      {message && (
        <div className="alert alert-success" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <CheckCircle2 size={18} /> {message}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* 1. Basic Identity & Photo */}
        <div style={{ backgroundColor: 'var(--bg-white)', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: '1.2rem', color: 'var(--primary-navy)', marginBottom: '1.5rem' }}>
            1. Founder Identity & Photo
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <div className="form-group">
              <label className="form-label">Founder Full Name *</label>
              <input 
                type="text" 
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Designation / Title</label>
              <input 
                type="text" 
                name="designation"
                className="form-control"
                value={formData.designation}
                onChange={handleChange}
                placeholder="e.g. Founder & Visionary Patron, MPSA School"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Profession / Specialization</label>
              <input 
                type="text" 
                name="profession"
                className="form-control"
                value={formData.profession}
                onChange={handleChange}
                placeholder="e.g. Visionary Educator & Philanthropist"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Education / Qualifications</label>
              <input 
                type="text" 
                name="education"
                className="form-control"
                value={formData.education}
                onChange={handleChange}
                placeholder="e.g. M.Sc. Physics, M.Ed."
              />
            </div>
          </div>

          {/* Photo Upload Section */}
          <div className="form-group">
            <label className="form-label">Founder Photo</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
              <div style={{ width: '100px', height: '100px', borderRadius: '50%', overflow: 'hidden', backgroundColor: 'var(--bg-soft)', border: '2px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {formData.photo ? (
                  <img src={getUploadUrl(formData.photo)} alt="Founder" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <Award size={36} color="#94A3B8" />
                )}
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <label className="btn btn-outline btn-sm" style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Upload size={16} /> {uploading ? 'Uploading...' : 'Upload New Photo'}
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} style={{ display: 'none' }} disabled={uploading} />
                </label>

                {formData.photo && (
                  <button type="button" className="btn btn-outline-danger btn-sm" onClick={handleRemovePhoto}>
                    <Trash2 size={16} /> Remove Photo
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 2. Biography, Contribution & Vision */}
        <div style={{ backgroundColor: 'var(--bg-white)', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: '1.2rem', color: 'var(--primary-navy)', marginBottom: '1.5rem' }}>
            2. Biography, Contribution & Vision
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div className="form-group">
              <label className="form-label">Short Intro / Summary</label>
              <textarea 
                name="intro"
                rows={2}
                className="form-control"
                value={formData.intro}
                onChange={handleChange}
                placeholder="Brief 1-2 sentence summary of founder's mission."
              />
            </div>

            <div className="form-group">
              <label className="form-label">Full Biography / About Founder</label>
              <textarea 
                name="biography"
                rows={4}
                className="form-control"
                value={formData.biography}
                onChange={handleChange}
                placeholder="Detailed biography of the founder."
              />
            </div>

            <div className="form-group">
              <label className="form-label">School Contribution</label>
              <textarea 
                name="contribution"
                rows={3}
                className="form-control"
                value={formData.contribution}
                onChange={handleChange}
                placeholder="Founder's major contributions to establishing MPSA School."
              />
            </div>

            <div className="form-group">
              <label className="form-label">Educational Vision</label>
              <textarea 
                name="vision"
                rows={3}
                className="form-control"
                value={formData.vision}
                onChange={handleChange}
                placeholder="Founder's educational philosophy and vision."
              />
            </div>

            <div className="form-group">
              <label className="form-label">Achievements & Highlights</label>
              <textarea 
                name="achievements"
                rows={3}
                className="form-control"
                value={formData.achievements}
                onChange={handleChange}
                placeholder="Key awards, achievements, or honors."
              />
            </div>

            <div className="form-group">
              <label className="form-label">Founder Vision Quote / Message</label>
              <textarea 
                name="visionQuote"
                rows={2}
                className="form-control"
                value={formData.visionQuote}
                onChange={handleChange}
                placeholder="Inspirational message quote from the founder."
              />
            </div>
          </div>
        </div>

        {/* 3. Founding Timeline Milestones */}
        <div style={{ backgroundColor: 'var(--bg-white)', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--primary-navy)' }}>
              3. Founding Timeline Milestones
            </h3>
            <button type="button" className="btn btn-outline-gold btn-sm" onClick={handleAddTimelineItem}>
              <Plus size={16} /> Add Milestone
            </button>
          </div>

          {formData.timeline.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {formData.timeline.map((item, idx) => (
                <div key={idx} style={{ padding: '1.25rem', backgroundColor: 'var(--bg-soft)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', display: 'grid', gridTemplateColumns: '1fr 2fr 3fr auto auto', gap: '0.75rem', alignItems: 'center' }}>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Stage / Step" 
                    value={item.stage} 
                    onChange={(e) => handleTimelineChange(idx, 'stage', e.target.value)} 
                  />
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Milestone Title" 
                    value={item.title} 
                    onChange={(e) => handleTimelineChange(idx, 'title', e.target.value)} 
                  />
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Description" 
                    value={item.description} 
                    onChange={(e) => handleTimelineChange(idx, 'description', e.target.value)} 
                  />
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Year" 
                    value={item.year} 
                    onChange={(e) => handleTimelineChange(idx, 'year', e.target.value)} 
                    style={{ width: '90px' }}
                  />
                  <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => handleRemoveTimelineItem(idx)}>
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No founding milestones added yet.</p>
          )}
        </div>

        {/* 4. Founder Photo Gallery */}
        <div style={{ backgroundColor: 'var(--bg-white)', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--primary-navy)' }}>
              4. Founder Photo Gallery
            </h3>
            <button type="button" className="btn btn-outline-gold btn-sm" onClick={handleAddGalleryItem}>
              <Plus size={16} /> Add Gallery Photo
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
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Photo Title" 
                    value={item.title} 
                    onChange={(e) => handleGalleryChange(idx, 'title', e.target.value)} 
                  />
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Caption" 
                    value={item.caption} 
                    onChange={(e) => handleGalleryChange(idx, 'caption', e.target.value)} 
                  />
                  <label className="btn btn-outline btn-sm" style={{ cursor: 'pointer' }}>
                    <Upload size={14} /> {uploadingGalleryIdx === idx ? '...' : 'Photo'}
                    <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => handleGalleryImageUpload(idx, e.target.files[0])} />
                  </label>
                  <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => handleRemoveGalleryItem(idx)}>
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No gallery photos added yet.</p>
          )}
        </div>

        {/* Submit Action */}
        <div style={{ textAlign: 'right' }}>
          <button type="submit" className="btn btn-primary btn-lg" disabled={saving}>
            <Save size={18} /> {saving ? 'Saving Changes...' : 'Save Founder Profile'}
          </button>
        </div>
      </form>
    </div>
  );
}
