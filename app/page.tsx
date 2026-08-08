import { getPinnedRepos, getAllRepos, getContributionCalendar } from '@/lib/github';
import { PortfolioClientWrapper } from '@/components/portfolio-client-wrapper';

export const revalidate = 3600; // 1-hour ISR revalidation

export default async function HomePage() {
  const [pinnedRes, allReposRes, contributionRes] = await Promise.all([
    getPinnedRepos(),
    getAllRepos(),
    getContributionCalendar(),
  ]);

  const rateLimit = pinnedRes.rateLimit || allReposRes.rateLimit || contributionRes.rateLimit || null;
  const isMockData = Boolean(pinnedRes.isMockData || allReposRes.isMockData || contributionRes.isMockData);
  const error = pinnedRes.error || allReposRes.error || null;

  return (
    <PortfolioClientWrapper
      pinnedRepos={pinnedRes.data || []}
      allRepos={allReposRes.data || []}
      calendar={contributionRes.data || null}
      rateLimit={rateLimit}
      isMockData={isMockData}
      error={error}
    />
  );
}
