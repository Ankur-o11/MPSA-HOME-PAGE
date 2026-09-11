import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { GraduationCap, Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL, getUploadUrl } from '../../config/api';


export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [logoUrl, setLogoUrl] = useState('');

  const { login, loading, error, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/admin/dashboard';

  // Fetch site logo for branding
  useEffect(() => {
    async function fetchLogo() {
      try {
        const res = await fetch(`${API_BASE_URL}/public/contact-settings`);
        if (res.ok) {
          const data = await res.json();
          if (data?.logoUrl) setLogoUrl(data.logoUrl);
        }
      } catch (err) {}
    }
    fetchLogo();
  }, []);

  // If already authenticated, redirect to dashboard
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result.success) {
      navigate('/admin/dashboard', { replace: true });
    }
  };

  return (
    <div 
      style={{ 
        minHeight: '100vh', 
        backgroundColor: 'var(--primary-navy)', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '1.5rem',
        backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(31, 95, 149, 0.4) 0%, rgba(10, 34, 59, 0.95) 100%)'
      }}
    >
      <div 
        style={{ 
          width: '100%', 
          maxWidth: '440px', 
          backgroundColor: 'var(--bg-white)', 
          borderRadius: 'var(--radius-lg)', 
          padding: '2.5rem',
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
          border: '1px solid rgba(212, 167, 44, 0.3)'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div 
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'var(--primary-navy)',
              color: 'var(--accent-gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem auto',
              border: '2px solid var(--accent-gold)'
            }}
          >
            {logoUrl ? (
              <img src={logoUrl} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '50%' }} />
            ) : (
              <GraduationCap size={36} />
            )}
          </div>

          <h2 style={{ fontSize: '1.5rem', color: 'var(--primary-navy)', fontWeight: '800' }}>
            MPSA SCHOOL ADMIN
          </h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            Authorized Administrative Portal
          </p>
        </div>

        {error && (
          <div className="alert-success-custom" style={{ backgroundColor: '#FDE8E8', borderColor: '#E53E3E', color: '#9B1C1C', marginBottom: '1.5rem', padding: '0.85rem' }}>
            <Lock size={18} />
            <span style={{ fontSize: '0.88rem' }}>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Mail size={14} color="#123B63" /> Admin Email / Username
            </label>
            <input 
              type="email" 
              className="form-control"
              placeholder="admin@mpsaschool.edu.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Lock size={14} color="#123B63" /> Password
            </label>
            <div style={{ position: 'relative' }}>
              <input 
                type={showPassword ? 'text' : 'password'} 
                className="form-control"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ paddingRight: '2.5rem' }}
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                style={{ 
                  position: 'absolute', 
                  right: '0.75rem', 
                  top: '50%', 
                  transform: 'translateY(-50%)', 
                  color: 'var(--text-muted)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary btn-lg" 
            style={{ width: '100%', marginTop: '1.5rem' }}
            disabled={loading}
          >
            {loading ? 'Authenticating...' : 'Sign In To Dashboard'}
          </button>
        </form>

        <div style={{ marginTop: '2rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-color)', textAlign: 'center' }}>
          <Link to="/" style={{ fontSize: '0.88rem', color: 'var(--secondary-blue)', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontWeight: '600' }}>
            <ArrowLeft size={16} /> Return to Public School Website
          </Link>
        </div>
      </div>
    </div>
  );
}
