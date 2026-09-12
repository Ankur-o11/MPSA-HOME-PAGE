import mongoose from 'mongoose';

const timelineItemSchema = new mongoose.Schema({
  stage: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  year: { type: String, default: '' }
});

const galleryItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  caption: { type: String, default: '' },
  date: { type: String, default: '' }
});

const founderProfileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, default: 'Shri [Founder Name Placeholder]' },
    designation: { type: String, default: 'Founder & Visionary Patron, MPSA School' },
    photo: { type: String, default: '' },
    profession: { type: String, default: 'Visionary Educator & Philanthropist' },
    biography: { type: String, default: 'Founder biography details will be updated here.' },
    intro: { type: String, default: 'Dedicated to establishing an educational institution built on science and moral values.' },
    education: { type: String, default: '' },
    experience: { type: String, default: '' },
    contribution: { type: String, default: 'Laid the foundation of Maharana Pratap Science Academy to provide quality education.' },
    vision: { type: String, default: 'Building nation builders through scientific temper and character discipline.' },
    achievements: { type: String, default: '' },
    visionQuote: { type: String, default: 'Education is the greatest light that can ignite a human mind.' },
    storyText: { type: String, default: 'The journey of Maharana Pratap Science Academy began with a vision to empower students through science and character.' },
    timeline: [timelineItemSchema],
    gallery: [galleryItemSchema]
  },
  { timestamps: true }
);

export default mongoose.model('FounderProfile', founderProfileSchema);
