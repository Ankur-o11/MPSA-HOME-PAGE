import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  GraduationCap, 
  Phone, 
  Mail, 
  Menu, 
  X, 
  ChevronRight,
  Globe
} from 'lucide-react';
import { SCHOOL_CONFIG } from '../data/config';
import { apiService } from '../services/api';

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [contactSettings, setContactSettings] = useState(SCHOOL_CONFIG);

  useEffect(() => {
    async function loadNavContact() {
      const data = await apiService.getContactSettings();
      if (data) setContactSettings(data);
    }
    loadNavContact();
  }, []);

  const phonePrimary = contactSettings.phonePrimary || SCHOOL_CONFIG.phonePrimary;
  const emailGeneral = contactSettings.emailGeneral || SCHOOL_CONFIG.emailGeneral;
  const socialLinks = contactSettings.socialLinks || SCHOOL_CONFIG.socialLinks;

  const toggleMobileMenu = () => {
    setIsMobileOpen(prev => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileOpen(false);
  };

  return (
    <header className="header-wrapper">
      {/* Top Utility Bar */}
      <div className="header-top-bar">
        <div className="container top-bar-content">
          <div className="top-bar-info">
            <a href={`tel:${phonePrimary}`} className="top-bar-item">
              <Phone size={14} />
              <span>{phonePrimary}</span>
            </a>
            <a href={`mailto:${emailGeneral}`} className="top-bar-item">
              <Mail size={14} />
              <span>{emailGeneral}</span>
            </a>
          </div>
          <div className="top-bar-social">
            <a href={socialLinks?.facebook || SCHOOL_CONFIG.socialLinks.facebook} target="_blank" rel="noreferrer" title="Facebook">
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
            </a>
            <a href={socialLinks?.instagram || SCHOOL_CONFIG.socialLinks.instagram} target="_blank" rel="noreferrer" title="Instagram">
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href={socialLinks?.youtube || SCHOOL_CONFIG.socialLinks.youtube} target="_blank" rel="noreferrer" title="YouTube">
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <nav className="navbar">
        <div className="container navbar-container">
          {/* Logo & Brand Name */}
          <Link to="/" className="navbar-brand" onClick={closeMobileMenu}>
            <div className="brand-logo-icon">
              <GraduationCap size={26} />
            </div>
            <div className="brand-text">
              <span className="brand-full-name">{SCHOOL_CONFIG.fullName}</span>
              <span className="brand-sub-name">{SCHOOL_CONFIG.shortName}</span>
            </div>
          </Link>

          {/* Navigation Links */}
          <ul className={`navbar-menu ${isMobileOpen ? 'mobile-open' : ''}`}>
            <li>
              <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMobileMenu}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMobileMenu}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/founder" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMobileMenu}>
                Founder
              </NavLink>
            </li>
            <li>
              <NavLink to="/academics" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMobileMenu}>
                Academics
              </NavLink>
            </li>
            <li>
              <NavLink to="/faculty" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMobileMenu}>
                Faculty
              </NavLink>
            </li>
            <li>
              <NavLink to="/admissions" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMobileMenu}>
                Admissions
              </NavLink>
            </li>
            <li>
              <NavLink to="/gallery" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMobileMenu}>
                Gallery
              </NavLink>
            </li>
            <li>
              <NavLink to="/notices" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMobileMenu}>
                Notices
              </NavLink>
            </li>
            <li>
              <NavLink to="/events" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMobileMenu}>
                Events
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMobileMenu}>
                Contact
              </NavLink>
            </li>
            {isMobileOpen && (
              <li style={{ width: '100%', marginTop: '1rem' }}>
                <Link to="/admissions" className="btn btn-primary" style={{ width: '100%' }} onClick={closeMobileMenu}>
                  Apply for Admission <ChevronRight size={16} />
                </Link>
              </li>
            )}
          </ul>

          {/* Right Action Button & Mobile Hamburger */}
          <div className="navbar-actions">
            <Link to="/admissions" className="btn btn-primary btn-sm desktop-only">
              Apply for Admission
            </Link>
            <button 
              className="hamburger-btn" 
              onClick={toggleMobileMenu}
              aria-label="Toggle navigation menu"
            >
              {isMobileOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
