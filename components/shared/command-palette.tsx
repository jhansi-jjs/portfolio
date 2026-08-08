'use client';

import * as React from 'react';
import { Command } from 'cmdk';
import { useTheme } from 'next-themes';
import { Search, User, Briefcase, FolderGit2, Cpu, Trophy, Mail, Copy, Sun, Moon, Check } from 'lucide-react';
import { GithubIcon } from './icons';

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const { theme, setTheme } = useTheme();
  const [copiedEmail, setCopiedEmail] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [open, onOpenChange]);

  const handleSelect = (action: () => void) => {
    action();
    onOpenChange(false);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('suggujhansi@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm">
      <div className="w-full max-w-xl bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl font-mono text-xs text-zinc-200">
        <Command className="w-full">
          {/* Input Header */}
          <div className="flex items-center border-b border-zinc-800 px-4 py-3 bg-zinc-950/60">
            <Search className="w-4 h-4 text-zinc-500 mr-2 shrink-0" />
            <Command.Input
              autoFocus
              placeholder="Type a command or search section..."
              className="w-full bg-transparent text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none"
            />
            <button
              onClick={() => onOpenChange(false)}
              className="text-[10px] text-zinc-500 bg-zinc-800 px-1.5 py-0.5 rounded border border-zinc-700 hover:text-zinc-300"
            >
              ESC
            </button>
          </div>

          {/* Command Items List */}
          <Command.List className="max-h-80 overflow-y-auto p-2 space-y-2">
            <Command.Empty className="py-6 text-center text-zinc-500 text-xs">
              No matching commands found.
            </Command.Empty>

            {/* Navigation Group */}
            <Command.Group heading="Navigation" className="text-[10px] uppercase text-zinc-500 px-2 font-bold tracking-wider">
              <Command.Item
                onSelect={() => handleSelect(() => (window.location.hash = '#about'))}
                className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-zinc-800/80 hover:text-emerald-400 transition"
              >
                <User className="w-4 h-4 text-emerald-400" />
                <span>Go to About</span>
              </Command.Item>

              <Command.Item
                onSelect={() => handleSelect(() => (window.location.hash = '#experience'))}
                className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-zinc-800/80 hover:text-emerald-400 transition"
              >
                <Briefcase className="w-4 h-4 text-emerald-400" />
                <span>Go to Experience</span>
              </Command.Item>

              <Command.Item
                onSelect={() => handleSelect(() => (window.location.hash = '#projects'))}
                className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-zinc-800/80 hover:text-emerald-400 transition"
              >
                <FolderGit2 className="w-4 h-4 text-emerald-400" />
                <span>Go to Projects</span>
              </Command.Item>

              <Command.Item
                onSelect={() => handleSelect(() => (window.location.hash = '#skills'))}
                className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-zinc-800/80 hover:text-emerald-400 transition"
              >
                <Cpu className="w-4 h-4 text-emerald-400" />
                <span>Go to Skills</span>
              </Command.Item>

              <Command.Item
                onSelect={() => handleSelect(() => (window.location.hash = '#achievements'))}
                className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-zinc-800/80 hover:text-emerald-400 transition"
              >
                <Trophy className="w-4 h-4 text-emerald-400" />
                <span>Go to Achievements</span>
              </Command.Item>

              <Command.Item
                onSelect={() => handleSelect(() => (window.location.hash = '#contact'))}
                className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-zinc-800/80 hover:text-emerald-400 transition"
              >
                <Mail className="w-4 h-4 text-emerald-400" />
                <span>Go to Contact</span>
              </Command.Item>
            </Command.Group>

            {/* Quick Actions */}
            <Command.Group heading="Actions" className="text-[10px] uppercase text-zinc-500 px-2 font-bold tracking-wider pt-2">
              <Command.Item
                onSelect={copyEmail}
                className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-zinc-800/80 hover:text-emerald-400 transition"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-zinc-400" />}
                <span>{copiedEmail ? 'Email Copied!' : 'Copy Email (suggujhansi@gmail.com)'}</span>
              </Command.Item>

              <Command.Item
                onSelect={() => handleSelect(() => setTheme(theme === 'dark' ? 'light' : 'dark'))}
                className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-zinc-800/80 hover:text-emerald-400 transition"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
                <span>Toggle Theme ({theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'})</span>
              </Command.Item>

              <Command.Item
                onSelect={() => handleSelect(() => window.open('https://github.com/jhansi-jjs', '_blank'))}
                className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-zinc-800/80 hover:text-emerald-400 transition"
              >
                <GithubIcon className="w-4 h-4 text-zinc-400" />
                <span>Open GitHub Profile</span>
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
}
