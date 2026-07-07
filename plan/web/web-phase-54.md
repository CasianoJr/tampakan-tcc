# Web Phase 54 — Fix 404 on SPA Routes (Vercel) and Redirect Broken Links

## Goal

Fix "Explore Programs" and other buttons showing a 404 page on Vercel, replace `<a>` with `<Link>` for SPA navigation, and fix scroll position not resetting on route change.

## Root Cause

Three issues:

1. **Vercel SPA routing** — `vercel.json` only had an API rewrite, no catch-all `/(.*)` → `/index.html` rule. All client-side routes returned a server 404.

2. **Non-existent sub-pages** — `HeroBanner.tsx`, `ProgramsPreview.tsx`, `AcademicsPage.tsx`, and `Footer.tsx` linked to `/academics/programs` and `/academics/calendar` which have no routes.

3. **Scroll position persisted across navigations** — No `ScrollToTop` component caused pages to stay at mid-scroll when navigating via `<Link>`.

## Changes

### `vercel.json`

Added SPA fallback rewrite so all routes serve `index.html`:

```json
{
  "source": "/(.*)",
  "destination": "/index.html"
}
```

### `HeroBanner.tsx`

- `Explore Programs` link changed from `/academics/programs` → `/academics`

### `ProgramsPreview.tsx`

- `Learn More` link changed from `/academics/programs` → `/academics`

### `AcademicsPage.tsx`

- Program card link changed from `/academics/programs` → `/academics`
- Academic Calendar card link changed from `/academics/calendar` → `/academics`

### `Footer.tsx`

- Programs footer link changed from `/academics/programs` → `/academics`

### `HeroBanner.tsx` & `ProgramsPreview.tsx`

- Switched `<a href="...">` to `<Link to="...">` for client-side SPA navigation (no full page reload).

### New: `ScrollToTop.tsx`

Created a component that uses `useLocation` + `useEffect` to `window.scrollTo(0, 0)` on every `pathname` change.

```tsx
export default function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}
```

### `RootLayout.tsx`, `StudentLayout.tsx`, `AdminLayout.tsx`

- Added `<ScrollToTop />` at the top of each layout so route changes always scroll to top.

## Verification

```bash
npm run build
# Build passes with 0 errors.
```

## Done

- Added SPA fallback rewrite to `vercel.json` for Vercel client-side routing.
- Redirected all `/academics/programs` and `/academics/calendar` links to `/academics`.
- Replaced `<a>` with `<Link>` in HeroBanner and ProgramsPreview for SPA navigation.
- Created `ScrollToTop` component and added it to all three layouts (`RootLayout`, `StudentLayout`, `AdminLayout`).
- Build passes with 0 errors.
