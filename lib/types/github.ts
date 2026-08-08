export interface Language {
  name: string;
  color: string | null;
  size?: number;
}

export interface RepositoryOwner {
  login: string;
  avatarUrl?: string;
}

export interface Repository {
  id: string;
  name: string;
  nameWithOwner: string;
  description: string | null;
  url: string;
  homepageUrl: string | null;
  stargazerCount: number;
  forkCount: number;
  isPrivate: boolean;
  isFork: boolean;
  isArchived: boolean;
  updatedAt: string;
  createdAt: string;
  primaryLanguage: Language | null;
  languages: Language[];
  topics: string[];
  owner: RepositoryOwner;
  readme?: string | null;
}

export type PinnedRepo = Repository;

export interface ContributionDay {
  date: string;
  contributionCount: number;
  color: string;
  weekday: number;
}

export interface ContributionWeek {
  contributionDays: ContributionDay[];
}

export interface ContributionCalendar {
  totalContributions: number;
  weeks: ContributionWeek[];
}

export interface RateLimitInfo {
  limit: number;
  cost: number;
  remaining: number;
  resetAt: string;
}

export interface GitHubResult<T> {
  data: T | null;
  error: string | null;
  rateLimit: RateLimitInfo | null;
  isMockData?: boolean;
}

export interface FetchRepoOptions {
  includeForks?: boolean;
  includeArchived?: boolean;
}
