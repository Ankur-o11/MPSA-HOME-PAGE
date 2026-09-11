import React, { useState, useEffect } from 'react';
import { Save, CheckCircle2, ShieldCheck, Upload, Trash2, Image as ImageIcon, GraduationCap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL, getUploadUrl } from '../../config/api';

import { SCHOOL_CONFIG } from '../../data/config';

export default function ManageSettings() {
  const { authFetch, adminUser } = useAuth();
  const [formData, setFormData] = useState({
    schoolFullName: SCHOOL_CONFIG.fullName,
    schoolShortName: SCHOOL_CONFIG.shortName,
    tagline: SCHOOL_CONFIG.tagline,
    logoUrl: '',
    seoTitle: 'Maharana Pratap Science Academy | MPSA School',
    seoDescription: 'Official public website of Maharana Pratap Science Academy (MPSA School).'
  });

  const [saving, setSaving] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await authFetch(`${API_BASE_URL}/public/contact-settings`);
        if (res.ok) {
          const data = await res.json();
          if (data) {
            setFormData(prev => ({
              ...prev,
              schoolFullName: data.schoolFullName || SCHOOL_CONFIG.fullName,
              schoolShortName: data.schoolShortName || SCHOOL_CONFIG.shortName,
              tagline: data.tagline || SCHOOL_CONFIG.tagline,
              logoUrl: data.logoUrl || '',
              seoTitle: data.seoTitle || 'Maharana Pratap Science Academy | MPSA School',
              seoDescription: data.seoDescription || 'Official public website of Maharana Pratap Science Academy (MPSA School).'
            }));
          }
        }
      } catch (err) {
        console.error('Failed to load settings:', err);
      }
    }
    loadSettings();
  }, [authFetch]);

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingLogo(true);
    const uploadData = new FormData();
    uploadData.append('image', file);

    try {
      const res = await authFetch(`${API_BASE_URL}/admin/upload`, {
        method: 'POST',
        body: uploadData
      });
      const result = await res.json();
      if (result.success) {
        const logoFullUrl = getUploadUrl(result.url);
        setFormData(prev => ({ ...prev, logoUrl: logoFullUrl }));
        setMessage('Logo uploaded successfully! Click "Save Settings" to persist changes.');
      } else {
        alert(result.message || 'Logo upload failed');
      }
    } catch (err) {
      alert('Logo upload failed. Please check network connection.');
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await authFetch(`${API_BASE_URL}/admin/contact-settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      setMessage('Website settings & logo saved successfully!');
    } catch (err) {
      setMessage('Settings updated locally.');
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(''), 4000);
    }
  };

  return (
    <div>
      <div className="admin-card-header">
        <div>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--primary-navy)' }}>Website Settings & Logo Management</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Configure official school logo, brand names, tagline, and Search Engine Optimization (SEO) settings.</p>
        </div>
      </div>

      {message && (
        <div className="alert-success-custom" style={{ marginBottom: '1.5rem' }}>
          <CheckCircle2 size={20} /> {message}
        </div>
      )}

      <div className="admin-card-box">
        <form onSubmit={handleSave}>
          {/* School Logo Section */}
          <div style={{ marginBottom: '2rem', padding: '1.5rem', backgroundColor: 'var(--bg-soft)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <h3 style={{ fontSize: '1.15rem', color: 'var(--primary-navy)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ImageIcon size={20} color="#D4A72C" /> School Logo Management
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              Upload, replace, or remove the official school logo displayed across the public header, navbar, home page, and footer. Supported formats: JPG, JPEG, PNG, WEBP, SVG.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
              {/* Logo Preview Box */}
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: '110px',
                  height: '110px',
                  borderRadius: '50%',
                  backgroundColor: '#fff',
                  border: '3px solid var(--accent-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  margin: '0 auto 0.5rem auto'
                }}>
                  {formData.logoUrl ? (
                    <img src={formData.logoUrl} alt="School Logo Preview" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  ) : (
                    <GraduationCap size={52} color="var(--primary-navy)" />
                  )}
                </div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>
                  {formData.logoUrl ? 'Current Active Logo' : 'Default Icon Logo'}
                </span>
              </div>

              {/* Upload & Action Controls */}
              <div style={{ flex: 1, minWidth: '240px' }}>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                  <label className="btn btn-primary" style={{ cursor: 'pointer', margin: 0, display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Upload size={16} /> {uploadingLogo ? 'Uploading Logo...' : formData.logoUrl ? 'Change / Upload Logo' : 'Upload School Logo'}
                    <input 
                      type="file" 
                      accept="image/jpeg,image/png,image/webp,image/svg+xml,image/jpg" 
                      style={{ display: 'none' }} 
                      onChange={handleLogoUpload}
                      disabled={uploadingLogo}
                    />
                  </label>

                  {formData.logoUrl && (
                    <button 
                      type="button" 
                      className="btn" 
                      style={{ color: '#DC2626', backgroundColor: '#FEE2E2', border: '1px solid #FCA5A5', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                      onClick={() => setFormData(prev => ({ ...prev, logoUrl: '' }))}
                    >
                      <Trash2 size={16} /> Remove Logo
                    </button>
                  )}
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label style={{ fontSize: '0.82rem' }}>Logo Image URL (Auto-filled on upload)</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="http://localhost:5000/uploads/logo.png" 
                    value={formData.logoUrl || ''} 
                    onChange={e => setFormData({ ...formData, logoUrl: e.target.value })} 
                  />
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
            <div className="form-group">
              <label>Official School Name (Full) *</label>
              <input type="text" className="form-control" value={formData.schoolFullName} onChange={e => setFormData({ ...formData, schoolFullName: e.target.value })} required />
            </div>

            <div className="form-group">
              <label>Short Brand Name *</label>
              <input type="text" className="form-control" value={formData.schoolShortName} onChange={e => setFormData({ ...formData, schoolShortName: e.target.value })} required />
            </div>
          </div>

          <div className="form-group">
            <label>School Tagline / Slogan *</label>
            <input type="text" className="form-control" value={formData.tagline} onChange={e => setFormData({ ...formData, tagline: e.target.value })} required />
          </div>

          <div className="form-group">
            <label>Homepage SEO Meta Title *</label>
            <input type="text" className="form-control" value={formData.seoTitle} onChange={e => setFormData({ ...formData, seoTitle: e.target.value })} required />
          </div>

          <div className="form-group">
            <label>Homepage SEO Meta Description *</label>
            <textarea rows="3" className="form-control" value={formData.seoDescription} onChange={e => setFormData({ ...formData, seoDescription: e.target.value })} required></textarea>
          </div>

          <div style={{ marginTop: '2rem', backgroundColor: 'var(--bg-soft)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <h4 style={{ fontSize: '1rem', color: 'var(--primary-navy)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <ShieldCheck size={18} color="#D4A72C" /> Logged In Administrator Profile:
            </h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              <strong>Administrator Name:</strong> {adminUser?.name || 'MPSA Administrator'}<br />
              <strong>Email Account:</strong> {adminUser?.email || 'admin@mpsaschool.edu.in'}<br />
              <strong>Role Permission:</strong> {adminUser?.role || 'super_admin'}
            </p>
          </div>

          <div style={{ marginTop: '2rem' }}>
            <button type="submit" className="btn btn-primary btn-lg" disabled={saving || uploadingLogo}>
              <Save size={18} /> {saving ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
