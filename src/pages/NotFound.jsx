import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Home } from 'lucide-react';
import { SCHOOL_CONFIG } from '../data/config';

export default function NotFound() {
  return (
    <div className="not-found-page section-padding" style={{ textAlign: 'center', minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ maxWidth: '600px' }}>
        <div 
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: 'var(--accent-gold-light)',
            color: '#8c6a12',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem auto'
          }}
        >
          <GraduationCap size={44} />
        </div>

        <h1 style={{ fontSize: '5rem', color: 'var(--primary-navy)', lineHeight: 1, marginBottom: '1rem' }}>
          404
        </h1>

        <h2 style={{ fontSize: '1.75rem', color: 'var(--primary-navy)', marginBottom: '1rem' }}>
          Page Not Found
        </h2>

        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginBottom: '2rem' }}>
          The web page you are looking for does not exist or may have been moved. Return to the {SCHOOL_CONFIG.shortName} home page to continue browsing.
        </p>

        <Link to="/" className="btn btn-primary btn-lg">
          <Home size={18} /> Return to Home Page
        </Link>
      </div>
    </div>
  );
}
