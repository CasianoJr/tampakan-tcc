# Web Phase 4 — About Page

## Goal

Implement the `/about` page with an overview of Tampakan Community College, plus placeholder content for the three subpages (`/about/history`, `/about/vision-mission`, `/about/leadership`).

## Steps

1. Create `src/pages/about/AboutPage.tsx`:
   - Hero section with page title and brief description
   - Mission & Vision summary cards
   - Link cards to subpages: History, Vision-Mission, Leadership
   - "Mayor's Message" spotlight section
   - Framer Motion fade-in transitions

2. Update `src/router.tsx` — add `/about` route under root layout

## Verification

```bash
npm run build
# Compiles without errors
npm run dev
# Navigate to /about — shows full About page with sections
```

---

## Done

| Step | Status |
|------|--------|
| Create `AboutPage` — hero, quick overview cards (History, Vision-Mission, Leadership), Mayor's message spotlight | ✅ |
| Update `router.tsx` — add `/about` route | ✅ |
| `npm run build` — 0 errors | ✅ |
