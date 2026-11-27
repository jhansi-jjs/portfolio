'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Brain, Eye, Cpu, Code2 } from 'lucide-react';

export function AnimatedAvatar() {
  const [imgSrc, setImgSrc] = React.useState('/jhansi-professional.png');

  return (
    <div className="flex flex-col items-center justify-center space-y-5 max-w-xl mx-auto w-full">
      {/* Portrait Container */}
      <div className="relative flex items-center justify-center">
        {/* Ambient Back Glow */}
        <div className="absolute -inset-3 bg-gradient-to-tr from-emerald-500/25 via-teal-500/15 to-indigo-500/20 rounded-full blur-2xl opacity-75 pointer-events-none" />

        {/* Outer Circular Ring with subtle breathing motion */}
        <motion.div
          animate={{ y: [-3, 3, -3] }}
          transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
          className="relative z-10 w-44 h-44 sm:w-52 sm:h-52 rounded-full p-1 bg-gradient-to-b from-emerald-500/60 via-zinc-800 to-zinc-950 shadow-2xl border border-emerald-500/40"
        >
          {/* Inner Photo Frame */}
          <div className="w-full h-full rounded-full overflow-hidden bg-zinc-950 relative border-2 border-zinc-900 shadow-inner">
            <Image
              src={imgSrc}
              alt="Jhansi Lakshmi — AI/ML Engineer & Researcher"
              fill
              sizes="(max-width: 640px) 176px, 208px"
              className="object-cover object-top hover:scale-105 transition-transform duration-500"
              priority
              onError={() => {
                setImgSrc('/jhansi-original.png');
              }}
            />
          </div>

          {/* Live Status Pill at bottom of portrait */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-zinc-950/95 border border-emerald-500/60 shadow-xl flex items-center gap-1.5 whitespace-nowrap z-20">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="w-2 h-2 rounded-full bg-emerald-400 -ml-3.5" />
            <span className="text-[11px] font-mono font-semibold text-emerald-300">
              Building AI Systems
            </span>
          </div>
        </motion.div>
      </div>

      {/* Focus & Specialty Badges: Neatly arranged in a clean row so NO text ever goes behind the image */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex flex-wrap items-center justify-center gap-2 pt-2 px-2 max-w-lg"
      >
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900/90 border border-zinc-800 text-[11px] font-mono text-zinc-300 shadow-sm hover:border-emerald-500/40 transition-colors">
          <Eye className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>Healthcare AI & Vision</span>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900/90 border border-zinc-800 text-[11px] font-mono text-zinc-300 shadow-sm hover:border-emerald-500/40 transition-colors">
          <Cpu className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span>Visual Speech Recognition</span>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900/90 border border-zinc-800 text-[11px] font-mono text-zinc-300 shadow-sm hover:border-emerald-500/40 transition-colors">
          <Brain className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
          <span>Model Compression & PyTorch</span>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900/90 border border-zinc-800 text-[11px] font-mono text-zinc-300 shadow-sm hover:border-emerald-500/40 transition-colors">
          <Code2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>Next.js 15 & Full-Stack</span>
        </div>
      </motion.div>
    </div>
  );
}
