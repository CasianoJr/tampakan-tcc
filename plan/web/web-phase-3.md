# Web Phase 3 — Complete Home Page Sections

## Goal

Add all remaining homepage content sections below the Hero banner to build a complete landing page.

## Steps

1. Create `src/components/home/KeyDetailsStrip.tsx`:
   - Quick-glance row: location (former Koronadal Academy), target opening (~2027–2028), tuition (Free), flagship program (Agri-Business)
   - Sky Field background, icons from lucide-react

2. Create `src/components/home/PreEnrollNowSection.tsx`:
   - High-visibility card inviting pre-enrollment
   - Primary CTA "Pre-Enroll Now" → `/pre-enrollment`
   - Secondary link "Already pre-enrolled? Log in" → `/student/login`

3. Create `src/components/home/TimelineSection.tsx`:
   - Horizontal timeline: proposal → consultative meetings → site prep → construction → anticipated opening
   - Each step with icon, label, and connecting line
   - Staggered Framer Motion fade-in

4. Create `src/components/home/ProgramsPreview.tsx`:
   - Card grid of 3 placeholder programs (Agri-Business, Education, Information Technology)
   - Each card: icon, title, short description, "Learn More" link
   - Links to `/academics/programs`

5. Create `src/components/home/CtaSection.tsx`:
   - "Stay Informed" section with placeholder email signup and social links
   - Background from Deep Soil to Harvest Green gradient

6. Update `src/pages/HomePage.tsx` — render all sections in order: HeroBanner → KeyDetailsStrip → PreEnrollNowSection → TimelineSection → ProgramsPreview → CtaSection

## Verification

```bash
npm run build
# Compiles without errors
npm run dev
# Home page shows all sections with full layout
```

---

## Done

| Step | Status |
|------|--------|
| Create `KeyDetailsStrip` — location, opening, tuition, program stats | ✅ |
| Create `PreEnrollNowSection` — CTA card with pre-enroll + login links | ✅ |
| Create `TimelineSection` — horizontal 5-step timeline with icons | ✅ |
| Create `ProgramsPreview` — 3-card grid (Agri-Business, Education, IT) | ✅ |
| Create `CtaSection` — stay informed with contact + social links | ✅ |
| Update `HomePage` — render all sections in order | ✅ |
| `npm run build` — 0 errors | ✅ |
