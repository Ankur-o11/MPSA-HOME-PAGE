import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle';
import AchievementCard from '../components/AchievementCard';
import { achievementsData } from '../data/achievements';

export default function Achievements() {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Academic', 'Sports', 'Competition', 'School Award'];

  const filteredAchievements = useMemo(() => {
    if (activeCategory === 'All') return achievementsData;
    return achievementsData.filter(a => a.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="achievements-page">
      {/* Banner */}
      <div className="page-banner">
        <div className="container">
          <h1 className="page-banner-title">Achievements & Excellence</h1>
          <p className="page-banner-subtitle">
            Celebrating academic milestones, sports championships, and institutional awards achieved by MPSA School.
          </p>
          <ul className="breadcrumb-list">
            <li><Link to="/">Home</Link></li>
            <li>/</li>
            <li>Achievements</li>
          </ul>
        </div>
      </div>

      <section className="section-padding">
        <div className="container">
          <SectionTitle 
            badge="Hall of Fame"
            title="Our Pride & Honors"
            subtitle="Honoring student brilliance and institutional recognition."
          />

          {/* Category Filter Tabs */}
          <div className="gallery-tabs">
            {categories.map(cat => (
              <button 
                key={cat}
                className={`gallery-tab-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat} {cat !== 'All' ? 'Achievements' : ''}
              </button>
            ))}
          </div>

          <div className="gallery-grid">
            {filteredAchievements.map(achievement => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
