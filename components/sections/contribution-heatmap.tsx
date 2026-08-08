'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { ContributionCalendar, ContributionDay } from '@/lib/types';
import { Calendar, Flame, Trophy, Activity } from 'lucide-react';

interface ContributionHeatmapProps {
  calendar: ContributionCalendar | null;
}

export function ContributionHeatmap({ calendar }: ContributionHeatmapProps) {
  const { totalContributions, weeks, currentStreak, longestStreak } = React.useMemo(() => {
    if (!calendar || !calendar.weeks || calendar.weeks.length === 0) {
      return { totalContributions: 0, weeks: [], currentStreak: 0, longestStreak: 0 };
    }

    const allDays: ContributionDay[] = [];
    calendar.weeks.forEach((w) => {
      w.contributionDays.forEach((d) => allDays.push(d));
    });

    // Compute Streaks
    let current = 0;
    let longest = 0;
    let activeStreak = true;

    // Iterate backwards from latest day
    for (let i = allDays.length - 1; i >= 0; i--) {
      const day = allDays[i];
      if (day.contributionCount > 0) {
        if (activeStreak) current++;
        longest = Math.max(longest, current);
      } else {
        // Allow today (last index) to have 0 if not finished yet
        if (i < allDays.length - 1) {
          activeStreak = false;
        }
      }
    }

    return {
      totalContributions: calendar.totalContributions || allDays.reduce((acc, d) => acc + d.contributionCount, 0),
      weeks: calendar.weeks,
      currentStreak: current,
      longestStreak: longest,
    };
  }, [calendar]);

  return (
    <section className="py-16 px-4 sm:px-6 max-w-5xl mx-auto border-t border-zinc-800/60">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider">GitHub Activity</div>
            <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-400" />
              Contribution Calendar & Streaks
            </h2>
          </div>

          {/* Metric Stats */}
          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-lg flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-zinc-400">Total:</span>
              <span className="font-bold text-zinc-100">{totalContributions}</span>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-lg flex items-center gap-2">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-zinc-400">Current Streak:</span>
              <span className="font-bold text-amber-400">{currentStreak} days</span>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-lg flex items-center gap-2">
              <Trophy className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-zinc-400">Longest:</span>
              <span className="font-bold text-indigo-300">{longestStreak} days</span>
            </div>
          </div>
        </div>

        {/* Heatmap Grid */}
        <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-xl overflow-x-auto space-y-3">
          <div className="flex items-start gap-1 min-w-[700px] justify-between">
            {weeks.slice(-48).map((week, wIdx) => (
              <div key={wIdx} className="flex flex-col gap-1">
                {week.contributionDays.map((day, dIdx) => {
                  const count = day.contributionCount;
                  let bg = 'bg-zinc-950 border border-zinc-900';
                  if (count >= 8) bg = 'bg-emerald-400 shadow-sm shadow-emerald-400/50';
                  else if (count >= 4) bg = 'bg-emerald-600';
                  else if (count >= 1) bg = 'bg-emerald-900/80 border border-emerald-800';

                  return (
                    <div
                      key={dIdx}
                      className={`w-2.5 h-2.5 rounded-[2px] transition-colors hover:ring-1 hover:ring-emerald-300 ${bg}`}
                      title={`${day.date}: ${count} contributions`}
                    />
                  );
                })}
              </div>
            ))}
          </div>

          {/* Grid Legend */}
          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 pt-2 border-t border-zinc-800/40">
            <span>Last 48 Weeks</span>
            <div className="flex items-center gap-1.5">
              <span>Less</span>
              <span className="w-2.5 h-2.5 rounded-[2px] bg-zinc-950 border border-zinc-900" />
              <span className="w-2.5 h-2.5 rounded-[2px] bg-emerald-900/80" />
              <span className="w-2.5 h-2.5 rounded-[2px] bg-emerald-600" />
              <span className="w-2.5 h-2.5 rounded-[2px] bg-emerald-400" />
              <span>More</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
