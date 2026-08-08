export interface TimelineItem {
  id: string;
  year: string;
  title: string;
  organization: string;
  description: string;
  tags?: string[];
}

export const aboutNarrative = {
  headline: 'Engineering AI models that listen, speak, and optimize.',
  bioParagraph1:
    'I am a 3rd-year Computer Science & Engineering (AI) student specializing in deep learning, speech processing, and model efficiency. My core research focuses on Speaker-Adaptive Visual Speech Recognition (VSR) — enabling machine vision to decode silent lip movements into coherent text across diverse speech patterns.',
  bioParagraph2:
    'Beyond ML research, I engineer production full-stack systems using Next.js, PyTorch, and cloud pipelines. Whether quantizing neural networks for low-latency edge deployment or orchestrating real-time web engines, I care deeply about clean architecture, performance, and real-world impact.',
};

export const experienceTimeline: TimelineItem[] = [
  {
    id: 'vsr-research',
    year: '2025 - Present',
    title: 'Lead Researcher & Developer — Dysarthric VSR',
    organization: 'Speaker-Adaptive Visual Speech Recognition Project',
    description:
      'Engineered an end-to-end lip-reading system adapting deep neural feature extraction to impaired dysarthric speech patterns, achieving high data efficiency.',
    tags: ['PyTorch', 'Computer Vision', 'Deep Learning', 'VSR'],
  },
  {
    id: 'gig-protector',
    year: '2025',
    title: 'Creator — Gig Protector Pro',
    organization: 'AI Security & Fraud Detection Platform',
    description:
      'Built a full-stack AI platform detecting gig economy fraud, anomaly patterns, and real-time transaction risks.',
    tags: ['TypeScript', 'Next.js', 'Python', 'ML'],
  },
  {
    id: 'mnist-compression',
    year: '2024 - 2025',
    title: 'ML Efficiency & Quantization Benchmark',
    organization: 'Open Source Neural Compression',
    description:
      'Implemented weight pruning, 8-bit quantization, and knowledge distillation pipelines to compress deep learning models with minimal accuracy loss.',
    tags: ['PyTorch', 'Model Compression', 'Quantization'],
  },
  {
    id: 'education-btech',
    year: '2024 - 2028',
    title: 'B.Tech in Computer Science & Engineering (AI)',
    organization: 'University / Institute of Technology',
    description:
      'Specializing in Artificial Intelligence, Neural Networks, Computer Vision, Algorithms, and Software Engineering.',
    tags: ['Artificial Intelligence', 'Algorithms', 'Data Structures'],
  },
];
