import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center text-center p-6 bg-zinc-950 text-zinc-100 font-mono">
      <div className="max-w-md space-y-6">
        <div className="inline-block text-xs font-bold text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded border border-emerald-800">
          404 — PAGE NOT FOUND
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-zinc-100 font-sans">
          Lost in the Neural Network?
        </h1>
        <p className="text-xs text-zinc-400 leading-relaxed font-sans">
          The requested page route could not be found or has been moved.
        </p>
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-zinc-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors font-sans"
          >
            Return to Portfolio Home
          </Link>
        </div>
      </div>
    </main>
  );
}
