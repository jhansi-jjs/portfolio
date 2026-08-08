'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { experienceData } from '@/content/experience';
import { Briefcase, Code, Sparkles } from 'lucide-react';

export function Experience() {
  return (
    <section id="experience" className="py-20 px-4 sm:px-6 max-w-5xl mx-auto border-t border-zinc-800/60">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="space-y-12"
      >
        {/* Header */}
        <div className="space-y-2">
          <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider">02. Work & Research</div>
          <h2 className="text-3xl font-bold text-zinc-100">Experience & Contributions</h2>
          <p className="text-xs text-zinc-400 max-w-xl font-normal">
            Research projects, hackathons, and open-source contributions.
          </p>
        </div>

        {/* Timeline List */}
        <div className="space-y-8">
          {experienceData.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700/80 p-6 rounded-xl transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800/60 pb-3">
                <div>
                  <h3 className="text-base font-bold text-zinc-100 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-emerald-400" />
                    {exp.role}
                  </h3>
                  <div className="text-xs font-mono text-zinc-400 mt-0.5">{exp.organization}</div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 px-2.5 py-1 rounded-full">
                    {exp.type}
                  </span>
                  <span className="text-xs font-mono text-zinc-500">{exp.period}</span>
                </div>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed font-sans">{exp.description}</p>

              {/* Bullet Points */}
              <ul className="space-y-1.5 text-xs text-zinc-400 font-sans list-disc list-inside">
                {exp.bullets.map((b, i) => (
                  <li key={i} className="leading-relaxed">
                    {b}
                  </li>
                ))}
              </ul>

              {/* Skill Badges */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {exp.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-[10px] font-mono text-zinc-400 bg-zinc-950 px-2 py-0.5 rounded border border-zinc-800"
                  >
                    {skill}
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
