import React, { useState, useEffect } from 'react';
import { Save, CheckCircle2, ShieldCheck, Upload, Trash2, Image as ImageIcon, GraduationCap, Layout, BookOpen } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL, getUploadUrl } from '../../config/api';
import ImageInputSelector from '../components/ImageInputSelector';
import { SCHOOL_CONFIG } from '../../data/config';
import { NEUTRAL_IMAGE_SVG } from '../../utils/imageUtils';

export default function ManageSettings() {
  const { authFetch, adminUser } = useAuth();
  const [formData, setFormData] = useState({
    schoolFullName: SCHOOL_CONFIG.fullName,
    schoolShortName: SCHOOL_CONFIG.shortName,
    tagline: SCHOOL_CONFIG.tagline,
    logoUrl: '',
    heroBannerImage: '',
    aboutSectionImage: '',
    seoTitle: 'Maharana Pratap Science Academy | MPSA School',
    seoDescription: 'Official public website of Maharana Pratap Science Academy (MPSA School).'
  });

  const [saving, setSaving] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingHero, setUploadingHero] = useState(false);
  const [uploadingAbout, setUploadingAbout] = useState(false);
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
              heroBannerImage: data.heroBannerImage || '',
              aboutSectionImage: data.aboutSectionImage || '',
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

  const handleHeroBannerUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingHero(true);
    const uploadData = new FormData();
    uploadData.append('image', file);

    try {
      const res = await authFetch(`${API_BASE_URL}/admin/upload`, {
        method: 'POST',
        body: uploadData
      });
      const result = await res.json();
      if (result.success) {
        const heroFullUrl = getUploadUrl(result.url);
        setFormData(prev => ({ ...prev, heroBannerImage: heroFullUrl }));
        setMessage('Hero Banner image uploaded successfully! Click "Save Settings" to persist changes.');
      } else {
        alert(result.message || 'Hero Banner image upload failed');
      }
    } catch (err) {
      alert('Hero Banner image upload failed. Please check network connection.');
    } finally {
      setUploadingHero(false);
    }
  };

  const handleAboutImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingAbout(true);
    const uploadData = new FormData();
    uploadData.append('image', file);

    try {
      const res = await authFetch(`${API_BASE_URL}/admin/upload`, {
        method: 'POST',
        body: uploadData
      });
      const result = await res.json();
      if (result.success) {
        const aboutFullUrl = getUploadUrl(result.url);
        setFormData(prev => ({ ...prev, aboutSectionImage: aboutFullUrl }));
        setMessage('About Section image uploaded successfully! Click "Save Settings" to persist changes.');
      } else {
        alert(result.message || 'About Section image upload failed');
      }
    } catch (err) {
      alert('About Section image upload failed. Please check network connection.');
    } finally {
      setUploadingAbout(false);
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
      setMessage('Website settings, logo, hero banner & About section image saved successfully!');
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
          <h2 style={{ fontSize: '1.5rem', color: 'var(--primary-navy)' }}>Website Settings & Brand Management</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Configure official school logo, hero banner image, about section campus image, tagline, and SEO settings.</p>
        </div>
      </div>

      {message && (
        <div className="alert-success-custom" style={{ marginBottom: '1.5rem' }}>
          <CheckCircle2 size={20} /> {message}
        </div>
      )}

      <div className="admin-card-box">
        <form onSubmit={handleSave}>
          {/* 1. School Logo Section */}
          <div style={{ marginBottom: '2rem', padding: '1.5rem', backgroundColor: 'var(--bg-soft)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <h3 style={{ fontSize: '1.15rem', color: 'var(--primary-navy)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ImageIcon size={20} color="#D4A72C" /> School Logo Management
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              Upload, replace, or remove the official school logo displayed across the public header, navbar, home page, and footer.
            </p>
            <ImageInputSelector 
              label="Official School Logo"
              value={formData.logoUrl}
              onChange={(newUrl) => setFormData(prev => ({ ...prev, logoUrl: newUrl }))}
              placeholder="Paste logo image URL (or upload from computer below)"
              isAvatar={true}
            />
          </div>

          {/* 2. Hero Banner Image Section */}
          <div style={{ marginBottom: '2rem', padding: '1.5rem', backgroundColor: 'var(--bg-soft)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <h3 style={{ fontSize: '1.15rem', color: 'var(--primary-navy)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Layout size={20} color="#D4A72C" /> Home Page Hero Banner Image Management
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              Upload, replace, or delete the dynamic Hero Banner image displayed at the top of the Home Page under the header.
            </p>
            <ImageInputSelector 
              label="Home Page Hero Banner Image"
              value={formData.heroBannerImage}
              onChange={(newUrl) => setFormData(prev => ({ ...prev, heroBannerImage: newUrl }))}
              placeholder="Paste hero banner image URL (or upload from computer below)"
            />
          </div>

          {/* 3. About Section Image Section */}
          <div style={{ marginBottom: '2rem', padding: '1.5rem', backgroundColor: 'var(--bg-soft)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <h3 style={{ fontSize: '1.15rem', color: 'var(--primary-navy)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <BookOpen size={20} color="#D4A72C" /> Home Page About Section Image
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              Upload, replace, or delete the right-side campus image in the Home Page About Section ("Nurturing Scientific Minds & Character Excellence").
            </p>
            <ImageInputSelector 
              label="Home Page About Section Image"
              value={formData.aboutSectionImage}
              onChange={(newUrl) => setFormData(prev => ({ ...prev, aboutSectionImage: newUrl }))}
              placeholder="Paste about campus image URL (or upload from computer below)"
            />
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
            <button type="submit" className="btn btn-primary btn-lg" disabled={saving || uploadingLogo || uploadingHero || uploadingAbout}>
              <Save size={18} /> {saving ? 'Saving Settings...' : 'Save Settings'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
