import mongoose from 'mongoose';

const aboutSettingsSchema = new mongoose.Schema(
  {
    mainHeading: { type: String, default: 'About Maharana Pratap Science Academy Inter College' },
    mainDescription: { 
      type: String, 
      default: 'MAHARANA PRATAP SCIENCE ACADEMY INTER COLLEGE (MPSA School), located in Jalaun, Uttar Pradesh, is committed to nurturing academic rigor, scientific curiosity, and moral integrity in every student.' 
    },
    aboutImage: { type: String, default: '' },
    visionHeading: { type: String, default: 'Educational Vision' },
    visionText: { type: String, default: 'Empowering young minds through scientific inquiry, moral fortitude, and nation-building values.' },
    missionHeading: { type: String, default: 'Our Mission' },
    missionText: { type: String, default: 'To provide high-caliber science education, modern computer training, state-of-the-art laboratory research, and comprehensive character building.' },
    ethosHeading: { type: String, default: 'Academic Ethos & Discipline' },
    ethosText: { type: String, default: 'Fostering conceptual clarity, athletic endeavor, and moral discipline across all classes from primary through senior secondary levels.' },
    features: {
      type: [
        {
          title: { type: String, required: true },
          icon: { type: String, default: 'CheckCircle2' }
        }
      ],
      default: [
        { title: 'State-of-the-Art Science Labs', icon: 'CheckCircle2' },
        { title: 'Digital Smart Classrooms', icon: 'CheckCircle2' },
        { title: 'Interactive Pedagogy', icon: 'CheckCircle2' },
        { title: 'Disciplined & Value-Based Environment', icon: 'CheckCircle2' }
      ]
    }
  },
  { timestamps: true }
);

export default mongoose.model('AboutSettings', aboutSettingsSchema);
