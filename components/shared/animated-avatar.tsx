'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Terminal, Brain, Eye, Cpu, GraduationCap, Code2 } from 'lucide-react';

export function AnimatedAvatar() {
  return (
    <div className="relative flex flex-col items-center justify-center p-4">
      {/* Outer ambient glow */}
      <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 via-teal-500/10 to-indigo-500/20 rounded-full blur-2xl opacity-60 pointer-events-none" />

      {/* Main Avatar Container */}
      <motion.div
        animate={{ y: [-4, 6, -4] }}
        transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
        className="relative z-10 w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-gradient-to-b from-zinc-800 via-zinc-900 to-zinc-950 p-1.5 shadow-2xl border border-emerald-500/30"
      >
        {/* Pulsing Ring */}
        <div className="absolute inset-0 rounded-full border-2 border-emerald-400/20 animate-pulse pointer-events-none" />

        {/* SVG Illustration: Developer Girl with Tech Vibe */}
        <div className="w-full h-full rounded-full overflow-hidden bg-zinc-950 flex items-center justify-center relative">
          <svg
            viewBox="0 0 200 200"
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="skin" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fcd34d" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
              <linearGradient id="hair" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e1b4b" />
                <stop offset="50%" stopColor="#0f172a" />
                <stop offset="100%" stopColor="#020617" />
              </linearGradient>
              <linearGradient id="emeraldGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#34d399" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
              <linearGradient id="hoodie" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#064e3b" />
                <stop offset="100%" stopColor="#022c22" />
              </linearGradient>
              <linearGradient id="glasses" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>

            {/* Background Grid Pattern in Avatar */}
            <circle cx="100" cy="100" r="95" fill="#09090b" />
            <path d="M 0 100 H 200 M 100 0 V 200" stroke="#27272a" strokeWidth="0.5" strokeDasharray="4 4" />

            {/* Back Hair */}
            <path
              d="M 50 105 Q 40 160 70 185 Q 100 190 130 185 Q 160 160 150 105 Z"
              fill="url(#hair)"
            />

            {/* Neck */}
            <rect x="88" y="125" width="24" height="22" rx="4" fill="#fbbf24" opacity="0.9" />

            {/* Hoodie / Shoulders */}
            <path
              d="M 40 185 C 45 150 70 142 90 142 C 95 142 105 142 110 142 C 130 142 155 150 160 185 Z"
              fill="url(#hoodie)"
            />
            {/* Hoodie Collar Line */}
            <path d="M 85 144 Q 100 160 115 144" stroke="#10b981" strokeWidth="2" fill="none" />

            {/* Face */}
            <path
              d="M 66 85 C 66 125 78 140 100 140 C 122 140 134 125 134 85 C 134 55 120 46 100 46 C 80 46 66 55 66 85 Z"
              fill="#fed7aa"
            />

            {/* Cheeks blush */}
            <ellipse cx="78" cy="106" rx="6" ry="3" fill="#f87171" opacity="0.3" />
            <ellipse cx="122" cy="106" rx="6" ry="3" fill="#f87171" opacity="0.3" />

            {/* Eyes */}
            <circle cx="82" cy="94" r="3.5" fill="#0f172a" />
            <circle cx="118" cy="94" r="3.5" fill="#0f172a" />
            <circle cx="83.5" cy="92.5" r="1.2" fill="#ffffff" />
            <circle cx="119.5" cy="92.5" r="1.2" fill="#ffffff" />

            {/* Eyebrows */}
            <path d="M 75 87 Q 83 84 90 87" stroke="#1e1b4b" strokeWidth="1.8" strokeLinecap="round" fill="none" />
            <path d="M 110 87 Q 117 84 125 87" stroke="#1e1b4b" strokeWidth="1.8" strokeLinecap="round" fill="none" />

            {/* Smart Tech Glasses */}
            <rect x="71" y="86" width="22" height="15" rx="4" fill="none" stroke="url(#glasses)" strokeWidth="2.5" />
            <rect x="107" y="86" width="22" height="15" rx="4" fill="none" stroke="url(#glasses)" strokeWidth="2.5" />
            <path d="M 93 92 H 107" stroke="url(#glasses)" strokeWidth="2" />
            <path d="M 71 90 L 63 87" stroke="url(#glasses)" strokeWidth="1.5" />
            <path d="M 129 90 L 137 87" stroke="url(#glasses)" strokeWidth="1.5" />
            {/* Glasses reflection */}
            <path d="M 74 88 L 82 98" stroke="#ffffff" strokeWidth="1" opacity="0.6" strokeLinecap="round" />
            <path d="M 110 88 L 118 98" stroke="#ffffff" strokeWidth="1" opacity="0.6" strokeLinecap="round" />

            {/* Confident Smile */}
            <path d="M 93 118 Q 100 124 107 118" stroke="#7c2d12" strokeWidth="1.8" strokeLinecap="round" fill="none" />

            {/* Front Hair (Bangs & Flow) */}
            <path
              d="M 64 80 C 64 45 80 40 100 40 C 120 40 136 45 136 80 C 136 70 128 54 116 54 C 105 54 98 62 90 62 C 82 62 72 56 64 80 Z"
              fill="url(#hair)"
            />
            {/* Hair strands with emerald cyber highlight */}
            <path d="M 68 85 Q 63 110 68 135" stroke="#10b981" strokeWidth="1.5" fill="none" opacity="0.7" />
            <path d="M 132 85 Q 137 110 132 135" stroke="#06b6d4" strokeWidth="1.5" fill="none" opacity="0.7" />

            {/* Laptop Edge in bottom */}
            <path d="M 65 175 L 135 175 L 140 185 L 60 185 Z" fill="#27272a" stroke="#3f3f46" strokeWidth="1" />
            <rect x="75" y="165" width="50" height="10" rx="2" fill="#18181b" stroke="#10b981" strokeWidth="1" />
            {/* Code symbol on laptop lid */}
            <text x="100" y="173" textAnchor="middle" fill="#34d399" fontSize="7" fontFamily="monospace" fontWeight="bold">
              &lt;AI /&gt;
            </text>
          </svg>
        </div>

        {/* Live Active Status Badge */}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-zinc-950/95 border border-emerald-500/50 shadow-lg flex items-center gap-1.5 whitespace-nowrap">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="w-2 h-2 rounded-full bg-emerald-400 -ml-3.5" />
          <span className="text-[10px] font-mono font-semibold text-emerald-300">
            Building AI Systems
          </span>
        </div>
      </motion.div>

      {/* Orbiting Satellite Badges */}
      <motion.div
        animate={{ y: [-3, 3, -3] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 0.5 }}
        className="hidden sm:flex absolute -left-12 top-6 items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900/90 border border-zinc-800 shadow-xl backdrop-blur-md text-[11px] font-mono text-zinc-300"
      >
        <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
        <span>3rd-Yr CSE-AI (2024–2028)</span>
      </motion.div>

      <motion.div
        animate={{ y: [3, -3, 3] }}
        transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut', delay: 1 }}
        className="hidden sm:flex absolute -right-10 top-14 items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900/90 border border-zinc-800 shadow-xl backdrop-blur-md text-[11px] font-mono text-zinc-300"
      >
        <Brain className="w-3.5 h-3.5 text-indigo-400" />
        <span>Deep Learning & PyTorch</span>
      </motion.div>

      <motion.div
        animate={{ y: [-3, 3, -3] }}
        transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1.5 }}
        className="hidden sm:flex absolute -left-10 bottom-6 items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900/90 border border-zinc-800 shadow-xl backdrop-blur-md text-[11px] font-mono text-zinc-300"
      >
        <Eye className="w-3.5 h-3.5 text-cyan-400" />
        <span>Computer Vision & Healthcare</span>
      </motion.div>

      <motion.div
        animate={{ y: [3, -3, 3] }}
        transition={{ repeat: Infinity, duration: 4.2, ease: 'easeInOut', delay: 2 }}
        className="hidden sm:flex absolute -right-8 bottom-3 items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900/90 border border-zinc-800 shadow-xl backdrop-blur-md text-[11px] font-mono text-zinc-300"
      >
        <Code2 className="w-3.5 h-3.5 text-emerald-400" />
        <span>Next.js 15 & Full-Stack</span>
      </motion.div>
    </div>
  );
}
