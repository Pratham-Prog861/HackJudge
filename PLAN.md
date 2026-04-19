# HackJudge MVP Plan

## Summary
Build the current starter repo into a full-stack hackathon judging app using Next.js App Router for UI, Convex for data/server logic, Clerk for auth, and Gemini for AI scoring. Replace the demo `numbers` flow with a modular product flow centered on submissions, evaluations, dashboard, leaderboard, and a basic admin review surface.

Defaults chosen for MVP:
- Public home page is a lightweight marketing/entry page.
- Admins are bootstrapped from an env allowlist and mirrored into Convex user records.
- AI evaluation degrades gracefully to a mock/placeholder result when Gemini or README fetch is unavailable, so submissions still work.

## Key Changes
### App structure and routes
- Replace the starter `app/page.tsx` with a public landing page that explains the platform and links to auth, dashboard, submit, and leaderboard.
- Add protected App Router pages for `/dashboard` and `/submit`, plus an admin page such as `/admin`.
- Add a public `/leaderboard` page with category filtering and top-3 highlighting.
- Update route protection in `proxy.ts` so dashboard, submit, and admin are protected; admin page also enforces role checks in server/data layer.
- Update `app/layout.tsx` metadata, global shell, and theme support; keep Clerk and Convex providers, add a simple app navbar/user menu, and include dark mode support.
- Remove the starter `/server` demo and number-management UI once product pages exist.

### Data model and Convex API
- Replace the `numbers` schema in `convex/schema.ts` with:
  - `users`: Clerk user identity fields, display info, `isAdmin`, timestamps.
  - `submissions`: owner reference, title, description, GitHub URL, demo URL, category, evaluation status, optional latest evaluation reference.
  - `evaluations`: submission reference, per-criterion scores, total, feedback, source (`gemini` or `mock`), optional admin override fields, timestamps.
- Add indexes needed for:
  - lookup by Clerk user id/email,
  - submissions by user,
  - submissions by category/status,
  - leaderboard sorting support through evaluation lookup.
- Replace `convex/myFunctions.ts` with focused modules, e.g. `users`, `submissions`, `evaluations`, `leaderboard`, `admin`.
- Implement core Convex functions:
  - create or sync current user record after sign-in,
  - create submission with per-user limit of 3,
  - fetch current user submissions,
  - fetch all ranked submissions for leaderboard,
  - fetch all submissions for admin,
  - admin score adjustment mutation.
- Keep role enforcement server-side in Convex for all admin-only reads/writes.

### Auth, AI, and product behavior
- Finish Clerk + Convex auth setup by enabling Clerk JWT provider in `convex/auth.config.ts` and using current Clerk identity in Convex functions.
- Add a small server/lib layer for:
  - URL validation helpers,
  - category constants/types,
  - admin allowlist resolution from env,
  - Gemini evaluation request/response parsing.
- Submission flow:
  - validate fields client-side and server-side,
  - store submission in Convex,
  - trigger evaluation pipeline,
  - mark evaluation state as pending, complete, or fallback.
- AI evaluation flow:
  - use submission description plus a README input placeholder; optionally attempt GitHub README fetch if feasible without overcomplicating the MVP,
  - send normalized prompt to Gemini,
  - require a strict JSON shape with `innovation`, `uiUx`, `codeQuality`, `problemSolving`, `completeness`, `total`, and `feedback`,
  - on parse/fetch/API failure, store a mock/fallback evaluation and status metadata instead of breaking the user flow.
- Admin adjustments:
  - allow admin to edit criterion scores and feedback or at minimum total-driving fields,
  - preserve original AI evaluation and store override metadata so leaderboard uses the effective score.

### UI and component plan
- Use shadcn/ui primitives for cards, buttons, inputs, select, textarea, tabs, badge, table, dialog/sheet as needed.
- Build a responsive dashboard with:
  - user greeting/profile summary,
  - submission cards,
  - score breakdown,
  - AI feedback,
  - loading/pending evaluation states.
- Build a submission form with category select, validated GitHub/demo URL inputs, submission count indicator, and disabled state at 3 submissions.
- Build a leaderboard with category tabs/filter, ranked cards/table, and visual treatment for top 3.
- Build a minimal admin page with an all-submissions list and score-adjustment form/modal.
- Add toast notifications for submit success/failure and admin updates.
- Keep the visual design clean and modern while staying MVP-sized and consistent with the existing shadcn/Tailwind setup.

## Public APIs / Interfaces
- Convex query/mutation surface will change from demo functions to product endpoints for:
  - current user sync/read,
  - create submission,
  - list my submissions,
  - list leaderboard submissions,
  - list all submissions for admin,
  - update evaluation scores as admin.
- Shared TS types/constants to introduce:
  - category union: `web`, `ai`, `data-science`, `mobile` or equivalent canonical values,
  - evaluation status union: `pending`, `completed`, `fallback`, `failed` if retained,
  - evaluation payload shape matching Gemini JSON contract,
  - effective score shape used by dashboard and leaderboard cards.
- Environment/config expectations:
  - Clerk public/secret keys,
  - Convex deployment URL,
  - Clerk JWT issuer domain for Convex,
  - admin allowlist env,
  - Gemini API key.

## Test Plan
- Auth and access:
  - guest can view landing and leaderboard but not dashboard/submit/admin,
  - signed-in user can access dashboard and submit,
  - non-admin cannot access admin functions even if route is guessed.
- Submission rules:
  - valid submission is created successfully,
  - invalid GitHub/demo URLs are rejected,
  - fourth submission is rejected server-side even if client is bypassed.
- Evaluation flow:
  - submission enters pending state,
  - successful Gemini/mock path stores structured evaluation,
  - fallback path still creates usable evaluation data and visible status.
- Dashboard and leaderboard:
  - dashboard shows only current user submissions,
  - leaderboard sorts by effective total descending,
  - category filter narrows results correctly,
  - top 3 presentation reflects sorted order.
- Admin behavior:
  - admin can view all submissions,
  - admin score changes update effective totals and leaderboard ordering,
  - original AI result remains distinguishable from override data.
- Quality checks:
  - lint passes,
  - basic responsive verification for landing, submit, dashboard, leaderboard, and admin screens,
  - dark mode remains legible across core surfaces.

## Assumptions
- README ingestion can start as a placeholder string or simple mocked content if live GitHub fetching adds too much friction; the evaluation interface should still be built to accept README text.
- Social login is provided through Clerk’s configured providers rather than custom auth UI logic.
- MVP favors one submission per evaluation record lifecycle with latest effective evaluation surfaced on the UI.
- No background job queue is required beyond a Convex-triggered evaluation flow suitable for MVP responsiveness.
