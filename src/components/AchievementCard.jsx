import React, { memo } from 'react';
import { Trophy, Calendar } from 'lucide-react';

function AchievementCard({ achievement }) {
  return (
    <div 
      className="achievement-card"
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
      <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
        <img 
          src={achievement.image} 
          alt={achievement.title} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          loading="lazy"
          decoding="async"
        />
        <div 
          style={{
            position: 'absolute',
            top: '0.75rem',
            right: '0.75rem',
            backgroundColor: 'var(--accent-gold)',
            color: 'var(--primary-navy)',
            fontWeight: '800',
            fontSize: '0.85rem',
            padding: '0.25rem 0.75rem',
            borderRadius: '50px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem'
          }}
        >
          <Calendar size={14} />
          <span>{achievement.year}</span>
        </div>
        <span 
          className="category-tag" 
          style={{ position: 'absolute', top: '0.75rem', left: '0.75rem' }}
        >
          {achievement.category}
        </span>
      </div>

      <div style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#926f12', marginBottom: '0.5rem' }}>
          <Trophy size={18} />
          <span style={{ fontWeight: '700', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Honor & Excellence
          </span>
        </div>

        <h4 style={{ fontSize: '1.1rem', color: 'var(--primary-navy)', marginBottom: '0.75rem', lineHeight: '1.4' }}>
          {achievement.title}
        </h4>

        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6', marginTop: 'auto' }}>
          {achievement.description}
        </p>
      </div>
    </div>
  );
}

export default memo(AchievementCard);
