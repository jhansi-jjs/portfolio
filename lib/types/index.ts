export * from './github';

export interface ResumeData {
  name: string;
  headline: string;
  bio: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  education: {
    institution: string;
    degree: string;
    period: string;
    gpa?: string;
  }[];
}

export interface SkillCategory {
  category: string;
  skills: {
    name: string;
    level?: string;
    icon?: string;
  }[];
}
