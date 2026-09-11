import mongoose from 'mongoose';

const noticeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    date: { type: String, required: true },
    category: { type: String, required: true, default: 'General' },
    description: { type: String, required: true },
    isImportant: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: true },
    downloadUrl: { type: String, default: '' }
  },
  { timestamps: true }
);

export default mongoose.model('Notice', noticeSchema);
