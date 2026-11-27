export interface TimelineItem {
  id: string;
  year: string;
  title: string;
  organization: string;
  description: string;
  tags?: string[];
}

export const aboutNarrative = {
  name: 'Jhansi Lakshmi',
  role: 'AI/ML Researcher & Full-Stack Software Engineer',
  education: '3rd-Year B.Tech in Computer Science & Engineering (Artificial Intelligence), 2024 – 2028 Batch',
  headline: 'Building neural systems that see, adapt, and empower.',
  bioParagraph1:
    "I am Jhansi Lakshmi, a 3rd-year undergraduate in Computer Science & Engineering with an Artificial Intelligence specialization (Batch 2024–2028). My work centers on pushing the boundaries of deep learning and computer vision to solve high-stakes challenges — from speaker-adaptive lip-reading for individuals with dysarthric speech to cross-domain retinal image segmentation for ophthalmic healthcare.",
  bioParagraph2:
    "I'm deeply interested in the full lifecycle of intelligent systems: designing novel neural architectures (PyTorch, 3D-CNNs, Vision Transformers), compressing and quantizing models (8-bit quantization, structured weight pruning) for edge deployment, and constructing scalable, modern full-stack web applications using Next.js 15, TypeScript, and FastAPI.",
  interests: [
    'Deep Learning & Neural Network Architectures (PyTorch, Transformers, 3D-CNNs)',
    'Healthcare AI & Medical Imaging (Retinal Fundus Image Segmentation & Domain Adaptation)',
    'Audio & Speech AI (Visual Speech Recognition / Dysarthric Lip-Reading Adaptation)',
    'Model Optimization & Quantization (8-bit Post-Training Quantization, Pruning, ONNX)',
    'Full-Stack Web Engineering (Next.js 15 App Router, TypeScript, Tailwind CSS, FastAPI)',
    'Agentic AI Systems & Model Context Protocol (MCP Server Development)',
    'Predictive Analytics & Record Linkage (Amazon ML Challenge Entity Resolution)',
  ],
};

export const experienceTimeline: TimelineItem[] = [
  {
    id: 'fundus-healthcare',
    year: '2026',
    title: 'Healthcare AI Researcher — Retinal Optic Disc & Cup Segmentation',
    organization: 'Deep Learning for Healthcare Challenge (Track 2B)',
    description:
      'Engineered cross-domain generalization pipelines for retinal optic disc and cup segmentation under significant imaging source shifts, assisting in glaucoma screening.',
    tags: ['Medical Imaging', 'PyTorch', 'Domain Adaptation', 'Segmentation'],
  },
  {
    id: 'amazon-ml-challenge',
    year: '2026',
    title: 'ML Engineer — Business Entity Resolution',
    organization: 'Amazon ML Challenge 2026',
    description:
      'Designed an enterprise entity deduplication and record linkage pipeline utilizing blocking strategies, fuzzy string distance metrics, and classification ensembles.',
    tags: ['Scikit-Learn', 'Record Linkage', 'NLP', 'Machine Learning'],
  },
  {
    id: 'vsr-research',
    year: '2025 - Present',
    title: 'Lead Researcher — Speaker-Adaptive Visual Speech Recognition',
    organization: 'Speaker-Adaptive Visual Speech Recognition (VSR) Project',
    description:
      'Engineered an end-to-end lip-reading system adapting deep neural feature extraction to impaired dysarthric speech patterns, targeting IEEE/Springer conference publication (Ongoing).',
    tags: ['PyTorch', 'Computer Vision', 'Deep Learning', 'VSR'],
  },
  {
    id: 'road-accident-ml',
    year: '2025 - Present',
    title: 'ML Researcher — Road Accident Severity Prediction',
    organization: 'Road Accident Predictive Analytics (Conference Paper Ongoing)',
    description:
      'Developed ordinal, imbalance-aware machine learning models for road accident severity classification with calibrated uncertainty estimation for urban safety.',
    tags: ['Machine Learning', 'Predictive Analytics', 'XGBoost', 'Safety AI'],
  },
  {
    id: 'gig-protector',
    year: '2025',
    title: 'Creator & Lead Engineer — Gig Protector Pro',
    organization: 'AI Security & Fraud Detection Platform',
    description:
      'Built a full-stack AI security dashboard with real-time risk scoring, fraud anomaly detection algorithms, and interactive telemetry for gig economy workers.',
    tags: ['TypeScript', 'Next.js 15', 'Python', 'Scikit-Learn'],
  },
  {
    id: 'mnist-compression',
    year: '2024 - Present',
    title: 'ML Efficiency Researcher — Deep Neural Network Compression',
    organization: 'Neural Model Compression & Quantization Engine (Ongoing)',
    description:
      'Benchmarking structured weight pruning, 8-bit post-training quantization, and knowledge distillation in PyTorch to compress neural networks with minimal accuracy loss.',
    tags: ['PyTorch', 'Model Compression', 'Quantization', 'ONNX'],
  },
  {
    id: 'education-btech',
    year: '2024 - 2028',
    title: 'B.Tech in Computer Science & Engineering (Artificial Intelligence)',
    organization: 'Undergraduate Degree Program',
    description:
      '3rd-Year student actively specializing in Machine Learning, Deep Neural Networks, Computer Vision, Algorithms, Natural Language Processing, and Software Architecture.',
    tags: ['Artificial Intelligence', 'Data Structures', 'Deep Learning', 'B.Tech'],
  },
];
