# Web Phase 53 — Fix Referral Buttons, 404 Page, and Google Maps Link

## Goal

Fix UI bugs: referral toggle buttons submitting the pre-enrollment form, generic 404 message, and missing map link on Contact page.

## Changes

### `PreEnrollmentPage.tsx`

- Changed referral toggle `<button>` elements to `<span role="button" tabIndex={0}>` with `onKeyDown` keyboard support so they can never trigger form submission regardless of browser behavior.

### `NotFoundPage.tsx`

- Changed heading from "Page Not Found" to "Page Under Construction".
- Changed body text to: "This page is currently under development. Please contact the development team for more information."

### `ContactPage.tsx`

- Address text now links to Google Maps (Koronadal Academy / TCC location) via `<a>` with `target="_blank"`.
- The Location placeholder box is now a clickable `<a>` linking to the same Google Maps URL.

## Verification

```bash
npm run build
# Build should pass with 0 errors.
```

## Done

- Referral toggles changed from `<button>` to `<span role="button">` to prevent form submission.
- 404 page updated with under-construction messaging.
- ContactPage address and location link to Google Maps.
- Build passes with 0 errors.
