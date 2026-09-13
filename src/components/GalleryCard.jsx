import React, { memo } from 'react';
import { ZoomIn } from 'lucide-react';
import { getUploadUrl } from '../config/api';
import { NEUTRAL_IMAGE_SVG, handleImageError } from '../utils/imageUtils';

function GalleryCard({ item, onClick }) {
  const imageUrl = item.image ? getUploadUrl(item.image) : NEUTRAL_IMAGE_SVG;

  return (
    <div className="gallery-card" onClick={() => onClick && onClick(item)}>
      <img
        src={imageUrl}
        alt={item.title}
        className="gallery-card-img"
        loading="lazy"
        decoding="async"
        onError={handleImageError}
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

export default memo(GalleryCard);
