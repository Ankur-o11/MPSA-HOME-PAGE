import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Award, 
  Users, 
  ShieldCheck, 
  GraduationCap, 
  CheckCircle2, 
  ChevronRight, 
  FlaskConical, 
  BookOpen, 
  Trophy, 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Sparkles
} from 'lucide-react';

import Hero from '../components/Hero';
import SectionTitle from '../components/SectionTitle';
import FounderSection from '../components/FounderSection';
import TeacherCard from '../components/TeacherCard';
import FacilityCard from '../components/FacilityCard';
import NoticeCard from '../components/NoticeCard';
import EventCard from '../components/EventCard';
import AchievementCard from '../components/AchievementCard';
import GalleryCard from '../components/GalleryCard';
import Lightbox from '../components/Lightbox';

import { SCHOOL_CONFIG } from '../data/config';
import { teachersData as defaultTeachers } from '../data/teachers';
import { facilitiesData as defaultFacilities } from '../data/facilities';
import { noticesData as defaultNotices } from '../data/notices';
import { upcomingEvents as defaultEvents } from '../data/events';
import { achievementsData as defaultAchievements } from '../data/achievements';
import { galleryData as defaultGallery } from '../data/gallery';

import { apiService } from '../services/api';
import { getUploadUrl } from '../config/api';
import { NEUTRAL_AVATAR_SVG, NEUTRAL_IMAGE_SVG, handleAvatarError, handleImageError } from '../utils/imageUtils';

