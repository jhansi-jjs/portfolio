'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { aboutNarrative, experienceTimeline } from '@/content/about';
import { GraduationCap, Briefcase, Cpu, Award } from 'lucide-react';

export function About() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 max-w-5xl mx-auto border-t border-zinc-800/60">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5 }}
        className="space-y-12"
      >
        {/* Section Heading */}
        <div className="space-y-2">
          <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider">01. About Me</div>
          <h2 className="text-3xl font-bold text-zinc-100">{aboutNarrative.headline}</h2>
        </div>

        {/* Narrative Box */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-zinc-300 leading-relaxed font-normal">
          <div className="bg-zinc-900/60 border border-zinc-800 p-6 rounded-xl space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold">
              <Cpu className="w-4 h-4" />
              AI & Speech Research
            </div>
            <p>{aboutNarrative.bioParagraph1}</p>
          </div>

          <div className="bg-zinc-900/60 border border-zinc-800 p-6 rounded-xl space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold">
              <Briefcase className="w-4 h-4" />
              Full-Stack & Systems
            </div>
            <p>{aboutNarrative.bioParagraph2}</p>
          </div>
        </div>

        {/* Timeline Component */}
        <div className="space-y-6 pt-4">
          <h3 className="text-xl font-bold text-zinc-200 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-emerald-400" />
            Milestones & Experience
          </h3>

          <div className="relative border-l border-zinc-800 ml-4 space-y-8 pl-6">
            {experienceTimeline.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="relative group"
              >
                {/* Bullet node */}
                <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-zinc-950 border-2 border-emerald-400 group-hover:bg-emerald-400 transition-colors" />

                <div className="bg-zinc-900/40 hover:bg-zinc-900/80 border border-zinc-800/80 p-5 rounded-lg transition-colors space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className="text-sm font-bold text-zinc-100">{item.title}</h4>
                    <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/50">
                      {item.year}
                    </span>
                  </div>

                  <div className="text-xs font-medium text-zinc-400">{item.organization}</div>
                  <p className="text-xs text-zinc-300 leading-relaxed">{item.description}</p>

                  {item.tags && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono text-zinc-400 bg-zinc-800/60 px-2 py-0.5 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
