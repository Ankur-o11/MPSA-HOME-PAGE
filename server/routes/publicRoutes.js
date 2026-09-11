import express from 'express';
import {
  getPublicTeachers,
  getPublicTeacherById,
  getPublicPrincipal,
  getPublicFounder,
  getPublicGallery,
  getPublicNotices,
  getPublicEvents,
  getPublicAchievements,
  getPublicFacilities,
  getPublicAcademics,
  getPublicAdmissions,
  getPublicContactSettings
} from '../controllers/publicController.js';

const router = express.Router();

router.get('/teachers', getPublicTeachers);
router.get('/teachers/:id', getPublicTeacherById);
router.get('/principal', getPublicPrincipal);
router.get('/founder', getPublicFounder);
router.get('/gallery', getPublicGallery);
router.get('/notices', getPublicNotices);
router.get('/events', getPublicEvents);
router.get('/achievements', getPublicAchievements);
router.get('/facilities', getPublicFacilities);
router.get('/academics', getPublicAcademics);
router.get('/admissions', getPublicAdmissions);
router.get('/contact-settings', getPublicContactSettings);

export default router;
