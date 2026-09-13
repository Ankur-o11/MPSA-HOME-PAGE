import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Quote, Award, GraduationCap, Briefcase, Heart, Sparkles, Trophy, Lightbulb, ImageOff } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import SEO from '../components/SEO';
import Lightbox from '../components/Lightbox';
import { apiService } from '../services/api';
import { getUploadUrl } from '../config/api';
import { NEUTRAL_AVATAR_SVG, handleAvatarError } from '../utils/imageUtils';

export default function Founder() {
  const [founderProfile, setFounderProfile] = useState(null);
  const [selectedGalleryItem, setSelectedGalleryItem] = useState(null);

  useEffect(() => {
    async function loadData() {
      const data = await apiService.getFounderProfile();
      setFounderProfile(data);
    }
    loadData();
  }, []);

  const fName = founderProfile?.name || 'Shri [Founder Name Placeholder]';
  const fDesignation = founderProfile?.designation || 'Founder & Visionary Patron, MPSA School';
  const fPhoto = getUploadUrl(founderProfile?.photo) || NEUTRAL_AVATAR_SVG;
  const fProfession = founderProfile?.profession || 'Visionary Educator & Philanthropist';
  const fIntro = founderProfile?.intro || 'A visionary pioneer whose noble dream and dedication laid the groundwork for Maharana Pratap Science Academy.';
  const fBiography = founderProfile?.biography || founderProfile?.intro || 'Founder biography and inspiring educational journey details will appear here.';
  const fEducation = founderProfile?.education;
  const fExperience = founderProfile?.experience;
  const fContribution = founderProfile?.contribution || 'Established Maharana Pratap Science Academy with a mission to bring high-caliber scientific education and moral discipline to all students.';
  const fVision = founderProfile?.vision || 'Empowering young minds through scientific inquiry, moral fortitude, and nation-building values.';
  const fAchievements = founderProfile?.achievements;
  const fVisionQuote = founderProfile?.visionQuote || 'Education is the greatest light that can ignite a human mind. When we teach a child science with values, we build not just a professional, but a nation builder.';
  const fStoryText = founderProfile?.storyText || 'The story of Maharana Pratap Science Academy began with a vision to nurture scientific talent rooted in traditional values.';

  const timelineData = founderProfile?.timeline || [];
  const galleryDataList = founderProfile?.gallery || [];

  const founderSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "name": `Founder Profile - ${fName}`,
    "description": "Learn about the founder's vision and legacy behind Maharana Pratap Science Academy Inter College in Jalaun, Uttar Pradesh."
  };

  return (
    <div className="founder-page">
      <SEO 
        title="Founder's Profile & Legacy | MPSA Inter College, Jalaun"
        description="Learn about the founder's vision and legacy behind Maharana Pratap Science Academy Inter College in Jalaun, Uttar Pradesh."
        keywords="Founder MPSA Inter College, Founder Maharana Pratap Science Academy Jalaun, Legacy MPSA Inter College Jalaun, Visionary Patron Jalaun"
        canonicalUrl="/founder"
        schema={founderSchema}
      />
      {/* Banner */}
      <div className="page-banner">
        <div className="container">
          <h1 className="page-banner-title">Founder</h1>
          <p className="page-banner-subtitle">
            Honoring the visionary founder, founding legacy, and enduring inspiration behind Maharana Pratap Science Academy in Jalaun, Uttar Pradesh.
          </p>
          <ul className="breadcrumb-list">
            <li><Link to="/">Home</Link></li>
            <li>/</li>
            <li>Founder</li>
          </ul>
        </div>
      </div>

      {/* 1. Founder Hero Profile Card */}
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
                  onError={handleAvatarError}
                />
              </div>
              <div className="founder-details">
                <span className="section-badge">Founder & Visionary Patron</span>
                <h2 className="founder-name">{fName}</h2>
                <p className="founder-designation">{fDesignation}</p>
                {fProfession && (
                  <p style={{ color: 'var(--accent-gold)', fontWeight: '600', fontSize: '0.95rem', marginBottom: '1rem' }}>
                    {fProfession}
                  </p>
                )}

                <p className="founder-intro-text">
                  {fIntro}
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1.25rem' }}>
                  {fEducation && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                      <GraduationCap size={16} color="#D4A72C" />
                      <span><strong>Education:</strong> {fEducation}</span>
                    </div>
                  )}
                  {fExperience && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                      <Briefcase size={16} color="#D4A72C" />
                      <span><strong>Experience:</strong> {fExperience}</span>
                    </div>
                  )}
                </div>

                <blockquote className="leadership-quote" style={{ marginTop: '1.5rem' }}>
                  "{fVisionQuote}"
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. About Founder & Biography */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-soft)' }}>
        <div className="container">
          <SectionTitle 
            badge="Founding Story"
            title="About Our Founder"
            subtitle="The life, vision, and dedication that built Maharana Pratap Science Academy."
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ backgroundColor: 'var(--bg-white)', padding: '2.5rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border-color)', lineHeight: '1.8' }}>
              <h3 style={{ fontSize: '1.35rem', color: 'var(--primary-navy)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Heart size={22} color="#D4A72C" /> Founding Biography & Journey
              </h3>
              {fBiography.split('\n\n').map((para, idx) => (
                <p key={idx} style={{ marginBottom: '1rem', color: 'var(--text-main)' }}>
                  {para}
                </p>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Contribution Card */}
              <div style={{ backgroundColor: 'var(--bg-white)', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border-color)' }}>
                <h4 style={{ fontSize: '1.15rem', color: 'var(--primary-navy)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Award size={20} color="#D4A72C" /> School Contribution
                </h4>
                <p style={{ color: 'var(--text-main)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                  {fContribution}
                </p>
              </div>

              {/* Vision Card */}
              <div style={{ backgroundColor: 'var(--bg-white)', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border-color)' }}>
                <h4 style={{ fontSize: '1.15rem', color: 'var(--primary-navy)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Lightbulb size={20} color="#D4A72C" /> Educational Vision
                </h4>
                <p style={{ color: 'var(--text-main)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                  {fVision}
                </p>
              </div>

              {/* Achievements Card */}
              {fAchievements && (
                <div style={{ backgroundColor: 'var(--bg-white)', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border-color)' }}>
                  <h4 style={{ fontSize: '1.15rem', color: 'var(--primary-navy)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Trophy size={20} color="#D4A72C" /> Achievements & Highlights
                  </h4>
                  <p style={{ color: 'var(--text-main)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                    {fAchievements}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Founder Photo Gallery (If photos uploaded) */}
      {galleryDataList.length > 0 && (
        <section className="section-padding">
          <div className="container">
            <SectionTitle 
              badge="Historical Archive"
              title="Founder Photo Gallery"
              subtitle="Memorable historical moments and milestone photographs."
            />

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
          </div>
        </section>
      )}

      {/* 4. SCHOOL JOURNEY TIMELINE */}
      {timelineData.length > 0 && (
        <section className="section-padding" style={{ backgroundColor: 'var(--bg-soft)' }}>
          <div className="container">
            <SectionTitle 
              badge="Milestones"
              title="Founding Journey Timeline"
              subtitle="Key historical milestones in the establishment of Maharana Pratap Science Academy."
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
      )}

      {/* 5. FOUNDER MESSAGE BANNER */}
      <section className="section-padding">
        <div className="container">
          <div className="admissions-cta-banner" style={{ background: 'linear-gradient(135deg, #123B63, #0A223B)' }}>
            <div className="cta-content" style={{ textAlign: 'center', margin: '0 auto' }}>
              <Quote size={48} color="#D4A72C" style={{ margin: '0 auto 1.5rem auto' }} />
              <h2 style={{ fontSize: '1.8rem', color: 'var(--bg-white)', fontStyle: 'italic', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                "{fVisionQuote}"
              </h2>
              <p style={{ color: 'var(--accent-gold)', fontWeight: '700', fontSize: '1.1rem' }}>
                — {fName} (Founder, MPSA School)
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
