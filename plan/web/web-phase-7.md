# Web Phase 7 — Visual Polish: Stock Background Imagery

## Goal

Upgrade the look and feel of every implemented page by adding curated stock photos as hero/section backgrounds with gradient overlays, plus placeholder profile imagery.

## Steps

1. **HeroBanner** — add full-bleed Unsplash campus background with dark gradient overlay
2. **AboutPage** — add hero bg image
3. **HistoryPage** — add hero bg image
4. **VisionMissionPage** — add hero bg image
5. **LeadershipPage** — add hero bg image; replace initials placeholder with stock profile photo for mayor
6. **AcademicsPage** — add hero bg image; add bg to Agri-Business spotlight section
7. **Home section components** — add background polish to TimelineSection, PreEnrollNowSection, CtaSection
8. Build & verify

## Image Policy

All placeholder imagery sourced from [Unsplash](https://unsplash.com). Replace with official LGU photos when available. Every image uses `loading="lazy"` / descriptive `alt` text.

## Verification

```bash
npm run build
# 0 errors
```

---

## Done

| Page / Component | Upgrade |
|---|---|
| HeroBanner | Unsplash campus bg + gradient overlay |
| AboutPage — hero | Campus building bg |
| AboutPage — overview cards | Student walk bg with overlay |
| AboutPage — mayor message | Community bg with overlay |
| HistoryPage — hero | Journey road bg |
| HistoryPage — timeline | Library/study bg (bg-fixed) |
| VisionMissionPage — hero | Sunrise/inspiration bg |
| VisionMissionPage — content | Study/laptop bg (bg-fixed) |
| LeadershipPage — hero | Team meeting bg |
| LeadershipPage — mayor portrait | Stock headshot (unsplash) |
| LeadershipPage — team cards | Stock profile photos |
| AcademicsPage — hero | Library books bg |
| AcademicsPage — content | Graduation/students bg |
| AcademicsPage — Agri spotlight | Agriculture/farm bg with overlay |
| Home — KeyDetailsStrip | Community bg with overlay |
| Home — PreEnrollNowSection | Lecture hall bg with overlay |
| Home — TimelineSection | Team/group bg with overlay |
| Home — ProgramsPreview | Students walking bg with overlay |
| Home — CtaSection | Lecture hall bg (bg-fixed) + gradient overlay |
| website-web-plan.md | Added stock imagery policy in §7 |
| `npm run build` | 0 errors |
