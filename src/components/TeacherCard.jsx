import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, UserCheck, Briefcase, ChevronRight } from 'lucide-react';

export default function TeacherCard({ teacher }) {
  return (
    <div className="teacher-card">
      <div className="teacher-img-wrapper">
        <img 
          src={teacher.photo} 
          alt={teacher.name} 
          className="teacher-img"
          loading="lazy"
        />
      </div>

      <div className="teacher-card-body">
        <h3 className="teacher-name">{teacher.name}</h3>
        <p className="teacher-designation">{teacher.designation}</p>

        {/* Qualification Text Display (MANDATORY REQUIREMENT #14) */}
        <div className="qualifications-list">
          {Array.isArray(teacher.qualifications) ? (
            teacher.qualifications.map((degree, idx) => (
              <span key={idx} className="degree-tag">
                {degree}
              </span>
            ))
          ) : (
            <span className="degree-tag">{teacher.qualifications}</span>
          )}
        </div>

        <div className="teacher-details-meta">
          <div className="meta-row">
            <BookOpen size={14} />
            <span><strong>Subject:</strong> {teacher.subject}</span>
          </div>
          <div className="meta-row">
            <UserCheck size={14} />
            <span><strong>Classes:</strong> {teacher.classes}</span>
          </div>
          <div className="meta-row">
            <Briefcase size={14} />
            <span><strong>Experience:</strong> {teacher.experience}</span>
          </div>
        </div>

        <p className="bio-short" style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: '1.5' }}>
          {teacher.bioShort}
        </p>

        <div className="teacher-card-footer">
          <Link to={`/faculty/${teacher.id}`} className="btn btn-outline btn-sm" style={{ width: '100%' }}>
            View Profile <ChevronRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
