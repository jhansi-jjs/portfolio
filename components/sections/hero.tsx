'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { FileText, Mail, ArrowDown } from 'lucide-react';
import { GithubIcon } from '@/components/shared/icons';

export function Hero() {
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  const handleResumeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setToastMessage('Resume PDF will be placed at /public/resume.pdf.');
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center items-center text-center px-4 sm:px-6 pt-12 pb-16 overflow-hidden">
      {/* Tasteful SVG Animated Grid Background (GPU cheap) */}
      <div className="absolute inset-0 -z-10 opacity-30 dark:opacity-20 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-zinc-700" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
        {/* Radial Vignette */}
        <div className="absolute inset-0 bg-radial from-transparent via-zinc-950/80 to-zinc-950" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-3xl space-y-6"
      >
        {/* Status Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs text-zinc-300 font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>3rd-Year CSE (Artificial Intelligence) Student</span>
        </div>

        {/* Name & Headline */}
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-zinc-100 font-sans">
          Engineering Intelligent AI & Speech Systems.
        </h1>

        <p className="text-base sm:text-lg text-zinc-400 font-normal leading-relaxed max-w-2xl mx-auto">
          Building <span className="text-emerald-400 font-semibold">Speaker-Adaptive Visual Speech Recognition (VSR)</span>, neural model compression pipelines, and scalable full-stack applications.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <a
            href="/resume.pdf"
            onClick={handleResumeClick}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-zinc-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors shadow-lg shadow-emerald-950/50"
          >
            <FileText className="w-4 h-4" />
            Resume (PDF)
          </a>

          <a
            href="https://github.com/jhansi-jjs"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-zinc-200 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg transition-colors"
          >
            <GithubIcon className="w-4 h-4 text-emerald-400" />
            GitHub
          </a>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-zinc-400 hover:text-zinc-100 bg-transparent hover:bg-zinc-900 border border-zinc-800/80 rounded-lg transition-colors"
          >
            <Mail className="w-4 h-4" />
            Contact Me
          </a>
        </div>

        {/* Resume Toast alert */}
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-xs text-amber-400 bg-amber-950/80 border border-amber-800/80 px-4 py-2 rounded-md max-w-md mx-auto"
          >
            {toastMessage}
          </motion.div>
        )}
      </motion.div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 p-2 text-zinc-500 hover:text-zinc-300 transition-colors"
        aria-label="Scroll down to About section"
      >
        <ArrowDown className="w-4 h-4 animate-bounce" />
      </motion.a>
    </section>
  );
}
