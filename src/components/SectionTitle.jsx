import React from 'react';

/**
 * Reusable SectionTitle Component
 * Displays a badge, main title with gold underline accent, and optional subtitle.
 */
export default function SectionTitle({ badge, title, subtitle, align = 'center' }) {
  return (
    <div className={`section-title-wrapper ${align === 'left' ? 'align-left' : ''}`}>
      {badge && <span className="section-badge">{badge}</span>}
      <h2 className="section-title-text">{title}</h2>
      <div className="title-underline"></div>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  );
}
