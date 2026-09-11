import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  ChevronRight,
  AlertCircle
} from 'lucide-react';

import SectionTitle from '../components/SectionTitle';
import { SCHOOL_CONFIG } from '../data/config';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSent, setIsSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSent(true);
  };

  return (
    <div className="contact-page">
      {/* Banner */}
      <div className="page-banner">
        <div className="container">
          <h1 className="page-banner-title">Contact Us</h1>
          <p className="page-banner-subtitle">
            We are here to answer your questions regarding admissions, academics, campus visits, and school inquiries.
          </p>
          <ul className="breadcrumb-list">
            <li><Link to="/">Home</Link></li>
            <li>/</li>
            <li>Contact Us</li>
          </ul>
        </div>
      </div>

      <section className="section-padding">
        <div className="container">
          <div className="admissions-grid">
            {/* Left: Contact Info Cards */}
            <div>
              <span className="section-badge">Direct Communication</span>
              <h2 className="section-title-text" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
                Reach Out To Us
              </h2>

              <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginBottom: '2rem', lineHeight: '1.7' }}>
                Have questions or want to schedule a school tour? Contact our administrative desk through phone, email, or by visiting our campus.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div className="why-card" style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem', textAlign: 'left', padding: '1.5rem' }}>
                  <div className="why-icon-box" style={{ margin: 0, flexShrink: 0 }}><MapPin size={24} /></div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', color: 'var(--primary-navy)', marginBottom: '0.2rem' }}>School Campus Address</h4>
                    <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}>{SCHOOL_CONFIG.address}</p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--accent-gold)', marginTop: '0.25rem', fontWeight: '600' }}>
                      Landmark: {SCHOOL_CONFIG.landmark}
                    </p>
                  </div>
                </div>

                <div className="why-card" style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem', textAlign: 'left', padding: '1.5rem' }}>
                  <div className="why-icon-box" style={{ margin: 0, flexShrink: 0 }}><Phone size={24} /></div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', color: 'var(--primary-navy)', marginBottom: '0.2rem' }}>Phone Lines</h4>
                    <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}>
                      Admission Helpline: {SCHOOL_CONFIG.phonePrimary}<br />
                      Office Desk: {SCHOOL_CONFIG.phoneSecondary}
                    </p>
                  </div>
                </div>

                <div className="why-card" style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem', textAlign: 'left', padding: '1.5rem' }}>
                  <div className="why-icon-box" style={{ margin: 0, flexShrink: 0 }}><Mail size={24} /></div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', color: 'var(--primary-navy)', marginBottom: '0.2rem' }}>Email Support</h4>
                    <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}>
                      General Inquiries: {SCHOOL_CONFIG.emailGeneral}<br />
                      Admissions Desk: {SCHOOL_CONFIG.emailAdmissions}
                    </p>
                  </div>
                </div>

                <div className="why-card" style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem', textAlign: 'left', padding: '1.5rem' }}>
                  <div className="why-icon-box" style={{ margin: 0, flexShrink: 0 }}><Clock size={24} /></div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', color: 'var(--primary-navy)', marginBottom: '0.2rem' }}>School Office Timings</h4>
                    <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}>{SCHOOL_CONFIG.timingOffice}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Interactive Contact Form */}
            <div>
              <div className="form-box">
                <span className="section-badge">Send a Message</span>
                <h3 style={{ fontSize: '1.6rem', color: 'var(--primary-navy)', marginBottom: '0.5rem' }}>
                  Contact Form
                </h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                  Fill out the form below to drop us a note or request a callback.
                </p>

                {isSent ? (
                  <div className="alert-success-custom">
                    <CheckCircle2 size={28} />
                    <div>
                      Thank you for contacting Maharana Pratap Science Academy! Your message has been received and our office will get back to you shortly.
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label>Your Name *</label>
                      <input 
                        type="text" 
                        name="name"
                        className="form-control"
                        placeholder="Enter full name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Your Email Address *</label>
                      <input 
                        type="email" 
                        name="email"
                        className="form-control"
                        placeholder="Enter email address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Phone Number *</label>
                      <input 
                        type="tel" 
                        name="phone"
                        className="form-control"
                        placeholder="Enter 10-digit mobile number"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Subject *</label>
                      <input 
                        type="text" 
                        name="subject"
                        className="form-control"
                        placeholder="e.g. Admission Inquiry / Science Lab Query"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Message *</label>
                      <textarea 
                        name="message"
                        rows="5"
                        className="form-control"
                        placeholder="Write your message or detailed query here..."
                        value={formData.message}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>

                    <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '1rem' }}>
                      <Send size={18} /> Send Message
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps / Visit Our School Section (RULE #22 MANDATORY) */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-soft)' }}>
        <div className="container">
          <SectionTitle 
            badge="Visit Our School"
            title="Locate MPSA Campus on Google Maps"
            subtitle="Find campus directions and visit options."
          />

          <div className="maps-container-box">
            {SCHOOL_CONFIG.GOOGLE_MAPS_EMBED_URL ? (
              <div style={{ width: '100%', height: '420px' }}>
                <iframe 
                  src={SCHOOL_CONFIG.GOOGLE_MAPS_EMBED_URL}
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  title="School Google Map Location"
                />
              </div>
            ) : (
              <div className="map-placeholder-card">
                <div className="map-icon-large">
                  <MapPin size={36} />
                </div>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--primary-navy)', marginBottom: '0.5rem' }}>
                  {SCHOOL_CONFIG.fullName}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '650px', margin: '0 auto 1.5rem auto' }}>
                  {SCHOOL_CONFIG.address}
                </p>

                <div className="placeholder-notice" style={{ maxWidth: '680px', margin: '0 auto 1.5rem auto', textAlign: 'left' }}>
                  <AlertCircle size={18} style={{ display: 'inline', marginRight: '0.35rem' }} />
                  <strong>Editable Google Maps Variables:</strong> The school address string <code>SCHOOL_ADDRESS</code>, embed iframe URL <code>GOOGLE_MAPS_EMBED_URL</code>, and directions link <code>GOOGLE_MAPS_DIRECTION_URL</code> are cleanly defined in <code>src/data/config.js</code>.
                </div>

                <a 
                  href={SCHOOL_CONFIG.GOOGLE_MAPS_DIRECTION_URL} 
                  target="_blank" 
                  rel="noreferrer"
                  className="btn btn-secondary btn-lg"
                >
                  Get Directions on Google Maps <ChevronRight size={18} />
                </a>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
