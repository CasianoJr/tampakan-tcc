# Web Phase 52 — Add Open Graph (OG) Meta Tags

## Goal

Add Open Graph meta tags so link previews display properly when shared on social media (Facebook, Twitter, Messenger, etc.).

## OG Image

Uses `TCC_LOGO_512x512.png` as the `og:image` — already in `public/`.

## Implementation

Add the following `<meta>` tags to `index.html`:

| Property | Content |
|---|---|
| `og:title` | Tampakan Community College |
| `og:description` | A municipally owned institution committed to providing free, accessible, and quality higher education to the people of Tampakan and surrounding communities. |
| `og:image` | /TCC_LOGO_512x512.png |
| `og:image:width` | 512 |
| `og:image:height` | 512 |
| `og:type` | website |
| `og:url` | (current page URL) |
| `twitter:card` | summary |
| `twitter:title` | Tampakan Community College |
| `twitter:description` | (same as og:description) |
| `twitter:image` | /TCC_LOGO_512x512.png |

## Verification

```bash
npm run build
# Use https://opengraph.dev/ or social media debugger to test
```

## Done

- Added OG meta tags to index.html
