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
    organization: 'Computer Vision & Deep Learning Lab',
    period: '2025 - Present',
    type: 'Research',
    description:
      'Designing neural architectures that translate silent video of dysarthric speech movements into decoded text.',
    bullets: [
      'Implemented spatiotemporal 3D-CNN and Transformer feature extractors in PyTorch.',
      'Developed data-efficient fine-tuning pipelines adapting to individual dysarthric articulation patterns.',
      'Targeting upcoming conference publication for dysarthric lip-reading benchmarks.',
    ],
    skills: ['PyTorch', 'Computer Vision', 'Deep Learning', 'Python', 'OpenCV'],
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
  {
    id: 'exp-mnist-compression',
    role: 'Open-Source Developer — Deep Learning Compression',
    organization: 'ML Model Efficiency Project',
    period: '2024 - 2025',
    type: 'Open Source',
    description:
      'Benchmarked neural network compression techniques including 8-bit quantization and structured weight pruning.',
    bullets: [
      'Compressed deep learning model weights by over 70% while maintaining >98% accuracy on benchmark test sets.',
      'Exposed ONNX Runtime export functions for edge device deployment.',
    ],
    skills: ['PyTorch', 'Quantization', 'ONNX', 'Jupyter Notebook'],
  },
];
