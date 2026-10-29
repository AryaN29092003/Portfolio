# Arya Nazare, portfolio

React, Vite and TypeScript, deployed to GitHub Pages with GitHub Actions. Plain CSS, no animation library.

## Run locally
```bash
npm install
npm run dev
```

## Deploy
1. Push to `main` (or `master`).
2. In the repo go to **Settings > Pages** and set **Source** to **GitHub Actions**.
3. The site appears at `https://aryan29092003.github.io/Portfolio/`.

`vite.config.ts` sets `base: '/Portfolio/'` to match the repo name. If you rename the repo, or move to a custom domain, change it.

## Edit content
All copy lives in `src/data/`. Anything marked `[CONFIRM]` is a placeholder to check or replace before publishing:
- `site.ts`: headline, intro, links, "How I work" text
- `projects.ts`: case studies (problem, architecture, contribution, links)
- `experience.ts`: roles, dates, certification
- `experiments.ts`: side projects

## Before going live
- Put your resume at `public/resume.pdf`. Use a copy without your phone number, since the site is public.
- Add project screenshots or diagrams to `public/media/` and replace the dashed placeholder in `src/sections/CaseStudy.tsx`.
- Search the repo for `[CONFIRM]` and resolve each one.
- Keep client details out of the healthcare pipelines case study.
