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
    title: 'Speaker-Adaptive Visual Speech Recognition (VSR) Research',
    category: 'Research',
    date: '2025 - Present',
    status: 'Conference Paper (Ongoing)',
    description:
      'Designing deep 3D-CNN and Transformer neural networks for dysarthric lip-reading adaptation.',
    metrics: 'IEEE / Springer Conference Target',
  },
  {
    id: 'ach-road-accident',
    title: 'Road Accident Severity & Predictive ML Analytics',
    category: 'Research',
    date: '2025 - Present',
    status: 'Conference Paper (Ongoing)',
    description:
      'Predictive machine learning analytics and severity classification model for road safety optimization.',
    metrics: 'Conference Paper In Progress',
  },
  {
    id: 'ach-model-compression',
    title: 'MNIST Neural Network Model Compression Benchmark',
    category: 'Research',
    date: '2024 - Present',
    status: 'Ongoing',
    description:
      'Implementing 8-bit quantization, weight pruning, and model efficiency optimizations in PyTorch.',
    metrics: '70%+ compression benchmark',
  },
  {
    id: 'ach-nitrostack-hackathon',
    title: 'NitroStack MCP Hackathon Participant',
    category: 'Hackathon',
    date: '2025',
    status: 'Completed',
    description:
      'Built Model Context Protocol (MCP) integrations connecting AI agents with localized execution tools.',
  },
];
