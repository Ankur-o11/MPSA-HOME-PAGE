import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle';
import EventCard from '../components/EventCard';
import { upcomingEvents as defaultUpcoming, previousEvents as defaultPrevious } from '../data/events';
import { apiService } from '../services/api';

export default function Events() {
  const [upcoming, setUpcoming] = useState(defaultUpcoming);
  const [previous, setPrevious] = useState(defaultPrevious);

  useEffect(() => {
    async function loadEvents() {
      const data = await apiService.getEvents();
      if (data && data.length > 0) {
        const upcomingList = data.filter(e => e.isUpcoming !== false);
        const previousList = data.filter(e => e.isUpcoming === false);
        setUpcoming(upcomingList.length > 0 ? upcomingList : data);
        setPrevious(previousList);
      }
    }
    loadEvents();
  }, []);

  return (
    <div className="events-page">
      {/* Banner */}
      <div className="page-banner">
        <div className="container">
          <h1 className="page-banner-title">Events & Activities</h1>
          <p className="page-banner-subtitle">
            Explore academic expos, inter-school sports tournaments, robotics workshops, and cultural fests at MPSA.
          </p>
          <ul className="breadcrumb-list">
            <li><Link to="/">Home</Link></li>
            <li>/</li>
            <li>Events</li>
          </ul>
        </div>
      </div>

      {/* Upcoming Events */}
      <section className="section-padding">
        <div className="container">
          <SectionTitle 
            badge="Schedule of Events"
            title="Upcoming School Events"
            subtitle="Mark your calendars for our upcoming competitions, exhibitions, and athletic meets."
          />

          <div className="gallery-grid">
            {upcoming.map(event => (
              <EventCard key={event._id || event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* Previous Events Recap */}
      {previous.length > 0 && (
        <section className="section-padding" style={{ backgroundColor: 'var(--bg-soft)' }}>
          <div className="container">
            <SectionTitle 
              badge="Past Highlights"
              title="Recent Past Events & Celebrations"
              subtitle="Reflecting on successful cultural programs, sports finals, and tree plantation drives."
            />

            <div className="gallery-grid">
              {previous.map(event => (
                <EventCard key={event._id || event.id} event={event} isPrevious={true} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
