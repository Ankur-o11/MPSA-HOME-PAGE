import mongoose from 'mongoose';

const faqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true }
});

const admissionsSchema = new mongoose.Schema(
  {
    sessionYear: { type: String, default: '2026–2027' },
    isOpen: { type: Boolean, default: true },
    processSteps: [
      {
        stepNumber: Number,
        title: String,
        description: String
      }
    ],
    requiredDocuments: [String],
    eligibilityNotes: { type: String, default: 'Child should meet minimum age criteria by March 31st of the admission year.' },
    faqs: [faqSchema]
  },
  { timestamps: true }
);

export default mongoose.model('Admissions', admissionsSchema);
