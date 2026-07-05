# Web Phase 2 — Install Tech Stack + Home Page

## Goal

Install the full frontend tech stack and implement the Home page with Hero banner, layout shell, and routing.

## Steps

1. Install dependencies:
   ```bash
   npm install react-router-dom framer-motion lucide-react clsx
   npm install -D tailwindcss @tailwindcss/vite
   ```

2. Configure Tailwind — add the plugin to `vite.config.ts`:
   ```ts
   import tailwindcss from '@tailwindcss/vite'
   // in plugins: [tailwindcss(), ...]
   ```

3. Replace `src/index.css` with Tailwind import + custom theme using `@theme`:
   - Colors: Harvest Green `#2F6E3B`, Deep Soil `#1B3A22`, Golden Grain `#E8A93B`, Sky Field `#EAF3E9`, Slate Ink `#1F2937`, Cloud White `#FFFFFF`, Success Sprout `#4C9A5B`

4. Create `src/layouts/RootLayout.tsx`:
   - Navbar (logo placeholder, nav links: Home, About, Academics, Admissions, News, Contact)
   - `<Outlet />` for child routes
   - Footer (LGU contact info, quick links, social icons)

5. Create `src/components/layout/Navbar.tsx` — responsive nav with mobile menu toggle
6. Create `src/components/layout/Footer.tsx` — multi-column footer with logo, links, contact

7. Create `src/components/home/HeroBanner.tsx`:
   - Full-width, centered headline: "Tampakan Community College: Free, Accessible Higher Education for Every Tampakeño"
   - Subtext and primary CTA ("Explore Programs") + secondary CTA ("Get Updates")
   - Framer Motion fade-in animation

8. Create `src/pages/HomePage.tsx` — renders `HeroBanner`

9. Create `src/router.tsx`:
   ```tsx
   import { createBrowserRouter } from 'react-router-dom'
   import RootLayout from './layouts/RootLayout'
   import HomePage from './pages/HomePage'

   export const router = createBrowserRouter([
     {
       path: '/',
       element: <RootLayout />,
       children: [
         { index: true, element: <HomePage /> },
       ],
     },
   ])
   ```

10. Update `src/main.tsx` to use `RouterProvider` with the router
11. Replace `src/App.tsx` — just export a simple wrapper or remove it (router is in main.tsx now)
12. Remove `src/App.css` (styles moved to Tailwind)

## Verification

```bash
npm run dev
# Open http://localhost:5173 — shows full home page with navbar, hero, footer
npm run build
# Compiles without errors
```
