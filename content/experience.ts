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
  },
  {
    id: 'exp-nitrostack',
    role: 'Hackathon Contributor — NitroStack MCP Ecosystem',
    organization: 'NitroStack MCP Hackathon',
    period: '2025',
    type: 'Hackathon',
    description:
      'Built Model Context Protocol (MCP) integrations connecting custom AI agents with specialized developer tools.',
    bullets: [
      'Created low-latency MCP server endpoints in TypeScript for autonomous coding tools.',
      'Designed structured schema handlers for real-time state synchronization.',
    ],
    skills: ['TypeScript', 'Model Context Protocol (MCP)', 'Node.js', 'JSON-RPC'],
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
  },
];
