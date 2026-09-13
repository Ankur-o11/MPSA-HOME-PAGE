import mongoose from 'mongoose';

const contactSettingsSchema = new mongoose.Schema(
  {
    schoolFullName: { type: String, default: 'MAHARANA PRATAP SCIENCE ACADEMY INTER COLLEGE' },
    schoolShortName: { type: String, default: 'MPSA School' },
    tagline: { type: String, default: 'Learning Today, Leading Tomorrow' },
    address: { type: String, default: 'Maharana Pratap Science Academy Inter College, Chholapur Road, Churkhibal, Jalaun, Uttar Pradesh - 285123, India' },
    landmark: { type: String, default: 'Chholapur Road, Churkhibal, Jalaun' },
    phonePrimary: { type: String, default: '+91 98765 43210' },
    phoneSecondary: { type: String, default: '+91 01234 56789' },
    emailGeneral: { type: String, default: 'info@mpsaschool.edu.in' },
    emailAdmissions: { type: String, default: 'admissions@mpsaschool.edu.in' },
    timingStudents: { type: String, default: 'Monday to Saturday: 8:00 AM – 2:15 PM' },
    timingOffice: { type: String, default: 'Monday to Saturday: 8:00 AM – 4:00 PM' },
    googleMapsEmbedUrl: { type: String, default: '' },
    googleMapsDirectionUrl: { type: String, default: 'https://www.google.com/maps' },
    facebookUrl: { type: String, default: 'https://facebook.com/mpsaschool' },
    instagramUrl: { type: String, default: 'https://instagram.com/mpsaschool' },
    youtubeUrl: { type: String, default: 'https://youtube.com/mpsaschool' },
    logoUrl: { type: String, default: '' },
    heroBannerImage: { type: String, default: '' },
    aboutSectionImage: { type: String, default: '' },
    seoTitle: { type: String, default: 'Maharana Pratap Science Academy Inter College | MPSA School, Jalaun' },
    seoDescription: { type: String, default: 'Maharana Pratap Science Academy Inter College (MPSA School) in Jalaun, Uttar Pradesh. Explore academics, faculty, admissions, facilities, achievements, events and campus information.' }
  },
  { timestamps: true }
);

export default mongoose.model('ContactSettings', contactSettingsSchema);
