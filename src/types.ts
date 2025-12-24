export interface SocialLinks {
  linkedin?: string;
  github?: string;
  twitter?: string;
  website?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  grade?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Tools' | 'Soft Skills' | 'Other';
  proficiency: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  repoLink?: string;
  demoLink?: string;
  imageUrl?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  location?: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface PersonalInfo {
  fullName: string;
  title: string;
  email: string;
  phone?: string;
  location?: string;
  summary: string;
  avatarUrl?: string;
  socials: SocialLinks;
}

export type Theme = 'modern' | 'minimal' | 'bold' | 'elegant' | 'tech' | 'creative';

export interface PortfolioData {
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  projects: Project[];
  skills: Skill[];
  theme: Theme;
}

export const initialPortfolioData: PortfolioData = {
  personalInfo: {
    fullName: '',
    title: '',
    email: '',
    summary: '',
    socials: {}
  },
  education: [],
  experience: [],
  projects: [],
  skills: [],
  theme: 'modern'
};
