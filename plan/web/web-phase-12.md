# Web Phase 12 — `/faculty` & `/faculty/:slug`

## Goal

Build the Faculty directory page and individual faculty profile page.

## Steps

1. Create `src/data/faculty.ts` — 6+ faculty members with slug, name, title, department, bio, education, image
2. Create `src/components/faculty/FacultyCard.tsx` — card with photo, name, title, department
3. Create `src/pages/faculty/FacultyDirectoryPage.tsx` — hero + faculty grid with search/filter
4. Create `src/pages/faculty/FacultyProfilePage.tsx` — hero + full profile with bio, education
5. Add routes to `src/router.tsx`
6. Build & verify

## Verification

```bash
npm run build
```

## Done

- Created `src/data/faculty.ts` — 7 faculty members with slug, name, title, department, bio, education, email
- Created `src/components/faculty/FacultyCard.tsx` — card with photo, name, title, department, "View Profile" link
- Created `src/pages/faculty/FacultyDirectoryPage.tsx` — hero + search filter + card grid with empty state
- Created `src/pages/faculty/FacultyProfilePage.tsx` — hero + profile layout with photo, bio, education list, email, 404 fallback
- Added `/faculty` and `/faculty/:slug` routes to `src/router.tsx`
- Build: 0 errors
