import React, { memo } from 'react';
import { Calendar, Clock, MapPin, Image as ImageIcon } from 'lucide-react';
import { getUploadUrl } from '../config/api';
import { handleImageError } from '../utils/imageUtils';

function EventCard({ event, isPrevious = false, onClick }) {
  const primaryImage = getUploadUrl(event.image || (typeof event.photos?.[0] === 'string' ? event.photos[0] : event.photos?.[0]?.url));
  const photoCount = event.photos && event.photos.length > 0 ? event.photos.length : 1;

  return (
    <div 
      className="event-card"
      onClick={() => onClick && onClick(event)}
      style={{
        backgroundColor: 'var(--bg-white)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-md)',
        border: '1px solid var(--border-color)',
        display: 'flex',
        flexDirection: 'column',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        boxSizing: 'border-box',
        maxWidth: '100%',
        minWidth: 0
      }}
    >
      <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
        <img 
          src={primaryImage} 
          alt={event.title} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          loading="lazy"
          decoding="async"
          onError={handleImageError}
        />
        <div 
          style={{ 
            position: 'absolute', 
            top: '1rem', 
            left: '1rem', 
            backgroundColor: 'var(--primary-navy)', 
            color: 'var(--accent-gold)',
            padding: '0.4rem 0.85rem',
            borderRadius: '4px',
            fontSize: '0.8rem',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem'
          }}
        >
          <Calendar size={14} />
          <span>{event.date}</span>
        </div>

        {photoCount > 1 && (
          <div 
            style={{ 
              position: 'absolute', 
              bottom: '0.75rem', 
              right: '0.75rem', 
              backgroundColor: 'rgba(10, 34, 59, 0.85)', 
              color: '#fff',
              padding: '0.25rem 0.6rem',
              borderRadius: '4px',
              fontSize: '0.75rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              backdropFilter: 'blur(4px)'
            }}
          >
            <ImageIcon size={12} />
            <span>{photoCount} Photos</span>
          </div>
        )}
      </div>

      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1, minWidth: 0, maxWidth: '100%', boxSizing: 'border-box' }}>
        <h4 style={{ fontSize: '1.15rem', color: 'var(--primary-navy)', marginBottom: '0.75rem', overflowWrap: 'anywhere', wordBreak: 'break-word' }}>
          {event.title}
        </h4>

        {!isPrevious && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem', minWidth: 0, overflowWrap: 'anywhere', wordBreak: 'break-word' }}>
            {event.time && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Clock size={14} color="#1F5F95" style={{ flexShrink: 0 }} />
                <span><strong>Time:</strong> {event.time}</span>
              </div>
            )}
            {event.location && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <MapPin size={14} color="#1F5F95" style={{ flexShrink: 0 }} />
                <span><strong>Venue:</strong> {event.location}</span>
              </div>
            )}
          </div>
        )}

        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6', marginTop: 'auto', overflowWrap: 'anywhere', wordBreak: 'break-word' }}>
          {event.description}
        </p>
      </div>
    </div>
  );
}

export default memo(EventCard);
