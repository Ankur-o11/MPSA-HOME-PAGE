import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Quote, ImageOff } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import Lightbox from '../components/Lightbox';
import { apiService } from '../services/api';
import { getUploadUrl } from '../config/api';
import { NEUTRAL_AVATAR_SVG, handleAvatarError } from '../utils/imageUtils';

export default function Director() {
  const [director, setDirector] = useState(null);
  const [selectedGalleryItem, setSelectedGalleryItem] = useState(null);

  useEffect(() => {
    async function loadData() {
      const data = await apiService.getDirector();
      setDirector(data);
    }
    loadData();
  }, []);

  const dName = director?.name || 'Shri [Director / Manager Name Placeholder]';
  const dDesignation = director?.designation || 'Director / Manager, MPSA School';
  const dPhoto = getUploadUrl(director?.photo) || NEUTRAL_AVATAR_SVG;
  const dIntro = director?.intro || 'A dedicated educational leader guiding Maharana Pratap Science Academy with strategic vision, academic rigor, and character-building values.';
  const dVisionQuote = director?.visionQuote || 'Education is the greatest light that can ignite a human mind. When we teach a child science with values, we build not just a professional, but a nation builder.';
  const dStoryText = director?.storyText || 'The journey of Maharana Pratap Science Academy began with a deep conviction — that every child deserves access to high-caliber scientific education combined with character discipline.';
  
  const timelineData = (director?.timeline && director.timeline.length > 0) ? director.timeline : [
    { stage: 'Milestone 1', title: 'The School Dream', description: 'Conceptualization of Maharana Pratap Science Academy as a specialized science & value education public school.', year: '[Year Placeholder]' },
    { stage: 'Milestone 2', title: 'Foundation of the Academy', description: 'Inauguration of the main academic block and first composite science laboratory.', year: '[Year Placeholder]' },
    { stage: 'Milestone 3', title: 'First Batch of Students', description: 'Welcoming the pioneer batch of students with a dedicated faculty team.', year: '[Year Placeholder]' },
    { stage: 'Milestone 4', title: 'Growth & Development', description: 'Expansion into Senior Secondary Science streams, computer labs, and sports arenas.', year: '[Year Placeholder]' }
  ];

  const galleryDataList = director?.gallery || [];

  return (
    <div className="director-page">
      {/* Banner */}
      <div className="page-banner">
        <div className="container">
          <h1 className="page-banner-title">Director / Manager Profile</h1>
          <p className="page-banner-subtitle">
            Honoring the executive leadership, strategic direction, and guidance at Maharana Pratap Science Academy.
          </p>
          <ul className="breadcrumb-list">
            <li><Link to="/">Home</Link></li>
            <li>/</li>
            <li>Director / Manager</li>
          </ul>
        </div>
      </div>

      {/* 1. Hero Section */}
      <section className="section-padding">
        <div className="container">
          <div className="founder-hero-card">
            <div className="founder-hero-inner">
              <div className="founder-photo-container">
                <img 
                  src={dPhoto} 
                  alt={dName} 
                  className="founder-photo"
                  decoding="async"
                  onError={handleAvatarError}
                />
              </div>
              <div className="founder-details">
                <span className="section-badge">School Executive Leadership</span>
                <h2 className="founder-name">{dName}</h2>
                <p className="founder-designation">{dDesignation}</p>
                <p className="founder-intro-text">
                  {dIntro}
                </p>

                <blockquote className="leadership-quote" style={{ marginTop: '1.5rem' }}>
                  "{dVisionQuote}"
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Director / Manager Message & Vision */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-soft)' }}>
        <div className="container">
          <SectionTitle 
            badge="Leadership Message"
            title="Director / Manager's Message & Vision"
            subtitle="Guiding principles and commitment to educational excellence."
          />

          <div style={{ backgroundColor: 'var(--bg-white)', padding: '3rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border-color)', maxWidth: '900px', margin: '0 auto', lineHeight: '1.8', color: 'var(--text-main)' }}>
            <h3 style={{ fontSize: '1.5rem', color: 'var(--primary-navy)', marginBottom: '1rem' }}>
              Strategic Vision & Educational Commitment
            </h3>
            {dStoryText.split('\n\n').map((para, idx) => (
              <p key={idx} style={{ marginBottom: '1.25rem' }}>
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Director / Manager Photo Gallery */}
      <section className="section-padding">
        <div className="container">
          <SectionTitle 
            badge="Leadership Gallery"
            title="Director / Manager Photo Gallery"
            subtitle="Memorable moments, interactions, and events with the Director / Manager."
          />

          {galleryDataList.length > 0 ? (
            <div className="gallery-grid">
              {galleryDataList.map((item, idx) => (
                <div key={item.id || item._id || idx} className="gallery-card" onClick={() => setSelectedGalleryItem(item)}>
                  <img src={getUploadUrl(item.image)} alt={item.title || 'Director Photo'} className="gallery-card-img" loading="lazy" decoding="async" />
                  <div className="gallery-card-overlay">
                    <h4 className="gallery-card-title">{item.title}</h4>
                    <p className="gallery-card-date">{item.caption || item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-results-box" style={{ padding: '2.5rem', textAlign: 'center', backgroundColor: 'var(--bg-soft)', borderRadius: 'var(--radius-lg)' }}>
              <ImageOff size={44} color="#64748B" style={{ margin: '0 auto 1rem auto' }} />
              <h4 style={{ color: 'var(--primary-navy)', fontSize: '1.15rem', marginBottom: '0.5rem' }}>No Director / Manager Gallery Photos Uploaded Yet</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>School management can add photos in the Director / Manager section of the Admin Panel.</p>
            </div>
          )}
        </div>
      </section>

      {/* 4. SCHOOL JOURNEY TIMELINE */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-soft)' }}>
        <div className="container">
          <SectionTitle 
            badge="Milestones"
            title="Our School Journey Timeline"
            subtitle="Chronicle of key developmental milestones of Maharana Pratap Science Academy."
          />

          <div className="timeline-wrapper">
            {timelineData.map((t, idx) => (
              <div key={idx} className={`timeline-item ${idx % 2 === 0 ? 'left' : 'right'}`}>
                <div className="timeline-dot"></div>
                <div className="timeline-box">
                  <span className="timeline-stage">{t.stage || `Milestone ${idx+1}`} {t.year ? `• ${t.year}` : ''}</span>
                  <h4>{t.title}</h4>
                  <p>{t.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. VISION QUOTE */}
      <section className="section-padding">
        <div className="container">
          <div className="admissions-cta-banner" style={{ background: 'linear-gradient(135deg, #123B63, #0A223B)' }}>
            <div className="cta-content" style={{ textAlign: 'center', margin: '0 auto' }}>
              <Quote size={48} color="#D4A72C" style={{ margin: '0 auto 1.5rem auto' }} />
              <h2 style={{ fontSize: '1.8rem', color: 'var(--bg-white)', fontStyle: 'italic', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                "{dVisionQuote}"
              </h2>
              <p style={{ color: 'var(--accent-gold)', fontWeight: '700', fontSize: '1.1rem' }}>
                — {dName} ({dDesignation})
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedGalleryItem && (
        <Lightbox 
          item={selectedGalleryItem} 
          onClose={() => setSelectedGalleryItem(null)} 
        />
      )}
    </div>
  );
}
