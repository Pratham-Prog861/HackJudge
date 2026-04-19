# HackJudge

HackJudge is a full-stack hackathon judging app built with Next.js App Router, Convex, and Clerk. Participants submit projects, an AI evaluator generates structured scorecards, and admins can override scores while preserving the original AI output.

## Features

- Public landing page and leaderboard
- Protected dashboard and submission flow
- Submission cap enforcement (3 per user)
- AI evaluation pipeline with fallback results when Gemini or README fetch fails
- Admin-only review and score override tools
- Category filters and ranked leaderboard based on effective totals

## Stack

- Next.js 16 + React 19
- Convex (database, queries, mutations, actions)
- Clerk (authentication)
- Tailwind CSS v4 + custom UI primitives

## Required Environment Variables

Create `.env.local` for Next.js and configure matching values in Convex dashboard env vars where needed.

Frontend / Next.js:

- `NEXT_PUBLIC_CONVEX_URL`
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`

Convex:

- `CLERK_JWT_ISSUER_DOMAIN`
- `ADMIN_ALLOWLIST` (comma-separated emails)
- `GEMINI_API_KEY` (optional, fallback evaluation is used when missing)

## Local Development

```bash
pnpm install
pnpm dev
```

This runs both Next.js and Convex dev servers.

## Clerk + Convex Auth Setup

1. Create a Clerk JWT template named `convex`.
2. Set `CLERK_JWT_ISSUER_DOMAIN` in Convex deployment settings.
3. Ensure your Next.js `.env.local` contains Clerk publishable/secret keys.
4. Sign in to the app; user records are synced into Convex automatically.

## Core Routes

- `/` public landing
- `/leaderboard` public rankings
- `/dashboard` protected user submissions
- `/submit` protected submission form
- `/admin` protected route with server-enforced admin checks

## Quality Checks

```bash
pnpm lint
pnpm exec tsc --noEmit
```

## Notes

- AI scoring expects JSON with criterion scores and feedback.
- On any AI/readme parsing failure, fallback evaluations keep submissions visible and rankable.
