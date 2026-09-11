import React from 'react';
import { Link } from 'react-router-dom';
import { Quote, Award, BookOpen, GraduationCap, CheckCircle2 } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import { SCHOOL_CONFIG } from '../data/config';

export default function PrincipalMessage() {
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
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop" 
                alt="Principal Placeholder" 
                className="principal-avatar-lg"
              />
              <h3 style={{ fontSize: '1.35rem', color: 'var(--primary-navy)', marginBottom: '0.25rem' }}>
                Dr. [Principal Name Placeholder]
              </h3>
              <p style={{ color: 'var(--accent-gold)', fontWeight: '700', fontSize: '0.95rem', marginBottom: '0.5rem' }}>
                Principal, MPSA School
              </p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                Ph.D., M.Sc., B.Ed. | 18+ Years in Education
              </p>

              <div className="placeholder-notice" style={{ textAlign: 'left', fontSize: '0.82rem' }}>
                <strong>Notice:</strong> Principal details and qualifications are formatted as professional placeholders.
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', textAlign: 'left', marginTop: '1.25rem', fontSize: '0.88rem', color: 'var(--text-main)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Award size={16} color="#D4A72C" />
                  <span>Educational Leadership Award</span>
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
                Dear Parents, Guardians, and Dearest Students,
              </h2>

              <blockquote className="leadership-quote" style={{ fontSize: '1.1rem', margin: '0 0 2rem 0' }}>
                "At Maharana Pratap Science Academy, we view education as a transformative journey. Our objective is not only to prepare students for examinations, but to equip them with wisdom, resilience, scientific curiosity, and moral courage."
              </blockquote>

              <p>
                It is my privilege to welcome you to <strong>MAHARANA PRATAP SCIENCE ACADEMY (MPSA School)</strong>. As an educational institution focused on scientific excellence, our fundamental purpose is to foster an environment where curiosity thrives and excellence becomes a habit.
              </p>

              <h3 style={{ fontSize: '1.3rem', color: 'var(--primary-navy)', margin: '2rem 0 1rem 0' }}>
                Our Educational Vision & Approach
              </h3>
              <p>
                In today's fast-changing world, academic success requires more than traditional classroom lecture delivery. We emphasize experiential learning, laboratory experimentation, conceptual clarity, and technological fluency across all grades.
              </p>
              <p>
                Equal importance is given to athletic endeavors, performing arts, public speaking, and community service. We firmly believe that character discipline, punctuality, and respect for cultural values are as crucial as achieving high grades.
              </p>

              <h3 style={{ fontSize: '1.3rem', color: 'var(--primary-navy)', margin: '2rem 0 1rem 0' }}>
                Partnership with Parents
              </h3>
              <p>
                Education is a collaborative partnership between the school, teachers, and parents. We encourage active parental involvement, transparent communication, and continuous feedback to ensure every child feels supported and valued.
              </p>

              <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '2px dashed var(--border-color)' }}>
                <p style={{ fontStyle: 'italic', marginBottom: '0.5rem' }}>Warm regards & best wishes,</p>
                <h4 style={{ fontSize: '1.25rem', color: 'var(--primary-navy)' }}>
                  Dr. [Principal Name Placeholder]
                </h4>
                <p style={{ color: 'var(--accent-gold)', fontWeight: '600', fontSize: '0.9rem' }}>
                  Principal, Maharana Pratap Science Academy
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
