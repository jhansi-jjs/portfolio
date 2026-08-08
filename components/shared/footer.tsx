import * as React from 'react';
import { RateLimitInfo } from '@/lib/types';
import { Mail } from 'lucide-react';
import { GithubIcon } from './icons';

interface FooterProps {
  rateLimit?: RateLimitInfo | null;
  isMockData?: boolean;
}

export function Footer({ rateLimit, isMockData }: FooterProps) {
  const isHealthy = !isMockData && rateLimit && rateLimit.remaining > 0;

  return (
    <footer className="w-full border-t border-zinc-800/80 bg-zinc-950/60 py-8 text-xs text-zinc-400 font-mono">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Copyright */}
        <div>
          © {new Date().getFullYear()} Jhansi. Built with Next.js 15, Tailwind v4 & GitHub GraphQL.
        </div>

        {/* Middle: Real-Time Sync Status Pill (Correction #4) */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800">
          <span className={`w-2 h-2 rounded-full ${isHealthy ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
          <span className="text-[11px] font-medium text-zinc-300">
            {isHealthy
              ? `Live GraphQL Sync (${rateLimit.remaining} calls rem)`
              : isMockData
              ? 'GitHub Sync: Fallback Mode'
              : 'Sync Active'}
          </span>
        </div>

        {/* Right: Social icons */}
        <div className="flex items-center gap-4 text-zinc-400">
          <a
            href="https://github.com/jhansi-jjs"
            target="_blank"
            rel="noreferrer"
            className="hover:text-emerald-400 transition"
            aria-label="GitHub"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href="mailto:jhansi.jjs@gmail.com"
            className="hover:text-emerald-400 transition"
            aria-label="Email"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
