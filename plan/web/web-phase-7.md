# Web Phase 7 — Visual Polish: Stock Background Imagery

## Goal

Add curated stock photos as hero backgrounds with gradient overlays, real local imagery for authenticity, and revert unnecessary section backgrounds to solid colors.

## Steps

1. **All pages** — add hero background images with dark gradient overlays
2. **Home** — add bg imagery only to CtaSection (Stay Informed); all other home sections use solid colors
3. **/about pages** — hero sections use `/assets/TCC_building.jpg` (local); content sections use solid colors
4. **AcademicsPage** — hero uses `/assets/TCC_building.jpg`; content sections use solid colors
5. Build & verify

## Image Policy

- Hero backgrounds sourced from [Unsplash](https://unsplash.com) initially.
- `/about` and `/academics` hero sections use local file `/public/assets/TCC_building.jpg`.
- Replace all placeholder imagery with official LGU photos when available.
- Every `<img>` uses `loading="lazy"` and descriptive `alt` text.

## Verification

```bash
npm run build
# 0 errors
```

---

## Done

| Page / Component | Change |
|---|---|
| HeroBanner | Solid gradient (no bg image) |
| KeyDetailsStrip | Solid bg-sky-field (no bg image) |
| PreEnrollNowSection | Solid bg-cloud-white (no bg image) |
| TimelineSection | Solid bg-sky-field (no bg image) |
| ProgramsPreview | Solid bg-cloud-white (no bg image) |
| CtaSection | Unsplash lecture hall bg + gradient overlay |
| AboutPage — hero | `TCC_building.jpg` + gradient overlay |
| AboutPage — overview cards | Solid bg-cloud-white |
| AboutPage — mayor message | Solid bg-sky-field |
| HistoryPage — hero | `TCC_building.jpg` + gradient overlay |
| HistoryPage — timeline | Solid bg-cloud-white |
| VisionMissionPage — hero | `TCC_building.jpg` + gradient overlay |
| VisionMissionPage — content | Solid bg-cloud-white |
| LeadershipPage — hero | `TCC_building.jpg` + gradient overlay |
| LeadershipPage — content | Solid bg-cloud-white; initials placeholders |
| AcademicsPage — hero | `TCC_building.jpg` + gradient overlay |
| AcademicsPage — content cards | Solid bg-cloud-white |
| AcademicsPage — Agri spotlight | Solid bg-sky-field |
| website-web-plan.md | Added stock imagery policy in §7 |
| `npm run build` | 0 errors |
