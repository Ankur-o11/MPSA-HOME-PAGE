import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, CheckCircle2, Upload, X, Image as ImageIcon, PlusCircle, Link as LinkIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL, getUploadUrl } from '../../config/api';
import ImageInputSelector from '../components/ImageInputSelector';
import { handleImageError } from '../../utils/imageUtils';

import { upcomingEvents as defaultUpcoming, previousEvents as defaultPrevious } from '../../data/events';

export default function ManageEvents() {
  const { authFetch } = useAuth();
  const [events, setEvents] = useState([
    ...defaultUpcoming.map(e => ({ ...e, isUpcoming: true, isPublished: true, photos: e.photos || [{ url: e.image, caption: e.title }] })),
    ...defaultPrevious.map(e => ({ ...e, isUpcoming: false, isPublished: true, photos: e.photos || [{ url: e.image, caption: e.title }] }))
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '09:00 AM - 02:00 PM',
    location: 'MPSA School Campus',
    category: 'General',
    image: '',
    photos: [],
    description: '',
    isUpcoming: true,
    isPublished: true
  });

  const [message, setMessage] = useState('');

  const fetchEvents = async () => {
    try {
      const res = await authFetch(`${API_BASE_URL}/admin/events`);
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) {
          // Normalize photos array
          const normalized = data.map(evt => ({
            ...evt,
            photos: evt.photos && evt.photos.length > 0 ? evt.photos : (evt.image ? [{ url: evt.image, caption: evt.title }] : [])
          }));
          setEvents(normalized);
        }
      }
    } catch (err) {}
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleOpenAdd = () => {
    setEditingEvent(null);
    setFormData({
      title: '',
      date: 'October 20, 2026',
      time: '09:00 AM - 02:00 PM',
      location: 'MPSA School Campus',
      category: 'General',
      image: '',
      photos: [],
      description: '',
      isUpcoming: true,
      isPublished: true
    });
    setShowModal(true);
  };

  const handleOpenEdit = (e) => {
    setEditingEvent(e);
    setFormData({
      title: e.title || '',
      date: e.date || '',
      time: e.time || '',
      location: e.location || '',
      category: e.category || 'General',
      image: e.image || '',
      photos: e.photos && e.photos.length > 0 ? e.photos : (e.image ? [{ url: e.image, caption: e.title }] : []),
      description: e.description || '',
      isUpcoming: e.isUpcoming !== false,
      isPublished: e.isPublished !== false
    });
    setShowModal(true);
  };

  // Upload photo to event (adds to photos array and sets image if empty)
  const handlePhotoUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const oversized = files.filter(f => f.size > 20 * 1024 * 1024);
    if (oversized.length > 0) {
      alert(`Image size must be 20 MB or less. (${oversized.length} photo(s) exceeded 20 MB and were skipped)`);
    }

    const validFiles = files.filter(f => f.size <= 20 * 1024 * 1024);
    if (validFiles.length === 0) {
      e.target.value = '';
      return;
    }

    setUploading(true);

    try {
      const uploadedPhotos = [];
      for (const file of validFiles) {
        const bodyData = new FormData();
        bodyData.append('image', file);

        const res = await authFetch(`${API_BASE_URL}/admin/upload`, {
          method: 'POST',
          body: bodyData
        });

        if (res.ok) {
          const result = await res.json();
          if (result?.url) {
            uploadedPhotos.push({
              url: result.url,
              caption: file.name.split('.')[0] || 'Event Photo',
              displayOrder: formData.photos.length + uploadedPhotos.length + 1
            });
          }
        }
      }

      if (uploadedPhotos.length > 0) {
        const updatedPhotos = [...formData.photos, ...uploadedPhotos];
        const primaryImage = formData.image || updatedPhotos[0]?.url || '';
        setFormData(prev => ({
          ...prev,
          photos: updatedPhotos,
          image: primaryImage
        }));
        setMessage(`${uploadedPhotos.length} photo(s) added to event!`);
      }
    } catch (err) {
      console.error('Error uploading event photo:', err);
    } finally {
      setUploading(false);
      e.target.value = '';
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleRemovePhoto = (index) => {
    const updatedPhotos = formData.photos.filter((_, idx) => idx !== index);
    const primaryImage = updatedPhotos[0]?.url || '';
    setFormData(prev => ({
      ...prev,
      photos: updatedPhotos,
      image: primaryImage
    }));
  };

  const handleSave = async (evt) => {
    evt.preventDefault();

    // Ensure image is set to first photo if missing
    const primaryImage = formData.image || formData.photos[0]?.url || '';
    const finalData = { ...formData, image: primaryImage };

    try {
      if (editingEvent && editingEvent._id) {
        await authFetch(`${API_BASE_URL}/admin/events/${editingEvent._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(finalData)
        });
      } else {
        await authFetch(`${API_BASE_URL}/admin/events`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(finalData)
        });
      }
    } catch (err) {}

    fetchEvents();
    setShowModal(false);
    setMessage('Event & Event Photos saved successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this event and all associated photos?')) return;

    try {
      await authFetch(`${API_BASE_URL}/admin/events/${id}`, { method: 'DELETE' });
    } catch (err) {}

    setEvents(prev => prev.filter(e => e.id !== id && e._id !== id));
    setMessage('Event and associated photos deleted!');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div>
      <div className="admin-card-header">
        <div>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--primary-navy)' }}>Events &amp; Activities Management</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Manage events, descriptions, dates, and multiple event photos for each event.
          </p>
        </div>
        <button className="btn btn-primary" onClick={handleOpenAdd}>
          <Plus size={18} /> Add New Event
        </button>
      </div>

      {message && (
        <div className="alert-success-custom" style={{ marginBottom: '1.5rem' }}>
          <CheckCircle2 size={20} /> {message}
        </div>
      )}

      <div className="admin-card-box">
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Primary Banner</th>
                <th>Event Name</th>
                <th>Date</th>
                <th>Venue</th>
                <th>Photos</th>
                <th>Type</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map(e => (
                <tr key={e._id || e.id}>
                  <td>
                    <img 
                      src={getUploadUrl(e.image || e.photos?.[0]?.url)} 
                      alt={e.title} 
                      style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} 
                    />
                  </td>
                  <td style={{ fontWeight: '700', color: 'var(--primary-navy)' }}>{e.title}</td>
                  <td style={{ fontSize: '0.85rem' }}>{e.date}</td>
                  <td style={{ fontSize: '0.85rem' }}>{e.location || 'MPSA Campus'}</td>
                  <td>
                    <span className="degree-tag" style={{ background: '#E0F2FE', color: '#0369A1' }}>
                      <ImageIcon size={12} style={{ display: 'inline', marginRight: '4px' }} />
                      {e.photos?.length || 1} photo(s)
                    </span>
                  </td>
                  <td>
                    <span className="degree-tag">
                      {e.isUpcoming ? 'Upcoming' : 'Past Event'}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${e.isPublished !== false ? 'published' : 'draft'}`}>
                      {e.isPublished !== false ? 'Published' : 'Hidden'}
                    </span>
                  </td>
                  <td>
                    <div className="action-btn-group">
                      <button className="btn-icon" onClick={() => handleOpenEdit(e)} title="Edit Event & Photos"><Edit2 size={16} /></button>
                      <button className="btn-icon danger" onClick={() => handleDelete(e._id || e.id)} title="Delete Event"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Event Modal */}
      {showModal && (
        <div className="admin-modal-backdrop">
          <div className="admin-modal-content" style={{ maxWidth: '750px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.35rem', color: 'var(--primary-navy)' }}>
                {editingEvent ? 'Edit Event & Photos' : 'Add New Event'}
              </h3>
              <button className="btn-icon" onClick={() => setShowModal(false)}><X size={20} /></button>
            </div>

            <form onSubmit={handleSave}>
              <div className="form-group">
                <label>Event Name / Title *</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={formData.title} 
                  onChange={e => setFormData({ ...formData, title: e.target.value })} 
                  required 
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label>Event Date *</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={formData.date} 
                    onChange={e => setFormData({ ...formData, date: e.target.value })} 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Event Time</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={formData.time} 
                    onChange={e => setFormData({ ...formData, time: e.target.value })} 
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Venue / Location</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={formData.location} 
                  onChange={e => setFormData({ ...formData, location: e.target.value })} 
                />
              </div>

              <ImageInputSelector 
                label="Primary Banner Image" 
                value={formData.image} 
                onChange={(newUrl) => setFormData(prev => ({ ...prev, image: newUrl }))} 
                placeholder="Paste primary banner image URL (or upload from computer below)"
              />

              <div className="form-group">
                <label>Event Description *</label>
                <textarea 
                  rows="3" 
                  className="form-control" 
                  value={formData.description} 
                  onChange={e => setFormData({ ...formData, description: e.target.value })} 
                  required 
                ></textarea>
              </div>

              {/* Event Photos Manager (Requirement 14: One Event -> Many Photos) */}
              <div style={{ border: '1px solid var(--border-color)', borderRadius: '8px', padding: '1.25rem', marginBottom: '1.5rem', backgroundColor: 'var(--bg-soft)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', color: 'var(--primary-navy)', margin: 0 }}>
                      Event Photos Gallery ({formData.photos.length} photos)
                    </h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
                      Add multiple photos belonging exclusively to this event via computer upload or image URL.
                    </p>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <input 
                      type="file" 
                      accept="image/*" 
                      multiple 
                      onChange={handlePhotoUpload} 
                      disabled={uploading} 
                      style={{ display: 'none' }} 
                      id="event-photos-input" 
                    />
                    <label 
                      htmlFor="event-photos-input" 
                      className="btn btn-primary" 
                      style={{ padding: '0.4rem 0.85rem', fontSize: '0.85rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                    >
                      <PlusCircle size={16} /> {uploading ? 'Uploading...' : 'Upload Photos'}
                    </label>
                  </div>
                </div>

                {/* Add Photo by URL option */}
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="OR paste photo URL and click Add (https://...)" 
                    id="new-event-photo-url-input" 
                    style={{ fontSize: '0.85rem' }}
                  />
                  <button 
                    type="button" 
                    className="btn btn-outline" 
                    style={{ whiteSpace: 'nowrap', fontSize: '0.85rem' }}
                    onClick={() => {
                      const input = document.getElementById('new-event-photo-url-input');
                      if (input && input.value.trim()) {
                        const newUrl = input.value.trim();
                        const updated = [...formData.photos, { url: newUrl, caption: formData.title || 'Event Photo', displayOrder: formData.photos.length + 1 }];
                        setFormData(prev => ({
                          ...prev,
                          photos: updated,
                          image: prev.image || newUrl
                        }));
                        input.value = '';
                      }
                    }}
                  >
                    + Add URL Photo
                  </button>
                </div>

                {formData.photos.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '1.5rem', border: '1px dashed var(--border-color)', borderRadius: '6px', background: '#fff' }}>
                    <ImageIcon size={28} color="var(--text-muted)" style={{ marginBottom: '0.4rem' }} />
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>No photos added to this event gallery yet.</p>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '0.85rem' }}>
                    {formData.photos.map((ph, idx) => (
                      <div key={idx} style={{ position: 'relative', borderRadius: '6px', overflow: 'hidden', border: '1px solid var(--border-color)', background: '#fff' }}>
                        <img 
                          src={getUploadUrl(typeof ph === 'string' ? ph : ph.url)} 
                          alt={`Event Photo ${idx + 1}`} 
                          onError={handleImageError}
                          style={{ width: '100%', height: '90px', objectFit: 'cover' }} 
                        />
                        <button 
                          type="button" 
                          onClick={() => handleRemovePhoto(idx)} 
                          title="Remove Photo"
                          style={{ position: 'absolute', top: '4px', right: '4px', background: 'rgba(239, 68, 68, 0.9)', color: '#fff', border: 'none', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', gap: '2rem', marginBottom: '1.5rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input 
                    type="checkbox" 
                    checked={formData.isUpcoming} 
                    onChange={e => setFormData({ ...formData, isUpcoming: e.target.checked })} 
                  />
                  Upcoming Event (or unchecked for Past Event)
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input 
                    type="checkbox" 
                    checked={formData.isPublished} 
                    onChange={e => setFormData({ ...formData, isPublished: e.target.checked })} 
                  />
                  Published on Public Website
                </label>
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Event &amp; Photos</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
