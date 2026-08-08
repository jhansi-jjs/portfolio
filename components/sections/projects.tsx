'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PinnedRepo, Repository, RateLimitInfo } from '@/lib/types';
import { Star, GitFork, ExternalLink, FileText, Search, X, AlertTriangle } from 'lucide-react';
import { GithubIcon } from '@/components/shared/icons';

interface ProjectsProps {
  pinnedRepos: PinnedRepo[];
  allRepos: Repository[];
  rateLimit?: RateLimitInfo | null;
  error?: string | null;
  isMockData?: boolean;
}

export function Projects({ pinnedRepos, allRepos, error, isMockData }: ProjectsProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedLanguage, setSelectedLanguage] = React.useState<string>('ALL');

  // Active README Modal State
  const [readmeModalRepo, setReadmeModalRepo] = React.useState<Repository | null>(null);
  const [readmeHtml, setReadmeHtml] = React.useState<string | null>(null);
  const [readmeLoading, setReadmeLoading] = React.useState(false);
  const [readmeError, setReadmeError] = React.useState<string | null>(null);

  // Extract unique languages across all repositories for filter pills
  const availableLanguages = React.useMemo(() => {
    const langs = new Set<string>();
    allRepos.forEach((repo) => {
      if (repo.primaryLanguage?.name) {
        langs.add(repo.primaryLanguage.name);
      }
    });
    return Array.from(langs);
  }, [allRepos]);

  // Combine and deduplicate repositories
  const filteredRepos = React.useMemo(() => {
    return allRepos.filter((repo) => {
      const matchesSearch =
        repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (repo.description && repo.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        repo.topics.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesLang =
        selectedLanguage === 'ALL' ||
        repo.primaryLanguage?.name?.toUpperCase() === selectedLanguage.toUpperCase();

      return matchesSearch && matchesLang;
    });
  }, [allRepos, searchQuery, selectedLanguage]);

  // Open README preview modal
  const handleOpenReadme = async (repo: Repository) => {
    setReadmeModalRepo(repo);
    setReadmeLoading(true);
    setReadmeError(null);
    setReadmeHtml(null);

    try {
      const res = await fetch(`/api/readme?owner=${encodeURIComponent(repo.owner.login)}&repo=${encodeURIComponent(repo.name)}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to load README');
      }

      setReadmeHtml(data.html);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error fetching README';
      setReadmeError(msg);
    } finally {
      setReadmeLoading(false);
    }
  };

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto border-t border-zinc-800/60">
      <div className="space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider">02. Live Projects</div>
            <h2 className="text-3xl font-bold text-zinc-100">Auto-Synced GitHub Repositories</h2>
            <p className="text-xs text-zinc-400 max-w-xl font-normal">
              Directly synchronized from GitHub GraphQL API. Updated automatically without redeploys.
            </p>
          </div>

          {isMockData && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-950/60 border border-amber-800/80 text-amber-300 text-xs font-mono">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Offline / Fallback Data Mode</span>
            </div>
          )}
        </div>

        {/* Global Error Banner if API failed */}
        {error && (
          <div className="p-4 rounded-lg bg-rose-950/60 border border-rose-800 text-rose-300 text-xs font-mono space-y-1">
            <div className="font-bold text-rose-200">GitHub API Notice:</div>
            <div>{error}</div>
          </div>
        )}

        {/* Search & Language Filters */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-zinc-900/50 p-4 rounded-xl border border-zinc-800">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects by name, description, topic..."
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-9 pr-4 py-2 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Language Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setSelectedLanguage('ALL')}
              className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-colors ${
                selectedLanguage === 'ALL'
                  ? 'bg-emerald-400 text-zinc-950 font-bold'
                  : 'bg-zinc-950 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
              }`}
            >
              All
            </button>
            {availableLanguages.map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-colors ${
                  selectedLanguage.toUpperCase() === lang.toUpperCase()
                    ? 'bg-emerald-400 text-zinc-950 font-bold'
                    : 'bg-zinc-950 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Pinned Repositories */}
        {pinnedRepos.length > 0 && searchQuery === '' && selectedLanguage === 'ALL' && (
          <div className="space-y-4">
            <h3 className="text-sm font-mono font-semibold text-zinc-300 uppercase tracking-wider flex items-center gap-2">
              <span>📌 Featured Repositories</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pinnedRepos.map((repo) => (
                <ProjectCard key={repo.id} repo={repo} isFeatured onOpenReadme={handleOpenReadme} />
              ))}
            </div>
          </div>
        )}

        {/* All / Filtered Repositories */}
        <div className="space-y-4 pt-4">
          <h3 className="text-sm font-mono font-semibold text-zinc-300 uppercase tracking-wider flex items-center gap-2">
            <span>📦 All Public Repositories ({filteredRepos.length})</span>
          </h3>

          {filteredRepos.length === 0 ? (
            <div className="py-12 text-center text-zinc-500 font-mono text-xs bg-zinc-900/30 rounded-xl border border-zinc-800">
              No repositories match your current search criteria.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRepos.map((repo) => (
                <ProjectCard key={repo.id} repo={repo} onOpenReadme={handleOpenReadme} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* README Slide-out Modal */}
      <AnimatePresence>
        {readmeModalRepo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-zinc-900 border border-zinc-800 rounded-xl max-w-3xl w-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl"
            >
              {/* Modal Header */}
              <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-950/60">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-400" />
                  <span className="font-mono font-bold text-sm text-zinc-100">{readmeModalRepo.name}</span>
                  <span className="text-xs text-zinc-500 font-mono">README.md</span>
                </div>
                <button
                  onClick={() => setReadmeModalRepo(null)}
                  className="p-1 text-zinc-400 hover:text-zinc-100 rounded-md hover:bg-zinc-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto flex-1 font-sans text-xs text-zinc-300 leading-relaxed space-y-4">
                {readmeLoading && (
                  <div className="space-y-3 py-12">
                    <div className="h-4 bg-zinc-800 rounded w-3/4 animate-pulse" />
                    <div className="h-4 bg-zinc-800 rounded w-1/2 animate-pulse" />
                    <div className="h-4 bg-zinc-800 rounded w-5/6 animate-pulse" />
                  </div>
                )}

                {readmeError && (
                  <div className="p-4 rounded bg-rose-950/80 border border-rose-800 text-rose-300 font-mono">
                    Failed to fetch README: {readmeError}
                  </div>
                )}

                {readmeHtml && (
                  <div
                    className="prose prose-invert prose-xs max-w-none prose-pre:bg-zinc-950 prose-pre:border prose-pre:border-zinc-800"
                    dangerouslySetInnerHTML={{ __html: readmeHtml }}
                  />
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

interface ProjectCardProps {
  repo: Repository;
  isFeatured?: boolean;
  onOpenReadme: (repo: Repository) => void;
}

function ProjectCard({ repo, isFeatured, onOpenReadme }: ProjectCardProps) {
  // Calculate total language size for percentage bar
  const totalLangBytes = repo.languages.reduce((acc, l) => acc + (l.size || 0), 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`group flex flex-col justify-between p-6 rounded-xl border transition-all duration-200 ${
        isFeatured
          ? 'bg-zinc-900/80 border-emerald-500/40 hover:border-emerald-500/80 shadow-lg shadow-emerald-950/20'
          : 'bg-zinc-900/40 border-zinc-800 hover:border-zinc-700'
      }`}
    >
      <div className="space-y-4">
        {/* Card Top */}
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1">
            <a
              href={repo.url}
              target="_blank"
              rel="noreferrer"
              className="font-mono font-bold text-base text-zinc-100 hover:text-emerald-400 transition flex items-center gap-1.5"
            >
              {repo.name}
              <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            {isFeatured && (
              <span className="inline-block text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/60">
                Featured
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
            <span className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" />
              {repo.stargazerCount}
            </span>
            <span className="flex items-center gap-1">
              <GitFork className="w-3.5 h-3.5" />
              {repo.forkCount}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-zinc-300 line-clamp-3 leading-relaxed">
          {repo.description || 'No description provided.'}
        </p>

        {/* Topics */}
        {repo.topics.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {repo.topics.slice(0, 4).map((topic) => (
              <span
                key={topic}
                className="text-[10px] font-mono text-zinc-400 bg-zinc-950 px-2 py-0.5 rounded border border-zinc-800"
              >
                #{topic}
              </span>
            ))}
          </div>
        )}

        {/* Language Percentage Bar */}
        {repo.languages.length > 0 && totalLangBytes > 0 && (
          <div className="space-y-1.5 pt-2">
            <div className="h-1.5 w-full bg-zinc-950 rounded-full overflow-hidden flex">
              {repo.languages.map((lang) => {
                const pct = ((lang.size || 0) / totalLangBytes) * 100;
                return (
                  <div
                    key={lang.name}
                    style={{ width: `${pct}%`, backgroundColor: lang.color || '#94a3b8' }}
                    title={`${lang.name}: ${pct.toFixed(1)}%`}
                  />
                );
              })}
            </div>
            <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
              <span className="flex items-center gap-1.5">
                {repo.primaryLanguage && (
                  <>
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: repo.primaryLanguage.color || '#94a3b8' }}
                    />
                    {repo.primaryLanguage.name}
                  </>
                )}
              </span>
              <span className="text-[10px] text-zinc-500">
                Updated {new Date(repo.updatedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Card Actions */}
      <div className="flex items-center justify-between gap-2 pt-5 border-t border-zinc-800/60 mt-4">
        <button
          onClick={() => onOpenReadme(repo)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-zinc-300 hover:text-zinc-100 bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 rounded-md transition"
        >
          <FileText className="w-3.5 h-3.5 text-emerald-400" />
          README
        </button>

        <div className="flex items-center gap-2">
          {repo.homepageUrl && (
            <a
              href={repo.homepageUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-mono text-zinc-950 bg-emerald-400 hover:bg-emerald-300 font-semibold rounded-md transition"
            >
              Demo
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
          <a
            href={repo.url}
            target="_blank"
            rel="noreferrer"
            className="p-2 text-zinc-400 hover:text-zinc-100 bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 rounded-md transition"
            aria-label="GitHub Repository Link"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
