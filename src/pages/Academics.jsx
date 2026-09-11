import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, FlaskConical, Laptop, Award, FileText, CheckCircle2, ChevronRight } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';

export default function Academics() {
  return (
    <div className="academics-page">
      {/* Banner */}
      <div className="page-banner">
        <div className="container">
          <h1 className="page-banner-title">Academics & Curriculum</h1>
          <p className="page-banner-subtitle">
            Comprehensive academic programs structured for scientific excellence, conceptual clarity, and Board examination distinction.
          </p>
          <ul className="breadcrumb-list">
            <li><Link to="/">Home</Link></li>
            <li>/</li>
            <li>Academics</li>
          </ul>
        </div>
      </div>

      {/* Classes Offered */}
      <section className="section-padding">
        <div className="container">
          <SectionTitle 
            badge="Academic Levels"
            title="Classes Offered at MPSA School"
            subtitle="Providing a seamless educational continuum from primary foundations to senior secondary science streams."
          />

          <div className="why-mpsa-grid academics-levels-grid">
            <div className="why-card" style={{ textAlign: 'left' }}>
              <span className="category-tag">Foundational</span>
              <h4 style={{ fontSize: '1.25rem', marginTop: '0.75rem', marginBottom: '0.5rem' }}>
                Primary Section (Classes 1st – 5th)
              </h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                Focusing on strong foundational reading, writing, mathematical logic, nature study, and artistic expression.
              </p>
              <strong style={{ fontSize: '0.85rem', color: 'var(--primary-navy)' }}>Key Subjects:</strong>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                English Literature, Hindi Language, Elementary Mathematics, Environmental Studies (EVS), General Knowledge, Computer Basics, Art & Craft.
              </p>
            </div>

            <div className="why-card" style={{ textAlign: 'left' }}>
              <span className="category-tag">Preparatory</span>
              <h4 style={{ fontSize: '1.25rem', marginTop: '0.75rem', marginBottom: '0.5rem' }}>
                Middle Section (Classes 6th – 8th)
              </h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                Transitioning to core subject disciplines with practical science laboratory sessions and computer coding.
              </p>
              <strong style={{ fontSize: '0.85rem', color: 'var(--primary-navy)' }}>Key Subjects:</strong>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                English, Hindi, Mathematics, Physics, Chemistry, Biology, History, Geography, Civics, Computer Science & AI, Sanskrit/Third Language.
              </p>
            </div>

            <div className="why-card" style={{ textAlign: 'left' }}>
              <span className="category-tag">Secondary & Sr. Secondary</span>
              <h4 style={{ fontSize: '1.25rem', marginTop: '0.75rem', marginBottom: '0.5rem' }}>
                Secondary & Sr. Secondary Science (9th – 12th)
              </h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                Intensive preparation for Board Examinations and scientific competitive entrance examinations.
              </p>
              <strong style={{ fontSize: '0.85rem', color: 'var(--primary-navy)' }}>Key Subjects (Science Stream):</strong>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                Physics, Chemistry, Mathematics (PCM) / Biology (PCB), Computer Science (Python/C++), English Core, Physical Education.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Teaching Methodology */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-soft)' }}>
        <div className="container">
          <SectionTitle 
            badge="Pedagogy"
            title="Our Teaching Methodology"
            subtitle="Combining traditional discipline with interactive modern educational tools."
          />

          <div className="vision-mission-grid">
            <div className="vm-card">
              <div className="vm-icon"><FlaskConical size={32} /></div>
              <h3 style={{ fontSize: '1.3rem', color: 'var(--primary-navy)', marginBottom: '0.75rem' }}>
                Interactive & Practical Science Learning
              </h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.7' }}>
                At MPSA, science is learned by doing. Students conduct weekly laboratory experiments, build physics apparatus, perform chemical reaction tests, and study biological specimens under expert supervision.
              </p>
            </div>

            <div className="vm-card">
              <div className="vm-icon"><Laptop size={32} /></div>
              <h3 style={{ fontSize: '1.3rem', color: 'var(--primary-navy)', marginBottom: '0.75rem' }}>
                Smart Classrooms & Visual Media
              </h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.7' }}>
                Every classroom features interactive digital smartboards that bring complex 3D diagrams, historical timelines, and mathematical proofs to life with vivid clarity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Examination System */}
      <section className="section-padding">
        <div className="container">
          <SectionTitle 
            badge="Assessment"
            title="Examination & Evaluation System"
            subtitle="Continuous assessment designed to build confidence, knowledge retention, and exam readiness."
          />

          <div className="why-mpsa-grid academics-exam-grid">
            <div className="why-card">
              <FileText size={28} color="#123B63" style={{ marginBottom: '0.75rem' }} />
              <h4>Weekly Periodic Tests</h4>
              <p>Regular short unit tests to ensure continuous revision and concept mastery.</p>
            </div>

            <div className="why-card">
              <Award size={28} color="#123B63" style={{ marginBottom: '0.75rem' }} />
              <h4>Half-Yearly Exams</h4>
              <p>Comprehensive mid-term evaluation assessing practical and written knowledge.</p>
            </div>

            <div className="why-card">
              <BookOpen size={28} color="#123B63" style={{ marginBottom: '0.75rem' }} />
              <h4>Pre-Board Mock Tests</h4>
              <p>Strictly timed Board exam simulations for 10th and 12th batch students.</p>
            </div>

            <div className="why-card">
              <CheckCircle2 size={28} color="#123B63" style={{ marginBottom: '0.75rem' }} />
              <h4>Practical Evaluation</h4>
              <p>Hands-on lab viva voce, practical file assessments, and science project evaluation.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
