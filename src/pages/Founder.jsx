import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Quote, Award, Calendar, ChevronRight, Heart, Sparkles, AlertCircle } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import Lightbox from '../components/Lightbox';

export default function Founder() {
  const [selectedGalleryItem, setSelectedGalleryItem] = useState(null);

  // Founder Gallery Photos with Placeholders & Captions (Rule #10)
  const founderGallery = [
    {
      id: "fg1",
      title: "Founder Portrait",
      image: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800&auto=format&fit=crop",
      caption: "Shri [Founder Name Placeholder] - Founder & Visionary Chairman of Maharana Pratap Science Academy.",
      date: "Founder Archive"
    },
    {
      id: "fg2",
      title: "Founder at School Foundation Ceremony",
      image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=800&auto=format&fit=crop",
      caption: "Laying the foundation stone of Maharana Pratap Science Academy campus.",
      date: "Milestone Year 2010"
    },
    {
      id: "fg3",
      title: "Founder Interacting with Science Students",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop",
      caption: "Encouraging young science researchers during early batch exhibitions.",
      date: "Science Expo"
    },
    {
      id: "fg4",
      title: "Founder with Faculty & Staff Members",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
      caption: "Guiding faculty members on student-centric teaching methodologies.",
      date: "Academic Meeting"
    },
    {
      id: "fg5",
      title: "Founder Presiding Over Annual Day",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop",
      caption: "Presenting academic excellence awards to top batch rankers.",
      date: "Annual Day Function"
    },
    {
      id: "fg6",
      title: "Founder Inspecting New Laboratory Wing",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800&auto=format&fit=crop",
      caption: "Dedicating modern physics and chemistry wings to future generations of students.",
      date: "Lab Inauguration"
    }
  ];

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

      {/* Mandatory Placeholder Rule Notice */}
      <section className="container" style={{ marginTop: '2.5rem' }}>
        <div className="placeholder-notice" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <AlertCircle size={22} color="#78350F" style={{ flexShrink: 0 }} />
          <div>
            <strong>Authenticity & Content Notice:</strong> All founder names, biography text, dates, and historical details in this section are presented using structured placeholders until verified official details are updated by school management.
          </div>
        </div>
      </section>

      {/* 1. Founder Hero Section */}
      <section className="section-padding">
        <div className="container">
          <div className="founder-hero-card">
            <div className="founder-hero-inner">
              <div className="founder-photo-container">
                <img 
                  src="https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800&auto=format&fit=crop" 
                  alt="Shri [Founder Name Placeholder]" 
                  className="founder-photo"
                />
              </div>
              <div className="founder-details">
                <span className="section-badge">Our Visionary Patron</span>
                <h2 className="founder-name">Shri [Founder Name Placeholder]</h2>
                <p className="founder-designation">Founder & Visionary Chairman, MPSA School</p>
                <p className="founder-intro-text">
                  A visionary educator and philanthropist who dedicated life to building an institution where children from all walks of life receive quality science education, strong moral discipline, and character building.
                </p>

                <blockquote className="leadership-quote" style={{ marginTop: '1.5rem' }}>
                  "Education is the greatest light that can ignite a human mind. When we teach a child science with values, we build not just a professional, but a nation builder."
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
              How the Dream Began
            </h3>
            <p style={{ marginBottom: '1.25rem' }}>
              The journey of Maharana Pratap Science Academy began with a deep conviction — that every child deserves access to high-caliber scientific education combined with character discipline. Inspired by the legacy of Maharana Pratap's resilience and bravery, the founder envisioned an academy that would cultivate both intellect and integrity.
            </p>

            <h3 style={{ fontSize: '1.5rem', color: 'var(--primary-navy)', margin: '2rem 0 1rem 0' }}>
              What Inspired the Founder
            </h3>
            <p style={{ marginBottom: '1.25rem' }}>
              Observing the rapid advancements in technology and scientific discovery, the founder realized that future generations required more than textbook rote learning. They needed hands-on laboratory experimentation, analytical thinking, digital literacy, and strong ethical grounding to navigate a complex world.
            </p>

            <h3 style={{ fontSize: '1.5rem', color: 'var(--primary-navy)', margin: '2rem 0 1rem 0' }}>
              Values & Educational Philosophy
            </h3>
            <p style={{ marginBottom: '1.25rem' }}>
              From its inception, the founder established core principles: zero tolerance for indiscipline, equal opportunities for all students, continuous faculty mentorship, and a deep respect for Indian cultural heritage alongside modern scientific progress.
            </p>

            <h3 style={{ fontSize: '1.5rem', color: 'var(--primary-navy)', margin: '2rem 0 1rem 0' }}>
              Future Vision
            </h3>
            <p>
              Today, as MPSA School continues to grow with state-of-the-art infrastructure, sports arenas, and robotics labs, the founder's original vision remains our guiding light — preparing leaders who will lead tomorrow with knowledge and honor.
            </p>
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

          <div className="gallery-grid">
            {founderGallery.map((item) => (
              <div key={item.id} className="gallery-card" onClick={() => setSelectedGalleryItem(item)}>
                <img src={item.image} alt={item.title} className="gallery-card-img" />
                <div className="gallery-card-overlay">
                  <h4 className="gallery-card-title">{item.title}</h4>
                  <p className="gallery-card-date">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SCHOOL JOURNEY TIMELINE */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-soft)' }}>
        <div className="container">
          <SectionTitle 
            badge="Milestones"
            title="Our School Journey Timeline"
            subtitle="Editable chronicle of key developmental milestones of Maharana Pratap Science Academy."
          />

          <div className="timeline-wrapper">
            <div className="timeline-item left">
              <div className="timeline-dot"></div>
              <div className="timeline-box">
                <span className="timeline-stage">Milestone 1 • [Year Placeholder]</span>
                <h4>The School Dream</h4>
                <p>Conceptualization of Maharana Pratap Science Academy as a specialized science & value education public school.</p>
              </div>
            </div>

            <div className="timeline-item right">
              <div className="timeline-dot"></div>
              <div className="timeline-box">
                <span className="timeline-stage">Milestone 2 • [Year Placeholder]</span>
                <h4>Foundation of the Academy</h4>
                <p>Inauguration of the main academic block and first composite science laboratory.</p>
              </div>
            </div>

            <div className="timeline-item left">
              <div className="timeline-dot"></div>
              <div className="timeline-box">
                <span className="timeline-stage">Milestone 3 • [Year Placeholder]</span>
                <h4>First Batch of Students</h4>
                <p>Welcoming the pioneer batch of students with a dedicated faculty team.</p>
              </div>
            </div>

            <div className="timeline-item right">
              <div className="timeline-dot"></div>
              <div className="timeline-box">
                <span className="timeline-stage">Milestone 4 • [Year Placeholder]</span>
                <h4>Growth & Development</h4>
                <p>Expansion into Senior Secondary Science streams, computer labs, and sports arenas.</p>
              </div>
            </div>

            <div className="timeline-item left">
              <div className="timeline-dot"></div>
              <div className="timeline-box">
                <span className="timeline-stage">Milestone 5 • [Year Placeholder]</span>
                <h4>Important Board Milestones</h4>
                <p>Achieving 100% Board examination pass results and district merit awards.</p>
              </div>
            </div>

            <div className="timeline-item right">
              <div className="timeline-dot"></div>
              <div className="timeline-box">
                <span className="timeline-stage">Milestone 6 • Present Day</span>
                <h4>Modern Digital Campus</h4>
                <p>Smart classrooms, robotics labs, GPS fleet, and holistic co-curricular excellence.</p>
              </div>
            </div>

            <div className="timeline-item left">
              <div className="timeline-dot"></div>
              <div className="timeline-box">
                <span className="timeline-stage">Milestone 7 • Future Vision</span>
                <h4>Looking Ahead</h4>
                <p>Pioneering AI-integrated science learning, research projects, and global student exchange.</p>
              </div>
            </div>
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
                "[Placeholder Quote] To build an institution where knowledge is paired with character, where science illuminates minds, and where every child rises to their highest noble potential."
              </h2>
              <p style={{ color: 'var(--accent-gold)', fontWeight: '700', fontSize: '1.1rem' }}>
                — Shri [Founder Name Placeholder]
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. LEGACY & INSPIRATION */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-soft)' }}>
        <div className="container">
          <SectionTitle 
            badge="Enduring Vision"
            title="A Dream That Continues to Inspire"
            subtitle="How the founder's core principles live on through our daily school activities."
          />

          <div className="why-mpsa-grid">
            <div className="why-card">
              <h4>Through Teachers</h4>
              <p>Faculty members who mentor with empathy, passion, and high pedagogical standards.</p>
            </div>
            <div className="why-card">
              <h4>Through Students</h4>
              <p>Learners who demonstrate academic excellence, respectfulness, and scientific curiosity.</p>
            </div>
            <div className="why-card">
              <h4>Through Values</h4>
              <p>Uncompromising focus on discipline, integrity, patriotic spirit, and community care.</p>
            </div>
            <div className="why-card">
              <h4>Through Future Generations</h4>
              <p>Sustaining a legacy of educational leadership for decades to come.</p>
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
