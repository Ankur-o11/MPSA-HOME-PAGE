import React from 'react';
import { ZoomIn } from 'lucide-react';

export default function GalleryCard({ item, onClick }) {
  return (
    <div className="gallery-card" onClick={() => onClick && onClick(item)}>
      <img 
        src={item.image} 
        alt={item.title} 
        className="gallery-card-img"
        loading="lazy"
      />
      <div className="gallery-zoom-icon">
        <ZoomIn size={18} />
      </div>
      <div className="gallery-card-overlay">
        <h4 className="gallery-card-title">{item.title}</h4>
        {item.date && <p className="gallery-card-date">{item.date}</p>}
      </div>
    </div>
  );
}
