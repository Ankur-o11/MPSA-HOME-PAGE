import React, { memo } from 'react';

function FacilityCard({ facility }) {
  return (
    <div className="why-card" style={{ padding: '0', overflow: 'hidden', textAlign: 'left', maxWidth: '100%', boxSizing: 'border-box', minWidth: 0 }}>
      <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
        <img 
          src={facility.image} 
          alt={facility.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          loading="lazy"
          decoding="async"
        />
        {facility.category && (
          <span 
            className="category-tag" 
            style={{ position: 'absolute', top: '0.75rem', left: '0.75rem' }}
          >
            {facility.category}
          </span>
        )}
      </div>
      <div style={{ padding: '1.5rem', minWidth: 0, maxWidth: '100%', boxSizing: 'border-box' }}>
        <h4 style={{ fontSize: '1.15rem', color: 'var(--primary-navy)', marginBottom: '0.5rem', overflowWrap: 'anywhere', wordBreak: 'break-word' }}>
          {facility.title}
        </h4>
        <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: '1.6', overflowWrap: 'anywhere', wordBreak: 'break-word' }}>
          {facility.description}
        </p>
      </div>
    </div>
  );
}

export default memo(FacilityCard);
