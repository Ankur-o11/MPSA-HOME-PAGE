import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Compass, GraduationCap } from 'lucide-react';
import { SCHOOL_CONFIG } from '../data/config';

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-content">
          <div className="hero-welcome-badge">
            <GraduationCap size={18} />
            <span>Welcome to {SCHOOL_CONFIG.fullName}</span>
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
