# Web Phase 51 — Apply Logo Assets to Website

## Goal

Replace all placeholder branding (text "TCC" in Navbar, generic favicon/icons) with the actual logo files from `/logoAssets/`.

## Logo Asset Inventory

| File | Purpose |
|---|---|
| `TCC_LOGO_512x512.png` | Primary logo (large) |
| `TCC_LOGO_300x300.png` | Primary logo (medium) |
| `TCC_LOGO_200x200.png` | Primary logo (small) |
| `favicon.ico` | Browser tab icon |
| `favicon.svg` | Browser tab icon (SVG) |
| `favicon-96x96.png` | Favicon 96px |
| `apple-touch-icon.png` | iOS home screen icon |
| `web-app-manifest-192x192.png` | PWA icon 192px |
| `web-app-manifest-512x512.png` | PWA icon 512px |
| `site.webmanifest` | PWA manifest |
| `icons.svg` | *(already in public/ — evaluate if still needed)* |

## Current State

- **Navbar** (`src/components/layout/Navbar.tsx`): Logo is text `<Link to="/" className="text-lg font-bold tracking-tight">TCC</Link>`
- **Favicon** (`public/favicon.svg`): Generic SVG (purple accent icon)
- **icons.svg** (`public/icons.svg`): Generic SVG icon set
- **index.html**: Only references `/favicon.svg` — no apple-touch-icon, no webmanifest, no theme-color meta

## Implementation Steps

1. Copy all logo asset files to `tampakan-tcc-web/public/`
2. Update `index.html`:
   - Add `<link rel="apple-touch-icon" href="/apple-touch-icon.png">`
   - Add `<link rel="manifest" href="/site.webmanifest">`
   - Add `<meta name="theme-color" content="#2F6E3B">` (Harvest Green)
   - Keep existing `<link rel="icon" type="image/svg+xml" href="/favicon.svg">`
   - Add fallback `<link rel="icon" type="image/x-icon" href="/favicon.ico">`
3. Update `Navbar.tsx`:
   - Replace text "TCC" with `<img src="/TCC_LOGO_200x200.png" alt="TCC Logo" className="h-8 w-auto" />`
   - Add logo-white variant if needed for dark background
4. Update `Footer.tsx`:
   - Optionally add logo above the college name in the first column
5. Update `site.webmanifest`:
   - Change `name` to `"Tampakan Community College"`
   - Change `short_name` to `"TCC"`
   - Change `theme_color` and `background_color` to `"#2F6E3B"`
6. Build & verify
7. Remove `icons.svg` if no longer referenced

## Verification

```bash
npm run build
# Manual check: browser tab icon, navbar logo renders
```

## Done

- Copied 10 logo asset files from `logoAssets/` to `tampakan-tcc-web/public/`
- Updated `index.html` with apple-touch-icon, webmanifest link, theme-color (#2F6E3B), favicon.ico fallback, and Playfair Display Google Font
- Replaced text "TCC" in Navbar with `TCC_LOGO_300x300.png` (h-12) + "Tampakan" / "Community College" text in italic Playfair Display
- Updated `public/site.webmanifest` with proper name, short_name, and brand colors
- Removed `logoAssets/` directory (assets now served from `public/`)
- Used `Mayors_Image.JPG` (renamed to `mayors-image.jpg`) in AboutPage and LeadershipPage — replacing the green "LE" circle and Unsplash placeholder with the actual mayor photo
- Swapped all 23 hero section backgrounds from `/assets/TCC_building.jpg` to `/TCC_LOGO_512x512.png`
- Build: 0 errors
