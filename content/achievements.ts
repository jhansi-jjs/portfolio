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
    id: 'ach-fundus',
    title: 'Track 2B Healthcare AI Challenge — Retinal Segmentation',
    category: 'Research',
    date: '2026',
    status: 'Completed',
    description:
      'Developed deep domain-adaptive optic disc and cup segmentation models for clinical healthcare imaging.',
    metrics: 'Healthcare AI Track 2B',
    link: 'https://github.com/jhansi-jjs/fundus-domain-gen',
  },
  {
    id: 'ach-amazon-ml',
    title: 'Amazon ML Challenge 2026 — Business Entity Resolution',
    category: 'Competitive Programming',
    date: '2026',
    status: 'Completed',
    description:
      'Engineered an end-to-end record linkage and commercial entity deduplication pipeline for massive catalog datasets.',
    metrics: 'Amazon ML Challenge',
    link: 'https://github.com/jhansi-jjs/business-entity-resolution',
  },
  {
    id: 'ach-vsr-paper',
    title: 'Speaker-Adaptive Visual Speech Recognition (VSR) Research',
    category: 'Research',
    date: '2025 - Present',
    status: 'Conference Paper (Ongoing)',
    description:
      'Designing deep 3D-CNN and Transformer neural networks for dysarthric lip-reading adaptation.',
    metrics: 'Targeting IEEE / Springer Publication',
    link: 'https://github.com/jhansi-jjs/vsr-dysarthric-project',
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
    link: 'https://github.com/jhansi-jjs/road-accident-ml-project',
  },
  {
    id: 'ach-model-compression',
    title: 'Neural Network Model Compression & Quantization Benchmark',
    category: 'Research',
    date: '2024 - Present',
    status: 'Ongoing',
    description:
      'Implementing 8-bit quantization, structured weight pruning, and model efficiency optimizations in PyTorch.',
    metrics: '>70% compression benchmark',
    link: 'https://github.com/jhansi-jjs/mnist-model-compression',
  },
  {
    id: 'ach-mozilla-hackarena',
    title: 'Mozilla.ai HackerArena 2.0 — TrustRAG AI Agent',
    category: 'Hackathon',
    date: '2025',
    status: 'Completed',
    description:
      'Built a privacy-first Retrieval-Augmented Generation agent with verifiable citations and local offline execution.',
    metrics: 'Mozilla.ai HackerArena 2.0',
    link: 'https://github.com/jhansi-jjs/hackarena-cracked-',
  },
];
