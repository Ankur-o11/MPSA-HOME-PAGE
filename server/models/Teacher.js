import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema(
  {
    customId: { type: String, unique: true },
    name: { type: String, required: true, trim: true },
    designation: { type: String, required: true, trim: true },
    photo: { type: String, required: true },
    qualifications: { type: [String], required: true },
    subject: { type: String, required: true, trim: true },
    classes: { type: String, required: true, trim: true },
    classGroup: { type: String, default: 'Secondary & Sr. Secondary' },
    experience: { type: String, required: true, trim: true },
    bioShort: { type: String, required: true },
    bioFull: { type: String, required: true },
    email: { type: String, default: '' },
    officeHours: { type: String, default: '' },
    displayOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model('Teacher', teacherSchema);
