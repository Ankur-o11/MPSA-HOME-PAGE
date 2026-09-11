import mongoose from 'mongoose';

const facilitySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, default: 'Infrastructure' },
    image: { type: String, required: true },
    description: { type: String, required: true },
    displayOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model('Facility', facilitySchema);
