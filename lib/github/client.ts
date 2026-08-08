import { RateLimitInfo } from '../types/github';

const GITHUB_GRAPHQL_API = 'https://api.github.com/graphql';
export const DEFAULT_REVALIDATE_SECONDS = 3600;

interface GraphQLResponse<T> {
  data?: T & { rateLimit?: RateLimitInfo };
  errors?: Array<{ message: string; locations?: unknown; path?: unknown }>;
}

export async function fetchGitHubGraphQL<T>(
  query: string,
  variables: Record<string, unknown> = {},
  revalidateWindowSeconds: number = DEFAULT_REVALIDATE_SECONDS
): Promise<{
  data: T | null;
  error: string | null;
  rateLimit: RateLimitInfo | null;
}> {
  const token = process.env.GITHUB_TOKEN;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'User-Agent': 'Antigravity-Portfolio-Engine',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(GITHUB_GRAPHQL_API, {
      method: 'POST',
      headers,
      body: JSON.stringify({ query, variables }),
      next: { revalidate: revalidateWindowSeconds },
    });

    if (!res.ok) {
      const errorText = await res.text();
      return {
        data: null,
        error: `GitHub GraphQL HTTP ${res.status}: ${res.statusText} (${errorText})`,
        rateLimit: null,
      };
    }

    const json: GraphQLResponse<T> = await res.json();

    if (json.errors && json.errors.length > 0) {
      const errorMsg = json.errors.map((e) => e.message).join('; ');
      const rateLimit = json.data?.rateLimit || null;
      return {
        data: json.data || null,
        error: `GraphQL Error: ${errorMsg}`,
        rateLimit,
      };
    }

    const rateLimit = json.data?.rateLimit || null;
    return {
      data: json.data || null,
      error: null,
      rateLimit,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown network error';
    return {
      data: null,
      error: `Network Error: ${message}`,
      rateLimit: null,
    };
  }
}
