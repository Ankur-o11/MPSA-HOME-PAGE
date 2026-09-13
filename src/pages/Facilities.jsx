import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle';
import SEO from '../components/SEO';
import FacilityCard from '../components/FacilityCard';
import { facilitiesData as defaultFacilities } from '../data/facilities';
import { apiService } from '../services/api';

export default function Facilities() {
  const [facilities, setFacilities] = useState(defaultFacilities);

  useEffect(() => {
    async function loadFacilities() {
      const data = await apiService.getFacilities();
      if (data && data.length > 0) setFacilities(data);
    }
    loadFacilities();
  }, []);

  const facilitiesSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Campus Facilities & Infrastructure - Maharana Pratap Science Academy Inter College",
    "description": "Explore science laboratories, computer lab, library, sports grounds, and campus infrastructure at Maharana Pratap Science Academy Inter College, Jalaun."
  };

  return (
    <div className="facilities-page">
      <SEO 
        title="Campus Facilities & Infrastructure | MPSA Inter College, Jalaun"
        description="Explore science laboratories, computer lab, library, sports grounds, and campus infrastructure at Maharana Pratap Science Academy Inter College, Jalaun."
        keywords="Facilities MPSA Inter College Jalaun, Science Labs Jalaun, Infrastructure MPSA Inter College Jalaun, School Facilities Jalaun"
        canonicalUrl="/facilities"
        schema={facilitiesSchema}
      />
      {/* Banner */}
      <div className="page-banner">
        <div className="container">
          <h1 className="page-banner-title">Campus Facilities</h1>
          <p className="page-banner-subtitle">
            Explore the modern infrastructure, laboratories, sports grounds, and safety systems at Maharana Pratap Science Academy in Jalaun, Uttar Pradesh.
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
            {facilities.map(facility => (
              <FacilityCard key={facility._id || facility.id} facility={facility} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
