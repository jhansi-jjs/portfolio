export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  category: 'AI/ML' | 'Web Development' | 'Data Science' | 'Cloud & DevOps';
  credentialId?: string;
  credentialUrl?: string;
  previewUrl?: string;
  skills: string[];
}

export const certificatesData: Certificate[] = [
  {
    id: 'cert-1',
    title: 'Machine Learning Specialization',
    issuer: 'DeepLearning.AI / Coursera',
    issueDate: '2025',
    category: 'AI/ML',
    credentialId: 'COURSERA-ML-2025',
    skills: ['Supervised Learning', 'Neural Networks', 'Scikit-Learn', 'TensorFlow'],
  },
  {
    id: 'cert-2',
    title: 'Deep Learning & Neural Networks',
    issuer: 'Coursera',
    issueDate: '2025',
    category: 'AI/ML',
    credentialId: 'COURSERA-DL-2025',
    skills: ['PyTorch', 'CNNs', 'Sequence Models', 'Optimization'],
  },
  {
    id: 'cert-3',
    title: 'Full Stack Development with Next.js & React',
    issuer: 'Meta / Professional Certificate',
    issueDate: '2024',
    category: 'Web Development',
    skills: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'REST APIs'],
  },
  {
    id: 'cert-4',
    title: 'Data Science & Predictive Analytics',
    issuer: 'Kaggle / IBM',
    issueDate: '2024',
    category: 'Data Science',
    skills: ['Pandas', 'NumPy', 'Feature Engineering', 'Classification'],
  },
];
