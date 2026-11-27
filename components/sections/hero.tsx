'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowDown, Sparkles, FolderGit2 } from 'lucide-react';
import { GithubIcon } from '@/components/shared/icons';
import { AnimatedAvatar } from '@/components/shared/animated-avatar';

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center items-center text-center px-4 sm:px-6 pt-10 pb-16 overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 -z-10 opacity-30 dark:opacity-20 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-zinc-700" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
        <div className="absolute inset-0 bg-radial from-transparent via-zinc-950/80 to-zinc-950" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-4xl space-y-6 flex flex-col items-center"
      >
        {/* Animated Developer Girl Avatar with orbiting tags */}
        <AnimatedAvatar />

        {/* Identity Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs text-zinc-300 font-mono shadow-inner">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>Jhansi Suggula • 3rd-Year B.Tech CSE (AI) • 2024–2028</span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-100 font-sans max-w-3xl leading-[1.15]">
          Engineering Intelligent <span className="text-emerald-400">AI</span>, <span className="text-cyan-400">Vision</span> & <span className="text-indigo-400">Full-Stack</span> Systems.
        </h1>

        {/* Comprehensive Description */}
        <p className="text-sm sm:text-base text-zinc-400 font-normal leading-relaxed max-w-2xl mx-auto">
          Passionate researcher and engineer working at the intersection of <strong className="text-zinc-200">Deep Learning</strong>, <strong className="text-zinc-200">Healthcare Computer Vision</strong> (retinal fundus segmentation), <strong className="text-zinc-200">Visual Speech Recognition (VSR)</strong>, <strong className="text-zinc-200">Neural Model Compression</strong>, and <strong className="text-zinc-200">Next.js full-stack architectures</strong>.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-zinc-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors shadow-lg shadow-emerald-950/50"
          >
            <FolderGit2 className="w-4 h-4 text-zinc-950" />
            View Projects (14)
          </a>

          <a
            href="https://github.com/jhansi-jjs"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-zinc-300 hover:text-zinc-100 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg transition-colors"
          >
            <GithubIcon className="w-4 h-4 text-emerald-400" />
            GitHub Profile
          </a>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-zinc-300 hover:text-zinc-100 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg transition-colors"
          >
            <Mail className="w-4 h-4 text-emerald-400" />
            Get In Touch
          </a>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-12 p-2 text-zinc-500 hover:text-zinc-300 transition-colors"
        aria-label="Scroll down to About section"
      >
        <ArrowDown className="w-4 h-4 animate-bounce" />
      </motion.a>
    </section>
  );
}
