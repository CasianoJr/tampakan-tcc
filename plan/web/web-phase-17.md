# Web Phase 17 — NotFoundPage (404) + Navbar Login Links

## Goal

Add a 404 Not Found page for invalid routes, fix the Our Journey timeline to stack vertically on small screens, and add Sign In / Admin login links to the public navbar.

## Implementation Steps

1. Create `src/pages/NotFoundPage.tsx` — 404 page with:
   - Large "404" heading
   - "Page Not Found" message
   - "Back to Home" link
   - Simple, centered layout matching the site design
2. Update `src/router.tsx` — add `{ path: '*', element: <NotFoundPage /> }` catch-all route under RootLayout
3. Fix `src/components/home/TimelineSection.tsx` — on mobile (`< md`):
   - Stack items vertically with a vertical connecting line
   - Icon + label + year in a horizontal row per step
   - Desktop keeps existing horizontal layout
4. Update `src/components/layout/Navbar.tsx` — add login navs:
   - Desktop: "Sign In" (`/student/login`) button + "Admin" (`/admin/login`) button at right side
   - Mobile: "Student Sign In" and "Admin Sign In" links at bottom of hamburger menu
5. Build: verify 0 errors

## Files Created

```
src/pages/NotFoundPage.tsx
plan/web/web-phase-17.md
```

## Files Modified

```
src/router.tsx                            — add 404 catch-all route
src/components/home/TimelineSection.tsx   — mobile vertical timeline
src/components/layout/Navbar.tsx          — login nav links
```

## Verification

```bash
npm run build
# Visit /nonexistent — should see 404 page
# Resize to mobile — timeline should stack vertically
# Navbar should show Sign In / Admin links
```

## Done

- Created `src/pages/NotFoundPage.tsx` — centered 404 with "Back to Home" link
- Updated `src/router.tsx` — added `{ path: '*', element: <NotFoundPage /> }` catch-all
- Fixed `TimelineSection.tsx` — mobile: vertical timeline with connecting line; desktop: unchanged horizontal
- Updated `Navbar.tsx` — desktop: "Sign In" + "Admin" buttons at right; mobile: login links in hamburger menu
- Build: 0 errors
