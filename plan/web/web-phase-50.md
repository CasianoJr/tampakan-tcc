# Web Phase 50 — `/pre-enrollment`

## Goal

Build the pre-enrollment page with a multi-section form collecting student information, guardian details, and referral sources. Based on the field reference in [`pre-enrollment-form-fields.md`](../pre-enrollment-form-fields.md).

## Sections (match backend `PreEnrollDto`)

1. **Quick Questions** — resident of Tampakan, desired program (dropdown of 4 courses), last school attended, year graduated
2. **Admission Information** — admit type, year level, school year, term, LRN
3. **Student's Information** — first/middle/last name, suffix, gender, civil status, citizenship, birthdate, birthplace, religion
4. **Current Address** — street/unit, street, subdivision, barangay, city, province, zip
5. **Permanent Address** — "Same as Current" checkbox, same fields
6. **Contact Details** — telephone, mobile, email
7. **Last School Attended** — school type, name, program/track, graduation date, school year, year level, term
8. **Parents / Guardian** — father, mother, and guardian information (name, mobile, email, occupation, relationship for guardian)
9. **Referrals** — checkboxes for how they found out about TCC

## Steps

1. Create `plan/web/web-phase-50.md` — this plan
2. Create `src/pages/PreEnrollmentPage.tsx` — full multi-section form with client-side validation, success state, and mock submission
3. Verify `/pre-enrollment` link in `PreEnrollNowSection` (already exists as `<a href="/pre-enrollment">`)
4. Add `/pre-enrollment` route to `src/router.tsx`
5. Build & verify

## Verification

```bash
npm run build
```

## Done

- Created `plan/web/web-phase-50.md` — detailed plan
- Created `src/pages/PreEnrollmentPage.tsx` — 8-section multi-step form covering:
  - Quick Questions (residency, desired program, last school, graduation year)
  - Admission Information (admit type, year level, school year, term, LRN)
  - Personal Details (name, suffix, gender, civil status, citizenship, birthdate, birthplace, religion)
  - Address (current + permanent with "Same as Current" toggle)
  - Contact Details (telephone, mobile, email)
  - Last School Attended (type, name, program, graduation date, year, term)
  - Parents / Guardian (father, mother, guardian with name, contact, occupation, relationship)
  - Referrals (toggle buttons for all referral sources)
  - Section navigation bar with active/complete indicators
  - Success screen with mock reference number
- Verified `/pre-enrollment` link in `PreEnrollNowSection` (homepage CTA button already points to it)
- Added `/pre-enrollment` route to `src/router.tsx`
- Build: 0 errors
