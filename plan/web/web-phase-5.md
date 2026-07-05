# Web Phase 5 — About Subpages (History, Vision-Mission, Leadership)

## Goal

Implement the three About subpages: `/about/history`, `/about/vision-mission`, and `/about/leadership`. Each page uses the same hero style as `/about` with unique content.

## Steps

1. Create `src/pages/about/HistoryPage.tsx`:
   - Timeline-based layout: from proposal (2024) through consultative meetings, site prep, construction, to anticipated opening
   - Each milestone with year, title, and description

2. Create `src/pages/about/VisionMissionPage.tsx`:
   - Vision statement card
   - Mission statement list
   - Core values section

3. Create `src/pages/about/LeadershipPage.tsx`:
   - Mayor's profile card with photo placeholder, bio, and message
   - Admin team / board of trustees listing (placeholder cards)

4. Update `src/router.tsx` — add routes for all three subpages

## Verification

```bash
npm run build
# Compiles without errors
npm run dev
# Navigate to /about/history, /about/vision-mission, /about/leadership
```

---

## Done

| Step | Status |
|------|--------|
| Create `HistoryPage` — vertical timeline with 5 milestones | ✅ |
| Create `VisionMissionPage` — vision card, mission list, core values | ✅ |
| Create `LeadershipPage` — Mayor profile with message, team cards | ✅ |
| Update `router.tsx` — add all 3 subpage routes | ✅ |
| `npm run build` — 0 errors | ✅ |
