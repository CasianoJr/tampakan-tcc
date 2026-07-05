# Web Phase 10 — `/events` & `/events/:slug`

## Goal

Build the Events list page and individual event detail page.

## Steps

1. Create `src/data/events.ts` — 6+ mock events with slug, title, date, time, location, description, and image
2. Create `src/components/events/EventCard.tsx` — card with date badge, title, time, location, "View Event" link
3. Create `src/pages/events/EventsListPage.tsx` — hero + event grid
4. Create `src/pages/events/EventDetailPage.tsx` — hero + full event details
5. Add routes to `src/router.tsx`
6. Build & verify

## Verification

```bash
npm run build
```

## Done

- Created `src/data/events.ts` — 6 mock events with slug, title, date, time, location, description, content
- Created `src/components/events/EventCard.tsx` — card with image, date, time, location, "View Event" link
- Created `src/pages/events/EventsListPage.tsx` — hero + event grid with empty state
- Created `src/pages/events/EventDetailPage.tsx` — hero with metadata + full content with 404 fallback
- Added `/events` and `/events/:slug` routes to `src/router.tsx`
- Build: 0 errors
