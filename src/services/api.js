import { teachersData } from '../data/teachers';
import { noticesData } from '../data/notices';
import { upcomingEvents, previousEvents } from '../data/events';
import { achievementsData } from '../data/achievements';
import { facilitiesData } from '../data/facilities';
import { galleryData } from '../data/gallery';
import { SCHOOL_CONFIG } from '../data/config';
import { API_BASE_URL } from '../config/api';

// Safe Fetch Helper with Fallback
async function fetchWithFallback(url, fallbackData) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000); // 6s timeout fallback

    const res = await fetch(url, { 
      signal: controller.signal,
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) ? data.length > 0 : Boolean(data)) {
        return data;
      }
    }
  } catch (err) {
    // Graceful fallback to static data if backend is offline or loading
  }
  return fallbackData;
}

export const apiService = {
  // Public Data Methods
  async getTeachers() {
    return fetchWithFallback(`${API_BASE_URL}/public/teachers`, teachersData);
  },

  async getTeacherById(id) {
    const fallbackTeacher = teachersData.find(t => t.id === id || t._id === id);
    try {
      const res = await fetch(`${API_BASE_URL}/public/teachers/${id}`);
      if (res.ok) return await res.json();
    } catch (err) {
      // Fallback
    }
    return fallbackTeacher;
  },

  async getPrincipal() {
    return fetchWithFallback(`${API_BASE_URL}/public/principal`, {
      name: 'Dr. [Principal Name Placeholder]',
      designation: 'Principal, MPSA School',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop',
      qualifications: 'Ph.D., M.Sc., B.Ed.',
      experience: '18+ Years in Education',
      messageQuote: 'At Maharana Pratap Science Academy, we view education as a transformative journey...',
      fullMessage: 'Dear Parents, Guardians, and Dearest Students...',
      educationalVision: 'Fostering conceptual clarity, hands-on scientific research...'
    });
  },

  async getFounder() {
    return fetchWithFallback(`${API_BASE_URL}/public/founder`, {
      name: 'Shri [Founder Name Placeholder]',
      designation: 'Founder & Visionary Chairman, MPSA School',
      photo: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800&auto=format&fit=crop',
      intro: 'A visionary educator and philanthropist...',
      visionQuote: 'Education is the greatest light that can ignite a human mind...',
      storyText: 'The journey of Maharana Pratap Science Academy began with a deep conviction...',
      timeline: [],
      gallery: []
    });
  },

  async getGallery() {
    return fetchWithFallback(`${API_BASE_URL}/public/gallery`, galleryData);
  },

  async getNotices() {
    return fetchWithFallback(`${API_BASE_URL}/public/notices`, noticesData);
  },

  async getEvents() {
    return fetchWithFallback(`${API_BASE_URL}/public/events`, [
      ...upcomingEvents.map(e => ({ ...e, isUpcoming: true })),
      ...previousEvents.map(e => ({ ...e, isUpcoming: false }))
    ]);
  },

  async getAchievements() {
    return fetchWithFallback(`${API_BASE_URL}/public/achievements`, achievementsData);
  },

  async getFacilities() {
    return fetchWithFallback(`${API_BASE_URL}/public/facilities`, facilitiesData);
  },

  async getAcademics() {
    return fetchWithFallback(`${API_BASE_URL}/public/academics`, null);
  },

  async getAdmissions() {
    return fetchWithFallback(`${API_BASE_URL}/public/admissions`, null);
  },

  async getContactSettings() {
    return fetchWithFallback(`${API_BASE_URL}/public/contact-settings`, SCHOOL_CONFIG);
  },

  async getSiteSettings() {
    return fetchWithFallback(`${API_BASE_URL}/public/site-settings`, SCHOOL_CONFIG);
  }
};
