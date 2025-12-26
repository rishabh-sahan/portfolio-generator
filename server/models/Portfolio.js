import mongoose from 'mongoose';

const SocialLinksSchema = new mongoose.Schema({
  linkedin: { type: String, default: '' },
  github: { type: String, default: '' },
  twitter: { type: String, default: '' },
  website: { type: String, default: '' }
}, { _id: false });

const PersonalInfoSchema = new mongoose.Schema({
  fullName: { type: String, default: '' },
  title: { type: String, default: '' },
  email: { type: String, default: '' },
  phone: { type: String, default: '' },
  location: { type: String, default: '' },
  summary: { type: String, default: '' },
  avatarUrl: { type: String, default: '' },
  socials: { type: SocialLinksSchema, default: () => ({}) }
}, { _id: false });

const EducationSchema = new mongoose.Schema({
  id: { type: String, required: true },
  institution: { type: String, default: '' },
  degree: { type: String, default: '' },
  startDate: { type: String, default: '' },
  endDate: { type: String, default: '' },
  grade: { type: String, default: '' }
}, { _id: false });

const SkillSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, default: '' },
  category: { 
    type: String, 
    enum: ['Frontend', 'Backend', 'Tools', 'Soft Skills', 'Other'],
    default: 'Other'
  },
  proficiency: { 
    type: String, 
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
  }
}, { _id: false });

const ProjectSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  technologies: [{ type: String }],
  repoLink: { type: String, default: '' },
  demoLink: { type: String, default: '' },
  imageUrl: { type: String, default: '' }
}, { _id: false });

const ExperienceSchema = new mongoose.Schema({
  id: { type: String, required: true },
  company: { type: String, default: '' },
  role: { type: String, default: '' },
  location: { type: String, default: '' },
  startDate: { type: String, default: '' },
  endDate: { type: String, default: '' },
  current: { type: Boolean, default: false },
  description: { type: String, default: '' }
}, { _id: false });

const PortfolioSchema = new mongoose.Schema({
  userId: { 
    type: String, 
    required: true, 
    unique: true,
    index: true 
  },
  userEmail: { type: String },
  personalInfo: { type: PersonalInfoSchema, default: () => ({}) },
  education: [EducationSchema],
  experience: [ExperienceSchema],
  projects: [ProjectSchema],
  skills: [SkillSchema],
  theme: { 
    type: String, 
    enum: ['modern', 'minimal', 'bold', 'elegant', 'tech', 'creative'],
    default: 'modern'
  }
}, { 
  timestamps: true 
});

export default mongoose.model('Portfolio', PortfolioSchema);
