import Teacher from '../models/Teacher.js';
import Principal from '../models/Principal.js';
import Founder from '../models/Founder.js';
import Gallery from '../models/Gallery.js';
import Notice from '../models/Notice.js';
import Event from '../models/Event.js';
import Achievement from '../models/Achievement.js';
import Facility from '../models/Facility.js';
import Academics from '../models/Academics.js';
import Admissions from '../models/Admissions.js';
import ContactSettings from '../models/ContactSettings.js';

// Dashboard Summary Stats
export const getAdminDashboardStats = async (req, res) => {
  try {
    const [totalTeachers, totalGallery, publishedNotices, upcomingEvents, totalAchievements] = await Promise.all([
      Teacher.countDocuments(),
      Gallery.countDocuments(),
      Notice.countDocuments({ isPublished: true }),
      Event.countDocuments({ isUpcoming: true, isPublished: true }),
      Achievement.countDocuments()
    ]);

    res.json({
      success: true,
      stats: {
        totalTeachers,
        totalGallery,
        publishedNotices,
        upcomingEvents,
        totalAchievements
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error loading dashboard statistics' });
  }
};

// Teacher CRUD
export const getAllTeachersAdmin = async (req, res) => {
  try {
    const teachers = await Teacher.find().sort({ displayOrder: 1, createdAt: -1 });
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching teachers' });
  }
};

export const createTeacher = async (req, res) => {
  try {
    const teacherData = req.body;
    if (typeof teacherData.qualifications === 'string') {
      teacherData.qualifications = teacherData.qualifications.split(',').map(q => q.trim()).filter(Boolean);
    }
    const teacher = new Teacher(teacherData);
    await teacher.save();
    res.status(201).json({ success: true, teacher });
  } catch (err) {
    res.status(400).json({ message: 'Error creating teacher', error: err.message });
  }
};

export const updateTeacher = async (req, res) => {
  try {
    const teacherData = req.body;
    if (typeof teacherData.qualifications === 'string') {
      teacherData.qualifications = teacherData.qualifications.split(',').map(q => q.trim()).filter(Boolean);
    }
    const teacher = await Teacher.findByIdAndUpdate(req.params.id, teacherData, { new: true });
    if (!teacher) return res.status(404).json({ message: 'Teacher not found' });
    res.json({ success: true, teacher });
  } catch (err) {
    res.status(400).json({ message: 'Error updating teacher', error: err.message });
  }
};

export const deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!teacher) return res.status(404).json({ message: 'Teacher not found' });
    res.json({ success: true, message: 'Teacher deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting teacher' });
  }
};

// Principal Update
export const updatePrincipal = async (req, res) => {
  try {
    let principal = await Principal.findOne();
    if (!principal) {
      principal = new Principal(req.body);
    } else {
      Object.assign(principal, req.body);
    }
    await principal.save();
    res.json({ success: true, principal });
  } catch (err) {
    res.status(400).json({ message: 'Error updating principal profile' });
  }
};

// Founder Update
export const updateFounder = async (req, res) => {
  try {
    let founder = await Founder.findOne();
    if (!founder) {
      founder = new Founder(req.body);
    } else {
      Object.assign(founder, req.body);
    }
    await founder.save();
    res.json({ success: true, founder });
  } catch (err) {
    res.status(400).json({ message: 'Error updating founder section' });
  }
};

// Gallery CRUD
export const getAllGalleryAdmin = async (req, res) => {
  try {
    const gallery = await Gallery.find().sort({ createdAt: -1 });
    res.json(gallery);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching gallery' });
  }
};

export const createGalleryItem = async (req, res) => {
  try {
    const item = new Gallery(req.body);
    await item.save();
    res.status(201).json({ success: true, item });
  } catch (err) {
    res.status(400).json({ message: 'Error creating gallery item' });
  }
};

export const updateGalleryItem = async (req, res) => {
  try {
    const item = await Gallery.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, item });
  } catch (err) {
    res.status(400).json({ message: 'Error updating gallery item' });
  }
};

