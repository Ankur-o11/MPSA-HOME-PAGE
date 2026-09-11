import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, Upload, CheckCircle2, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { teachersData as defaultTeachers } from '../../data/teachers';

export default function ManageTeachers() {
  const { authFetch } = useAuth();
  const [teachers, setTeachers] = useState(defaultTeachers);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    photo: '',
    qualifications: '',
    subject: '',
    classes: '',
    classGroup: 'Secondary & Sr. Secondary',
    experience: '',
    bioShort: '',
    bioFull: '',
    email: '',
    officeHours: '',
    displayOrder: 1,
    isActive: true
  });

  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  // Fetch teachers from backend
  const fetchTeachers = async () => {
    try {
      const res = await authFetch('http://localhost:5000/api/admin/teachers');
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) setTeachers(data);
      }
    } catch (err) {
      // Keep static list if offline
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleOpenAddModal = () => {
    setEditingTeacher(null);
    setFormData({
      name: '',
      designation: '',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop',
      qualifications: 'B.A., M.A., B.Ed.',
      subject: 'English',
      classes: '6th – 10th',
      classGroup: 'Secondary & Sr. Secondary',
      experience: '5 Years',
      bioShort: 'Dedicated educator passionate about student excellence.',
      bioFull: 'Brings rich teaching experience with student-centered focus.',
      email: '',
      officeHours: 'Mon-Fri 2:30-3:30 PM',
      displayOrder: teachers.length + 1,
      isActive: true
    });
    setShowModal(true);
  };

  const handleOpenEditModal = (t) => {
    setEditingTeacher(t);
    setFormData({
      ...t,
      qualifications: Array.isArray(t.qualifications) ? t.qualifications.join(', ') : t.qualifications
    });
    setShowModal(true);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append('image', file);
    setUploading(true);

    try {
      const res = await authFetch('http://localhost:5000/api/admin/upload', {
        method: 'POST',
        body: data
      });
      const result = await res.json();
      if (result.success) {
        setFormData(prev => ({ ...prev, photo: `http://localhost:5000${result.url}` }));
        setMessage('Photo uploaded successfully!');
      }
    } catch (err) {
      alert('Photo upload failed. You can also paste an image URL directly.');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      qualifications: typeof formData.qualifications === 'string'
        ? formData.qualifications.split(',').map(q => q.trim()).filter(Boolean)
        : formData.qualifications
    };

    try {
      if (editingTeacher && editingTeacher._id) {
        await authFetch(`http://localhost:5000/api/admin/teachers/${editingTeacher._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } else {
        await authFetch('http://localhost:5000/api/admin/teachers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }
    } catch (err) {
      // Local state fallback update if offline
    }

    if (editingTeacher) {
      setTeachers(prev => prev.map(t => (t.id === editingTeacher.id || t._id === editingTeacher._id) ? { ...t, ...payload } : t));
    } else {
      setTeachers(prev => [{ ...payload, id: 't_' + Date.now() }, ...prev]);
    }

    setShowModal(false);
    setMessage('Teacher saved successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete teacher ${name}?`)) return;

    try {
      await authFetch(`http://localhost:5000/api/admin/teachers/${id}`, { method: 'DELETE' });
    } catch (err) {
      // Local fallback
    }

    setTeachers(prev => prev.filter(t => t.id !== id && t._id !== id));
    setMessage('Teacher deleted successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  const filteredTeachers = teachers.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="admin-card-header">
        <div>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--primary-navy)' }}>Faculty & Teacher Management</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Add, edit, or remove teacher profiles displayed on the public website.</p>
        </div>
        <button className="btn btn-primary" onClick={handleOpenAddModal}>
          <Plus size={18} /> Add New Teacher
        </button>
      </div>

      {message && (
        <div className="alert-success-custom" style={{ marginBottom: '1.5rem' }}>
          <CheckCircle2 size={20} /> {message}
        </div>
      )}

      {/* Search Bar */}
      <div className="search-input-wrapper" style={{ maxWidth: '400px', marginBottom: '1.5rem' }}>
        <Search size={18} />
        <input 
          type="text" 
          className="form-control" 
          placeholder="Filter by teacher name or subject..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Teachers Table */}
      <div className="admin-card-box" style={{ padding: '1rem' }}>
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Photo</th>
                <th>Full Name</th>
                <th>Designation</th>
                <th>Qualifications (TEXT)</th>
                <th>Subject</th>
                <th>Classes</th>
                <th>Experience</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTeachers.map(t => (
                <tr key={t._id || t.id}>
                  <td>
                    <img 
                      src={t.photo} 
                      alt={t.name} 
                      style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--accent-gold)' }} 
                    />
                  </td>
                  <td style={{ fontWeight: '700', color: 'var(--primary-navy)' }}>{t.name}</td>
                  <td>{t.designation}</td>
                  <td>
                    <div className="qualifications-list">
                      {Array.isArray(t.qualifications) 
                        ? t.qualifications.map((q, idx) => <span key={idx} className="degree-tag">{q}</span>)
                        : <span className="degree-tag">{t.qualifications}</span>}
                    </div>
                  </td>
                  <td style={{ fontWeight: '600', color: 'var(--secondary-blue)' }}>{t.subject}</td>
                  <td>{t.classes}</td>
                  <td>{t.experience}</td>
                  <td>
                    <span className={`status-badge ${t.isActive !== false ? 'active' : 'inactive'}`}>
                      {t.isActive !== false ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>
                    <div className="action-btn-group">
                      <button className="btn-icon" onClick={() => handleOpenEditModal(t)} title="Edit Teacher">
                        <Edit2 size={16} />
                      </button>
                      <button className="btn-icon danger" onClick={() => handleDelete(t._id || t.id, t.name)} title="Delete Teacher">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form */}
      {showModal && (
        <div className="admin-modal-backdrop">
          <div className="admin-modal-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.35rem', color: 'var(--primary-navy)' }}>
                {editingTeacher ? 'Edit Teacher Details' : 'Add New Teacher'}
              </h3>
              <button className="btn-icon" onClick={() => setShowModal(false)}><X size={20} /></button>
            </div>

            <form onSubmit={handleSave}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label>Full Name *</label>
                  <input type="text" className="form-control" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label>Designation *</label>
                  <input type="text" className="form-control" value={formData.designation} onChange={e => setFormData({ ...formData, designation: e.target.value })} required />
                </div>
              </div>

              <div className="form-group">
                <label>Qualifications / Degrees (Comma Separated TEXT) *</label>
                <input type="text" className="form-control" placeholder="e.g. B.A., M.A. English, B.Ed." value={formData.qualifications} onChange={e => setFormData({ ...formData, qualifications: e.target.value })} required />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label>Subject *</label>
                  <input type="text" className="form-control" value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label>Classes Taught *</label>
                  <input type="text" className="form-control" value={formData.classes} onChange={e => setFormData({ ...formData, classes: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label>Experience *</label>
                  <input type="text" className="form-control" value={formData.experience} onChange={e => setFormData({ ...formData, experience: e.target.value })} required />
                </div>
              </div>

              <div className="form-group">
                <label>Photo URL or Upload *</label>
                <input type="text" className="form-control" value={formData.photo} onChange={e => setFormData({ ...formData, photo: e.target.value })} required />
                <div className="image-upload-preview">
                  <img src={formData.photo} alt="Preview" className="preview-thumbnail" />
                  <div>
                    <label className="btn btn-outline btn-sm" style={{ cursor: 'pointer' }}>
                      <Upload size={14} /> Upload Image File {uploading && '...'}
                      <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                    </label>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>Supports JPG, PNG, WEBP max 5MB.</p>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>Short Introduction</label>
                <textarea rows="2" className="form-control" value={formData.bioShort} onChange={e => setFormData({ ...formData, bioShort: e.target.value })}></textarea>
              </div>

              <div className="form-group">
                <label>Detailed Biography</label>
                <textarea rows="3" className="form-control" value={formData.bioFull} onChange={e => setFormData({ ...formData, bioFull: e.target.value })}></textarea>
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Teacher Profile</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
