export interface Achievement {
  id: string;
  title: string;
  category: 'Research' | 'Hackathon' | 'Academic' | 'Competitive Programming';
  date: string;
  status?: string;
  description: string;
  metrics?: string;
  link?: string;
}

export const achievementsData: Achievement[] = [
  {
    id: 'ach-vsr-paper',
    title: 'Speaker-Adaptive Visual Speech Recognition (VSR) Publication',
    category: 'Research',
    date: '2025 - 2026',
    status: 'In Progress / Target Submission',
    description:
      'Research paper on dysarthric lip-reading adaptation using 3D-CNN Transformer architectures.',
    metrics: 'Targeting peer-reviewed IEEE / Springer conference',
  },
  {
    id: 'ach-nitrostack-hackathon',
    title: 'NitroStack MCP Hackathon Participant',
    category: 'Hackathon',
    date: '2025',
    status: 'Completed',
    description:
      'Developed Model Context Protocol (MCP) integrations connecting AI agents with localized execution environments.',
  },
  {
    id: 'ach-model-compression',
    title: 'Neural Network Model Compression Benchmark',
    category: 'Research',
    date: '2025',
    status: 'Achieved',
    description:
      'Achieved 70%+ model size reduction via PyTorch 8-bit quantization with minimal loss in prediction accuracy.',
    metrics: '70% compression ratio',
  },
  {
    id: 'ach-academic-excellence',
    title: 'Top Performer in B.Tech CSE (AI)',
    category: 'Academic',
    date: '2024 - Present',
    status: 'Ongoing',
    description:
      'Maintained consistent high academic standing in core Artificial Intelligence & Algorithms coursework.',
  },
];