export const deleteGalleryItem = async (req, res) => {
  try {
    await Gallery.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Gallery item deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting gallery item' });
  }
};

// Notices CRUD
export const getAllNoticesAdmin = async (req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 });
    res.json(notices);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching notices' });
  }
};

export const createNotice = async (req, res) => {
  try {
    const notice = new Notice(req.body);
    await notice.save();
    res.status(201).json({ success: true, notice });
  } catch (err) {
    res.status(400).json({ message: 'Error creating notice' });
  }
};

export const updateNotice = async (req, res) => {
  try {
    const notice = await Notice.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, notice });
  } catch (err) {
    res.status(400).json({ message: 'Error updating notice' });
  }
};

export const deleteNotice = async (req, res) => {
  try {
    await Notice.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Notice deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting notice' });
  }
};

// Events CRUD
export const getAllEventsAdmin = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching events' });
  }
};

export const createEvent = async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json({ success: true, event });
  } catch (err) {
    res.status(400).json({ message: 'Error creating event' });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, event });
  } catch (err) {
    res.status(400).json({ message: 'Error updating event' });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Event deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting event' });
  }
};

// Achievements CRUD
export const getAllAchievementsAdmin = async (req, res) => {
  try {
    const achievements = await Achievement.find().sort({ createdAt: -1 });
    res.json(achievements);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching achievements' });
  }
};

export const createAchievement = async (req, res) => {
  try {
    const achievement = new Achievement(req.body);
    await achievement.save();
    res.status(201).json({ success: true, achievement });
  } catch (err) {
    res.status(400).json({ message: 'Error creating achievement' });
  }
};

export const updateAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, achievement });
  } catch (err) {
    res.status(400).json({ message: 'Error updating achievement' });
  }
};

export const deleteAchievement = async (req, res) => {
  try {
    await Achievement.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Achievement deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting achievement' });
  }
};

// Facilities CRUD
export const getAllFacilitiesAdmin = async (req, res) => {
  try {
    const facilities = await Facility.find().sort({ displayOrder: 1 });
    res.json(facilities);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching facilities' });
  }
};

export const createFacility = async (req, res) => {
  try {
    const facility = new Facility(req.body);
    await facility.save();
    res.status(201).json({ success: true, facility });
  } catch (err) {
    res.status(400).json({ message: 'Error creating facility' });
  }
};

export const updateFacility = async (req, res) => {
  try {
    const facility = await Facility.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, facility });
  } catch (err) {
    res.status(400).json({ message: 'Error updating facility' });
  }
};

export const deleteFacility = async (req, res) => {
  try {
    await Facility.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Facility deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting facility' });
  }
};

// Academics Update
export const updateAcademics = async (req, res) => {
  try {
    let academics = await Academics.findOne();
    if (!academics) academics = new Academics(req.body);
    else Object.assign(academics, req.body);
    await academics.save();
    res.json({ success: true, academics });
  } catch (err) {
    res.status(400).json({ message: 'Error updating academics info' });
  }
};

// Admissions Update
export const updateAdmissions = async (req, res) => {
  try {
    let admissions = await Admissions.findOne();
    if (!admissions) admissions = new Admissions(req.body);
    else Object.assign(admissions, req.body);
    await admissions.save();
    res.json({ success: true, admissions });
  } catch (err) {
    res.status(400).json({ message: 'Error updating admissions settings' });
  }
};

// Contact Settings Update
export const updateContactSettings = async (req, res) => {
  try {
    let settings = await ContactSettings.findOne();
    if (!settings) settings = new ContactSettings(req.body);
    else Object.assign(settings, req.body);
    await settings.save();
    res.json({ success: true, settings });
  } catch (err) {
    res.status(400).json({ message: 'Error updating site contact settings' });
  }
};

// Image Upload Endpoint (RULE #16)
export const handleImageUpload = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded or file format invalid' });
  }
  const fileUrl = `/uploads/${req.file.filename}`;
  res.json({
    success: true,
    message: 'Image uploaded successfully',
    url: fileUrl,
    filename: req.file.filename
  });
};
