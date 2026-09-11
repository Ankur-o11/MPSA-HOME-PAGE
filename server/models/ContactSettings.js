import mongoose from 'mongoose';

const contactSettingsSchema = new mongoose.Schema(
  {
    schoolFullName: { type: String, default: 'MAHARANA PRATAP SCIENCE ACADEMY' },
    schoolShortName: { type: String, default: 'MPSA School' },
    tagline: { type: String, default: 'Learning Today, Leading Tomorrow' },
    address: { type: String, default: 'Maharana Pratap Science Academy Campus, Educational Belt, District Centre, State - 000000 (Placeholder)' },
    landmark: { type: String, default: 'Near Science Park & Knowledge Enclave' },
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
    seoTitle: { type: String, default: 'Maharana Pratap Science Academy | MPSA School' },
    seoDescription: { type: String, default: 'Official public website of Maharana Pratap Science Academy (MPSA School).' }
  },
  { timestamps: true }
);

export default mongoose.model('ContactSettings', contactSettingsSchema);
