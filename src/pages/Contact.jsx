import React, { useState, useEffect } from 'react';
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
import SEO from '../components/SEO';
import { SCHOOL_CONFIG as defaultConfig } from '../data/config';
import { apiService } from '../services/api';

export default function Contact() {
  const [contactSettings, setContactSettings] = useState(defaultConfig);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    async function loadContact() {
      const data = await apiService.getContactSettings();
      if (data) setContactSettings(data);
    }
    loadContact();
  }, []);

  const schoolAddress = contactSettings.address || defaultConfig.address;
  const schoolLandmark = contactSettings.landmark || defaultConfig.landmark;
  const phonePrimary = contactSettings.phonePrimary || defaultConfig.phonePrimary;
  const phoneSecondary = contactSettings.phoneSecondary || defaultConfig.phoneSecondary;
  const emailGeneral = contactSettings.emailGeneral || defaultConfig.emailGeneral;
  const emailAdmissions = contactSettings.emailAdmissions || defaultConfig.emailAdmissions;
  const timingOffice = contactSettings.timingOffice || defaultConfig.timingOffice;
  const mapEmbedUrl = contactSettings.googleMapsEmbedUrl || defaultConfig.GOOGLE_MAPS_EMBED_URL;
  const mapDirectionUrl = contactSettings.googleMapsDirectionUrl || defaultConfig.GOOGLE_MAPS_DIRECTION_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSent(true);
  };

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Maharana Pratap Science Academy Inter College",
    "description": "Contact Maharana Pratap Science Academy Inter College (MPSA School) in Jalaun, Uttar Pradesh.",
    "url": "https://mpsa-home-page.vercel.app/contact"
  };

  return (
    <div className="contact-page">
      <SEO 
        title="Contact MPSA Inter College | Maharana Pratap Science Academy, Jalaun"
        description="Contact Maharana Pratap Science Academy Inter College (MPSA School) in Jalaun, Uttar Pradesh. Address, office hours, phone numbers, and contact form."
        keywords="Contact MPSA Inter College, Maharana Pratap Science Academy Address Jalaun, Phone Number MPSA Inter College Jalaun, Contact Form MPSA School"
        canonicalUrl="/contact"
        schema={contactSchema}
      />
      {/* Banner */}
      <div className="page-banner">
        <div className="container">
          <h1 className="page-banner-title">Contact Us</h1>
          <p className="page-banner-subtitle">
            We are here to answer your questions regarding admissions, academics, campus visits, and school inquiries at our Jalaun campus.
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
                    <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}>{schoolAddress}</p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--accent-gold)', marginTop: '0.25rem', fontWeight: '600' }}>
                      Landmark: {schoolLandmark}
                    </p>
                  </div>
                </div>

                <div className="why-card" style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem', textAlign: 'left', padding: '1.5rem', minWidth: 0, maxWidth: '100%', boxSizing: 'border-box' }}>
                  <div className="why-icon-box" style={{ margin: 0, flexShrink: 0 }}><Phone size={24} /></div>
                  <div style={{ minWidth: 0, overflowWrap: 'anywhere', wordBreak: 'break-word' }}>
                    <h4 style={{ fontSize: '1.1rem', color: 'var(--primary-navy)', marginBottom: '0.2rem' }}>Phone Lines</h4>
                    <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', overflowWrap: 'anywhere', wordBreak: 'break-word' }}>
                      Admission Helpline: {phonePrimary}<br />
                      Office Desk: {phoneSecondary}
                    </p>
                  </div>
                </div>

                <div className="why-card" style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem', textAlign: 'left', padding: '1.5rem', minWidth: 0, maxWidth: '100%', boxSizing: 'border-box' }}>
                  <div className="why-icon-box" style={{ margin: 0, flexShrink: 0 }}><Mail size={24} /></div>
                  <div style={{ minWidth: 0, overflowWrap: 'anywhere', wordBreak: 'break-word' }}>
                    <h4 style={{ fontSize: '1.1rem', color: 'var(--primary-navy)', marginBottom: '0.2rem' }}>Email Support</h4>
                    <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', overflowWrap: 'anywhere', wordBreak: 'break-word' }}>
                      General Inquiries: {emailGeneral}<br />
                      Admissions Desk: {emailAdmissions}
                    </p>
                  </div>
                </div>

                <div className="why-card" style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem', textAlign: 'left', padding: '1.5rem', minWidth: 0, maxWidth: '100%', boxSizing: 'border-box' }}>
                  <div className="why-icon-box" style={{ margin: 0, flexShrink: 0 }}><Clock size={24} /></div>
                  <div style={{ minWidth: 0, overflowWrap: 'anywhere', wordBreak: 'break-word' }}>
                    <h4 style={{ fontSize: '1.1rem', color: 'var(--primary-navy)', marginBottom: '0.2rem' }}>School Office Timings</h4>
                    <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', overflowWrap: 'anywhere', wordBreak: 'break-word' }}>{timingOffice}</p>
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

      {/* Google Maps / Visit Our School Section */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-soft)' }}>
        <div className="container">
          <SectionTitle 
            badge="Visit Our School"
            title="Locate MPSA Campus on Google Maps"
            subtitle="Find campus directions and visit options."
          />

          <div className="maps-container-box">
            {mapEmbedUrl ? (
              <div style={{ width: '100%', height: '420px' }}>
                <iframe 
                  src={mapEmbedUrl}
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
                  MAHARANA PRATAP SCIENCE ACADEMY
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '650px', margin: '0 auto 1.5rem auto' }}>
                  {schoolAddress}
                </p>

                <a 
                  href={mapDirectionUrl} 
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
