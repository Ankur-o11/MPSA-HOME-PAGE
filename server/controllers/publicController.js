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

export const getPublicTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find({ isActive: true }).sort({ displayOrder: 1, createdAt: 1 }).lean();
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching teachers data' });
  }
};

export const getPublicTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findOne({ 
      $or: [{ _id: req.params.id }, { customId: req.params.id }] 
    }).lean();
    if (!teacher) return res.status(404).json({ message: 'Teacher not found' });
    res.json(teacher);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching teacher profile' });
  }
};

export const getPublicPrincipal = async (req, res) => {
  try {
    let principal = await Principal.findOne().lean();
    if (!principal) principal = new Principal();
    res.json(principal);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching principal data' });
  }
};

export const getPublicFounder = async (req, res) => {
  try {
    let founder = await Founder.findOne().lean();
    if (!founder) founder = new Founder();
    res.json(founder);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching founder data' });
  }
};

export const getPublicGallery = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    let limit = Math.max(1, parseInt(req.query.limit) || 20);
    if (limit > 30) limit = 30;

    const filter = { isPublished: true };
    const skip = (page - 1) * limit;

    const [total, items] = await Promise.all([
      Gallery.countDocuments(filter),
      Gallery.find(filter)
        .sort({ displayOrder: 1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean()
    ]);

    const hasMore = (skip + items.length) < total;

    return res.json({
      success: true,
      data: items,
      pagination: {
        page,
        limit,
        total,
        hasMore
      }
    });
  } catch (err) {
    console.error('Error fetching public gallery:', err);
    res.status(500).json({ message: 'Error fetching gallery images', success: false });
  }
};

export const getPublicNotices = async (req, res) => {
  try {
    const notices = await Notice.find({ isPublished: true }).sort({ createdAt: -1 }).lean();
    res.json(notices);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching notices' });
  }
};

export const getPublicEvents = async (req, res) => {
  try {
    const events = await Event.find({ isPublished: true }).sort({ createdAt: -1 }).lean();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching events' });
  }
};

export const getPublicAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.find({ isPublished: true }).sort({ createdAt: -1 }).lean();
    res.json(achievements);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching achievements' });
  }
};

export const getPublicFacilities = async (req, res) => {
  try {
    const facilities = await Facility.find({ isActive: true }).sort({ displayOrder: 1, createdAt: 1 }).lean();
    res.json(facilities);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching facilities' });
  }
};

export const getPublicAcademics = async (req, res) => {
  try {
    let academics = await Academics.findOne().lean();
    if (!academics) academics = new Academics();
    res.json(academics);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching academics data' });
  }
};

export const getPublicAdmissions = async (req, res) => {
  try {
    let admissions = await Admissions.findOne().lean();
    if (!admissions) admissions = new Admissions();
    res.json(admissions);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching admissions data' });
  }
};

export const getPublicContactSettings = async (req, res) => {
  try {
    let settings = await ContactSettings.findOne().lean();
    if (!settings) settings = new ContactSettings();
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching contact settings' });
  }
};
