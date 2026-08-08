import { fetchGitHubGraphQL } from './client';
import {
  GET_USER_PINNED_REPOS,
  GET_USER_PUBLIC_REPOS,
  GET_REPO_README,
  GET_CONTRIBUTION_CALENDAR,
} from './queries';
import {
  Repository,
  PinnedRepo,
  ContributionCalendar,
  GitHubResult,
  FetchRepoOptions,
  RateLimitInfo,
} from '../types/github';

const DEFAULT_USERNAME = process.env.GITHUB_USERNAME || 'jhansi-jjs';

// Helper to map raw GraphQL node to typed Repository object
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapGraphQLRepoNode(node: any): Repository {
  const languages =
    node.languages?.edges?.map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (edge: any) => ({
        name: edge.node.name,
        color: edge.node.color,
        size: edge.size,
      })
    ) || [];

  const topics =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    node.repositoryTopics?.nodes?.map((tn: any) => tn.topic.name) || [];

  return {
    id: node.id,
    name: node.name,
    nameWithOwner: node.nameWithOwner,
    description: node.description,
    url: node.url,
    homepageUrl: node.homepageUrl,
    stargazerCount: node.stargazerCount,
    forkCount: node.forkCount,
    isPrivate: node.isPrivate,
    isFork: node.isFork,
    isArchived: node.isArchived,
    updatedAt: node.updatedAt,
    createdAt: node.createdAt,
    primaryLanguage: node.primaryLanguage
      ? {
          name: node.primaryLanguage.name,
          color: node.primaryLanguage.color,
        }
      : null,
    languages,
    topics,
    owner: {
      login: node.owner.login,
      avatarUrl: node.owner.avatarUrl,
    },
  };
}

// Fallback Mock Data in case GITHUB_TOKEN is unconfigured or rate limited
const MOCK_PINNED_REPOS: PinnedRepo[] = [
  {
    id: 'mock-1',
    name: 'gig-protector-pro',
    nameWithOwner: 'jhansi-jjs/gig-protector-pro',
    description: 'AI-driven security and gig economy fraud detection system.',
    url: 'https://github.com/jhansi-jjs/gig-protector-pro',
    homepageUrl: null,
    stargazerCount: 14,
    forkCount: 3,
    isPrivate: false,
    isFork: false,
    isArchived: false,
    updatedAt: '2026-08-01T12:00:00Z',
    createdAt: '2025-01-10T12:00:00Z',
    primaryLanguage: { name: 'Python', color: '#3572A5' },
    languages: [
      { name: 'Python', color: '#3572A5', size: 45000 },
      { name: 'TypeScript', color: '#3178c6', size: 12000 },
    ],
    topics: ['machine-learning', 'fraud-detection', 'cybersecurity', 'ai'],
    owner: { login: 'jhansi-jjs' },
  },
  {
    id: 'mock-2',
    name: 'mnist-model-compression',
    nameWithOwner: 'jhansi-jjs/mnist-model-compression',
    description: 'Quantization and pruning techniques for deep neural network compression.',
    url: 'https://github.com/jhansi-jjs/mnist-model-compression',
    homepageUrl: null,
    stargazerCount: 8,
    forkCount: 2,
    isPrivate: false,
    isFork: false,
    isArchived: false,
    updatedAt: '2026-07-20T10:00:00Z',
    createdAt: '2024-11-15T10:00:00Z',
    primaryLanguage: { name: 'Jupyter Notebook', color: '#DA5B0B' },
    languages: [{ name: 'Jupyter Notebook', color: '#DA5B0B', size: 30000 }],
    topics: ['model-compression', 'pytorch', 'deep-learning', 'quantization'],
    owner: { login: 'jhansi-jjs' },
  },
  {
    id: 'mock-3',
    name: 'road-accident-ml-project',
    nameWithOwner: 'jhansi-jjs/road-accident-ml-project',
    description: 'Predictive analytics and severity classification model for road accidents.',
    url: 'https://github.com/jhansi-jjs/road-accident-ml-project',
    homepageUrl: null,
    stargazerCount: 11,
    forkCount: 4,
    isPrivate: false,
    isFork: false,
    isArchived: false,
    updatedAt: '2026-06-15T08:00:00Z',
    createdAt: '2024-08-01T08:00:00Z',
    primaryLanguage: { name: 'Python', color: '#3572A5' },
    languages: [{ name: 'Python', color: '#3572A5', size: 35000 }],
    topics: ['data-science', 'scikit-learn', 'classification'],
    owner: { login: 'jhansi-jjs' },
  },
  {
    id: 'mock-4',
    name: 'brain-vault-private',
    nameWithOwner: 'jhansi-jjs/brain-vault-private',
    description: 'Local-first knowledge management system and memory graph engine.',
    url: 'https://github.com/jhansi-jjs/brain-vault-private',
    homepageUrl: null,
    stargazerCount: 6,
    forkCount: 1,
    isPrivate: false,
    isFork: false,
    isArchived: false,
    updatedAt: '2026-08-05T15:00:00Z',
    createdAt: '2025-03-01T15:00:00Z',
    primaryLanguage: { name: 'TypeScript', color: '#3178c6' },
    languages: [{ name: 'TypeScript', color: '#3178c6', size: 50000 }],
    topics: ['knowledge-graph', 'react', 'nextjs'],
    owner: { login: 'jhansi-jjs' },
  },
];

