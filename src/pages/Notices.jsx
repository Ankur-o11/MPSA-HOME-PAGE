import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Bell, X, Download, Calendar } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import NoticeCard from '../components/NoticeCard';
import { noticesData } from '../data/notices';

export default function Notices() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeNotice, setActiveNotice] = useState(null);

  const categories = ['All', 'Admissions', 'Examination', 'Academic', 'General', 'Event', 'Holiday'];

  const filteredNotices = useMemo(() => {
    return noticesData.filter(notice => {
      const matchesSearch = notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            notice.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCat = selectedCategory === 'All' || notice.category === selectedCategory;
      return matchesSearch && matchesCat;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="notices-page">
      {/* Banner */}
      <div className="page-banner">
        <div className="container">
          <h1 className="page-banner-title">Official Notices & Circulars</h1>
          <p className="page-banner-subtitle">
            Stay updated with official school announcements, exam dates, circulars, and holiday notifications.
          </p>
          <ul className="breadcrumb-list">
            <li><Link to="/">Home</Link></li>
            <li>/</li>
            <li>Notices</li>
          </ul>
        </div>
      </div>

      <section className="section-padding">
        <div className="container">
          <SectionTitle 
            badge="School Notice Board"
            title="Latest Announcements"
            subtitle="Editable digital notice board for parents, students, and staff."
          />

          {/* Search & Category Filter */}
          <div className="faculty-filter-bar" style={{ marginBottom: '2.5rem' }}>
            <div className="filter-controls-grid" style={{ gridTemplateColumns: '2fr 1fr' }}>
              <div className="search-input-wrapper">
                <Search size={18} />
                <input 
                  type="text" 
                  className="form-control"
                  placeholder="Search notices by keyword..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div>
                <select 
                  className="form-control"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="All">All Categories</option>
                  {categories.filter(c => c !== 'All').map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Notices Grid */}
          {filteredNotices.length > 0 ? (
            <div className="gallery-grid">
              {filteredNotices.map(notice => (
                <NoticeCard 
                  key={notice.id} 
                  notice={notice} 
                  onSelectNotice={(n) => setActiveNotice(n)}
                />
              ))}
            </div>
          ) : (
            <div className="no-results-box">
              <Bell size={48} color="#64748B" style={{ margin: '0 auto 1rem auto' }} />
              <h3>No Notices Found</h3>
              <p style={{ color: 'var(--text-muted)' }}>Try adjusting your search criteria or category filter.</p>
            </div>
          )}
        </div>
      </section>

      {/* Notice Detail Modal */}
      {activeNotice && (
        <div className="lightbox-backdrop" onClick={() => setActiveNotice(null)}>
          <div className="lightbox-content-box" style={{ padding: '2.5rem', maxWidth: '700px' }} onClick={(e) => e.stopPropagation()}>
            <button 
              className="lightbox-close-btn" 
              onClick={() => setActiveNotice(null)}
              style={{ top: '1rem', right: '1rem' }}
            >
              <X size={20} />
            </button>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <span className="category-tag">{activeNotice.category}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                <Calendar size={14} />
                <span>Published: {activeNotice.date}</span>
              </div>
            </div>

            <h3 style={{ fontSize: '1.5rem', color: 'var(--primary-navy)', marginBottom: '1.25rem', lineHeight: '1.4' }}>
              {activeNotice.title}
            </h3>

            <div style={{ backgroundColor: 'var(--bg-soft)', padding: '1.5rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', lineHeight: '1.7', color: 'var(--text-main)' }}>
              {activeNotice.description}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {activeNotice.downloadUrl && (
                <a 
                  href={activeNotice.downloadUrl} 
                  download 
                  className="btn btn-outline-gold btn-sm"
                  onClick={(e) => e.preventDefault()}
                >
                  <Download size={16} /> Download Official PDF Circular
                </a>
              )}
              <button className="btn btn-secondary btn-sm" onClick={() => setActiveNotice(null)}>
                Close Notice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
