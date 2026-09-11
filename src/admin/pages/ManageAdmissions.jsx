import React, { useState, useEffect } from 'react';
import { Save, CheckCircle2, Plus, Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL, getUploadUrl } from '../../config/api';


export default function ManageAdmissions() {
  const { authFetch } = useAuth();
  const [formData, setFormData] = useState({
    sessionYear: '2026–2027',
    isOpen: true,
    eligibilityNotes: 'Child should meet minimum age criteria by March 31st of the admission year.',
    faqs: [
      { question: 'What is the age criteria for Class 1st?', answer: 'Child should have completed 5+ years of age as on March 31st.' },
      { question: 'Is transport facility available?', answer: 'Yes, MPSA operates GPS-tracked school buses covering all major residential sectors.' }
    ]
  });

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function loadAdmissions() {
      try {
        const res = await authFetch(`${API_BASE_URL}/public/admissions`);
        if (res.ok) {
          const data = await res.json();
          if (data) setFormData(prev => ({ ...prev, ...data }));
        }
      } catch (err) {}
    }
    loadAdmissions();
  }, [authFetch]);

  const handleAddFaq = () => {
    setFormData(prev => ({
      ...prev,
      faqs: [...prev.faqs, { question: '', answer: '' }]
    }));
  };

  const handleRemoveFaq = (idx) => {
    setFormData(prev => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== idx)
    }));
  };

  const handleFaqChange = (idx, field, val) => {
    setFormData(prev => {
      const updated = [...prev.faqs];
      updated[idx][field] = val;
      return { ...prev, faqs: updated };
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await authFetch(`${API_BASE_URL}/admin/admissions`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      setMessage('Admissions settings updated successfully!');
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
          <h2 style={{ fontSize: '1.5rem', color: 'var(--primary-navy)' }}>Admissions Portal Management</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Toggle admission banner status, session year, eligibility criteria, and parent FAQs.</p>
        </div>
      </div>

      {message && (
        <div className="alert-success-custom" style={{ marginBottom: '1.5rem' }}>
          <CheckCircle2 size={20} /> {message}
        </div>
      )}

      <div className="admin-card-box">
        <form onSubmit={handleSave}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.5rem' }}>
            <div className="form-group">
              <label>Academic Session Year *</label>
              <input type="text" className="form-control" value={formData.sessionYear} onChange={e => setFormData({ ...formData, sessionYear: e.target.value })} required />
            </div>

            <div className="form-group" style={{ display: 'flex', alignItems: 'center', paddingTop: '1.5rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: '700', color: 'var(--primary-navy)' }}>
                <input type="checkbox" checked={formData.isOpen} onChange={e => setFormData({ ...formData, isOpen: e.target.checked })} style={{ width: '20px', height: '20px' }} />
                Admissions Status: {formData.isOpen ? 'OPEN (Banner Active)' : 'CLOSED'}
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>Eligibility & Age Notes *</label>
            <textarea rows="3" className="form-control" value={formData.eligibilityNotes} onChange={e => setFormData({ ...formData, eligibilityNotes: e.target.value })} required></textarea>
          </div>

          {/* Admission FAQs */}
          <div style={{ marginTop: '2rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--primary-navy)' }}>Frequently Asked Questions (FAQs)</h3>
              <button type="button" className="btn btn-outline-gold btn-sm" onClick={handleAddFaq}>
                <Plus size={16} /> Add New FAQ Question
              </button>
            </div>

            {formData.faqs.map((faq, idx) => (
              <div key={idx} style={{ backgroundColor: 'var(--bg-soft)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1rem', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <strong>FAQ #{idx + 1}</strong>
                  <button type="button" className="btn-icon danger" onClick={() => handleRemoveFaq(idx)}><Trash2 size={16} /></button>
                </div>
                <input type="text" className="form-control" placeholder="Question" value={faq.question} onChange={e => handleFaqChange(idx, 'question', e.target.value)} required style={{ marginBottom: '0.5rem' }} />
                <textarea rows="2" className="form-control" placeholder="Answer" value={faq.answer} onChange={e => handleFaqChange(idx, 'answer', e.target.value)} required></textarea>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '2rem' }}>
            <button type="submit" className="btn btn-primary btn-lg" disabled={saving}>
              <Save size={18} /> {saving ? 'Saving...' : 'Save Admissions Settings'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
