import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Loader2, ImageOff, RefreshCw } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import SEO from '../components/SEO';
import GalleryCard from '../components/GalleryCard';
import Lightbox from '../components/Lightbox';
import { galleryCategories } from '../data/gallery';
import { apiService } from '../services/api';
import { NEUTRAL_IMAGE_SVG } from '../utils/imageUtils';

export default function Gallery() {
  const [galleryItems, setGalleryItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState('');

  const [activeTab, setActiveTab] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    async function loadInitialGallery() {
      setLoadingInitial(true);
      setError('');
      try {
        const res = await apiService.getGallery({ page: 1, limit: 20 });
        if (res) {
          const items = Array.isArray(res) ? res : (res.data || []);
          setGalleryItems(items || []);
          const moreAvailable = res.pagination ? res.pagination.hasMore : (items.length >= 20);
          setHasMore(moreAvailable);
          setPage(1);
        }
      } catch (err) {
        setError('Failed to load gallery images.');
      } finally {
        setLoadingInitial(false);
      }
    }
    loadInitialGallery();
  }, []);

  const handleLoadMore = async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    setError('');

    const nextPage = page + 1;
    try {
      const res = await apiService.getGallery({ page: nextPage, limit: 20 });
      if (res) {
        const newItems = Array.isArray(res) ? res : (res.data || []);
        if (newItems && newItems.length > 0) {
          setGalleryItems(prev => {
            const existingIds = new Set(prev.map(i => i._id || i.id));
            const uniqueNew = newItems.filter(i => !existingIds.has(i._id || i.id));
            return [...prev, ...uniqueNew];
          });
          setPage(nextPage);
        }
        const moreAvailable = res.pagination ? res.pagination.hasMore : (newItems.length >= 20);
        setHasMore(moreAvailable);
      }
    } catch (err) {
      setError('Could not load more images. Please check connection and retry.');
    } finally {
      setLoadingMore(false);
    }
  };

  const filteredItems = useMemo(() => {
    if (activeTab === 'All') return galleryItems;
    return galleryItems.filter(item => item.category === activeTab);
  }, [galleryItems, activeTab]);

  const handleOpenLightbox = (item) => {
    const idx = filteredItems.findIndex(i => (i._id || i.id) === (item._id || item.id));
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
      <SEO 
        title="Campus Photo Gallery | Maharana Pratap Science Academy (MPSA), Jalaun"
        description="A visual tour of campus infrastructure, practicals, activities, and events at Maharana Pratap Science Academy (MPSA School / MPSA Inter College), Jalaun."
        keywords="Gallery MPSA Inter College Jalaun, MPSA School Gallery, Photos Maharana Pratap Science Academy, Campus Images MPSA Jalaun"
        canonicalUrl="/gallery"
      />
      {/* Banner */}
      <div className="page-banner">
        <div className="container">
          <h1 className="page-banner-title">Campus Photo Gallery</h1>
          <p className="page-banner-subtitle">
            A visual tour of school infrastructure, science practicals, cultural functions, and sports events at MPSA School &amp; Inter College, Jalaun.
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
          {loadingInitial ? (
            <div className="gallery-grid">
              {[1, 2, 3, 4, 5, 6].map(idx => (
                <div key={idx} className="gallery-card" style={{ opacity: 0.75 }}>
                  <img src={NEUTRAL_IMAGE_SVG} alt="Loading..." className="gallery-card-img" />
                </div>
              ))}
            </div>
          ) : filteredItems.length > 0 ? (
            <div className="gallery-grid">
              {filteredItems.map(item => (
                <GalleryCard 
                  key={item._id || item.id} 
                  item={item} 
                  onClick={handleOpenLightbox}
                />
              ))}
            </div>
          ) : (
            <div className="no-results-box" style={{ padding: '3rem', textAlign: 'center', backgroundColor: 'var(--bg-soft)', borderRadius: 'var(--radius-lg)' }}>
              <ImageOff size={48} color="#64748B" style={{ margin: '0 auto 1rem auto' }} />
              <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-navy)', marginBottom: '0.5rem' }}>No Photos Found</h3>
              <p style={{ color: 'var(--text-muted)' }}>No photos available in the "{activeTab}" category.</p>
            </div>
          )}

          {/* Load More Pagination Button */}
          {hasMore && (
            <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
              {error && (
                <p style={{ color: '#EF4444', marginBottom: '1rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
                  {error}
                </p>
              )}
              <button 
                className="btn btn-outline-gold btn-lg"
                onClick={handleLoadMore}
                disabled={loadingMore}
                style={{ minWidth: '220px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
              >
                {loadingMore ? (
                  <>
                    <RefreshCw size={18} className="spin-anim" /> Loading More Photos...
                  </>
                ) : (
                  <>
                    Load More Photos <ChevronDown size={18} />
                  </>
                )}
              </button>
            </div>
          )}
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
