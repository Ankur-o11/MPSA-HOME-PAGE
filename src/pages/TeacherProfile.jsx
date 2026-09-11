import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  BookOpen, 
  UserCheck, 
  Briefcase, 
  Mail, 
  Clock, 
  GraduationCap,
  Award
} from 'lucide-react';
import { teachersData } from '../data/teachers';

export default function TeacherProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const teacher = teachersData.find(t => t.id === id);

  if (!teacher) {
    return (
      <div className="container section-padding" style={{ textAlign: 'center' }}>
        <h2>Teacher Profile Not Found</h2>
        <p style={{ color: 'var(--text-muted)', margin: '1rem 0 2rem 0' }}>
          The faculty profile you are searching for does not exist or has been updated.
        </p>
        <Link to="/faculty" className="btn btn-primary">
          Back to Faculty Directory
        </Link>
      </div>
    );
  }

  return (
    <div className="teacher-profile-page">
      {/* Banner */}
      <div className="page-banner">
        <div className="container">
          <h1 className="page-banner-title">{teacher.name}</h1>
          <p className="page-banner-subtitle">{teacher.designation}</p>
          <ul className="breadcrumb-list">
            <li><Link to="/">Home</Link></li>
            <li>/</li>
            <li><Link to="/faculty">Faculty</Link></li>
            <li>/</li>
            <li>{teacher.name}</li>
          </ul>
        </div>
      </div>

      <section className="section-padding">
        <div className="container">
          <button 
            onClick={() => navigate('/faculty')} 
            className="btn btn-outline btn-sm" 
            style={{ marginBottom: '2rem' }}
          >
            <ArrowLeft size={16} /> Back to All Faculty Members
          </button>

          <div className="teacher-detail-card">
            <div className="teacher-detail-grid">
              {/* Photo */}
              <div>
                <img 
                  src={teacher.photo} 
                  alt={teacher.name} 
                  className="teacher-detail-photo"
                />
              </div>

              {/* Detail Content */}
              <div className="teacher-detail-content">
                <span className="category-tag" style={{ marginBottom: '0.75rem' }}>
                  {teacher.subject} Department
                </span>

                <h2 style={{ fontSize: '2.2rem', color: 'var(--primary-navy)', marginBottom: '0.25rem' }}>
                  {teacher.name}
                </h2>
                <p style={{ color: 'var(--secondary-blue)', fontWeight: '600', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
                  {teacher.designation}
                </p>

                {/* Qualifications displayed clearly as TEXT tags */}
                <div style={{ marginBottom: '1.75rem' }}>
                  <h4 style={{ fontSize: '0.95rem', color: 'var(--primary-navy)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <GraduationCap size={18} color="#D4A72C" /> Academic Qualifications & Degrees:
                  </h4>
                  <div className="qualifications-list">
                    {Array.isArray(teacher.qualifications) ? (
                      teacher.qualifications.map((degree, idx) => (
                        <span key={idx} className="degree-tag" style={{ fontSize: '0.88rem', padding: '0.35rem 0.85rem' }}>
                          {degree}
                        </span>
                      ))
                    ) : (
                      <span className="degree-tag" style={{ fontSize: '0.88rem', padding: '0.35rem 0.85rem' }}>
                        {teacher.qualifications}
                      </span>
                    )}
                  </div>
                </div>

                {/* Key Attributes */}
                <div className="teacher-details-meta" style={{ fontSize: '1rem', gap: '0.75rem', marginBottom: '2rem' }}>
                  <div className="meta-row">
                    <BookOpen size={18} color="#1F5F95" />
                    <span><strong>Subject Taught:</strong> {teacher.subject}</span>
                  </div>
                  <div className="meta-row">
                    <UserCheck size={18} color="#1F5F95" />
                    <span><strong>Classes Taught:</strong> {teacher.classes}</span>
                  </div>
                  <div className="meta-row">
                    <Briefcase size={18} color="#1F5F95" />
                    <span><strong>Teaching Experience:</strong> {teacher.experience}</span>
                  </div>
                  <div className="meta-row">
                    <Mail size={18} color="#1F5F95" />
                    <span><strong>Official Email:</strong> {teacher.email}</span>
                  </div>
                  <div className="meta-row">
                    <Clock size={18} color="#1F5F95" />
                    <span><strong>Office / Parent Interaction Hours:</strong> {teacher.officeHours}</span>
                  </div>
                </div>

                {/* Biography */}
                <h4 style={{ fontSize: '1.25rem', color: 'var(--primary-navy)', marginBottom: '0.75rem' }}>
                  About & Educational Philosophy
                </h4>
                <p style={{ color: 'var(--text-main)', lineHeight: '1.8', fontSize: '1.02rem' }}>
                  {teacher.bioFull}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
