# Portfolio V2

Single-page portfolio: a dark eclipse ring with a Delphinus constellation. Each star opens a section.
Desktop hovers show a preview card; click opens a full-screen glass page. On phones, tap a star to preview,
tap again to open, and swipe sideways between sections. Two palettes ship (aurora, nebula) with a small switch bottom-left.

## Run

```bash
npm install
npm run dev        # local dev server
npm run build      # type-check + production build into dist/
```

## Where things live

- `src/data/content.ts`: all copy (roles, projects, about, contact, case study). Edit text here.
- `src/data/design.ts`: palettes, star positions, section icons and reveal origins.
- `src/art/art.ts`: generated ring artwork for both palettes (decorative; not meant to be hand-edited).
- `src/components/Desktop.tsx` and `Mobile.tsx`: the two layouts. `tiles.tsx` holds the tile grid for every page.
- `src/styles/`: `desktop.css` (scoped under `.d`) and `mobile.css` (scoped under `.m`).
- `public/resume.pdf`: the resume the Resume page opens and downloads.

## Notes

- The layout switches to the mobile design at 760px wide and below.
- Esc closes the case study, then the page. The browser back button also closes an open page.
- Numbers shown on tiles (`8+`, `3`, `90%`) come from the previous site's copy; change them in `content.ts` if you have better headline figures.
 