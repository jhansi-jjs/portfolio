import { NextRequest, NextResponse } from 'next/server';
import { getRepoReadme } from '@/lib/github';
import { marked } from 'marked';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const owner = searchParams.get('owner');
  const repo = searchParams.get('repo');

  if (!owner || !repo) {
    return NextResponse.json(
      { error: 'Missing required parameters: owner and repo' },
      { status: 400 }
    );
  }

  const allowedOwner = (process.env.GITHUB_USERNAME || 'jhansi-jjs').toLowerCase();

  // Correction #2: Lock down endpoint to ONLY accept owner matching GITHUB_USERNAME
  if (owner.toLowerCase() !== allowedOwner) {
    return NextResponse.json(
      { error: 'Forbidden: README preview is restricted to profile owner repositories.' },
      { status: 403 }
    );
  }

  const result = await getRepoReadme(owner, repo);

  if (result.error || !result.data) {
    return NextResponse.json(
      { error: result.error || 'Failed to fetch README' },
      { status: 404 }
    );
  }

  try {
    const parsedHtml = await marked.parse(result.data);
    return NextResponse.json({
      html: parsedHtml,
      raw: result.data,
      rateLimit: result.rateLimit,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error parsing markdown';
    return NextResponse.json({
      html: `<pre class="text-xs">${result.data}</pre>`,
      raw: result.data,
      error: msg,
    });
  }
}
