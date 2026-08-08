'use client';

import * as React from 'react';
import Link from 'next/link';
import { ThemeToggle } from './theme-toggle';
import { Menu, X } from 'lucide-react';
import { GithubIcon } from './icons';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Certificates', href: '#certificates' },
    { name: 'Skills', href: '#skills' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Name */}
        <Link
          href="/"
          className="font-mono text-sm font-semibold tracking-tight text-zinc-100 hover:text-emerald-400 transition-colors"
        >
          jhansi<span className="text-emerald-400">.dev</span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-5">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-medium text-zinc-400 hover:text-zinc-100 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <ThemeToggle />
          <a
            href="https://github.com/jhansi-jjs"
            target="_blank"
            rel="noreferrer"
            className="p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60 rounded-full border border-zinc-800 transition"
            aria-label="GitHub Profile"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex lg:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-zinc-400 hover:text-zinc-100"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-zinc-800 bg-zinc-950 px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-zinc-300 hover:text-emerald-400"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2 flex items-center gap-3">
            <a
              href="https://github.com/jhansi-jjs"
              target="_blank"
              rel="noreferrer"
              className="p-2 text-zinc-400 hover:text-zinc-100 rounded-md border border-zinc-800"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
