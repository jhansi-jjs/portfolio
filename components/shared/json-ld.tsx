import * as React from 'react';

export function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Jhansi',
    jobTitle: 'AI/ML Engineer & Full-Stack Developer',
    description:
      '3rd-year CSE-AI student building speaker-adaptive Visual Speech Recognition (VSR) and neural model compression pipelines.',
    url: 'https://jhansi-dev.vercel.app',
    email: 'suggujhansi@gmail.com',
    sameAs: ['https://github.com/jhansi-jjs'],
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Computer Science & Engineering (Artificial Intelligence)',
    },
    knowsAbout: [
      'Artificial Intelligence',
      'Machine Learning',
      'Visual Speech Recognition',
      'PyTorch',
      'Computer Vision',
      'Next.js',
      'TypeScript',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