/**
 * Fetch pinned repositories for the specified user.
 * Filters out external pins (where owner !== username) as per specs.
 */
export async function getPinnedRepos(
  username: string = DEFAULT_USERNAME
): Promise<GitHubResult<PinnedRepo[]>> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const res = await fetchGitHubGraphQL<any>(GET_USER_PINNED_REPOS, { username });

  if (res.error || !res.data?.user?.pinnedItems?.nodes) {
    return {
      data: MOCK_PINNED_REPOS,
      error: res.error || 'Failed to fetch pinned repos. Using fallback data.',
      rateLimit: res.rateLimit,
      isMockData: true,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rawNodes = res.data.user.pinnedItems.nodes;
  const repos = rawNodes
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .filter((node: any) => node && node.owner?.login?.toLowerCase() === username.toLowerCase())
    .map(mapGraphQLRepoNode);

  return {
    data: repos,
    error: null,
    rateLimit: res.rateLimit,
    isMockData: false,
  };
}

/**
 * Fetch all public repositories for the specified user.
 * Excludes forks and archived repos by default unless requested in options.
 */
export async function getAllRepos(
  username: string = DEFAULT_USERNAME,
  options: FetchRepoOptions = {}
): Promise<GitHubResult<Repository[]>> {
  const { includeForks = false, includeArchived = false } = options;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const res = await fetchGitHubGraphQL<any>(GET_USER_PUBLIC_REPOS, { username, first: 100 });

  if (res.error || !res.data?.user?.repositories?.nodes) {
    return {
      data: MOCK_PINNED_REPOS,
      error: res.error || 'Failed to fetch public repos. Using fallback data.',
      rateLimit: res.rateLimit,
      isMockData: true,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rawNodes = res.data.user.repositories.nodes;
  const repos = rawNodes
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .filter((node: any) => {
      if (!node) return false;
      // Filter 1: Must be owned by user
      if (node.owner?.login?.toLowerCase() !== username.toLowerCase()) return false;
      // Filter 2: Fork filter
      if (!includeForks && node.isFork) return false;
      // Filter 3: Archived filter
      if (!includeArchived && node.isArchived) return false;
      return true;
    })
    .map(mapGraphQLRepoNode);

  return {
    data: repos,
    error: null,
    rateLimit: res.rateLimit,
    isMockData: false,
  };
}

/**
 * Fetch raw README markdown for a specific repository.
 */
export async function getRepoReadme(
  owner: string,
  repo: string
): Promise<GitHubResult<string>> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const res = await fetchGitHubGraphQL<any>(GET_REPO_README, { owner, repo });

  if (res.error || !res.data?.repository) {
    return {
      data: '# README\n\nNo README content found or error fetching file.',
      error: res.error || 'Repository README not found.',
      rateLimit: res.rateLimit,
    };
  }

  const readmeText = res.data.repository.object?.text || 'No README text available.';

  return {
    data: readmeText,
    error: null,
    rateLimit: res.rateLimit,
  };
}

/**
 * Fetch contribution calendar data.
 */
export async function getContributionCalendar(
  username: string = DEFAULT_USERNAME
): Promise<GitHubResult<ContributionCalendar>> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const res = await fetchGitHubGraphQL<any>(GET_CONTRIBUTION_CALENDAR, { username });

  if (res.error || !res.data?.user?.contributionsCollection?.contributionCalendar) {
    return {
      data: {
        totalContributions: 1420,
        weeks: [],
      },
      error: res.error || 'Failed to fetch contribution calendar.',
      rateLimit: res.rateLimit,
      isMockData: true,
    };
  }

  const calendar: ContributionCalendar =
    res.data.user.contributionsCollection.contributionCalendar;

  return {
    data: calendar,
    error: null,
    rateLimit: res.rateLimit,
    isMockData: false,
  };
}
