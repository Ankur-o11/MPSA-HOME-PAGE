import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import dns from 'dns';

import Admin from './models/Admin.js';
import Teacher from './models/Teacher.js';
import Principal from './models/Principal.js';
import Founder from './models/Founder.js';
import Gallery from './models/Gallery.js';
import Notice from './models/Notice.js';
import Event from './models/Event.js';
import Achievement from './models/Achievement.js';
import Facility from './models/Facility.js';
import Academics from './models/Academics.js';
import Admissions from './models/Admissions.js';
import ContactSettings from './models/ContactSettings.js';

import { teachersData } from '../src/data/teachers.js';
import { noticesData } from '../src/data/notices.js';
import { upcomingEvents, previousEvents } from '../src/data/events.js';
import { achievementsData } from '../src/data/achievements.js';
import { facilitiesData } from '../src/data/facilities.js';
import { galleryData } from '../src/data/gallery.js';
import { SCHOOL_CONFIG } from '../src/data/config.js';

dotenv.config({ path: path.join(process.cwd(), '.env') });

// Fix Windows DNS resolution issue for MongoDB Atlas SRV lookup
if (dns.setDefaultResultOrder) {
  dns.setDefaultResultOrder('ipv4first');
}
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {
  // fallback if setServers not supported
}

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.error('Seed Error: MONGODB_URI environment variable is missing.');
      process.exit(1);
    }

    const conn = await mongoose.connect(mongoUri, { dbName: 'mpsa_home_page' });
    console.log(`[Seed Script] Connected to MongoDB Atlas.`);
    console.log(`[Seed Script] Active Database Target: "${conn.connection.name}"`);

    if (conn.connection.name !== 'mpsa_home_page') {
      console.warn(`[Seed Warning] Target database is "${conn.connection.name}" instead of "mpsa_home_page".`);
    }

    // 1. Seed Super Admin
    const adminEmail = (process.env.ADMIN_EMAIL || 'admin@mpsaschool.edu.in').toLowerCase().trim();
    const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@MPSA2026!';
    const adminName = process.env.ADMIN_NAME || 'MPSA Administrator';

    let admin = await Admin.findOne({ email: adminEmail });
    if (!admin) {
      const passwordHash = await Admin.hashPassword(adminPassword);
      admin = new Admin({
        name: adminName,
        email: adminEmail,
        passwordHash,
        role: 'super_admin'
      });
      await admin.save();
      console.log(`[Admin] Initial Super Admin created successfully.`);
    } else {
      console.log(`[Admin] Super Admin account already exists.`);
    }

    // 2. Seed Teachers
    const teacherCount = await Teacher.countDocuments();
    if (teacherCount === 0) {
      const formattedTeachers = teachersData.map((t, idx) => ({
        customId: t.id,
        name: t.name,
        designation: t.designation,
        photo: t.photo,
        qualifications: t.qualifications,
        subject: t.subject,
        classes: t.classes,
        classGroup: t.classGroup,
        experience: t.experience,
        bioShort: t.bioShort,
        bioFull: t.bioFull,
        email: t.email,
        officeHours: t.officeHours,
        displayOrder: idx + 1,
        isActive: true
      }));
      await Teacher.insertMany(formattedTeachers);
      console.log(`[Teachers] Seeded ${formattedTeachers.length} initial faculty members.`);
    }

    // 3. Seed Principal
    const principalCount = await Principal.countDocuments();
    if (principalCount === 0) {
      await Principal.create({
        name: 'Dr. [Principal Name Placeholder]',
        designation: 'Principal, MPSA School',
        photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop',
        qualifications: 'Ph.D., M.Sc., B.Ed.',
        experience: '18+ Years in Education',
        messageQuote: 'At Maharana Pratap Science Academy, we view education as a transformative journey. Our objective is not only to prepare students for examinations, but to equip them with wisdom, resilience, scientific curiosity, and moral courage.',
        fullMessage: 'Dear Parents, Guardians, and Dearest Students,\n\nIt is my privilege to welcome you to MAHARANA PRATAP SCIENCE ACADEMY (MPSA School). As an educational institution focused on scientific excellence, our fundamental purpose is to foster an environment where curiosity thrives and excellence becomes a habit.',
        educationalVision: 'Fostering conceptual clarity, laboratory research, athletic endeavors, and moral discipline across all classes.'
      });
      console.log('[Principal] Seeded initial Principal profile.');
    }

    // 4. Seed Founder
    const founderCount = await Founder.countDocuments();
    if (founderCount === 0) {
      await Founder.create({
        name: 'Shri [Founder Name Placeholder]',
        designation: 'Founder & Visionary Chairman, MPSA School',
        photo: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800&auto=format&fit=crop',
        intro: 'A visionary educator and philanthropist who dedicated life to building an institution where children receive quality science education, strong moral discipline, and character building.',
        visionQuote: 'Education is the greatest light that can ignite a human mind. When we teach a child science with values, we build not just a professional, but a nation builder.',
        storyText: 'The journey of Maharana Pratap Science Academy began with a deep conviction — that every child deserves access to high-caliber scientific education combined with character discipline.',
        timeline: [
          { stage: 'Milestone 1', title: 'The School Dream', description: 'Conceptualization of MPSA School as a specialized science & value education public school.', year: '[Year Placeholder]' },
          { stage: 'Milestone 2', title: 'Foundation of the Academy', description: 'Inauguration of main academic block and first science laboratory.', year: '[Year Placeholder]' },
          { stage: 'Milestone 3', title: 'First Students Batch', description: 'Welcoming pioneer batch of students with a dedicated faculty team.', year: '[Year Placeholder]' },
          { stage: 'Milestone 4', title: 'Growth & Expansion', description: 'Expansion into Senior Secondary Science streams and robotics labs.', year: '[Year Placeholder]' }
        ],
        gallery: [
          { title: 'Founder Portrait', image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800&auto=format&fit=crop', caption: 'Founder Visionary of MPSA School', date: 'Archive' },
          { title: 'Foundation Ceremony', image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=800&auto=format&fit=crop', caption: 'Foundation Ceremony', date: 'Milestone Year' }
        ]
      });
      console.log('[Founder] Seeded initial Founder profile.');
    }

    // 5. Seed Gallery
    const galleryCount = await Gallery.countDocuments();
    if (galleryCount === 0) {
      await Gallery.insertMany(galleryData);
      console.log(`[Gallery] Seeded ${galleryData.length} initial gallery items.`);
    }

    // 6. Seed Notices
    const noticesCount = await Notice.countDocuments();
    if (noticesCount === 0) {
      await Notice.insertMany(noticesData);
      console.log(`[Notices] Seeded ${noticesData.length} initial notices.`);
    }

    // 7. Seed Events
    const eventsCount = await Event.countDocuments();
    if (eventsCount === 0) {
      const allEvents = [
        ...upcomingEvents.map(e => ({ ...e, isUpcoming: true })),
        ...previousEvents.map(e => ({ ...e, isUpcoming: false }))
      ];
      await Event.insertMany(allEvents);
      console.log(`[Events] Seeded ${allEvents.length} initial events.`);
    }

    // 8. Seed Achievements
    const achievementsCount = await Achievement.countDocuments();
    if (achievementsCount === 0) {
      await Achievement.insertMany(achievementsData);
      console.log(`[Achievements] Seeded ${achievementsData.length} initial achievements.`);
    }

    // 9. Seed Facilities
    const facilityCount = await Facility.countDocuments();
    if (facilityCount === 0) {
      await Facility.insertMany(facilitiesData);
      console.log(`[Facilities] Seeded ${facilitiesData.length} initial facilities.`);
    }

    // 10. Seed Academics
    const academicsCount = await Academics.countDocuments();
    if (academicsCount === 0) {
      await Academics.create({});
      console.log('[Academics] Seeded initial Academics record.');
    }

    // 11. Seed Admissions
    const admissionsCount = await Admissions.countDocuments();
    if (admissionsCount === 0) {
      await Admissions.create({
        sessionYear: SCHOOL_CONFIG.admissionSession,
        isOpen: true,
        processSteps: [
          { stepNumber: 1, title: 'Online Registration', description: 'Fill out online enquiry form or visit admission counter.' },
          { stepNumber: 2, title: 'Assessment Test', description: 'Aptitude test in English, Math & Science for Middle & Secondary.' },
          { stepNumber: 3, title: 'Document Verification', description: 'Submit TC, Birth Certificate, and Marksheet.' },
          { stepNumber: 4, title: 'Fee Payment & Enrollment', description: 'Confirmation of admission and issue of student slip.' }
        ],
        requiredDocuments: [
          'Birth Certificate Photocopy',
          'Original Transfer Certificate (TC)',
          'Previous Class Mark Sheet',
          'Passport Photographs'
        ]
      });
      console.log('[Admissions] Seeded initial Admissions record.');
    }

    // 12. Seed Contact Settings
    const contactCount = await ContactSettings.countDocuments();
    if (contactCount === 0) {
      await ContactSettings.create({
        schoolFullName: SCHOOL_CONFIG.fullName,
        schoolShortName: SCHOOL_CONFIG.shortName,
        tagline: SCHOOL_CONFIG.tagline,
        address: SCHOOL_CONFIG.address,
        landmark: SCHOOL_CONFIG.landmark,
        phonePrimary: SCHOOL_CONFIG.phonePrimary,
        phoneSecondary: SCHOOL_CONFIG.phoneSecondary,
        emailGeneral: SCHOOL_CONFIG.emailGeneral,
        emailAdmissions: SCHOOL_CONFIG.emailAdmissions,
        timingOffice: SCHOOL_CONFIG.timingOffice,
        googleMapsEmbedUrl: SCHOOL_CONFIG.GOOGLE_MAPS_EMBED_URL,
        googleMapsDirectionUrl: SCHOOL_CONFIG.GOOGLE_MAPS_DIRECTION_URL
      });
      console.log('[ContactSettings] Seeded initial Contact Settings record.');
    }

    console.log('[Seed Script] Database setup completed successfully.');
    process.exit(0);
  } catch (error) {
    console.error('[Seed Error] Failed to seed database:', error.message);
    process.exit(1);
  }
};

seedDatabase();
