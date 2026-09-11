import mongoose from 'mongoose';

const timelineItemSchema = new mongoose.Schema({
  stage: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  year: { type: String, default: '' }
});

const founderGallerySchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  caption: { type: String, default: '' },
  date: { type: String, default: '' }
});

const founderSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, default: 'Shri [Founder Name Placeholder]' },
    designation: { type: String, default: 'Founder & Visionary Chairman, MPSA School' },
    photo: { type: String, default: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800&auto=format&fit=crop' },
    intro: { type: String, default: 'A visionary educator and philanthropist...' },
    visionQuote: { type: String, default: 'Education is the greatest light that can ignite a human mind...' },
    storyText: { type: String, default: 'The journey of Maharana Pratap Science Academy began with a deep conviction...' },
    timeline: [timelineItemSchema],
    gallery: [founderGallerySchema]
  },
  { timestamps: true }
);

export default mongoose.model('Founder', founderSchema);
