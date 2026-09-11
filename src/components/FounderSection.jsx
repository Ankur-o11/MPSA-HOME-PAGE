import React from 'react';
import { Link } from 'react-router-dom';
import { Quote, ChevronRight, Award } from 'lucide-react';
import SectionTitle from './SectionTitle';

export default function FounderSection() {
  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--bg-soft)' }}>
      <div className="container">
        <SectionTitle 
          badge="Founder & Inspiration"
          title="The Vision Behind MPSA School"
          subtitle="Honoring the vision, dedication, and values that laid the foundation of Maharana Pratap Science Academy."
        />

        <div className="founder-hero-card" style={{ marginBottom: 0 }}>
          <div className="founder-hero-inner">
            <div className="founder-photo-container">
              <img 
                src="https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800&auto=format&fit=crop" 
                alt="Founder Placeholder - Maharana Pratap Science Academy" 
                className="founder-photo"
              />
              <div 
                style={{
                  position: 'absolute',
                  bottom: '1rem',
                  left: '1rem',
                  backgroundColor: 'rgba(18, 59, 99, 0.9)',
                  color: 'var(--accent-gold)',
                  padding: '0.4rem 0.85rem',
                  borderRadius: '4px',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}
              >
                <Award size={14} /> Founder Visionary
              </div>
            </div>

            <div className="founder-details">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-gold)', marginBottom: '0.5rem' }}>
                <Quote size={24} />
                <span style={{ fontWeight: '700', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Founder's Inspiration
                </span>
              </div>

              <h3 className="founder-name">[Founder Name Placeholder]</h3>
              <p className="founder-designation">Founder & Visionary Chairman, MPSA School</p>

              <div className="placeholder-notice">
                <strong>Notice:</strong> Founder details and biography are set to professional placeholders until official verified records are provided.
              </div>

              <blockquote className="leadership-quote" style={{ marginTop: '1rem', marginBottom: '1.5rem' }}>
                "Education is not merely about imparting knowledge; it is about building character, awakening scientific curiosity, and fostering moral strength to serve humanity."
              </blockquote>

              <p className="founder-intro-text">
                Maharana Pratap Science Academy was established with a singular noble ambition — to provide world-class education rooted in traditional values, scientific rigor, and holistic student development.
              </p>

              <div style={{ marginTop: '2rem' }}>
                <Link to="/founder" className="btn btn-primary">
                  Read Complete Founder Story <ChevronRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
