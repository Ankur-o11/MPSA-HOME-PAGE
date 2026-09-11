import mongoose from 'mongoose';

const academicsSchema = new mongoose.Schema(
  {
    classesOfferedText: { type: String, default: 'Pre-Primary, Primary (1-5), Middle (6-8), Secondary (9-10), Sr. Secondary Science (11-12)' },
    curriculumText: { type: String, default: 'CBSE pattern science & holistic value curriculum' },
    subjectsOverview: { type: String, default: 'Physics, Chemistry, Mathematics, Biology, Computer Science, English, Hindi, Social Studies' },
    methodologyText: { type: String, default: 'Interactive digital smartboards, practical science labs, experiential project learning' },
    examSystemText: { type: String, default: 'Weekly periodic unit tests, term exams, practical viva, pre-board mock exams' }
  },
  { timestamps: true }
);

export default mongoose.model('Academics', academicsSchema);
