import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Lightbox({ item, onClose, onNext, onPrev }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && onNext) onNext();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev]);

  if (!item) return null;

  return (
    <div className="lightbox-backdrop" onClick={onClose}>
      <div className="lightbox-content-box" onClick={(e) => e.stopPropagation()}>
        <button className="lightbox-close-btn" onClick={onClose} aria-label="Close Lightbox">
          <X size={24} />
        </button>

        {onPrev && (
          <button 
            className="lightbox-close-btn" 
            style={{ left: '1rem', right: 'auto' }} 
            onClick={onPrev}
            aria-label="Previous Image"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        {onNext && (
          <button 
            className="lightbox-close-btn" 
            style={{ right: '4.5rem' }} 
            onClick={onNext}
            aria-label="Next Image"
          >
            <ChevronRight size={24} />
          </button>
        )}

        <div className="lightbox-img-wrapper">
          <img src={item.image} alt={item.title} />
        </div>

        <div className="lightbox-caption-area">
          <h3>{item.title}</h3>
          {item.caption && <p>{item.caption}</p>}
          {item.date && (
            <span style={{ fontSize: '0.85rem', color: 'var(--accent-gold)', display: 'block', marginTop: '0.5rem' }}>
              Event/Date: {item.date}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
