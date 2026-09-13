import express from 'express';
import { protectAdmin } from '../middleware/authMiddleware.js';
import { uploadSingleImage } from '../middleware/uploadMiddleware.js';
import {
  getAdminDashboardStats,
  getAllTeachersAdmin,
  createTeacher,
  updateTeacher,
  deleteTeacher,
  updatePrincipal,
  updateFounder,
  updateDirector,
  getFounderProfileAdmin,
  updateFounderProfile,
  getAllGalleryAdmin,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  getAllNoticesAdmin,
  createNotice,
  updateNotice,
  deleteNotice,
  getAllEventsAdmin,
  createEvent,
  updateEvent,
  deleteEvent,
  getAllAchievementsAdmin,
  createAchievement,
  updateAchievement,
  deleteAchievement,
  getAllFacilitiesAdmin,
  createFacility,
  updateFacility,
  deleteFacility,
  updateAcademics,
  updateAdmissions,
  updateContactSettings,
  getAllAdvantagesAdmin,
  createAdvantage,
  updateAdvantage,
  deleteAdvantage,
  getAboutSettingsAdmin,
  updateAboutSettings,
  handleImageUpload
} from '../controllers/adminController.js';

const router = express.Router();

// Apply auth middleware to ALL admin routes (RULE #10 & #25)
router.use(protectAdmin);

// Dashboard Stats
router.get('/stats', getAdminDashboardStats);

// Teachers
router.get('/teachers', getAllTeachersAdmin);
router.post('/teachers', createTeacher);
router.put('/teachers/:id', updateTeacher);
router.delete('/teachers/:id', deleteTeacher);

// Principal, Director & Founder
router.put('/principal', updatePrincipal);
router.put('/founder', updateFounder);
router.put('/director', updateDirector);
router.get('/founder-profile', getFounderProfileAdmin);
router.put('/founder-profile', updateFounderProfile);

// Gallery
router.get('/gallery', getAllGalleryAdmin);
router.post('/gallery', createGalleryItem);
router.put('/gallery/:id', updateGalleryItem);
router.delete('/gallery/:id', deleteGalleryItem);

// Notices
router.get('/notices', getAllNoticesAdmin);
router.post('/notices', createNotice);
router.put('/notices/:id', updateNotice);
router.delete('/notices/:id', deleteNotice);

// Events
router.get('/events', getAllEventsAdmin);
router.post('/events', createEvent);
router.put('/events/:id', updateEvent);
router.delete('/events/:id', deleteEvent);

// Achievements
router.get('/achievements', getAllAchievementsAdmin);
router.post('/achievements', createAchievement);
router.put('/achievements/:id', updateAchievement);
router.delete('/achievements/:id', deleteAchievement);

// Facilities
router.get('/facilities', getAllFacilitiesAdmin);
router.post('/facilities', createFacility);
router.put('/facilities/:id', updateFacility);
router.delete('/facilities/:id', deleteFacility);

// Advantages
router.get('/advantages', getAllAdvantagesAdmin);
router.post('/advantages', createAdvantage);
router.put('/advantages/:id', updateAdvantage);
router.delete('/advantages/:id', deleteAdvantage);

// About Settings
router.get('/about-settings', getAboutSettingsAdmin);
router.put('/about-settings', updateAboutSettings);

// Academics, Admissions, Contact
router.put('/academics', updateAcademics);
router.put('/admissions', updateAdmissions);
router.put('/contact-settings', updateContactSettings);

// Secure Image Upload (RULE #16)
router.post('/upload', uploadSingleImage, handleImageUpload);

export default router;
