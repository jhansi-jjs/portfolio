import fs from 'fs';
import path from 'path';

// Load .env.local manually for standalone node script
const envPath = path.resolve(__dirname, '../.env.local');
if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, 'utf8');
  for (const line of envConfig.split('\n')) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...val] = trimmed.split('=');
      if (key && val.length > 0) {
        process.env[key.trim()] = val.join('=').trim();
      }
    }
  }
}

import { getPinnedRepos, getAllRepos } from '../lib/github';

async function main() {
  console.log("=== TESTING LIVE GITHUB GRAPHQL FETCH ===");
  console.log("Token present:", Boolean(process.env.GITHUB_TOKEN));
  console.log("Username:", process.env.GITHUB_USERNAME);
  
  const pinnedRes = await getPinnedRepos('jhansi-jjs');
  console.log("\nPinned Repos Result:");
  console.log("  isMockData:", pinnedRes.isMockData);
  console.log("  error:", pinnedRes.error);
  console.log("  rateLimit:", pinnedRes.rateLimit);
  console.log("  count:", pinnedRes.data?.length);
  if (pinnedRes.data) {
    console.log("  repos:", pinnedRes.data.map(r => ({
      name: r.name,
      owner: r.owner.login,
      stars: r.stargazerCount,
      lang: r.primaryLanguage?.name
    })));
  }

  const allRes = await getAllRepos('jhansi-jjs');
  console.log("\nAll Public Repos Result (non-fork, non-archived):");
  console.log("  count:", allRes.data?.length);
  if (allRes.data) {
    console.log("  all names:", allRes.data.map(r => r.name));
  }
}

main().catch(console.error);
