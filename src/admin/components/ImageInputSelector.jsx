import React, { useState } from 'react';
import { Upload, Link, Trash2, Image as ImageIcon, Award } from 'lucide-react';
import { API_BASE_URL, getUploadUrl } from '../../config/api';
import { useAuth } from '../context/AuthContext';
import { handleImageError, handleAvatarError } from '../../utils/imageUtils';

export default function ImageInputSelector({
  label = 'Photo / Image',
  value = '',
  onChange,
  placeholder = 'Paste image URL (e.g. https://example.com/image.jpg)',
  isAvatar = false,
  required = false
}) {
  const { authFetch } = useAuth();
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Requirement 1 & 12: Validate original upload limit of 20 MB
    if (file.size > 20 * 1024 * 1024) {
      alert('Image size must be 20 MB or less.');
      e.target.value = '';
      return;
    }

    const bodyData = new FormData();
    bodyData.append('image', file);
    setUploading(true);

    try {
      const res = await authFetch(`${API_BASE_URL}/admin/upload`, {
        method: 'POST',
        body: bodyData
      });
      const result = await res.json();
      if (res.ok && result?.url) {
        onChange(getUploadUrl(result.url));
      } else {
        alert('File upload failed: ' + (result?.message || 'Unknown error'));
      }
    } catch (err) {
      alert('Upload error: ' + err.message);
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleUrlChange = (e) => {
    onChange(e.target.value);
  };

  const previewSrc = value ? getUploadUrl(value) : '';

  return (
    <div className="form-group" style={{ marginBottom: '1.25rem' }}>
      {label && (
        <label className="form-label" style={{ fontWeight: '600', color: 'var(--primary-navy)', marginBottom: '0.4rem', display: 'block' }}>
          {label} {required && '*'}
        </label>
      )}

      <div 
        style={{ 
          display: 'flex', 
          gap: '1.25rem', 
          alignItems: 'center', 
          flexWrap: 'wrap', 
          backgroundColor: 'var(--bg-soft)', 
          padding: '1rem', 
          borderRadius: '8px', 
          border: '1px solid var(--border-color)' 
        }}
      >
        {/* Preview box */}
        <div style={{ flexShrink: 0 }}>
          {isAvatar ? (
            <div 
              style={{ 
                width: '80px', 
                height: '80px', 
                borderRadius: '50%', 
                overflow: 'hidden', 
                backgroundColor: '#E2E8F0', 
                border: '2px solid var(--border-color)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}
            >
              {previewSrc ? (
                <img 
                  src={previewSrc} 
                  alt="Preview" 
                  onError={handleAvatarError} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              ) : (
                <Award size={32} color="#94A3B8" />
              )}
            </div>
          ) : (
            <div 
              style={{ 
                width: '120px', 
                height: '80px', 
                borderRadius: '6px', 
                overflow: 'hidden', 
                backgroundColor: '#E2E8F0', 
                border: '1px solid var(--border-color)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}
            >
              {previewSrc ? (
                <img 
                  src={previewSrc} 
                  alt="Preview" 
                  onError={handleImageError} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              ) : (
                <ImageIcon size={28} color="#94A3B8" />
              )}
            </div>
          )}
        </div>

        {/* Dual Input Controls: Upload from Computer OR Photo URL */}
        <div style={{ flexGrow: 1, minWidth: '240px', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          
          {/* Top Row: Upload Button & OR badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <label 
              className="btn btn-outline btn-sm" 
              style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', margin: 0, padding: '0.4rem 0.85rem' }}
            >
              <Upload size={14} /> {uploading ? 'Uploading...' : 'Upload from Computer'}
              <input type="file" accept="image/*" onChange={handleFileUpload} style={{ display: 'none' }} disabled={uploading} />
            </label>

            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '700' }}>OR</span>

            {value && (
              <button 
                type="button" 
                className="btn btn-outline-danger btn-sm" 
                onClick={() => onChange('')}
                style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
              >
                <Trash2 size={12} /> Clear
              </button>
            )}
          </div>

          {/* Bottom Row: Photo URL Input */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Link size={14} color="var(--text-muted)" style={{ position: 'absolute', left: '10px', pointerEvents: 'none' }} />
            <input 
              type="text" 
              className="form-control" 
              style={{ paddingLeft: '32px', fontSize: '0.85rem' }} 
              value={value} 
              onChange={handleUrlChange} 
              placeholder={placeholder}
              required={required && !value}
            />
          </div>

        </div>
      </div>
    </div>
  );
}
