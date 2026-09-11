import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, RefreshCw, UserCheck } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import TeacherCard from '../components/TeacherCard';
import { teachersData as defaultTeachers } from '../data/teachers';
import { apiService } from '../services/api';

export default function Faculty() {
  const [teachers, setTeachers] = useState(defaultTeachers);
  const [searchTerm, setSearchTerm] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('All');
  const [classFilter, setClassFilter] = useState('All');

  useEffect(() => {
    async function loadData() {
      const data = await apiService.getTeachers();
      if (data && data.length > 0) setTeachers(data);
    }
    loadData();
  }, []);

  // Extract unique subjects
  const subjects = useMemo(() => {
    const set = new Set(teachers.map(t => t.subject));
    return ['All', ...Array.from(set)];
  }, [teachers]);

  // Filtered teachers list
  const filteredTeachers = useMemo(() => {
    return teachers.filter(teacher => {
      const matchesSearch = 
        teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (teacher.classes && teacher.classes.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (teacher.designation && teacher.designation.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesSubject = subjectFilter === 'All' || teacher.subject === subjectFilter;
      
      const classGroupStr = teacher.classGroup || '';
      const matchesClass = classFilter === 'All' || 
        (classFilter === 'Primary' && classGroupStr.includes('Primary')) ||
        (classFilter === 'Middle' && classGroupStr.includes('Middle')) ||
        (classFilter === 'Secondary' && classGroupStr.includes('Secondary')) ||
        (classFilter === 'Sr. Secondary' && classGroupStr.includes('Sr. Secondary'));

      return matchesSearch && matchesSubject && matchesClass;
    });
  }, [teachers, searchTerm, subjectFilter, classFilter]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSubjectFilter('All');
    setClassFilter('All');
  };

  return (
    <div className="faculty-page">
      {/* Banner */}
      <div className="page-banner">
        <div className="container">
          <h1 className="page-banner-title">Faculty & Teachers Directory</h1>
          <p className="page-banner-subtitle">
            Meet our highly qualified, experienced, and passionate educators at Maharana Pratap Science Academy.
          </p>
          <ul className="breadcrumb-list">
            <li><Link to="/">Home</Link></li>
            <li>/</li>
            <li>Faculty Directory</li>
          </ul>
        </div>
      </div>

      <section className="section-padding">
        <div className="container">
          {/* Search & Filter Controls Bar */}
          <div className="faculty-filter-bar">
            <div className="filter-controls-grid">
              {/* Search Teacher Input */}
              <div className="search-input-wrapper">
                <Search size={18} />
                <input 
                  type="text" 
                  className="form-control"
                  placeholder="Search by teacher name, subject, or class..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Subject Filter */}
              <div>
                <select 
                  className="form-control"
                  value={subjectFilter}
                  onChange={(e) => setSubjectFilter(e.target.value)}
                >
                  <option value="All">All Subjects</option>
                  {subjects.filter(s => s !== 'All').map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              {/* Class Filter */}
              <div>
                <select 
                  className="form-control"
                  value={classFilter}
                  onChange={(e) => setClassFilter(e.target.value)}
                >
                  <option value="All">All Class Levels</option>
                  <option value="Primary">Primary (1st – 5th)</option>
                  <option value="Middle">Middle (6th – 8th)</option>
                  <option value="Secondary">Secondary (9th – 10th)</option>
                  <option value="Sr. Secondary">Sr. Secondary (11th – 12th)</option>
                </select>
              </div>
            </div>

            {(searchTerm || subjectFilter !== 'All' || classFilter !== 'All') && (
              <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                  Showing <strong>{filteredTeachers.length}</strong> of {teachers.length} faculty members
                </span>
                <button className="btn btn-outline-gold btn-sm" onClick={handleResetFilters}>
                  <RefreshCw size={14} /> Reset Search & Filters
                </button>
              </div>
            )}
          </div>

          {/* Faculty Cards Grid */}
          {filteredTeachers.length > 0 ? (
            <div className="faculty-grid">
              {filteredTeachers.map(teacher => (
                <TeacherCard key={teacher._id || teacher.id} teacher={teacher} />
              ))}
            </div>
          ) : (
            <div className="no-results-box">
              <UserCheck size={48} color="#64748B" style={{ margin: '0 auto 1rem auto' }} />
              <h3 style={{ fontSize: '1.3rem', color: 'var(--primary-navy)', marginBottom: '0.5rem' }}>
                No Faculty Members Found
              </h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                No teacher matched your current search query or filter selection.
              </p>
              <button className="btn btn-primary" onClick={handleResetFilters}>
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
