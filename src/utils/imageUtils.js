/**
 * Neutral SVG Fallbacks for Missing / Broken / Loading Images
 * Replaces demo Unsplash URLs with clean, professional vector placeholders.
 */

// Neutral Profile / Person Avatar SVG (For Founder, Principal, Teachers)
export const NEUTRAL_AVATAR_SVG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2394A3B8'%3E%3Crect width='100%25' height='100%25' fill='%23F1F5F9'/%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm0 14c-2.03 0-3.8-.85-5.05-2.2.06-1.68 3.37-2.6 5.05-2.6s4.99.92 5.05 2.6C15.8 19.15 14.03 20 12 20z' fill='%2364748B'/%3E%3C/svg%3E";

// Neutral Campus / General Image Card SVG (For Gallery, Facilities, Events)
export const NEUTRAL_IMAGE_SVG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Crect width='100%25' height='100%25' fill='%23F1F5F9'/%3E%3Cpath d='M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z' fill='%2394A3B8'/%3E%3C/svg%3E";

/**
 * Image onError handler to cleanly switch broken image links to neutral SVG
 */
export const handleAvatarError = (e) => {
  if (e && e.target) {
    e.target.onerror = null;
    e.target.src = NEUTRAL_AVATAR_SVG;
  }
};

export const handleImageError = (e) => {
  if (e && e.target) {
    e.target.onerror = null;
    e.target.src = NEUTRAL_IMAGE_SVG;
  }
};
