import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle';
import GalleryCard from '../components/GalleryCard';
import Lightbox from '../components/Lightbox';
import { galleryCategories, galleryData } from '../data/gallery';

export default function Gallery() {
  const [activeTab, setActiveTab] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filteredItems = useMemo(() => {
    if (activeTab === 'All') return galleryData;
    return galleryData.filter(item => item.category === activeTab);
  }, [activeTab]);

  const handleOpenLightbox = (item) => {
    const idx = filteredItems.findIndex(i => i.id === item.id);
    if (idx !== -1) setLightboxIndex(idx);
  };

  const handleCloseLightbox = () => {
    setLightboxIndex(null);
  };

  const handleNextLightbox = () => {
    if (lightboxIndex !== null && lightboxIndex < filteredItems.length - 1) {
      setLightboxIndex(lightboxIndex + 1);
    } else {
      setLightboxIndex(0);
    }
  };

  const handlePrevLightbox = () => {
    if (lightboxIndex !== null && lightboxIndex > 0) {
      setLightboxIndex(lightboxIndex - 1);
    } else {
      setLightboxIndex(filteredItems.length - 1);
    }
  };

  return (
    <div className="gallery-page">
      {/* Banner */}
      <div className="page-banner">
        <div className="container">
          <h1 className="page-banner-title">Campus Photo Gallery</h1>
          <p className="page-banner-subtitle">
            A visual tour of school infrastructure, science practicals, cultural functions, and sports events.
          </p>
          <ul className="breadcrumb-list">
            <li><Link to="/">Home</Link></li>
            <li>/</li>
            <li>Gallery</li>
          </ul>
        </div>
      </div>

      <section className="section-padding">
        <div className="container">
          <SectionTitle 
            badge="Visual Gallery"
            title="Life at Maharana Pratap Science Academy"
            subtitle="Explore vibrant campus moments, student activities, and school functions."
          />

          {/* Filter Tabs */}
          <div className="gallery-tabs">
            {galleryCategories.map(cat => (
              <button 
                key={cat}
                className={`gallery-tab-btn ${activeTab === cat ? 'active' : ''}`}
                onClick={() => setActiveTab(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="gallery-grid">
            {filteredItems.map(item => (
              <GalleryCard 
                key={item.id} 
                item={item} 
                onClick={handleOpenLightbox}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal with Next/Prev Controls */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <Lightbox 
          item={filteredItems[lightboxIndex]}
          onClose={handleCloseLightbox}
          onNext={handleNextLightbox}
          onPrev={handlePrevLightbox}
        />
      )}
    </div>
  );
}
