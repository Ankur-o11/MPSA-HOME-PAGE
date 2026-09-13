import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    date: { type: String, required: true },
    time: { type: String, default: '' },
    location: { type: String, default: '' },
    category: { type: String, default: 'General' },
    image: { type: String, required: true },
    photos: {
      type: [
        {
          url: { type: String, required: true },
          caption: { type: String, default: '' },
          displayOrder: { type: Number, default: 0 }
        }
      ],
      default: []
    },
    description: { type: String, required: true },
    displayOrder: { type: Number, default: 0 },
    isUpcoming: { type: Boolean, default: true },
    isPublished: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model('Event', eventSchema);
