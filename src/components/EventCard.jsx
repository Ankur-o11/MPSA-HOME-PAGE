import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';

export default function EventCard({ event, isPrevious = false }) {
  return (
    <div 
      className="event-card"
      style={{
        backgroundColor: 'var(--bg-white)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-md)',
        border: '1px solid var(--border-color)',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
        <img 
          src={event.image} 
          alt={event.title} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          loading="lazy"
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
      </div>

      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <h4 style={{ fontSize: '1.15rem', color: 'var(--primary-navy)', marginBottom: '0.75rem' }}>
          {event.title}
        </h4>

        {!isPrevious && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            {event.time && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Clock size={14} color="#1F5F95" />
                <span><strong>Time:</strong> {event.time}</span>
              </div>
            )}
            {event.location && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <MapPin size={14} color="#1F5F95" />
                <span><strong>Venue:</strong> {event.location}</span>
              </div>
            )}
          </div>
        )}

        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6', marginTop: 'auto' }}>
          {event.description}
        </p>
      </div>
    </div>
  );
}
