import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Quote, Award, BookOpen, GraduationCap, CheckCircle2 } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import { apiService } from '../services/api';
import { getUploadUrl } from '../config/api';

export default function PrincipalMessage() {
  const [principal, setPrincipal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const data = await apiService.getPrincipal();
      setPrincipal(data);
      setLoading(false);
    }
    loadData();
  }, []);

  const pName = principal?.name || 'Dr. [Principal Name Placeholder]';
  const pDesignation = principal?.designation || 'Principal, MPSA School';
  const pPhoto = getUploadUrl(principal?.photo) || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop';
  const pQualifications = principal?.qualifications || 'Ph.D., M.Sc., B.Ed.';
  const pExperience = principal?.experience || '18+ Years in Education';
  const pQuote = principal?.messageQuote || 'At Maharana Pratap Science Academy, we view education as a transformative journey. Our objective is not only to prepare students for examinations, but to equip them with wisdom, resilience, scientific curiosity, and moral courage.';
  const pFullMessage = principal?.fullMessage || 'Dear Parents, Guardians, and Dearest Students,\n\nIt is my privilege to welcome you to MAHARANA PRATAP SCIENCE ACADEMY (MPSA School). As an educational institution focused on scientific excellence, our fundamental purpose is to foster an environment where curiosity thrives and excellence becomes a habit.';
  const pVision = principal?.educationalVision || 'Fostering conceptual clarity, laboratory research, athletic endeavors, and moral discipline across all classes.';

  return (
    <div className="principal-page">
      {/* Banner */}
      <div className="page-banner">
        <div className="container">
          <h1 className="page-banner-title">Principal's Message</h1>
          <p className="page-banner-subtitle">
            A message of welcoming, educational philosophy, and commitment to student growth from our Principal.
          </p>
          <ul className="breadcrumb-list">
            <li><Link to="/">Home</Link></li>
            <li>/</li>
            <li>Principal's Message</li>
          </ul>
        </div>
      </div>

      <section className="section-padding">
        <div className="container">
          <div className="principal-profile-layout">
            {/* Left Sticky Principal Card */}
            <div className="principal-sticky-card">
              <img 
                src={pPhoto} 
                alt={pName} 
                className="principal-avatar-lg"
              />
              <h3 style={{ fontSize: '1.35rem', color: 'var(--primary-navy)', marginBottom: '0.25rem' }}>
                {pName}
              </h3>
              <p style={{ color: 'var(--accent-gold)', fontWeight: '700', fontSize: '0.95rem', marginBottom: '0.5rem' }}>
                {pDesignation}
              </p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                {pQualifications} | {pExperience}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', textAlign: 'left', marginTop: '1.25rem', fontSize: '0.88rem', color: 'var(--text-main)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Award size={16} color="#D4A72C" />
                  <span>Educational Leadership</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <BookOpen size={16} color="#D4A72C" />
                  <span>Science Pedagogy Specialist</span>
                </div>
              </div>
            </div>

            {/* Right Detailed Message Content */}
            <div className="message-content-box">
              <span className="section-badge">Welcome Address</span>
              <h2 className="section-title-text" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
                Principal's Message & Vision
              </h2>

              <blockquote className="leadership-quote" style={{ fontSize: '1.1rem', margin: '0 0 2rem 0' }}>
                "{pQuote}"
              </blockquote>

              {pFullMessage.split('\n\n').map((paragraph, index) => (
                <p key={index} style={{ marginBottom: '1.25rem', lineHeight: '1.8' }}>
                  {paragraph}
                </p>
              ))}

              {pVision && (
                <>
                  <h3 style={{ fontSize: '1.3rem', color: 'var(--primary-navy)', margin: '2rem 0 1rem 0' }}>
                    Our Educational Vision & Approach
                  </h3>
                  <p style={{ lineHeight: '1.8' }}>{pVision}</p>
                </>
              )}

              <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '2px dashed var(--border-color)' }}>
                <p style={{ fontStyle: 'italic', marginBottom: '0.5rem' }}>Warm regards & best wishes,</p>
                <h4 style={{ fontSize: '1.25rem', color: 'var(--primary-navy)' }}>
                  {pName}
                </h4>
                <p style={{ color: 'var(--accent-gold)', fontWeight: '600', fontSize: '0.9rem' }}>
                  {pDesignation}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
