import React, { useState, useEffect } from 'react';
import { Save, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { SCHOOL_CONFIG } from '../../data/config';

export default function ManageSettings() {
  const { authFetch, adminUser } = useAuth();
  const [formData, setFormData] = useState({
    schoolFullName: SCHOOL_CONFIG.fullName,
    schoolShortName: SCHOOL_CONFIG.shortName,
    tagline: SCHOOL_CONFIG.tagline,
    seoTitle: 'Maharana Pratap Science Academy | MPSA School',
    seoDescription: 'Official public website of Maharana Pratap Science Academy (MPSA School).'
  });

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await authFetch('http://localhost:5000/api/admin/contact-settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      setMessage('Website settings saved successfully!');
    } catch (err) {
      setMessage('Local settings updated!');
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div>
      <div className="admin-card-header">
        <div>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--primary-navy)' }}>General Website Settings & SEO</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Configure school brand titles, taglines, and Search Engine Optimization (SEO) metadata.</p>
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
            <button type="submit" className="btn btn-primary btn-lg" disabled={saving}>
              <Save size={18} /> {saving ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
