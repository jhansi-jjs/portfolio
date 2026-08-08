import { getPinnedRepos, getAllRepos, getContributionCalendar } from '../lib/github';

async function main() {
  console.log("=== TESTING WITHOUT GITHUB_TOKEN ===");
  delete process.env.GITHUB_TOKEN;
  const mockPinned = await getPinnedRepos('jhansi-jjs');
  console.log("Pinned repos without token:");
  console.log("  isMockData:", mockPinned.isMockData);
  console.log("  error:", mockPinned.error);
  console.log("  count:", mockPinned.data?.length);

  const mockCalendar = await getContributionCalendar('jhansi-jjs');
  console.log("Contribution calendar without token:");
  console.log("  isMockData:", mockCalendar.isMockData);
  console.log("  totalContributions:", mockCalendar.data?.totalContributions);
}

main().catch(console.error);
