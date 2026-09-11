import mongoose from 'mongoose';

const achievementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    year: { type: String, required: true },
    category: { type: String, required: true, default: 'Academic' },
    image: { type: String, required: true },
    description: { type: String, required: true },
    isPublished: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model('Achievement', achievementSchema);
