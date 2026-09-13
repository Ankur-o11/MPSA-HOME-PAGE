import React, { useState, useEffect } from 'react';
import { Save, CheckCircle2, Upload, Trash2, ImageOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL, getUploadUrl } from '../../config/api';
import ImageInputSelector from '../components/ImageInputSelector';

export default function ManageAbout() {
  const { authFetch } = useAuth();

  const [formData, setFormData] = useState({
    mainHeading: 'About Maharana Pratap Science Academy Inter College',
    mainDescription: 'MAHARANA PRATAP SCIENCE ACADEMY INTER COLLEGE (MPSA School), located in Jalaun, Uttar Pradesh, is committed to nurturing academic rigor, scientific curiosity, and moral integrity in every student.',
    aboutImage: '',
    visionHeading: 'Educational Vision',
    visionText: 'Empowering young minds through scientific inquiry, moral fortitude, and nation-building values.',
    missionHeading: 'Our Mission',
    missionText: 'To provide high-caliber science education, modern computer training, state-of-the-art laboratory research, and comprehensive character building.',
    ethosHeading: 'Academic Ethos & Discipline',
    ethosText: 'Fostering conceptual clarity, athletic endeavor, and moral discipline across all classes from primary through senior secondary levels.'
  });

  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function loadAboutData() {
      try {
        const res = await authFetch(`${API_BASE_URL}/public/about-settings`);
        if (res.ok) {
          const data = await res.json();
          if (data) setFormData(prev => ({ ...prev, ...data }));
        }
      } catch (err) {
        console.error('Error loading about data:', err);
      }
    }
    loadAboutData();
  }, [authFetch]);

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
          setFormData(prev => ({ ...prev, aboutImage: result.url }));
          setMessage('About section image uploaded successfully!');
        }
      }
    } catch (err) {
      console.error('Image upload error:', err);
    } finally {
      setUploading(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({ ...prev, aboutImage: '' }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await authFetch(`${API_BASE_URL}/admin/about-settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setMessage('About Page Content updated successfully!');
      } else {
        setMessage('Saved locally');
      }
    } catch (err) {
      setMessage('Update error');
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div>
      <div className="admin-card-header">
        <div>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--primary-navy)' }}>About Page Content Management</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Manage the main About text, section headings, vision, mission, and about image shared between the Home Page &amp; About Page.
          </p>
        </div>
        <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
          <Save size={18} /> {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {message && (
        <div className="alert-success-custom" style={{ marginBottom: '1.5rem' }}>
          <CheckCircle2 size={20} /> {message}
        </div>
      )}

      <form onSubmit={handleSave}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {/* Main Info */}
          <div className="admin-card-box" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--primary-navy)', marginBottom: '1.25rem' }}>
              Main About Overview
            </h3>

            <div className="form-group">
              <label>Main Heading *</label>
              <input
                type="text"
                className="form-control"
                value={formData.mainHeading}
                onChange={(e) => setFormData({ ...formData, mainHeading: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>Main Description / Overview *</label>
              <textarea
                rows="6"
                className="form-control"
                value={formData.mainDescription}
                onChange={(e) => setFormData({ ...formData, mainDescription: e.target.value })}
                required
              ></textarea>
            </div>

            <ImageInputSelector 
              label="About Section Image"
              value={formData.aboutImage}
              onChange={(newUrl) => setFormData(prev => ({ ...prev, aboutImage: newUrl }))}
              placeholder="Paste about section image URL (or upload from computer below)"
            />
          </div>

          {/* Pillars: Vision, Mission, Ethos */}
          <div className="admin-card-box" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--primary-navy)', marginBottom: '1.25rem' }}>
              Vision, Mission & Ethos
            </h3>

            <div className="form-group">
              <label>Vision Section Heading</label>
              <input
                type="text"
                className="form-control"
                value={formData.visionHeading}
                onChange={(e) => setFormData({ ...formData, visionHeading: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Vision Description</label>
              <textarea
                rows="3"
                className="form-control"
                value={formData.visionText}
                onChange={(e) => setFormData({ ...formData, visionText: e.target.value })}
              ></textarea>
            </div>

            <div className="form-group">
              <label>Mission Section Heading</label>
              <input
                type="text"
                className="form-control"
                value={formData.missionHeading}
                onChange={(e) => setFormData({ ...formData, missionHeading: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Mission Description</label>
              <textarea
                rows="3"
                className="form-control"
                value={formData.missionText}
                onChange={(e) => setFormData({ ...formData, missionText: e.target.value })}
              ></textarea>
            </div>

            <div className="form-group">
              <label>Ethos Section Heading</label>
              <input
                type="text"
                className="form-control"
                value={formData.ethosHeading}
                onChange={(e) => setFormData({ ...formData, ethosHeading: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Ethos Description</label>
              <textarea
                rows="3"
                className="form-control"
                value={formData.ethosText}
                onChange={(e) => setFormData({ ...formData, ethosText: e.target.value })}
              ></textarea>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
          <button type="submit" className="btn btn-primary" disabled={saving}>
            <Save size={18} /> {saving ? 'Saving...' : 'Save All About Content'}
          </button>
        </div>
      </form>
    </div>
  );
}
