'use client';

import * as React from 'react';
import { PinnedRepo, Repository, ContributionCalendar, RateLimitInfo } from '@/lib/types';
import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { Experience } from '@/components/sections/experience';
import { ContributionHeatmap } from '@/components/sections/contribution-heatmap';
import { Projects } from '@/components/sections/projects';
import { Skills } from '@/components/sections/skills';
import { Achievements } from '@/components/sections/achievements';
import { Contact } from '@/components/sections/contact';
import { Footer } from '@/components/shared/footer';
import { CommandPalette } from '@/components/shared/command-palette';
import { AIChatPanel } from '@/components/shared/ai-chat-panel';

interface WrapperProps {
  pinnedRepos: PinnedRepo[];
  allRepos: Repository[];
  calendar: ContributionCalendar | null;
  rateLimit: RateLimitInfo | null;
  isMockData: boolean;
  error: string | null;
}

export function PortfolioClientWrapper({
  pinnedRepos,
  allRepos,
  calendar,
  rateLimit,
  isMockData,
  error,
}: WrapperProps) {
  const [cmdOpen, setCmdOpen] = React.useState(false);

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col justify-between">
      <CommandPalette open={cmdOpen} onOpenChange={setCmdOpen} />
      <AIChatPanel />

      <div className="space-y-12">
        <Hero />
        <About />
        <Experience />
        <ContributionHeatmap calendar={calendar} />
        <Projects
          pinnedRepos={pinnedRepos}
          allRepos={allRepos}
          rateLimit={rateLimit}
          error={error}
          isMockData={isMockData}
        />
        <Skills />
        <Achievements />
        <Contact />
      </div>

      <Footer rateLimit={rateLimit} isMockData={isMockData} />
    </main>
  );
}
