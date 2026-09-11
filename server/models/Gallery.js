import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { 
      type: String, 
      required: true,
      enum: ['School', 'Students', 'Events', 'Sports', 'Cultural Activities', 'Educational Trips', 'Competitions', 'Facilities', 'Founder', 'Teachers', 'Other'],
      default: 'School'
    },
    image: { type: String, required: true },
    caption: { type: String, default: '' },
    date: { type: String, default: '' },
    displayOrder: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model('Gallery', gallerySchema);
