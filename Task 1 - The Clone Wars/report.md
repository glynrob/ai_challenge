# Task 1 — The Clone Wars: Report

## Live URL

`https://glynrob.github.io/ai_challenge/`

## What I built

A static React app that visually and functionally clones the company leaderboard shown in the reference screenshots. All 227 records are synthesized — no real names, titles, or department codes from the original.

## Tools and techniques

- **Vite + React 19 + TypeScript** for the app. TypeScript was chosen because the data model (User → Activity arrays, with category and quarter enums) is the spine of the project, and shared types between the data-generation script and the components prevent the kind of typo bugs that are otherwise hard to catch in a derived-state UI.
- **Tailwind CSS v4** (`@tailwindcss/vite` plugin). Three custom theme tokens for the gold/silver/bronze podium accents; everything else uses Tailwind built-ins. Mobile responsive via the `md:` breakpoint.
- **`@faker-js/faker`** (devDependency) drives the data generator. Seeded with `42` so the data set is fully deterministic — anyone running `npm run generate` reproduces the exact JSON in this repo.
- **DiceBear "avataaars"** for synthetic user avatars. The generator fetches each SVG once during `npm run generate` and writes it to `public/avatars/{userId}.svg`. The deployed site references local paths only — there are zero runtime requests to any third-party service.
- **GitHub Actions** with the `actions/configure-pages` → `upload-pages-artifact` → `deploy-pages` chain. The workflow builds from `Task 1 - The Clone Wars/app/` and deploys the `dist/` folder. No `gh-pages` package, no `gh-pages` branch.

## How I handled data replacement

Every field that could leak the original company's data is synthesized:

- **Names** — `faker.person.firstName()` + `faker.person.lastName()` for each of 227 users; Faker also supplies the names that appear inside activity titles (`[REG] Mentoring of <name>`).
- **Job titles** — drawn from a fixed pool of generic engineering / QA / management roles (Software Engineer, Senior Software Engineer, QA Engineer, Senior QA Engineer, Lead QA Engineer, Group Manager, HR Manager, Marketing Manager). The roles match the kind of titles that would plausibly appear on a corporate leaderboard, but none reflect the original org's structure.
- **Department codes** — assembled from four fictional segment pools (regions, units, groups, divisions), each with a small number of values. This mimics the dot-separated hierarchical pattern from the original (e.g. `TM.U2.G1.T1`) without copying any of the original codes.
- **Activity titles** — three templates per category:
  - Education: `[REG] Mentoring of {name}`, `[LAB] Mentoring of {name}`, `Course: "{topic}"`
  - University Partnership: `Partnership with {university}`, `Lecture at {university}`, `Recruiting visit to {university}`
  - Public Speaking: `Talk: "{topic}"`, `Workshop: "{topic}"`, `Panel: "{topic}"`
- **Topics and universities** — fixed pools of generic-sounding values (no real institution names).
- **Avatars** — DiceBear cartoon "avataaars" generated from each user's UUID seed. No real photos, no licensing concerns.
- **Points** — sampled from a small pool `[6, 8, 16, 32, 64, 96]` to match the visual feel of the reference screenshots.

The categories themselves (Education, University Partnership, Public Speaking) are kept as the user clarified — these are descriptive enough that they aren't proprietary.

## Functionality preserved from the original

- Three filters (Year, Quarter, Category) plus a free-text employee search.
- Filters genuinely re-compute totals and re-rank users — selecting "Education" recomputes each user's total to their Education-only points and re-orders the podium and list accordingly.
- Top-3 podium with gold / silver / bronze tiers; first place is taller and centred.
- Full ranked list below the podium (1..N), including the top three.
- Category icon strip per row with hover tooltips showing the category name.
- Per-row chevron expand revealing a "Recent Activity" table (Activity / Category / Date / Points) sorted by date descending.
- Independent expand state — multiple rows can be expanded at once.
- Mobile layout: filters stack to a column, podium stacks vertically with 1st place on top, rows reflow.

## Deviations from the original

None intended. The Year filter is wired up but functionally a stub because the original's dropdown only offers `All Years` and `2025`, and all the data on the original page is 2025; this clone matches that.

## Repository structure

```
ai_challenge/
  .github/workflows/deploy.yml
  Task 1 - The Clone Wars/
    report.md
    app/
      package.json, vite.config.ts, tsconfig*.json
      index.html
      public/
        leaderboard.json          (committed, generated)
        avatars/{id}.svg          (committed, 227 files)
      scripts/generate-data.mjs
      src/
        main.tsx, App.tsx, index.css, types.ts
        components/
          Filters.tsx, Podium.tsx,
          LeaderboardList.tsx, LeaderboardRow.tsx,
          ActivityTable.tsx, CategoryIcon.tsx, StarIcon.tsx
        hooks/useLeaderboard.ts
```

## Local development

```bash
cd "Task 1 - The Clone Wars/app"
npm install
npm run dev          # http://localhost:5173/ai_challenge/
npm run build        # type-check + production build to dist/
npm run preview      # serve dist/ locally
npm run generate     # regenerate leaderboard.json + avatars/ (deterministic, seed 42)
```
