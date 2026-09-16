import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, X, Image as ImageIcon } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import SEO from '../components/SEO';
import EventCard from '../components/EventCard';
import Lightbox from '../components/Lightbox';
import { upcomingEvents as defaultUpcoming, previousEvents as defaultPrevious } from '../data/events';
import { apiService } from '../services/api';
import { getUploadUrl } from '../config/api';
import { handleImageError } from '../utils/imageUtils';

export default function Events() {
  const [upcoming, setUpcoming] = useState(defaultUpcoming);
  const [previous, setPrevious] = useState(defaultPrevious);

  // Selected event for detail view modal
  const [selectedEvent, setSelectedEvent] = useState(null);
  // Selected photo index for Lightbox
  const [activeLightboxIndex, setActiveLightboxIndex] = useState(null);

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

  const handleOpenEvent = async (event) => {
    setSelectedEvent(event);
    setActiveLightboxIndex(null);
    if (event._id || event.id) {
      try {
        const fullEvent = await apiService.getEventById(event._id || event.id);
        if (fullEvent && fullEvent.title) {
          setSelectedEvent(fullEvent);
        }
      } catch (err) {}
    }
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
    setActiveLightboxIndex(null);
  };

  // Get photos array belonging exclusively to selected event
  const rawPhotos = selectedEvent ? (selectedEvent.photos || []) : [];
  let eventPhotos = [];
  if (selectedEvent) {
    const list = [];
    // Include primary banner image if not already present in photos list
    if (selectedEvent.image && !rawPhotos.some(p => (typeof p === 'string' ? p : p.url) === selectedEvent.image)) {
      list.push({
        image: getUploadUrl(selectedEvent.image),
        title: selectedEvent.title,
        caption: selectedEvent.description || selectedEvent.title,
        date: selectedEvent.date
      });
    }
    // Include all photos belonging strictly to this event
    rawPhotos.forEach((p, idx) => {
      const imgUrl = typeof p === 'string' ? p : (p?.url || p);
      if (imgUrl) {
        list.push({
          image: getUploadUrl(imgUrl),
          title: selectedEvent.title,
          caption: (typeof p === 'object' && p?.caption) ? p.caption : `${selectedEvent.title} - Photo ${idx + 1}`,
          date: selectedEvent.date
        });
      }
    });
    // Fallback if list is empty
    if (list.length === 0 && selectedEvent.image) {
      list.push({
        image: getUploadUrl(selectedEvent.image),
        title: selectedEvent.title,
        caption: selectedEvent.description || selectedEvent.title,
        date: selectedEvent.date
      });
    }
    eventPhotos = list;
  }

  return (
    <div className="events-page">
      <SEO 
        title="Upcoming Events & Activities | Maharana Pratap Science Academy (MPSA), Jalaun"
        description="Explore academic expos, sports events, science workshops, and cultural activities at Maharana Pratap Science Academy (MPSA School / MPSA Inter College), Jalaun."
        keywords="Events MPSA Inter College, Maharana Pratap Science Academy Events, MPSA School Events, Activities MPSA Jalaun"
        canonicalUrl="/events"
      />
      {/* Banner */}
      <div className="page-banner">
        <div className="container">
          <h1 className="page-banner-title">Events &amp; Activities</h1>
          <p className="page-banner-subtitle">
            Explore academic expos, inter-school sports tournaments, robotics workshops, and cultural fests at MPSA School &amp; Inter College, Jalaun.
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
            subtitle="Click on any event card to view full details and event photo gallery."
          />

          <div className="gallery-grid">
            {upcoming.map(event => (
              <EventCard key={event._id || event.id} event={event} onClick={handleOpenEvent} />
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
              title="Recent Past Events &amp; Celebrations"
              subtitle="Reflecting on successful cultural programs, sports finals, and tree plantation drives."
            />

            <div className="gallery-grid">
              {previous.map(event => (
                <EventCard key={event._id || event.id} event={event} isPrevious={true} onClick={handleOpenEvent} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Requirement 14: Event Detail Modal + Photos Gallery */}
      {selectedEvent && (
        <div className="admin-modal-backdrop" onClick={handleCloseModal} style={{ zIndex: 1000 }}>
          <div 
            className="admin-modal-content" 
            onClick={(e) => e.stopPropagation()} 
            style={{ maxWidth: '850px', maxHeight: '90vh', overflowY: 'auto' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', pb: '1rem' }}>
              <div>
                <span className="section-badge" style={{ marginBottom: '0.4rem' }}>
                  {selectedEvent.isUpcoming ? 'Upcoming Event' : 'Past Event Recap'}
                </span>
                <h2 style={{ fontSize: '1.6rem', color: 'var(--primary-navy)', margin: '0.2rem 0' }}>
                  {selectedEvent.title}
                </h2>
                <div style={{ display: 'flex', gap: '1.25rem', fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '0.4rem', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Calendar size={14} color="#D4A72C" />
                    <span><strong>Date:</strong> {selectedEvent.date}</span>
                  </div>
                  {selectedEvent.time && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Clock size={14} color="#1F5F95" />
                      <span><strong>Time:</strong> {selectedEvent.time}</span>
                    </div>
                  )}
                  {selectedEvent.location && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <MapPin size={14} color="#1F5F95" />
                      <span><strong>Venue:</strong> {selectedEvent.location}</span>
                    </div>
                  )}
                </div>
              </div>

              <button className="btn-icon" onClick={handleCloseModal} aria-label="Close modal">
                <X size={22} />
              </button>
            </div>

            {/* Description */}
            <div style={{ marginBottom: '1.5rem', lineHeight: '1.7', color: 'var(--text-main)' }}>
              <p>{selectedEvent.description}</p>
            </div>

            {/* Event Photos Gallery */}
            <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--primary-navy)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ImageIcon size={20} color="#D4A72C" /> Photos Belonging to This Event ({eventPhotos.length})
              </h3>

              <div className="gallery-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                {eventPhotos.map((photo, idx) => (
                  <div 
                    key={idx} 
                    className="gallery-card" 
                    onClick={() => setActiveLightboxIndex(idx)}
                    style={{ height: '150px', cursor: 'pointer' }}
                  >
                    <img 
                      src={photo.image} 
                      alt={photo.caption || selectedEvent.title} 
                      className="gallery-card-img" 
                      loading="lazy" 
                      onError={handleImageError}
                    />
                    <div className="gallery-card-overlay">
                      <h4 className="gallery-card-title" style={{ fontSize: '0.85rem' }}>
                        {photo.caption || selectedEvent.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox for full screen photo view */}
      {selectedEvent && activeLightboxIndex !== null && (
        <Lightbox 
          item={eventPhotos[activeLightboxIndex]} 
          onClose={() => setActiveLightboxIndex(null)}
          onNext={eventPhotos.length > 1 ? () => setActiveLightboxIndex((activeLightboxIndex + 1) % eventPhotos.length) : undefined}
          onPrev={eventPhotos.length > 1 ? () => setActiveLightboxIndex((activeLightboxIndex - 1 + eventPhotos.length) % eventPhotos.length) : undefined}
        />
      )}
    </div>
  );
}
