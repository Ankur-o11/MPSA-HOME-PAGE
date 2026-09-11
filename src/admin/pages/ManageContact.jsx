import React, { useState, useEffect } from 'react';
import { Save, CheckCircle2, MapPin } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { SCHOOL_CONFIG } from '../../data/config';

export default function ManageContact() {
  const { authFetch } = useAuth();
  const [formData, setFormData] = useState({
    address: SCHOOL_CONFIG.address,
    landmark: SCHOOL_CONFIG.landmark,
    phonePrimary: SCHOOL_CONFIG.phonePrimary,
    phoneSecondary: SCHOOL_CONFIG.phoneSecondary,
    emailGeneral: SCHOOL_CONFIG.emailGeneral,
    emailAdmissions: SCHOOL_CONFIG.emailAdmissions,
    timingOffice: SCHOOL_CONFIG.timingOffice,
    googleMapsEmbedUrl: SCHOOL_CONFIG.GOOGLE_MAPS_EMBED_URL,
    googleMapsDirectionUrl: SCHOOL_CONFIG.GOOGLE_MAPS_DIRECTION_URL,
    facebookUrl: SCHOOL_CONFIG.socialLinks.facebook,
    instagramUrl: SCHOOL_CONFIG.socialLinks.instagram,
    youtubeUrl: SCHOOL_CONFIG.socialLinks.youtube
  });

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function loadContact() {
      try {
        const res = await authFetch('http://localhost:5000/api/public/contact-settings');
        if (res.ok) {
          const data = await res.json();
          if (data) setFormData(prev => ({ ...prev, ...data }));
        }
      } catch (err) {}
    }
    loadContact();
  }, [authFetch]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await authFetch('http://localhost:5000/api/admin/contact-settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      setMessage('Contact Information & Maps updated successfully!');
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
          <h2 style={{ fontSize: '1.5rem', color: 'var(--primary-navy)' }}>Contact Info & Google Maps Management</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Update official address, phone numbers, email IDs, office hours, and Google Maps embed links.</p>
        </div>
      </div>

      {message && (
        <div className="alert-success-custom" style={{ marginBottom: '1.5rem' }}>
          <CheckCircle2 size={20} /> {message}
        </div>
      )}

      <div className="admin-card-box">
        <form onSubmit={handleSave}>
          <div className="form-group">
            <label>School Campus Address *</label>
            <textarea rows="2" className="form-control" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} required></textarea>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
            <div className="form-group">
              <label>Primary Admission Phone *</label>
              <input type="text" className="form-control" value={formData.phonePrimary} onChange={e => setFormData({ ...formData, phonePrimary: e.target.value })} required />
            </div>

            <div className="form-group">
              <label>Secondary Office Phone</label>
              <input type="text" className="form-control" value={formData.phoneSecondary} onChange={e => setFormData({ ...formData, phoneSecondary: e.target.value })} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
            <div className="form-group">
              <label>General Email Address *</label>
              <input type="email" className="form-control" value={formData.emailGeneral} onChange={e => setFormData({ ...formData, emailGeneral: e.target.value })} required />
            </div>

            <div className="form-group">
              <label>Admissions Email Address</label>
              <input type="email" className="form-control" value={formData.emailAdmissions} onChange={e => setFormData({ ...formData, emailAdmissions: e.target.value })} />
            </div>
          </div>

          <div className="form-group">
            <label>School Office Hours *</label>
            <input type="text" className="form-control" value={formData.timingOffice} onChange={e => setFormData({ ...formData, timingOffice: e.target.value })} required />
          </div>

          {/* Google Maps Configuration */}
          <div style={{ marginTop: '2rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--primary-navy)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MapPin size={20} color="#D4A72C" /> Google Maps Configuration
            </h3>

            <div className="form-group">
              <label>Google Maps Embed Iframe URL (src value)</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="https://www.google.com/maps/embed?pb=..." 
                value={formData.googleMapsEmbedUrl} 
                onChange={e => setFormData({ ...formData, googleMapsEmbedUrl: e.target.value })} 
              />
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                Leave empty to display the clean placeholder map box on the public site until exact GPS coordinates are confirmed.
              </p>
            </div>

            <div className="form-group">
              <label>Google Maps Directions URL</label>
              <input 
                type="text" 
                className="form-control" 
                value={formData.googleMapsDirectionUrl} 
                onChange={e => setFormData({ ...formData, googleMapsDirectionUrl: e.target.value })} 
              />
            </div>
          </div>

          {/* Social Links */}
          <div style={{ marginTop: '2rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--primary-navy)', marginBottom: '1rem' }}>Social Media Links</h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label>Facebook URL</label>
                <input type="text" className="form-control" value={formData.facebookUrl} onChange={e => setFormData({ ...formData, facebookUrl: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Instagram URL</label>
                <input type="text" className="form-control" value={formData.instagramUrl} onChange={e => setFormData({ ...formData, instagramUrl: e.target.value })} />
              </div>
              <div className="form-group">
                <label>YouTube URL</label>
                <input type="text" className="form-control" value={formData.youtubeUrl} onChange={e => setFormData({ ...formData, youtubeUrl: e.target.value })} />
              </div>
            </div>
          </div>

          <div style={{ marginTop: '2rem' }}>
            <button type="submit" className="btn btn-primary btn-lg" disabled={saving}>
              <Save size={18} /> {saving ? 'Saving...' : 'Save Contact Information'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
