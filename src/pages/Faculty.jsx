import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, RefreshCw, UserCheck, Loader2 } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import SEO from '../components/SEO';
import TeacherCard from '../components/TeacherCard';
import { apiService } from '../services/api';
import { NEUTRAL_AVATAR_SVG } from '../utils/imageUtils';

export default function Faculty() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('All');
  const [classFilter, setClassFilter] = useState('All');

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const data = await apiService.getTeachers();
        if (data && Array.isArray(data)) {
          setTeachers(data);
        }
      } catch (err) {
        console.error('Failed to load faculty:', err);
      } finally {
        setLoading(false);
      }
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

  const facultySchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Faculty Directory - Maharana Pratap Science Academy Inter College",
    "description": "Meet the dedicated educators and teaching staff at Maharana Pratap Science Academy Inter College (MPSA School), Jalaun, Uttar Pradesh."
  };

  return (
    <div className="faculty-page">
      <SEO 
        title="Faculty & Teaching Staff | MPSA Inter College, Jalaun"
        description="Meet the dedicated educators and teaching staff at Maharana Pratap Science Academy Inter College (MPSA School), Jalaun, Uttar Pradesh."
        keywords="Faculty MPSA Inter College Jalaun, Teachers Maharana Pratap Science Academy, Educators Jalaun, Science Teachers Jalaun, MPSA School"
        canonicalUrl="/faculty"
        schema={facultySchema}
      />
      {/* Banner */}
      <div className="page-banner">
        <div className="container">
          <h1 className="page-banner-title">Faculty & Teachers Directory</h1>
          <p className="page-banner-subtitle">
            Meet our highly qualified, experienced, and passionate educators at Maharana Pratap Science Academy in Jalaun, Uttar Pradesh.
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
          {loading ? (
            <div className="faculty-grid">
              {[1, 2, 3, 4].map(idx => (
                <div key={idx} className="teacher-card" style={{ opacity: 0.75 }}>
                  <div className="teacher-img-wrapper">
                    <img src={NEUTRAL_AVATAR_SVG} alt="Loading..." className="teacher-img" />
                  </div>
                  <div className="teacher-card-body" style={{ textAlign: 'center', padding: '1.5rem 1rem' }}>
                    <div style={{ height: '18px', backgroundColor: 'var(--bg-soft)', borderRadius: '4px', marginBottom: '0.75rem' }}></div>
                    <div style={{ height: '14px', width: '60%', margin: '0 auto 1rem auto', backgroundColor: 'var(--bg-soft)', borderRadius: '4px' }}></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredTeachers.length > 0 ? (
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
