import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, LogOut, ExternalLink, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AdminHeader({ onToggleMobile }) {
  const { adminUser, logout } = useAuth();

  return (
    <header className="admin-top-header">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button 
          className="hamburger-btn" 
          onClick={onToggleMobile} 
          style={{ display: 'flex', alignItems: 'center' }}
          aria-label="Toggle Navigation Sidebar"
        >
          <Menu size={22} />
        </button>
        <span style={{ fontWeight: '700', color: 'var(--primary-navy)', fontSize: '1.05rem' }}>
          MPSA School Control Panel
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        <Link 
          to="/" 
          target="_blank" 
          className="btn btn-outline btn-sm"
          style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem' }}
        >
          <ExternalLink size={14} /> View Public Site
        </Link>

        {adminUser && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--primary-navy)', color: 'var(--accent-gold)', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {adminUser.name ? adminUser.name.charAt(0) : 'A'}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontWeight: '700', fontSize: '0.88rem', color: 'var(--primary-navy)', lineHeight: 1.2 }}>
                {adminUser.name || 'Administrator'}
              </span>
              <span className="degree-tag" style={{ fontSize: '0.7rem', padding: '0.1rem 0.4rem', alignSelf: 'flex-start', marginTop: '0.15rem' }}>
                <ShieldCheck size={10} style={{ display: 'inline', marginRight: '0.2rem' }} />
                {adminUser.role || 'super_admin'}
              </span>
            </div>
          </div>
        )}

        <button 
          onClick={logout} 
          className="btn-icon danger" 
          title="Logout of Admin Panel"
        >
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
}
