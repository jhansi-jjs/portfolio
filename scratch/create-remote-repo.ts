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

if (!token) {
  console.error('Error: GITHUB_TOKEN not found in .env.local');
  process.exit(1);
}

async function main() {
  console.log('Creating repository "portfolio" on GitHub via REST API...');

  try {
    const res = await fetch('https://api.github.com/user/repos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'User-Agent': 'Antigravity-Portfolio-Setup',
      },
      body: JSON.stringify({
        name: 'portfolio',
        description: 'Personal Portfolio built with Next.js 15, Tailwind v4 & GitHub GraphQL',
        private: false,
        auto_init: false,
      }),
    });

    if (res.status === 201) {
      console.log('✓ Successfully created github.com/jhansi-jjs/portfolio repository!');
    } else if (res.status === 422) {
      console.log('Notice: Repository "portfolio" already exists on GitHub.');
    } else {
      const text = await res.text();
      console.error(`API status ${res.status}: ${text}`);
    }

    const portfolioDir = path.resolve(__dirname, '..');
    const authRemoteUrl = `https://${token}@github.com/jhansi-jjs/portfolio.git`;

    console.log('Updating git remote origin...');
    try {
      execSync(`git -C "${portfolioDir}" remote remove origin`, { stdio: 'ignore' });
    } catch {}

    execSync(`git -C "${portfolioDir}" remote add origin https://github.com/jhansi-jjs/portfolio.git`, { stdio: 'inherit' });

    console.log('Pushing main branch to GitHub...');
    execSync(`git -C "${portfolioDir}" push "${authRemoteUrl}" main --force`, { stdio: 'inherit' });
    console.log('✓ Successfully pushed initial commit to https://github.com/jhansi-jjs/portfolio.git!');
  } catch (err: unknown) {
    console.error('Error:', err);
  }
}

main();
