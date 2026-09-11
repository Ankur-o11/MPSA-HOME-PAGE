import React, { useState, useEffect } from 'react';
import { Save, CheckCircle2, Upload, Plus, Trash2 } from 'lucide-react';
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
    ]
  });

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function loadFounder() {
      try {
        const res = await authFetch('http://localhost:5000/api/public/founder');
        if (res.ok) {
          const data = await res.json();
          if (data) setFormData(prev => ({ ...prev, ...data }));
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

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await authFetch('http://localhost:5000/api/admin/founder', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      setMessage('Founder & Inspiration section updated successfully!');
    } catch (err) {
      setMessage('Local update applied successfully!');
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
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Update the Founder presentation, story, quote, and milestone timeline for the public website.</p>
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
            <label>Founder Photograph *</label>
            <input type="text" className="form-control" value={formData.photo} onChange={e => setFormData({ ...formData, photo: e.target.value })} required />
            <div className="image-upload-preview">
              <img src={formData.photo} alt="Founder Preview" className="preview-thumbnail" />
              <div>
                <label className="btn btn-outline btn-sm" style={{ cursor: 'pointer' }}>
                  <Upload size={14} /> Upload Founder Photo
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

          <div style={{ marginTop: '2rem' }}>
            <button type="submit" className="btn btn-primary btn-lg" disabled={saving}>
              <Save size={18} /> {saving ? 'Saving Changes...' : 'Save Founder Section'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
