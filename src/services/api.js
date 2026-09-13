import { teachersData } from '../data/teachers';
import { noticesData } from '../data/notices';
import { upcomingEvents, previousEvents } from '../data/events';
import { achievementsData } from '../data/achievements';
import { facilitiesData } from '../data/facilities';
import { galleryData } from '../data/gallery';
import { SCHOOL_CONFIG } from '../data/config';
import { API_BASE_URL } from '../config/api';
import { NEUTRAL_AVATAR_SVG } from '../utils/imageUtils';

// In-Memory Promise Cache & Response Cache (Deduplicates simultaneous requests & caches responses for 15s)
const apiCache = new Map();
const pendingRequests = new Map();
const CACHE_TTL_MS = 15000;

export const clearApiCache = () => {
  apiCache.clear();
  pendingRequests.clear();
};

// Safe Fetch Helper with Deduplication & Short-TTL Caching
async function fetchWithFallback(url, fallbackData) {
  const now = Date.now();

  // 1. Return valid cached response if available
  if (apiCache.has(url)) {
    const cached = apiCache.get(url);
    if (now - cached.timestamp < CACHE_TTL_MS) {
      return cached.data;
    }
    apiCache.delete(url);
  }

  // 2. Deduplicate concurrent requests to the exact same URL
  if (pendingRequests.has(url)) {
    return pendingRequests.get(url);
  }

  const fetchPromise = (async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000); // 6s timeout fallback

      const res = await fetch(url, { 
        signal: controller.signal,
        headers: {
          'Accept': 'application/json'
        }
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) ? data.length > 0 : Boolean(data)) {
          apiCache.set(url, { timestamp: Date.now(), data });
          return data;
        }
      }
    } catch (err) {
      // Graceful fallback to static data if backend is offline or loading
    } finally {
      pendingRequests.delete(url);
    }
    return fallbackData;
  })();

  pendingRequests.set(url, fetchPromise);
  return fetchPromise;
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
      photo: NEUTRAL_AVATAR_SVG,
      qualifications: 'Ph.D., M.Sc., B.Ed.',
      experience: '18+ Years in Education',
      messageQuote: 'At Maharana Pratap Science Academy, we view education as a transformative journey...',
      fullMessage: 'Dear Parents, Guardians, and Dearest Students...',
      educationalVision: 'Fostering conceptual clarity, hands-on scientific research...'
    });
  },

  async getFounder() {
    return fetchWithFallback(`${API_BASE_URL}/public/founder`, {
      name: 'Shri [Director / Manager Name Placeholder]',
      designation: 'Director / Manager, MPSA School',
      photo: NEUTRAL_AVATAR_SVG,
      intro: 'A visionary educator and philanthropist steering Maharana Pratap Science Academy...',
      visionQuote: 'Education is the greatest light that can ignite a human mind...',
      storyText: 'The journey of Maharana Pratap Science Academy began with a deep conviction...',
      timeline: [],
      gallery: []
    });
  },

  async getDirector() {
    return this.getFounder();
  },

  async getFounderProfile() {
    return fetchWithFallback(`${API_BASE_URL}/public/founder-profile`, {
      name: 'Shri [Founder Name Placeholder]',
      designation: 'Founder & Visionary Patron, MPSA School',
      photo: NEUTRAL_AVATAR_SVG,
      profession: 'Visionary Educator & Philanthropist',
      biography: 'Founder biography and inspiring journey.',
      intro: 'A visionary pioneer who laid the foundation of Maharana Pratap Science Academy.',
      education: 'Higher Degrees in Science & Pedagogy',
      experience: 'Decades of Educational Service',
      contribution: 'Conceptualization and foundation of MPSA School.',
      vision: 'Building nation builders through scientific temper and character discipline.',
      achievements: 'Established Maharana Pratap Science Academy Inter College in the region.',
      visionQuote: 'Education is the greatest light that can ignite a human mind.',
      storyText: 'The noble dream to establish Maharana Pratap Science Academy...',
      timeline: [],
      gallery: []
    });
  },

  async getGallery(params = {}) {
    const page = params.page || 1;
    const limit = params.limit || 20;
    const url = `${API_BASE_URL}/public/gallery?page=${page}&limit=${limit}`;
    const fallbackRes = {
      success: true,
      data: galleryData.slice((page - 1) * limit, page * limit),
      pagination: {
        page,
        limit,
        total: galleryData.length,
        hasMore: (page * limit) < galleryData.length
      }
    };
    return fetchWithFallback(url, fallbackRes);
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

  async getEventById(id) {
    return fetchWithFallback(`${API_BASE_URL}/public/events/${id}`, null);
  },

  async getAdvantages() {
    return fetchWithFallback(`${API_BASE_URL}/public/advantages`, null);
  },

  async getAboutSettings() {
    return fetchWithFallback(`${API_BASE_URL}/public/about-settings`, null);
  },

  async getContactSettings() {
    return fetchWithFallback(`${API_BASE_URL}/public/contact-settings`, SCHOOL_CONFIG);
  },

  async getSiteSettings() {
    return fetchWithFallback(`${API_BASE_URL}/public/site-settings`, SCHOOL_CONFIG);
  }
};
