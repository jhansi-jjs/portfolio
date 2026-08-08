# Portfolio Phase 0 — Setup & Architecture Guide

## Tech Stack
- **Framework**: Next.js 15 (App Router) with TypeScript Strict Mode
- **Styling**: Tailwind CSS v4 (CSS-based `@import "tailwindcss"`)
- **UI Components**: `shadcn/ui` initialized via CLI
- **Animation**: `framer-motion`
- **Data Engine**: Native server-only GitHub GraphQL API client (`/lib/github`)

---

## Environment Configuration

1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Generate a GitHub Personal Access Token (PAT):
   - Visit [GitHub Settings -> Developer Settings -> Personal Access Tokens](https://github.com/settings/tokens)
   - Generate a classic token or fine-grained token with `public_repo` (read-only) permission.
   - Add your token to `.env.local`:
     ```env
     GITHUB_USERNAME=jhansi-jjs
     GITHUB_TOKEN=ghp_your_token_here
     ```

---

## Caching & ISR Strategy

- **GraphQL API Endpoint**: Uses native `fetch()` POST requests directly to `https://api.github.com/graphql`.
- **Revalidation**: Set to 3600 seconds (1 hour) via Next.js `fetch(url, { next: { revalidate: 3600 } })`.
- **Rate Limit Tracking**: Every query explicitly requests `rateLimit { limit cost remaining resetAt }` from GitHub.
- **Graceful Degraded State**: If `GITHUB_TOKEN` is unconfigured, network fails, or rate limits are exhausted, the service layer returns fallback structured mock data for `jhansi-jjs` repos (`gig-protector-pro`, `mnist-model-compression`, `road-accident-ml-project`, `brain-vault-private`) along with an `isMockData` flag. The UI never crashes.

---

## Development & Debugging

- **Development Server**:
  ```bash
  npm run dev
  ```

- **Debug Endpoint**:
  Access `http://localhost:3000/debug` during development (`NODE_ENV === 'development'`).
  *Note: The debug page is automatically gated with `notFound()` in production environments to protect API internals.*
