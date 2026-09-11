import mongoose from 'mongoose';

const principalSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, default: 'Dr. [Principal Name Placeholder]' },
    designation: { type: String, default: 'Principal, MPSA School' },
    photo: { type: String, default: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop' },
    qualifications: { type: String, default: 'Ph.D., M.Sc., B.Ed.' },
    experience: { type: String, default: '18+ Years in Education' },
    messageQuote: { type: String, default: 'At Maharana Pratap Science Academy, we view education as a transformative journey...' },
    fullMessage: { type: String, default: 'Dear Parents, Guardians, and Dearest Students...' },
    educationalVision: { type: String, default: 'Fostering conceptual clarity, hands-on scientific research...' }
  },
  { timestamps: true }
);

export default mongoose.model('Principal', principalSchema);
