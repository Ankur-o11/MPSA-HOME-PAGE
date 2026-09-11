import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    date: { type: String, required: true },
    time: { type: String, default: '' },
    location: { type: String, default: '' },
    image: { type: String, required: true },
    description: { type: String, required: true },
    isUpcoming: { type: Boolean, default: true },
    isPublished: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model('Event', eventSchema);
