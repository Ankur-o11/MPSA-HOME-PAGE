import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  MapPin, 
  Phone, 
  Mail, 
  ChevronRight 
} from 'lucide-react';
import { SCHOOL_CONFIG } from '../data/config';
import { apiService } from '../services/api';

export default function Footer() {
  const [contactSettings, setContactSettings] = useState(SCHOOL_CONFIG);

  useEffect(() => {
    async function loadFooterContact() {
      const data = await apiService.getContactSettings();
      if (data) setContactSettings(data);
    }
    loadFooterContact();
  }, []);

  const address = contactSettings.address || SCHOOL_CONFIG.address;
  const phonePrimary = contactSettings.phonePrimary || SCHOOL_CONFIG.phonePrimary;
  const phoneSecondary = contactSettings.phoneSecondary || SCHOOL_CONFIG.phoneSecondary;
  const emailGeneral = contactSettings.emailGeneral || SCHOOL_CONFIG.emailGeneral;
  const socialLinks = contactSettings.socialLinks || SCHOOL_CONFIG.socialLinks;

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Column 1: School Identity */}
          <div className="footer-col">
            <div className="footer-brand-logo">
              <GraduationCap size={32} color="#D4A72C" />
              <h3 className="footer-brand-title">
                MAHARANA PRATAP<br />
                <span>SCIENCE ACADEMY</span>
              </h3>
            </div>
            <p className="footer-desc">
              Dedicated to empowering young minds through scientific inquiry, academic excellence, strong ethical values, and holistic personality development.
            </p>
            <div className="footer-social-links">
              <a href={socialLinks?.facebook || SCHOOL_CONFIG.socialLinks.facebook} target="_blank" rel="noreferrer" className="footer-social-btn" title="Facebook">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
              </a>
              <a href={socialLinks?.instagram || SCHOOL_CONFIG.socialLinks.instagram} target="_blank" rel="noreferrer" className="footer-social-btn" title="Instagram">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href={socialLinks?.youtube || SCHOOL_CONFIG.socialLinks.youtube} target="_blank" rel="noreferrer" className="footer-social-btn" title="YouTube">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col">
            <h4 className="footer-column-title">Quick Links</h4>
            <ul className="footer-links-list">
              <li className="footer-link-item"><Link to="/"><ChevronRight size={14} /> Home</Link></li>
              <li className="footer-link-item"><Link to="/about"><ChevronRight size={14} /> About Us</Link></li>
              <li className="footer-link-item"><Link to="/founder"><ChevronRight size={14} /> Founder & Inspiration</Link></li>
              <li className="footer-link-item"><Link to="/principal-message"><ChevronRight size={14} /> Principal's Message</Link></li>
              <li className="footer-link-item"><Link to="/academics"><ChevronRight size={14} /> Academics</Link></li>
              <li className="footer-link-item"><Link to="/faculty"><ChevronRight size={14} /> Faculty Directory</Link></li>
            </ul>
          </div>

          {/* Column 3: Explore & Information */}
          <div className="footer-col">
            <h4 className="footer-column-title">Information</h4>
            <ul className="footer-links-list">
              <li className="footer-link-item"><Link to="/admissions"><ChevronRight size={14} /> Admissions 2026-27</Link></li>
              <li className="footer-link-item"><Link to="/facilities"><ChevronRight size={14} /> Campus Facilities</Link></li>
              <li className="footer-link-item"><Link to="/achievements"><ChevronRight size={14} /> Achievements</Link></li>
              <li className="footer-link-item"><Link to="/gallery"><ChevronRight size={14} /> Photo Gallery</Link></li>
              <li className="footer-link-item"><Link to="/notices"><ChevronRight size={14} /> Latest Notices</Link></li>
              <li className="footer-link-item"><Link to="/events"><ChevronRight size={14} /> Events & Activities</Link></li>
              <li className="footer-link-item"><Link to="/contact"><ChevronRight size={14} /> Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div className="footer-col">
            <h4 className="footer-column-title">Contact School</h4>
            <div className="footer-contact-list">
              <div className="footer-contact-item">
                <MapPin size={18} />
                <span>{address}</span>
              </div>
              <div className="footer-contact-item">
                <Phone size={18} />
                <span>{phonePrimary}{phoneSecondary ? ` / ${phoneSecondary}` : ''}</span>
              </div>
              <div className="footer-contact-item">
                <Mail size={18} />
                <span>{emailGeneral}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="footer-bottom-bar">
        <div className="container footer-bottom-content">
          <p>© 2026 Maharana Pratap Science Academy. All Rights Reserved.</p>
          <p>MPSA Public Website | Designed for Excellence</p>
        </div>
      </div>
    </footer>
  );
}
