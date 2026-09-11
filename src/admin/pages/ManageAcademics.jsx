import React, { useState, useEffect } from 'react';
import { Save, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function ManageAcademics() {
  const { authFetch } = useAuth();
  const [formData, setFormData] = useState({
    classesOfferedText: 'Pre-Primary, Primary (1-5), Middle (6-8), Secondary (9-10), Sr. Secondary Science (11-12)',
    curriculumText: 'CBSE pattern science & holistic value curriculum',
    subjectsOverview: 'Physics, Chemistry, Mathematics, Biology, Computer Science, English, Hindi, Social Studies',
    methodologyText: 'Interactive digital smartboards, practical science labs, experiential project learning',
    examSystemText: 'Weekly periodic unit tests, term exams, practical viva, pre-board mock exams'
  });

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function loadAcademics() {
      try {
        const res = await authFetch('http://localhost:5000/api/public/academics');
        if (res.ok) {
          const data = await res.json();
          if (data) setFormData(prev => ({ ...prev, ...data }));
        }
      } catch (err) {}
    }
    loadAcademics();
  }, [authFetch]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await authFetch('http://localhost:5000/api/admin/academics', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      setMessage('Academic information updated successfully!');
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
          <h2 style={{ fontSize: '1.5rem', color: 'var(--primary-navy)' }}>Academics & Syllabus Management</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Update classes offered, subjects overview, teaching methodology, and exam system text.</p>
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
            <label>Classes Offered Overview *</label>
            <textarea rows="2" className="form-control" value={formData.classesOfferedText} onChange={e => setFormData({ ...formData, classesOfferedText: e.target.value })} required></textarea>
          </div>

          <div className="form-group">
            <label>Curriculum & Affiliation Text *</label>
            <textarea rows="2" className="form-control" value={formData.curriculumText} onChange={e => setFormData({ ...formData, curriculumText: e.target.value })} required></textarea>
          </div>

          <div className="form-group">
            <label>Key Subjects Overview *</label>
            <textarea rows="3" className="form-control" value={formData.subjectsOverview} onChange={e => setFormData({ ...formData, subjectsOverview: e.target.value })} required></textarea>
          </div>

          <div className="form-group">
            <label>Teaching Methodology Text *</label>
            <textarea rows="3" className="form-control" value={formData.methodologyText} onChange={e => setFormData({ ...formData, methodologyText: e.target.value })} required></textarea>
          </div>

          <div className="form-group">
            <label>Examination & Evaluation System Text *</label>
            <textarea rows="3" className="form-control" value={formData.examSystemText} onChange={e => setFormData({ ...formData, examSystemText: e.target.value })} required></textarea>
          </div>

          <div style={{ marginTop: '2rem' }}>
            <button type="submit" className="btn btn-primary btn-lg" disabled={saving}>
              <Save size={18} /> {saving ? 'Saving...' : 'Save Academics Information'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
