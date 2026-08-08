'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { achievementsData } from '@/content/achievements';
import { Trophy, Target, Sparkles, BookOpen } from 'lucide-react';

export function Achievements() {
  return (
    <section id="achievements" className="py-20 px-4 sm:px-6 max-w-5xl mx-auto border-t border-zinc-800/60">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="space-y-10"
      >
        {/* Header */}
        <div className="space-y-2">
          <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider">05. Milestones</div>
          <h2 className="text-3xl font-bold text-zinc-100">Achievements & Publication Goals</h2>
          <p className="text-xs text-zinc-400 max-w-xl font-normal">
            Hackathons, research milestones, and active scientific publication targets.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievementsData.map((ach, idx) => (
            <motion.div
              key={ach.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700/80 p-6 rounded-xl transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/60">
                    {ach.category}
                  </span>
                  <span className="text-xs font-mono text-zinc-500">{ach.date}</span>
                </div>

                <h3 className="text-base font-bold text-zinc-100 flex items-center gap-2">
                  {ach.category === 'Research' ? (
                    <BookOpen className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <Trophy className="w-4 h-4 text-amber-400 shrink-0" />
                  )}
                  {ach.title}
                </h3>

                <p className="text-xs text-zinc-300 leading-relaxed font-sans">{ach.description}</p>
              </div>

              {ach.status && (
                <div className="pt-3 border-t border-zinc-800/60 flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-500">Status:</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <Target className="w-3.5 h-3.5" />
                    {ach.status}
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
