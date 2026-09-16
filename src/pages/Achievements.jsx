import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle';
import SEO from '../components/SEO';
import AchievementCard from '../components/AchievementCard';
import { achievementsData as defaultAchievements } from '../data/achievements';
import { apiService } from '../services/api';

export default function Achievements() {
  const [achievements, setAchievements] = useState(defaultAchievements);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    async function loadAchievements() {
      const data = await apiService.getAchievements();
      if (data && data.length > 0) setAchievements(data);
    }
    loadAchievements();
  }, []);

  const categories = ['All', 'Academic', 'Sports', 'Competition', 'School Award'];

  const filteredAchievements = useMemo(() => {
    if (activeCategory === 'All') return achievements;
    return achievements.filter(a => a.category === activeCategory);
  }, [achievements, activeCategory]);

  return (
    <div className="achievements-page">
      <SEO 
        title="Achievements & Excellence | Maharana Pratap Science Academy (MPSA), Jalaun"
        description="Explore academic milestones, student achievements, and awards at Maharana Pratap Science Academy (MPSA School / MPSA Inter College), Jalaun, UP."
        keywords="Achievements MPSA Inter College, Maharana Pratap Science Academy Awards, MPSA School Achievements, Student Honors MPSA Jalaun"
        canonicalUrl="/achievements"
      />
      {/* Banner */}
      <div className="page-banner">
        <div className="container">
          <h1 className="page-banner-title">Achievements & Excellence</h1>
          <p className="page-banner-subtitle">
            Celebrating academic milestones, sports championships, and institutional awards achieved by MPSA School &amp; Inter College, Jalaun.
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
