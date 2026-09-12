import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Compass, GraduationCap } from 'lucide-react';
import { SCHOOL_CONFIG } from '../data/config';
import { apiService } from '../services/api';
import { getUploadUrl } from '../config/api';

export default function Hero() {
  const [contactSettings, setContactSettings] = useState(SCHOOL_CONFIG);

  useEffect(() => {
    async function loadHeroContact() {
      const data = await apiService.getContactSettings();
      if (data) setContactSettings(data);
    }
    loadHeroContact();
  }, []);

  const schoolFullName = contactSettings.schoolFullName || SCHOOL_CONFIG.fullName;
  const heroBannerUrl = contactSettings?.heroBannerImage ? getUploadUrl(contactSettings.heroBannerImage) : '';

  const heroStyle = heroBannerUrl ? {
    backgroundImage: `linear-gradient(135deg, rgba(18, 59, 99, 0.85), rgba(10, 34, 59, 0.90)), url(${heroBannerUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  } : undefined;

  return (
    <section className="hero-section" style={heroStyle}>
      <div className="container">
        <div className="hero-content">
          <div className="hero-welcome-badge">
            {contactSettings.logoUrl ? (
              <img src={contactSettings.logoUrl} alt="School Logo" style={{ width: '22px', height: '22px', objectFit: 'contain', borderRadius: '50%' }} />
            ) : (
              <GraduationCap size={18} />
            )}
            <span>Welcome to {schoolFullName}</span>
          </div>
          
          <h1 className="hero-title">
            Learning Today, <span>Leading Tomorrow</span>
          </h1>

          <p className="hero-subtitle">
            Providing quality education, strong moral values, scientific inquiry, and a nurturing environment for every child to excel.
          </p>

          <div className="hero-buttons">
            <Link to="/admissions" className="btn btn-primary btn-lg">
              Apply for Admission <ChevronRight size={18} />
            </Link>
            <Link to="/about" className="btn btn-outline-gold btn-lg">
              Explore Our School <Compass size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
