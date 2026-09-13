import React from 'react';
import { Calendar, Bell, Download, AlertCircle } from 'lucide-react';

export default function NoticeCard({ notice, onSelectNotice }) {
  return (
    <div 
      className="notice-card" 
      style={{
        backgroundColor: 'var(--bg-white)',
        borderRadius: 'var(--radius-md)',
        padding: '1.5rem',
        border: notice.isImportant ? '2px solid var(--accent-gold)' : '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        position: 'relative',
        boxSizing: 'border-box',
        maxWidth: '100%',
        minWidth: 0
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', minWidth: 0, maxWidth: '100%' }}>
        <span className="category-tag">
          {notice.category}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          <Calendar size={14} style={{ flexShrink: 0 }} />
          <span>{notice.date}</span>
        </div>
      </div>

      <h4 style={{ fontSize: '1.05rem', color: 'var(--primary-navy)', lineHeight: '1.4', overflowWrap: 'anywhere', wordBreak: 'break-word' }}>
        {notice.isImportant && (
          <AlertCircle size={16} color="#D4A72C" style={{ display: 'inline', marginRight: '0.35rem', verticalAlign: 'middle', flexShrink: 0 }} />
        )}
        {notice.title}
      </h4>

      <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6', overflowWrap: 'anywhere', wordBreak: 'break-word' }}>
        {notice.description}
      </p>

      <div style={{ marginTop: 'auto', paddingTop: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', maxWidth: '100%', boxSizing: 'border-box' }}>
        <button 
          onClick={() => onSelectNotice && onSelectNotice(notice)}
          className="btn btn-outline btn-sm"
        >
          <Bell size={14} style={{ flexShrink: 0 }} /> Read Full Notice
        </button>
        {notice.downloadUrl && (
          <a 
            href={notice.downloadUrl} 
            download 
            className="btn btn-sm"
            style={{ color: 'var(--secondary-blue)', textDecoration: 'underline' }}
            onClick={(e) => e.preventDefault()}
            title="Download PDF Notice (Placeholder)"
          >
            <Download size={14} style={{ display: 'inline', marginRight: '0.2rem', flexShrink: 0 }} /> PDF
          </a>
        )}
      </div>
    </div>
  );
}
