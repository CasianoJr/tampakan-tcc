# Web Phase 11 — `/student-life`, `/student-life/organizations`, `/student-life/services`

## Goal

Build the Student Life overview page and its two subpages.

## Steps

1. Create `src/data/studentLife.ts` — organizations and services data
2. Create `src/pages/student-life/StudentLifePage.tsx` — hero + subpage cards + spotlight section
3. Create `src/pages/student-life/OrganizationsPage.tsx` — list of student organizations
4. Create `src/pages/student-life/StudentServicesPage.tsx` — list of student support services
5. Add routes to `src/router.tsx`
6. Build & verify

## Verification

```bash
npm run build
```

## Done

- Created `src/data/studentLife.ts` — 7 organizations and 7 services with descriptions
- Created `src/pages/student-life/StudentLifePage.tsx` — hero + subpage cards + spotlight section
- Created `src/pages/student-life/OrganizationsPage.tsx` — list of student orgs with focus tags and empty state
- Created `src/pages/student-life/StudentServicesPage.tsx` — grid of services with icon mapping and availability
- Added `/student-life`, `/student-life/organizations`, `/student-life/services` routes to `src/router.tsx`
- Build: 0 errors