export default function Home() {
  const [selectedGalleryItem, setSelectedGalleryItem] = useState(null);
  const [selectedNotice, setSelectedNotice] = useState(null);

  const [teachers, setTeachers] = useState(defaultTeachers);
  const [facilities, setFacilities] = useState(defaultFacilities);
  const [notices, setNotices] = useState(defaultNotices);
  const [events, setEvents] = useState(defaultEvents);
  const [achievements, setAchievements] = useState(defaultAchievements);
  const [gallery, setGallery] = useState(defaultGallery);
  const [siteSettings, setSiteSettings] = useState(SCHOOL_CONFIG);
  const [principal, setPrincipal] = useState(null);
  const [director, setDirector] = useState(null);
  const [founder, setFounder] = useState(null);

  useEffect(() => {
    async function loadHomeData() {
      const [tData, fData, nData, eData, aData, gData, sData, pData, dData, fndData] = await Promise.all([
        apiService.getTeachers(),
        apiService.getFacilities(),
        apiService.getNotices(),
        apiService.getEvents(),
        apiService.getAchievements(),
        apiService.getGallery({ limit: 6 }),
        apiService.getContactSettings(),
        apiService.getPrincipal(),
        apiService.getDirector(),
        apiService.getFounderProfile()
      ]);

      if (tData && tData.length > 0) setTeachers(tData);
      if (fData && fData.length > 0) setFacilities(fData);
      if (nData && nData.length > 0) setNotices(nData);
      if (eData && eData.length > 0) setEvents(eData);
      if (aData && aData.length > 0) setAchievements(aData);
      const gItems = Array.isArray(gData) ? gData : (gData?.data || []);
      if (gItems && gItems.length > 0) setGallery(gItems);
      if (sData) setSiteSettings(sData);
      if (pData) setPrincipal(pData);
      if (dData) setDirector(dData);
      if (fndData) setFounder(fndData);
    }
    loadHomeData();
  }, []);

  const schoolConfig = siteSettings || SCHOOL_CONFIG;
  const activePhonePrimary = schoolConfig?.phonePrimary || SCHOOL_CONFIG.phonePrimary;

  // Principal Data
  const pName = principal?.name || 'Dr. [Principal Name Placeholder]';
  const pDesignation = principal?.designation || 'Principal, MPSA School';
  const pQualifications = principal?.qualifications || 'Ph.D., M.Sc., B.Ed.';
  const pPhoto = getUploadUrl(principal?.photo) || NEUTRAL_AVATAR_SVG;
  const pQuote = principal?.messageQuote || 'Welcome to Maharana Pratap Science Academy. We strive to inspire every child to explore, question, innovate, and achieve their full potential.';

  // Director / Manager Data
  const dName = director?.name || 'Shri [Director/Manager Name Placeholder]';
  const dDesignation = director?.designation || 'Director / Manager, MPSA School';
  const dProfession = director?.profession || 'Educationist & Administrator';
  const dPhoto = getUploadUrl(director?.photo) || NEUTRAL_AVATAR_SVG;
  const dQuote = director?.visionQuote || director?.intro || 'Empowering students with quality education, disciplined values, and modern scientific knowledge for a brighter future.';

  // Founder Data
  const fName = founder?.name || 'Shri [Founder Name Placeholder]';
  const fDesignation = 'Founder, MPSA School';
  const fProfession = founder?.profession || 'Visionary Founder';
  const fPhoto = getUploadUrl(founder?.photo) || NEUTRAL_AVATAR_SVG;
  const fQuote = founder?.quote || founder?.vision || 'A dream to establish an institution where scientific inquiry meets moral discipline and every child discovers their inner brilliance.';

  return (
    <div className="home-page">
      {/* 2. Hero Section */}
      <Hero />

      {/* 3. Quick Highlights Strip */}
      <section className="container">
        <div className="quick-highlights-strip">
          <div className="highlights-grid">
            <div className="highlight-item">
              <div className="highlight-icon"><GraduationCap size={28} /></div>
              <div className="highlight-text">
                <h4>Quality Education</h4>
                <p>CBSE pattern science & holistic curriculum</p>
              </div>
            </div>
            <div className="highlight-item">
              <div className="highlight-icon"><Users size={28} /></div>
              <div className="highlight-text">
                <h4>Experienced Faculty</h4>
                <p>Post-graduate & specialized mentors</p>
              </div>
            </div>
            <div className="highlight-item">
              <div className="highlight-icon"><ShieldCheck size={28} /></div>
              <div className="highlight-text">
                <h4>Safe & Caring</h4>
                <p>CCTV secured GPS transport campus</p>
              </div>
            </div>
            <div className="highlight-item">
              <div className="highlight-icon"><Award size={28} /></div>
              <div className="highlight-text">
                <h4>Holistic Development</h4>
                <p>Sports, robotics, arts & leadership</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. About MPSA Home Preview */}
      <section className="section-padding">
        <div className="container">
          <div className="about-home-grid">
            <div className="about-home-image-wrapper">
              <img 
                src={schoolConfig.campusImage ? getUploadUrl(schoolConfig.campusImage) : NEUTRAL_IMAGE_SVG} 
                alt="Maharana Pratap Science Academy Campus" 
                onError={handleImageError}
              />
              <div className="about-home-experience-badge">
                <div className="experience-number">15+</div>
                <div className="experience-text">Years of Educational Excellence</div>
              </div>
            </div>

            <div className="about-home-content">
              <span className="section-badge">Welcome to {SCHOOL_CONFIG.shortName}</span>
              <h2 className="section-title-text" style={{ fontSize: '2.5rem', textAlign: 'left', marginBottom: '1.25rem' }}>
                Nurturing Scientific Minds & Character Excellence
              </h2>
              <p>
                <strong>MAHARANA PRATAP SCIENCE ACADEMY (MPSA School)</strong> is a premier educational institution committed to nurturing academic rigor, scientific curiosity, and moral integrity in every student.
              </p>
              <p>
                Our modern campus offers state-of-the-art physics, chemistry, biology, and computer laboratories alongside interactive smart classrooms and extensive athletic grounds.
              </p>

              <div className="about-home-features">
                <div className="feature-check-item">
                  <CheckCircle2 size={20} />
                  <span>State-of-the-Art Science Labs</span>
                </div>
                <div className="feature-check-item">
                  <CheckCircle2 size={20} />
                  <span>Digital Smart Classrooms</span>
                </div>
                <div className="feature-check-item">
                  <CheckCircle2 size={20} />
                  <span>Interactive Pedagogy</span>
                </div>
                <div className="feature-check-item">
                  <CheckCircle2 size={20} />
                  <span>Disciplined & Value-Based Environment</span>
                </div>
              </div>

              <Link to="/about" className="btn btn-secondary">
                Read More About MPSA <ChevronRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Leadership Section (Principal, Director / Manager, Founder) */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-soft)' }}>
        <div className="container">
          <SectionTitle 
            badge="Leadership & Guidance"
            title="Guiding Minds Towards Excellence"
            subtitle="The visionary leadership steering Maharana Pratap Science Academy into a bright future."
          />

          <div className="leadership-grid-three">
            {/* Principal Card */}
            <div className="leadership-card">
              <div className="leadership-card-header">
                <img 
                  src={pPhoto} 
                  alt={pName} 
                  className="leadership-img"
                  onError={handleAvatarError}
                />
                <div className="leadership-info">
                  <h3>{pName}</h3>
                  <p className="leadership-designation">{pDesignation}</p>
                  {pQualifications && <p style={{ fontSize: '0.8rem', opacity: 0.85, marginTop: '0.2rem' }}>{pQualifications}</p>}
                </div>
              </div>

              <div className="leadership-card-body">
                {(!principal?.name || principal.name.includes('[Placeholder]')) && (
                  <div className="placeholder-notice">
                    <strong>Notice:</strong> Principal details set to placeholder.
                  </div>
                )}
                <blockquote className="leadership-quote">
                  "{pQuote}"
                </blockquote>
                <Link to="/principal-message" className="btn btn-outline btn-sm">
                  Read Full Principal Message <ChevronRight size={16} />
                </Link>
              </div>
            </div>

            {/* Director / Manager Card */}
            <div className="leadership-card">
              <div className="leadership-card-header">
                <img 
                  src={dPhoto} 
                  alt={dName} 
                  className="leadership-img"
                  onError={handleAvatarError}
                />
                <div className="leadership-info">
                  <h3>{dName}</h3>
                  <p className="leadership-designation">{dDesignation}</p>
                  <p style={{ fontSize: '0.8rem', opacity: 0.85, marginTop: '0.2rem' }}>{dProfession}</p>
                </div>
              </div>

              <div className="leadership-card-body">
                {(!director?.name || director.name.includes('[Placeholder]')) && (
                  <div className="placeholder-notice">
                    <strong>Notice:</strong> Director / Manager details set to placeholder.
                  </div>
                )}
                <blockquote className="leadership-quote">
                  "{dQuote}"
                </blockquote>
                <Link to="/director" className="btn btn-outline btn-sm">
                  View Director / Manager Profile <ChevronRight size={16} />
                </Link>
              </div>
            </div>

            {/* Founder Card */}
            <div className="leadership-card">
              <div className="leadership-card-header">
                <img 
                  src={fPhoto} 
                  alt={fName} 
                  className="leadership-img"
                  onError={handleAvatarError}
                />
                <div className="leadership-info">
                  <h3>{fName}</h3>
                  <p className="leadership-designation">{fDesignation}</p>
                  <p style={{ fontSize: '0.8rem', opacity: 0.85, marginTop: '0.2rem' }}>{fProfession}</p>
                </div>
              </div>

              <div className="leadership-card-body">
                {(!founder?.name || founder.name.includes('[Placeholder]')) && (
                  <div className="placeholder-notice">
                    <strong>Notice:</strong> Founder profile set to placeholder.
                  </div>
                )}
                <blockquote className="leadership-quote">
                  "{fQuote}"
                </blockquote>
                <Link to="/founder" className="btn btn-primary btn-sm">
                  Explore Founder Profile <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Why Choose MPSA */}
      <section className="section-padding">
        <div className="container">
          <SectionTitle 
            badge="Why Choose Us"
            title="The MPSA School Advantage"
            subtitle="Why parents trust Maharana Pratap Science Academy for their children's educational journey."
          />

          <div className="why-mpsa-grid">
            <div className="why-card">
              <div className="why-icon-box"><FlaskConical size={32} /></div>
              <h4>Science & Innovation Focus</h4>
              <p>Advanced laboratories and practical-oriented learning enabling early scientific discovery.</p>
            </div>
            <div className="why-card">
              <div className="why-icon-box"><ShieldCheck size={32} /></div>
              <h4>Values & Discipline</h4>
              <p>Emphasis on character building, moral ethics, punctuality, and mutual respect.</p>
            </div>
            <div className="why-card">
              <div className="why-icon-box"><Trophy size={32} /></div>
              <h4>Sports & Extra-Curricular</h4>
              <p>Comprehensive athletic training, inter-house competitions, arts, and robotics clubs.</p>
            </div>
            <div className="why-card">
              <div className="why-icon-box"><BookOpen size={32} /></div>
              <h4>Experienced Faculty</h4>
              <p>Dedicated post-graduate teachers with personalized mentorship and student care.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Facilities Preview */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-soft)' }}>
        <div className="container">
          <SectionTitle 
            badge="Campus Life"
            title="World-Class Facilities"
            subtitle="Providing an inspiring infrastructure that supports academic curiosity and physical growth."
          />

          <div className="gallery-grid" style={{ marginBottom: '2.5rem' }}>
            {facilities.slice(0, 3).map((facility) => (
              <FacilityCard key={facility._id || facility.id} facility={facility} />
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link to="/facilities" className="btn btn-secondary">
              Explore All Campus Facilities <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* 9. Academic Highlights */}
      <section className="section-padding">
        <div className="container">
          <SectionTitle 
            badge="Academic Excellence"
            title="Curriculum & Programs"
            subtitle="Structured learning pathways from Pre-Primary through Senior Secondary Science."
          />

          <div className="why-mpsa-grid home-curriculum-grid">
            <div className="why-card" style={{ textAlign: 'left' }}>
              <span className="category-tag">Classes 1st – 5th</span>
              <h4 style={{ marginTop: '0.85rem' }}>Primary Education</h4>
              <p style={{ marginBottom: '1rem' }}>Foundational literacy, numeracy, environmental awareness, and activity-based learning.</p>
              <ul style={{ paddingLeft: '1.25rem', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                <li>Activity & Play-way methods</li>
                <li>Phonics & English fluency</li>
                <li>Basic Math & Nature study</li>
              </ul>
            </div>

            <div className="why-card" style={{ textAlign: 'left' }}>
              <span className="category-tag">Classes 6th – 8th</span>
              <h4 style={{ marginTop: '0.85rem' }}>Middle School</h4>
              <p style={{ marginBottom: '1rem' }}>Fostering analytical thinking, science lab practicals, computer coding, and social sciences.</p>
              <ul style={{ paddingLeft: '1.25rem', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                <li>Physics, Chemistry, Biology introduced</li>
                <li>Computer Science & Robotics</li>
                <li>Inter-house debates & quiz contests</li>
              </ul>
            </div>

            <div className="why-card" style={{ textAlign: 'left' }}>
              <span className="category-tag">Classes 9th – 12th</span>
              <h4 style={{ marginTop: '0.85rem' }}>Secondary & Sr. Secondary Science</h4>
              <p style={{ marginBottom: '1rem' }}>Rigorous academic preparation for Board examinations and scientific entrance competitive exams.</p>
              <ul style={{ paddingLeft: '1.25rem', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                <li>Physics, Chemistry, Math, Biology streams</li>
                <li>Board exam coaching & mock tests</li>
                <li>Science Olympiad & Expo participation</li>
              </ul>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link to="/academics" className="btn btn-primary">
              View Detailed Academics Syllabus <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* 10. Latest Notices Preview */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-soft)' }}>
        <div className="container">
          <SectionTitle 
            badge="Official Announcements"
            title="Latest Notices & Circulars"
            subtitle="Stay informed with important announcements regarding admissions, exams, and events."
          />

          <div className="gallery-grid" style={{ marginBottom: '2.5rem' }}>
            {notices.slice(0, 3).map((notice) => (
              <NoticeCard 
                key={notice._id || notice.id} 
                notice={notice} 
                onSelectNotice={(n) => setSelectedNotice(n)}
              />
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link to="/notices" className="btn btn-outline">
              View All Official Notices <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* 11. Achievements Preview */}
      <section className="section-padding">
        <div className="container">
          <SectionTitle 
            badge="Our Pride"
            title="Recent Achievements & Awards"
            subtitle="Celebrating our students' success in board exams, sports championships, and national contests."
          />

          <div className="gallery-grid" style={{ marginBottom: '2.5rem' }}>
            {achievements.slice(0, 3).map((achievement) => (
              <AchievementCard key={achievement._id || achievement.id} achievement={achievement} />
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link to="/achievements" className="btn btn-secondary">
              View All Achievements <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* 12. Upcoming Events Preview */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-soft)' }}>
        <div className="container">
          <SectionTitle 
            badge="Calendar of Events"
            title="Upcoming School Events"
            subtitle="Join us for our upcoming academic expos, sports tournaments, and cultural fests."
          />

          <div className="gallery-grid" style={{ marginBottom: '2.5rem' }}>
            {events.slice(0, 3).map((event) => (
              <EventCard key={event._id || event.id} event={event} />
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link to="/events" className="btn btn-primary">
              Explore All Events & Activities <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* 13. Gallery Preview */}
      <section className="section-padding">
        <div className="container">
          <SectionTitle 
            badge="Campus Moments"
            title="Photo Gallery Highlights"
            subtitle="A glimpse into campus life, science expos, sports meets, and cultural celebrations."
          />

          <div className="gallery-grid" style={{ marginBottom: '2.5rem' }}>
            {gallery.slice(0, 6).map((item) => (
              <GalleryCard 
                key={item._id || item.id} 
                item={item} 
                onClick={(g) => setSelectedGalleryItem(g)}
              />
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link to="/gallery" className="btn btn-outline">
              View Full Campus Photo Gallery <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* 14. Admissions CTA Banner */}
      <section className="container" style={{ margin: '2rem auto 5rem auto' }}>
        <div className="admissions-cta-banner">
          <div className="cta-content">
            <span className="section-badge" style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'var(--accent-gold)' }}>
              Session {SCHOOL_CONFIG.admissionSession}
            </span>
            <h2 className="cta-title">
              Admissions Open for <span>Academic Session {SCHOOL_CONFIG.admissionSession}</span>
            </h2>
            <p className="cta-desc">
              Give your child the advantage of quality education, modern science facilities, and strong moral values at Maharana Pratap Science Academy.
            </p>
            <div className="cta-buttons-wrapper">
              <Link to="/admissions" className="btn btn-primary btn-lg">
                Apply Online Now <ChevronRight size={18} />
              </Link>
              <a href={`tel:${activePhonePrimary}`} className="btn btn-outline-gold btn-lg">
                <Phone size={18} /> Call Admission Desk: {activePhonePrimary}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 15. Google Maps / Visit Our School Section (RULE #22 MANDATORY) */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-soft)' }}>
        <div className="container">
          <SectionTitle 
            badge="Visit Our Campus"
            title="Visit Maharana Pratap Science Academy"
            subtitle="We invite parents and prospective students to tour our modern campus."
          />

          <div className="maps-container-box">
            {SCHOOL_CONFIG.GOOGLE_MAPS_EMBED_URL ? (
              <div style={{ width: '100%', height: '400px' }}>
                <iframe 
                  src={SCHOOL_CONFIG.GOOGLE_MAPS_EMBED_URL}
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  title="School Google Map"
                />
              </div>
            ) : (
              <div className="map-placeholder-card">
                <div className="map-icon-large">
                  <MapPin size={36} />
                </div>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--primary-navy)', marginBottom: '0.5rem' }}>
                  {schoolConfig.schoolFullName || schoolConfig.fullName || SCHOOL_CONFIG.fullName} Campus Location
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto 1.5rem auto' }}>
                  {schoolConfig.address || SCHOOL_CONFIG.address}
                </p>

                <div className="placeholder-notice" style={{ maxWidth: '650px', margin: '0 auto 1.5rem auto' }}>
                  <strong>Map Embed Notice:</strong> Google Maps embed iframe URL will be configured via <code>SCHOOL_CONFIG.GOOGLE_MAPS_EMBED_URL</code> once exact campus GPS pin is confirmed.
                </div>

                <a 
                  href={schoolConfig.googleMapsDirectionUrl || SCHOOL_CONFIG.GOOGLE_MAPS_DIRECTION_URL} 
                  target="_blank" 
                  rel="noreferrer"
                  className="btn btn-secondary"
                >
                  Get Directions on Google Maps <ChevronRight size={16} />
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 16. Contact Preview */}
      <section className="section-padding">
        <div className="container">
          <SectionTitle 
            badge="Get in Touch"
            title="School Contact Information"
            subtitle="Reach out to our administrative team for admissions, inquiries, and campus tours."
          />

          <div className="why-mpsa-grid home-contact-grid">
            <div className="why-card">
              <div className="why-icon-box"><MapPin size={28} /></div>
              <h4>Campus Address</h4>
              <p>{schoolConfig.address || SCHOOL_CONFIG.address}</p>
            </div>

            <div className="why-card">
              <div className="why-icon-box"><Phone size={28} /></div>
              <h4>Phone Numbers</h4>
              <p>
                {schoolConfig.phonePrimary || SCHOOL_CONFIG.phonePrimary}
                {(schoolConfig.phoneSecondary || SCHOOL_CONFIG.phoneSecondary) && (
                  <><br />{schoolConfig.phoneSecondary || SCHOOL_CONFIG.phoneSecondary}</>
                )}
              </p>
            </div>

            <div className="why-card">
              <div className="why-icon-box"><Clock size={28} /></div>
              <h4>School Timings</h4>
              <p>{schoolConfig.timingOffice || SCHOOL_CONFIG.timingOffice}</p>
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

      {/* Notice Detail Modal */}
      {selectedNotice && (
        <div className="lightbox-backdrop" onClick={() => setSelectedNotice(null)}>
          <div className="lightbox-content-box" style={{ padding: '2.5rem', maxWidth: '650px' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <span className="category-tag">{selectedNotice.category}</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{selectedNotice.date}</span>
            </div>
            <h3 style={{ fontSize: '1.4rem', color: 'var(--primary-navy)', marginBottom: '1rem' }}>
              {selectedNotice.title}
            </h3>
            <p style={{ fontSize: '1rem', color: 'var(--text-main)', lineHeight: '1.7', marginBottom: '2rem' }}>
              {selectedNotice.description}
            </p>
            <div style={{ textAlign: 'right' }}>
              <button className="btn btn-secondary" onClick={() => setSelectedNotice(null)}>
                Close Notice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
