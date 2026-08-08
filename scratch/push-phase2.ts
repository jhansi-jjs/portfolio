import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const envPath = path.resolve(__dirname, '../.env.local');
let token = process.env.GITHUB_TOKEN || '';

if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, 'utf8');
  for (const line of envConfig.split('\n')) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...val] = trimmed.split('=');
      if (key && key.trim() === 'GITHUB_TOKEN') {
        token = val.join('=').trim();
      }
    }
  }
}

const portfolioDir = path.resolve(__dirname, '..');
const authRemoteUrl = `https://${token}@github.com/jhansi-jjs/portfolio.git`;

console.log('Staging Phase 2 changes...');
execSync(`git -C "${portfolioDir}" add .`, { stdio: 'inherit' });

console.log('Committing Phase 2 changes...');
try {
  execSync(`git -C "${portfolioDir}" commit -m "Phase 2: Experience, Certificates, Achievements, SEO, and user fixes"`, { stdio: 'inherit' });
} catch (e) {
  console.log('No new changes to commit.');
}

console.log('Pushing main branch to GitHub...');
execSync(`git -C "${portfolioDir}" push "${authRemoteUrl}" main`, { stdio: 'inherit' });
console.log('✓ Successfully pushed Phase 2 to https://github.com/jhansi-jjs/portfolio.git!');
