import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  UserCheck, 
  Award, 
  Image as ImageIcon, 
  Bell, 
  Calendar, 
  Trophy, 
  Building, 
  BookOpen, 
  FileText, 
  Phone, 
  Settings, 
  LogOut,
  GraduationCap
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { apiService } from '../../services/api';

export default function AdminSidebar({ mobileOpen, onCloseMobile }) {
  const { logout } = useAuth();
  const [logoUrl, setLogoUrl] = React.useState('');

  React.useEffect(() => {
    async function loadSidebarLogo() {
      try {
        const data = await apiService.getContactSettings();
        if (data?.logoUrl) setLogoUrl(data.logoUrl);
      } catch (err) {}
    }
    loadSidebarLogo();
  }, []);

  return (
    <aside className={`admin-sidebar ${mobileOpen ? 'mobile-open' : ''}`}>
      <div className="admin-sidebar-header">
        <div className="admin-brand-icon">
          {logoUrl ? (
            <img src={logoUrl} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '50%' }} />
          ) : (
            <GraduationCap size={22} />
          )}
        </div>
        <div className="admin-brand-title">
          MPSA School
          <span>Admin Portal</span>
        </div>
      </div>

      <ul className="admin-nav-list">
        <li>
          <NavLink to="/admin/dashboard" className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`} onClick={onCloseMobile}>
            <LayoutDashboard size={18} /> Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/teachers" className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`} onClick={onCloseMobile}>
            <Users size={18} /> Teachers
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/principal" className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`} onClick={onCloseMobile}>
            <UserCheck size={18} /> Principal
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/founder" className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`} onClick={onCloseMobile}>
            <Award size={18} /> Founder
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/gallery" className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`} onClick={onCloseMobile}>
            <ImageIcon size={18} /> Gallery
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/notices" className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`} onClick={onCloseMobile}>
            <Bell size={18} /> Notices
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/events" className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`} onClick={onCloseMobile}>
            <Calendar size={18} /> Events
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/achievements" className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`} onClick={onCloseMobile}>
            <Trophy size={18} /> Achievements
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/facilities" className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`} onClick={onCloseMobile}>
            <Building size={18} /> Facilities
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/academics" className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`} onClick={onCloseMobile}>
            <BookOpen size={18} /> Academics
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/admissions" className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`} onClick={onCloseMobile}>
            <FileText size={18} /> Admissions
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/contact" className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`} onClick={onCloseMobile}>
            <Phone size={18} /> Contact Info
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/settings" className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`} onClick={onCloseMobile}>
            <Settings size={18} /> Site Settings
          </NavLink>
        </li>
        <li style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <button className="admin-nav-link" style={{ width: '100%', background: 'none', border: 'none', textAlign: 'left' }} onClick={logout}>
            <LogOut size={18} color="#F87171" /> Logout
          </button>
        </li>
      </ul>
    </aside>
  );
}
