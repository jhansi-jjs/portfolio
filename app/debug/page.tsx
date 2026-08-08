import { notFound } from 'next/navigation';
import {
  getPinnedRepos,
  getAllRepos,
  getContributionCalendar,
  getRepoReadme,
} from '@/lib/github';

export const revalidate = 0; // Dynamic rendering for debug page

export default async function DebugPage() {
  // Correction #6: Gate debug route strictly behind development environment
  if (process.env.NODE_ENV !== 'development') {
    notFound();
  }

  const [pinnedRes, allReposRes, contributionRes, readmeRes] = await Promise.all([
    getPinnedRepos(),
    getAllRepos(),
    getContributionCalendar(),
    getRepoReadme('jhansi-jjs', 'gig-protector-pro'),
  ]);

  const hasToken = Boolean(process.env.GITHUB_TOKEN);
  const targetUsername = process.env.GITHUB_USERNAME || 'jhansi-jjs';

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6 font-mono text-sm">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <header className="border-b border-slate-800 pb-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-emerald-400">
              🛠️ GitHub Sync Engine — Debug Dashboard
            </h1>
            <p className="text-slate-400 text-xs mt-1">
              Target Username: <span className="text-slate-200">{targetUsername}</span> | Env:{' '}
              <span className="text-amber-400">{process.env.NODE_ENV}</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={`px-2.5 py-1 rounded text-xs font-semibold ${
                hasToken
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                  : 'bg-amber-950 text-amber-300 border border-amber-800'
              }`}
            >
              {hasToken ? '🔑 GITHUB_TOKEN Active' : '⚠️ No GITHUB_TOKEN (Fallback Mode)'}
            </span>
          </div>
        </header>

        {/* Rate Limit Stats Bar */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-lg">
            <div className="text-slate-400 text-xs">GraphQL Cost</div>
            <div className="text-xl font-bold text-indigo-400 mt-1">
              {pinnedRes.rateLimit?.cost ?? 'N/A'}
            </div>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-lg">
            <div className="text-slate-400 text-xs">Remaining Calls</div>
            <div className="text-xl font-bold text-emerald-400 mt-1">
              {pinnedRes.rateLimit?.remaining ?? 'N/A'} / {pinnedRes.rateLimit?.limit ?? 'N/A'}
            </div>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-lg">
            <div className="text-slate-400 text-xs">Reset Time</div>
            <div className="text-xs font-medium text-slate-300 mt-2 truncate">
              {pinnedRes.rateLimit?.resetAt
                ? new Date(pinnedRes.rateLimit.resetAt).toLocaleTimeString()
                : 'N/A'}
            </div>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-lg">
            <div className="text-slate-400 text-xs">Data Source Mode</div>
            <div
              className={`text-sm font-bold mt-1 ${
                pinnedRes.isMockData ? 'text-amber-400' : 'text-emerald-400'
              }`}
            >
              {pinnedRes.isMockData ? 'Fallback Mock Data' : 'Live GitHub GraphQL'}
            </div>
          </div>
        </section>

        {/* Error Alerts if any */}
        {(pinnedRes.error || allReposRes.error) && (
          <div className="bg-rose-950/50 border border-rose-800/80 p-4 rounded-lg text-rose-300 text-xs space-y-1">
            <div className="font-bold text-rose-200">GitHub Sync Notice / Warning:</div>
            {pinnedRes.error && <div>Pinned Repos: {pinnedRes.error}</div>}
            {allReposRes.error && <div>Public Repos: {allReposRes.error}</div>}
          </div>
        )}

        {/* Pinned Repos Grid */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-slate-200 flex items-center gap-2">
            <span>📌 Pinned Repositories</span>
            <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
              Count: {pinnedRes.data?.length ?? 0}
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pinnedRes.data?.map((repo) => (
              <div
                key={repo.id}
                className="bg-slate-900 border border-slate-800 p-4 rounded-lg hover:border-slate-700 transition"
              >
                <div className="flex justify-between items-start">
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold text-indigo-400 hover:underline text-base"
                  >
                    {repo.name}
                  </a>
                  <span className="text-xs text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                    ★ {repo.stargazerCount}
                  </span>
                </div>
                <p className="text-slate-300 text-xs mt-2 line-clamp-2">
                  {repo.description || 'No description provided.'}
                </p>
                <div className="flex items-center gap-3 mt-4 text-xs text-slate-400">
                  {repo.primaryLanguage && (
                    <span className="flex items-center gap-1.5">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: repo.primaryLanguage.color || '#94a3b8' }}
                      />
                      {repo.primaryLanguage.name}
                    </span>
                  )}
                  <span>Forks: {repo.forkCount}</span>
                  <span>Owner: {repo.owner.login}</span>
                </div>
                {repo.topics.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-3">
                    {repo.topics.map((topic) => (
                      <span
                        key={topic}
                        className="text-[10px] bg-slate-800/80 text-slate-400 px-1.5 py-0.5 rounded border border-slate-700/50"
                      >
                        #{topic}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Public Repos & Contribution Summary */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-lg space-y-2">
            <h3 className="font-semibold text-slate-200">All Public Repositories Summary</h3>
            <p className="text-xs text-slate-400">
              Total fetched (non-fork, non-archived owned by {targetUsername}):{' '}
              <span className="text-emerald-400 font-bold">{allReposRes.data?.length ?? 0}</span>
            </p>
            <div className="max-h-48 overflow-y-auto space-y-1 pt-2">
              {allReposRes.data?.map((repo) => (
                <div
                  key={repo.id}
                  className="flex justify-between items-center text-xs py-1 border-b border-slate-800/50"
                >
                  <span className="text-slate-300">{repo.name}</span>
                  <span className="text-slate-500">★ {repo.stargazerCount}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-4 rounded-lg space-y-2">
            <h3 className="font-semibold text-slate-200">Contribution Calendar Summary</h3>
            <p className="text-xs text-slate-400">
              Total Contributions:{' '}
              <span className="text-emerald-400 font-bold">
                {contributionRes.data?.totalContributions ?? 0}
              </span>
            </p>
            <p className="text-xs text-slate-400">
              Weeks Tracked: {contributionRes.data?.weeks?.length ?? 0} weeks
            </p>
          </div>
        </section>

        {/* README Snippet Preview */}
        <section className="bg-slate-900 border border-slate-800 p-4 rounded-lg space-y-2">
          <h3 className="font-semibold text-slate-200">
            Sample README Fetch (<span className="text-indigo-400">gig-protector-pro</span>)
          </h3>
          <pre className="bg-slate-950 p-3 rounded border border-slate-800 text-xs text-slate-300 overflow-x-auto max-h-40">
            {readmeRes.data || 'No README data'}
          </pre>
        </section>

        {/* Raw JSON Debug Inspector */}
        <section className="bg-slate-900 border border-slate-800 p-4 rounded-lg space-y-2">
          <h3 className="font-semibold text-slate-200">Raw JSON Payload (Pinned Repos)</h3>
          <pre className="bg-slate-950 p-3 rounded border border-slate-800 text-xs text-slate-300 overflow-x-auto max-h-60">
            {JSON.stringify(pinnedRes, null, 2)}
          </pre>
        </section>
      </div>
    </main>
  );
}
