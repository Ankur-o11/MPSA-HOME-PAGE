import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Target, 
  Eye, 
  Award, 
  ShieldCheck, 
  BookOpen, 
  FlaskConical, 
  Sparkles, 
  Heart,
  Building,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

import SectionTitle from '../components/SectionTitle';
import { SCHOOL_CONFIG } from '../data/config';

export default function About() {
  return (
    <div className="about-page">
      {/* Banner */}
      <div className="page-banner">
        <div className="container">
          <h1 className="page-banner-title">About Our School</h1>
          <p className="page-banner-subtitle">
            Discover the heritage, educational ethos, core values, and infrastructure of Maharana Pratap Science Academy.
          </p>
          <ul className="breadcrumb-list">
            <li><Link to="/">Home</Link></li>
            <li>/</li>
            <li>About Us</li>
          </ul>
        </div>
      </div>

      {/* Overview Section */}
      <section className="section-padding">
        <div className="container">
          <div className="about-home-grid">
            <div className="about-home-image-wrapper">
              <img 
                src="https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?q=80&w=800&auto=format&fit=crop" 
                alt="Maharana Pratap Science Academy Campus" 
              />
            </div>
            <div className="about-home-content">
              <span className="section-badge">Educational Ethos</span>
              <h2 className="section-title-text" style={{ textAlign: 'left', marginBottom: '1.25rem' }}>
                Welcome to Maharana Pratap Science Academy
              </h2>
              <p>
                <strong>MAHARANA PRATAP SCIENCE ACADEMY (MPSA School)</strong> is a premier educational institution built on the twin pillars of scientific inquiry and strong ethical values.
              </p>
              <p>
                Named in honor of the legendary warrior leader Maharana Pratap, our academy instils courage, discipline, self-reliance, and unwavering dedication in every learner.
              </p>
              <p>
                We foster a student-centered atmosphere where young minds are encouraged to ask questions, explore physical and digital sciences, engage in creative arts, and excel in competitive pursuits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-soft)' }}>
        <div className="container">
          <SectionTitle 
            badge="Our Guiding Star"
            title="Vision & Mission Statements"
            subtitle="The core purpose driving our educational initiatives every single day."
          />

          <div className="vision-mission-grid">
            <div className="vm-card">
              <div className="vm-icon"><Eye size={32} /></div>
              <h3 style={{ fontSize: '1.5rem', color: 'var(--primary-navy)', marginBottom: '1rem' }}>
                Our Vision
              </h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', fontSize: '1.05rem' }}>
                To be a center of educational excellence that nurtures scientifically temperament, ethically grounded, innovative, and compassionate global leaders capable of contributing positively to society and scientific advancement.
              </p>
            </div>

            <div className="vm-card">
              <div className="vm-icon"><Target size={32} /></div>
              <h3 style={{ fontSize: '1.5rem', color: 'var(--primary-navy)', marginBottom: '1rem' }}>
                Our Mission
              </h3>
              <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-muted)', lineHeight: '1.8', fontSize: '1rem' }}>
                <li>Provide holistic and rigorous scientific & academic education.</li>
                <li>Cultivate critical thinking, problem-solving skills, and research mindsets.</li>
                <li>Foster ethical values, patriotism, leadership, and emotional intelligence.</li>
                <li>Offer modern infrastructure, state-of-the-art labs, and athletic grounds.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding">
        <div className="container">
          <SectionTitle 
            badge="Our Pillar Principles"
            title="Core Moral & Educational Values"
            subtitle="The fundamental principles guiding student behavior, faculty mentorship, and campus life."
          />

          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon"><Award size={28} /></div>
              <h4>Excellence</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                Striving for the highest quality in academic performance and personal growth.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon"><ShieldCheck size={28} /></div>
              <h4>Discipline</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                Cultivating self-control, punctuality, responsibility, and civic duties.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon"><Heart size={28} /></div>
              <h4>Integrity</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                Upholding honesty, fairness, and transparency in all actions.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon"><FlaskConical size={28} /></div>
              <h4>Innovation</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                Encouraging scientific curiosity, experimentation, and original ideas.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon"><Sparkles size={28} /></div>
              <h4>Compassion</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                Fostering empathy, teamwork, environmental care, and community service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* School Infrastructure */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-soft)' }}>
        <div className="container">
          <SectionTitle 
            badge="Campus Excellence"
            title="School Infrastructure & Environment"
            subtitle="Designed to provide a safe, vibrant, and resource-rich learning ecosystem."
          />

          <div className="why-mpsa-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            <div className="why-card" style={{ textAlign: 'left' }}>
              <Building size={32} color="#123B63" style={{ marginBottom: '1rem' }} />
              <h4>Modern Classrooms & Labs</h4>
              <p>Digitally equipped smart classrooms, advanced physics, chemistry, biology, and computer science laboratories.</p>
            </div>

            <div className="why-card" style={{ textAlign: 'left' }}>
              <BookOpen size={32} color="#123B63" style={{ marginBottom: '1rem' }} />
              <h4>Central Knowledge Hub</h4>
              <p>Comprehensive school library featuring thousands of academic texts, research journals, and quiet study reading zones.</p>
            </div>

            <div className="why-card" style={{ textAlign: 'left' }}>
              <ShieldCheck size={32} color="#123B63" style={{ marginBottom: '1rem' }} />
              <h4>Safety & Security</h4>
              <p>24x7 HD CCTV campus surveillance, security guards at all gates, and GPS-tracked safe transport buses.</p>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
            <Link to="/facilities" className="btn btn-primary btn-lg">
              Explore All Facilities <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
