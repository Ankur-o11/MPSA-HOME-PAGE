/**
 * MPSA SCHOOL CONFIGURATION & CONSTANTS
 * 
 * IMPORTANT: Replace these placeholder variables with actual school details.
 * All school address, map links, contact details, and social links are centralized here.
 */

/**
 * Helper to ensure Instagram URLs match required absolute HTTPS format: https://www.instagram.com/PROFILE_USERNAME/
 */
export const formatInstagramUrl = (urlStr) => {
  if (!urlStr || typeof urlStr !== 'string') return 'https://www.instagram.com/mpsaschool/';
  let cleaned = urlStr.trim();
  if (!cleaned) return 'https://www.instagram.com/mpsaschool/';
  
  if (/^https?:\/\/(www\.)?instagram\.com\//i.test(cleaned)) {
    cleaned = cleaned.replace(/^https?:\/\/(www\.)?instagram\.com\//i, 'https://www.instagram.com/');
    if (!cleaned.endsWith('/')) {
      cleaned += '/';
    }
    return cleaned;
  }

  cleaned = cleaned.replace(/^@/, '').replace(/^\/+|\/+$/g, '');
  return `https://www.instagram.com/${cleaned}/`;
};

export const SCHOOL_CONFIG = {
  fullName: "MAHARANA PRATAP SCIENCE ACADEMY INTER COLLEGE",
  shortName: "MPSA School",
  tagline: "Learning Today, Leading Tomorrow",
  establishedYear: "2010",
  affiliation: "CBSE / State Board (Placeholder)",
  schoolCode: "MPSA-ACC-2026",
  
  // Contact details
  address: "Maharana Pratap Science Academy Inter College, Chholapur Road, Churkhibal, Jalaun, Uttar Pradesh - 285123, India",
  landmark: "Chholapur Road, Churkhibal, Jalaun",
  phonePrimary: "+91 98765 43210",
  phoneSecondary: "+91 01234 56789",
  emailGeneral: "info@mpsaschool.edu.in",
  emailAdmissions: "admissions@mpsaschool.edu.in",
  timingStudents: "Monday to Saturday: 8:00 AM – 2:15 PM",
  timingOffice: "Monday to Saturday: 8:00 AM – 4:00 PM (Closed on Sundays & Gazetted Holidays)",

  // Google Maps Configuration (Editable Variables as requested in Rule #22)
  // Replace GOOGLE_MAPS_EMBED_URL with the iframe src provided by Google Maps embed feature
  GOOGLE_MAPS_EMBED_URL: "", 
  GOOGLE_MAPS_DIRECTION_URL: "https://www.google.com/maps",

  // Social Links
  socialLinks: {
    facebook: "https://facebook.com/mpsaschool",
    instagram: "https://www.instagram.com/mpsaschool/",
    youtube: "https://youtube.com/mpsaschool",
    linkedin: "#"
  },

  // Admissions Banner Config
  admissionSession: "2026–2027",
  isAdmissionOpen: true,
  admissionContactNumber: "+91 98765 43210"
};
