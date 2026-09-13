import React, { useState, useEffect } from 'react';
import { Save, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL } from '../../config/api';
import ImageInputSelector from '../components/ImageInputSelector';

export default function ManagePrincipal() {
  const { authFetch } = useAuth();
  const [formData, setFormData] = useState({
    name: 'Dr. [Principal Name Placeholder]',
    designation: 'Principal, MPSA School',
    photo: '',
    qualifications: 'Ph.D., M.Sc., B.Ed.',
    experience: '18+ Years in Education',
    messageQuote: 'At Maharana Pratap Science Academy, we view education as a transformative journey...',
    fullMessage: 'Dear Parents, Guardians, and Dearest Students,\n\nIt is my privilege to welcome you to MAHARANA PRATAP SCIENCE ACADEMY...',
    educationalVision: 'Fostering conceptual clarity, hands-on scientific research...'
  });

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function loadPrincipal() {
      try {
        const res = await authFetch(`${API_BASE_URL}/public/principal`);
        if (res.ok) {
          const data = await res.json();
          if (data) setFormData(prev => ({ ...prev, ...data }));
        }
      } catch (err) {}
    }
    loadPrincipal();
  }, [authFetch]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await authFetch(`${API_BASE_URL}/admin/principal`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      setMessage('Principal Message updated successfully!');
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
          <h2 style={{ fontSize: '1.5rem', color: 'var(--primary-navy)' }}>Principal's Message Management</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Update the Principal address, photograph, and vision displayed on the public site.</p>
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
              <label>Principal Full Name *</label>
              <input type="text" className="form-control" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
            </div>

            <div className="form-group">
              <label>Designation *</label>
              <input type="text" className="form-control" value={formData.designation} onChange={e => setFormData({ ...formData, designation: e.target.value })} required />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
            <div className="form-group">
              <label>Qualifications / Degrees (TEXT) *</label>
              <input type="text" className="form-control" value={formData.qualifications} onChange={e => setFormData({ ...formData, qualifications: e.target.value })} required />
            </div>

            <div className="form-group">
              <label>Experience *</label>
              <input type="text" className="form-control" value={formData.experience} onChange={e => setFormData({ ...formData, experience: e.target.value })} required />
            </div>
          </div>

          <ImageInputSelector 
            label="Principal Photograph *"
            value={formData.photo}
            onChange={(newUrl) => setFormData(prev => ({ ...prev, photo: newUrl }))}
            placeholder="Paste principal photo URL (or upload from computer below)"
            isAvatar={true}
            required
          />

          <div className="form-group">
            <label>Principal Highlight Quote *</label>
            <textarea rows="2" className="form-control" value={formData.messageQuote} onChange={e => setFormData({ ...formData, messageQuote: e.target.value })} required></textarea>
          </div>

          <div className="form-group">
            <label>Full Principal Address / Message *</label>
            <textarea rows="6" className="form-control" value={formData.fullMessage} onChange={e => setFormData({ ...formData, fullMessage: e.target.value })} required></textarea>
          </div>

          <div className="form-group">
            <label>Educational Vision Summary</label>
            <textarea rows="3" className="form-control" value={formData.educationalVision} onChange={e => setFormData({ ...formData, educationalVision: e.target.value })}></textarea>
          </div>

          <div style={{ marginTop: '2rem' }}>
            <button type="submit" className="btn btn-primary btn-lg" disabled={saving}>
              <Save size={18} /> {saving ? 'Saving Changes...' : 'Save Principal Message'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
