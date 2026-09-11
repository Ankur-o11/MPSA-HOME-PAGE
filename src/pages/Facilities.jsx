import React from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle';
import FacilityCard from '../components/FacilityCard';
import { facilitiesData } from '../data/facilities';

export default function Facilities() {
  return (
    <div className="facilities-page">
      {/* Banner */}
      <div className="page-banner">
        <div className="container">
          <h1 className="page-banner-title">Campus Facilities</h1>
          <p className="page-banner-subtitle">
            Explore the modern infrastructure, laboratories, sports grounds, and safety systems at Maharana Pratap Science Academy.
          </p>
          <ul className="breadcrumb-list">
            <li><Link to="/">Home</Link></li>
            <li>/</li>
            <li>Facilities</li>
          </ul>
        </div>
      </div>

      <section className="section-padding">
        <div className="container">
          <SectionTitle 
            badge="Infrastructure & Amenities"
            title="State-of-the-Art School Facilities"
            subtitle="Providing every student with world-class tools for learning, research, athletics, and safety."
          />

          <div className="gallery-grid">
            {facilitiesData.map(facility => (
              <FacilityCard key={facility.id} facility={facility} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
