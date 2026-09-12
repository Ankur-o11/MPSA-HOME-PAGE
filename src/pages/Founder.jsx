import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Quote, Award, Calendar, ChevronRight, Heart, Sparkles, AlertCircle, ImageOff } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import Lightbox from '../components/Lightbox';
import { apiService } from '../services/api';
import { getUploadUrl } from '../config/api';

export default function Founder() {
  const [founder, setFounder] = useState(null);
  const [selectedGalleryItem, setSelectedGalleryItem] = useState(null);

  useEffect(() => {
    async function loadData() {
      const data = await apiService.getFounder();
      setFounder(data);
    }
    loadData();
  }, []);

  const fName = founder?.name || 'Shri [Founder Name Placeholder]';
  const fDesignation = founder?.designation || 'Founder & Visionary Chairman, MPSA School';
  const fPhoto = getUploadUrl(founder?.photo) || 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800&auto=format&fit=crop';
  const fIntro = founder?.intro || 'A visionary educator and philanthropist who dedicated life to building an institution where children from all walks of life receive quality science education, strong moral discipline, and character building.';
  const fVisionQuote = founder?.visionQuote || 'Education is the greatest light that can ignite a human mind. When we teach a child science with values, we build not just a professional, but a nation builder.';
  const fStoryText = founder?.storyText || 'The journey of Maharana Pratap Science Academy began with a deep conviction — that every child deserves access to high-caliber scientific education combined with character discipline.';
  const timelineData = (founder?.timeline && founder.timeline.length > 0) ? founder.timeline : [
    { stage: 'Milestone 1', title: 'The School Dream', description: 'Conceptualization of Maharana Pratap Science Academy as a specialized science & value education public school.', year: '[Year Placeholder]' },
    { stage: 'Milestone 2', title: 'Foundation of the Academy', description: 'Inauguration of the main academic block and first composite science laboratory.', year: '[Year Placeholder]' },
    { stage: 'Milestone 3', title: 'First Batch of Students', description: 'Welcoming the pioneer batch of students with a dedicated faculty team.', year: '[Year Placeholder]' },
    { stage: 'Milestone 4', title: 'Growth & Development', description: 'Expansion into Senior Secondary Science streams, computer labs, and sports arenas.', year: '[Year Placeholder]' }
  ];

  const galleryDataList = founder?.gallery || [];

  return (
    <div className="founder-page">
      {/* Banner */}
      <div className="page-banner">
        <div className="container">
          <h1 className="page-banner-title">Founder & Inspiration</h1>
          <p className="page-banner-subtitle">
            Honoring the visionary leadership, noble values, and enduring dream behind Maharana Pratap Science Academy.
          </p>
          <ul className="breadcrumb-list">
            <li><Link to="/">Home</Link></li>
            <li>/</li>
            <li>Founder & Inspiration</li>
          </ul>
        </div>
      </div>

      {/* 1. Founder Hero Section */}
      <section className="section-padding">
        <div className="container">
          <div className="founder-hero-card">
            <div className="founder-hero-inner">
              <div className="founder-photo-container">
                <img 
                  src={fPhoto} 
                  alt={fName} 
                  className="founder-photo"
                  decoding="async"
                  onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800&auto=format&fit=crop'; }}
                />
              </div>
              <div className="founder-details">
                <span className="section-badge">Our Visionary Patron</span>
                <h2 className="founder-name">{fName}</h2>
                <p className="founder-designation">{fDesignation}</p>
                <p className="founder-intro-text">
                  {fIntro}
                </p>

                <blockquote className="leadership-quote" style={{ marginTop: '1.5rem' }}>
                  "{fVisionQuote}"
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Founder Story */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-soft)' }}>
        <div className="container">
          <SectionTitle 
            badge="The Founder's Journey"
            title="The Vision Behind Maharana Pratap Science Academy"
            subtitle="The inspiring story of how a noble dream transformed into a premier educational institution."
          />

          <div style={{ backgroundColor: 'var(--bg-white)', padding: '3rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border-color)', maxWidth: '900px', margin: '0 auto', lineHeight: '1.8', color: 'var(--text-main)' }}>
            <h3 style={{ fontSize: '1.5rem', color: 'var(--primary-navy)', marginBottom: '1rem' }}>
              Our Founding Story & Legacy
            </h3>
            {fStoryText.split('\n\n').map((para, idx) => (
              <p key={idx} style={{ marginBottom: '1.25rem' }}>
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Founder Photo Gallery */}
      <section className="section-padding">
        <div className="container">
          <SectionTitle 
            badge="Historical Moments"
            title="Founder Photo Gallery"
            subtitle="Capturing memorable moments from the school's journey and founder's interactions."
          />

          {galleryDataList.length > 0 ? (
            <div className="gallery-grid">
              {galleryDataList.map((item, idx) => (
                <div key={item.id || item._id || idx} className="gallery-card" onClick={() => setSelectedGalleryItem(item)}>
                  <img src={getUploadUrl(item.image)} alt={item.title || 'Founder Photo'} className="gallery-card-img" loading="lazy" decoding="async" />
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
              <h4 style={{ color: 'var(--primary-navy)', fontSize: '1.15rem', marginBottom: '0.5rem' }}>No Founder Gallery Photos Uploaded Yet</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>School management can add historical photos in the Founder Photo Gallery section of the Admin Panel.</p>
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

      {/* 5. FOUNDER'S VISION QUOTE */}
      <section className="section-padding">
        <div className="container">
          <div className="admissions-cta-banner" style={{ background: 'linear-gradient(135deg, #123B63, #0A223B)' }}>
            <div className="cta-content" style={{ textAlign: 'center', margin: '0 auto' }}>
              <Quote size={48} color="#D4A72C" style={{ margin: '0 auto 1.5rem auto' }} />
              <h2 style={{ fontSize: '1.8rem', color: 'var(--bg-white)', fontStyle: 'italic', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                "{fVisionQuote}"
              </h2>
              <p style={{ color: 'var(--accent-gold)', fontWeight: '700', fontSize: '1.1rem' }}>
                — {fName}
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
