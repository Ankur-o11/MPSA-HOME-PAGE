import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Image as ImageIcon, 
  Bell, 
  Calendar, 
  Trophy, 
  UserCheck, 
  Award, 
  Building, 
  BookOpen, 
  FileText, 
  Phone, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AdminDashboard() {
  const { authFetch, adminUser } = useAuth();
  const [stats, setStats] = useState({
    totalTeachers: 8,
    totalGallery: 12,
    publishedNotices: 6,
    upcomingEvents: 3,
    totalAchievements: 6
  });

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await authFetch('http://localhost:5000/api/admin/stats');
        if (res.ok) {
          const data = await res.json();
          if (data.stats) setStats(data.stats);
        }
      } catch (err) {
        // Fallback default stats if API loading
      }
    }
    loadStats();
  }, [authFetch]);

  return (
    <div className="admin-dashboard">
      {/* Welcome Banner */}
      <div 
        style={{ 
          background: 'linear-gradient(135deg, var(--primary-navy), var(--secondary-blue))', 
          color: 'var(--bg-white)', 
          padding: '2rem 2.5rem', 
          borderRadius: 'var(--radius-lg)', 
          marginBottom: '2.5rem',
          boxShadow: 'var(--shadow-md)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ position: 'relative', zIndex: 2 }}>
          <span className="section-badge" style={{ backgroundColor: 'rgba(212,167,44,0.2)', color: 'var(--accent-gold)' }}>
            <ShieldCheck size={14} style={{ display: 'inline', marginRight: '0.3rem' }} /> Authorized Administrator
          </span>
          <h2 style={{ fontSize: '2rem', color: 'var(--bg-white)', margin: '0.5rem 0' }}>
            Welcome back, {adminUser?.name || 'Administrator'}
          </h2>
          <p style={{ color: '#E2E8F0', fontSize: '1.05rem', maxWidth: '650px' }}>
            Manage public website content, updates, teacher directory, notices, events, and campus media for Maharana Pratap Science Academy.
          </p>
        </div>
      </div>

      {/* Overview Cards (REQUIREMENT #5) */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon"><Users size={28} /></div>
          <div className="stat-info">
            <h4>Total Teachers</h4>
            <div className="stat-number">{stats.totalTeachers}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon"><ImageIcon size={28} /></div>
          <div className="stat-info">
            <h4>Gallery Images</h4>
            <div className="stat-number">{stats.totalGallery}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon"><Bell size={28} /></div>
          <div className="stat-info">
            <h4>Published Notices</h4>
            <div className="stat-number">{stats.publishedNotices}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon"><Calendar size={28} /></div>
          <div className="stat-info">
            <h4>Upcoming Events</h4>
            <div className="stat-number">{stats.upcomingEvents}</div>
          </div>
        </div>
      </div>

      {/* Quick Content Management Grid */}
      <div className="admin-card-box">
        <h3 style={{ fontSize: '1.3rem', color: 'var(--primary-navy)', marginBottom: '1.25rem' }}>
          Quick Content Management
        </h3>

        <div className="why-mpsa-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          <div className="why-card" style={{ textAlign: 'left' }}>
            <Users size={28} color="#123B63" style={{ marginBottom: '0.75rem' }} />
            <h4>Faculty & Teachers</h4>
            <p style={{ marginBottom: '1rem' }}>Add new teachers, update qualifications, subjects, and photos.</p>
            <Link to="/admin/teachers" className="btn btn-outline btn-sm">
              Manage Teachers <ChevronRight size={14} />
            </Link>
          </div>

          <div className="why-card" style={{ textAlign: 'left' }}>
            <Bell size={28} color="#123B63" style={{ marginBottom: '0.75rem' }} />
            <h4>Notices & Circulars</h4>
            <p style={{ marginBottom: '1rem' }}>Publish or unpublish official notices, exam schedules, and holidays.</p>
            <Link to="/admin/notices" className="btn btn-outline btn-sm">
              Manage Notices <ChevronRight size={14} />
            </Link>
          </div>

          <div className="why-card" style={{ textAlign: 'left' }}>
            <ImageIcon size={28} color="#123B63" style={{ marginBottom: '0.75rem' }} />
            <h4>Photo Gallery</h4>
            <p style={{ marginBottom: '1rem' }}>Upload high-res campus photos, assign categories, and edit captions.</p>
            <Link to="/admin/gallery" className="btn btn-outline btn-sm">
              Manage Gallery <ChevronRight size={14} />
            </Link>
          </div>

          <div className="why-card" style={{ textAlign: 'left' }}>
            <Award size={28} color="#123B63" style={{ marginBottom: '0.75rem' }} />
            <h4>Founder Section</h4>
            <p style={{ marginBottom: '1rem' }}>Update founder story, vision quotes, timeline items, and photos.</p>
            <Link to="/admin/founder" className="btn btn-outline btn-sm">
              Manage Founder <ChevronRight size={14} />
            </Link>
          </div>

          <div className="why-card" style={{ textAlign: 'left' }}>
            <UserCheck size={28} color="#123B63" style={{ marginBottom: '0.75rem' }} />
            <h4>Principal's Message</h4>
            <p style={{ marginBottom: '1rem' }}>Update principal welcome message, credentials, and vision text.</p>
            <Link to="/admin/principal" className="btn btn-outline btn-sm">
              Manage Principal <ChevronRight size={14} />
            </Link>
          </div>

          <div className="why-card" style={{ textAlign: 'left' }}>
            <Calendar size={28} color="#123B63" style={{ marginBottom: '0.75rem' }} />
            <h4>School Events</h4>
            <p style={{ marginBottom: '1rem' }}>Add upcoming science expos, sports meets, and previous event recaps.</p>
            <Link to="/admin/events" className="btn btn-outline btn-sm">
              Manage Events <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
