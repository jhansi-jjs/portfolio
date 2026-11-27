export interface ExperienceEntry {
  id: string;
  role: string;
  organization: string;
  location?: string;
  period: string;
  type: 'Research' | 'Hackathon' | 'Open Source' | 'Project';
  description: string;
  bullets: string[];
  skills: string[];
  link?: string;
}

export const experienceData: ExperienceEntry[] = [
  {
    id: 'exp-fundus',
    role: 'Deep Learning Researcher — Retinal Optic Disc & Cup Segmentation',
    organization: 'Deep Learning for Healthcare Challenge (Track 2B)',
    period: '2026',
    type: 'Research',
    description:
      'Engineered cross-domain generalization deep learning models for segmenting retinal optic discs and optic cups across varying ophthalmic cameras and imaging sources.',
    bullets: [
      'Implemented domain-invariant feature extractors reducing source-to-target domain gap in medical fundus images.',
      'Achieved robust Dice coefficient scores across heterogeneous clinical imaging datasets.',
    ],
    skills: ['PyTorch', 'Medical Imaging', 'Domain Adaptation', 'Computer Vision', 'Deep Learning'],
    link: 'https://github.com/jhansi-jjs/fundus-domain-gen',
  },
  {
    id: 'exp-amazon-ml',
    role: 'Machine Learning Engineer — Business Entity Resolution',
    organization: 'Amazon ML Challenge 2026',
    period: '2026',
    type: 'Research',
    description:
      'Engineered an enterprise-grade record linkage and business entity deduplication pipeline processing millions of commercial entity records.',
    bullets: [
      'Constructed indexing and blocking algorithms to drastically reduce pair-comparison search spaces.',
      'Designed text similarity ensembles (Levenshtein, Jaro-Winkler, TF-IDF cosine) feeding supervised classification models.',
    ],
    skills: ['Python', 'Scikit-Learn', 'Pandas', 'Entity Resolution', 'NLP'],
    link: 'https://github.com/jhansi-jjs/business-entity-resolution',
  },
  {
    id: 'exp-vsr',
    role: 'Lead Researcher — Speaker-Adaptive Visual Speech Recognition',
    organization: 'Speaker-Adaptive Visual Speech Recognition Project',
    period: '2025 - Present (Ongoing)',
    type: 'Research',
    description:
      'Designing neural architectures that translate silent video of dysarthric speech movements into decoded text.',
    bullets: [
      'Implemented spatiotemporal 3D-CNN and Transformer feature extractors in PyTorch.',
      'Developed data-efficient fine-tuning pipelines adapting to individual dysarthric articulation patterns.',
      'Targeting upcoming IEEE/Springer conference publication for dysarthric lip-reading benchmarks.',
    ],
    skills: ['PyTorch', 'Computer Vision', 'Deep Learning', 'Python', 'OpenCV'],
    link: 'https://github.com/jhansi-jjs/vsr-dysarthric-project',
  },
  {
    id: 'exp-road-accident',
    role: 'ML Researcher — Road Accident Severity Classification',
    organization: 'Road Accident ML Analytics Project',
    period: '2025 - Present (Ongoing)',
    type: 'Research',
    description:
      'Developed predictive analytics and classification models for road accident severity prediction.',
    bullets: [
      'Engineered machine learning pipelines for multi-class accident severity evaluation.',
      'Conference paper submission currently ongoing.',
    ],
    skills: ['Python', 'Scikit-Learn', 'Machine Learning', 'Data Science'],
    link: 'https://github.com/jhansi-jjs/road-accident-ml-project',
  },
  {
    id: 'exp-gig-protector',
    role: 'Creator & Lead Engineer — Gig Protector Pro',
    organization: 'AI Security Suite',
    period: '2025',
    type: 'Project',
    description:
      'Engineered an intelligent fraud detection and anomaly analysis engine for gig economy workers and platforms.',
    bullets: [
      'Architected full-stack Next.js dashboard with real-time risk scoring visualizers.',
      'Built scikit-learn anomaly detection pipelines for transaction pattern analysis.',
    ],
    skills: ['Next.js 15', 'TypeScript', 'Python', 'Scikit-Learn', 'Tailwind CSS'],
    link: 'https://github.com/jhansi-jjs/gig-protector-pro',
  },
  {
    id: 'exp-mnist-compression',
    role: 'ML Efficiency Researcher — Deep Neural Network Compression',
    organization: 'Neural Model Compression Engine',
    period: '2024 - Present (Ongoing)',
    type: 'Research',
    description:
      'Benchmarking neural network compression techniques including 8-bit quantization and structured weight pruning.',
    bullets: [
      'Compressing deep learning model weights with minimal loss in prediction accuracy.',
      'Exposing ONNX Runtime export functions for edge device deployment.',
    ],
    skills: ['PyTorch', 'Quantization', 'ONNX', 'Jupyter Notebook'],
    link: 'https://github.com/jhansi-jjs/mnist-model-compression',
  },
  {
    id: 'exp-viyan',
    role: 'AI Systems Architect — VIYAN Space Traffic Management',
    organization: 'Autonomous Aerospace Agent Suite',
    period: '2025',
    type: 'Project',
    description:
      'Constructed an AI-powered Space Traffic Management server implementing the Model Context Protocol (MCP) for satellite conjunction analysis.',
    bullets: [
      'Exposed real-time orbital trajectory telemetry via standardized MCP tools.',
      'Designed collision risk assessment routines for low-Earth orbit satellites.',
    ],
    skills: ['Python', 'Model Context Protocol (MCP)', 'Astrodynamics', 'AI'],
    link: 'https://github.com/jhansi-jjs/viyan',
  },
];
