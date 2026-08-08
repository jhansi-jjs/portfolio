'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { skillsData } from '@/content/skills';
import { Code, Brain, Layout, Server, Wrench } from 'lucide-react';

const categoryIcons: Record<string, React.ReactNode> = {
  'AI / Machine Learning': <Brain className="w-5 h-5 text-emerald-400" />,
  Languages: <Code className="w-5 h-5 text-emerald-400" />,
  'Web & Frameworks': <Layout className="w-5 h-5 text-emerald-400" />,
  'Tools & DevOps': <Wrench className="w-5 h-5 text-emerald-400" />,
};

export function Skills() {
  return (
    <section id="skills" className="py-20 px-4 sm:px-6 max-w-5xl mx-auto border-t border-zinc-800/60">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="space-y-10"
      >
        {/* Section Header */}
        <div className="space-y-2">
          <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider">03. Technical Stack</div>
          <h2 className="text-3xl font-bold text-zinc-100">Skills & Technologies</h2>
        </div>

        {/* Categorized Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillsData.map((category, idx) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700/80 p-6 rounded-xl transition-all space-y-4"
            >
              <div className="flex items-center gap-2.5 font-bold text-zinc-100 text-base">
                {categoryIcons[category.category] || <Server className="w-5 h-5 text-emerald-400" />}
                <span>{category.category}</span>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className="text-xs font-mono text-zinc-300 bg-zinc-950 px-3 py-1.5 rounded-lg border border-zinc-800 hover:border-emerald-500/50 hover:text-emerald-300 transition-colors"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
