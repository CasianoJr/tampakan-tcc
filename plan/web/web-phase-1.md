# Web Phase 1 — Run the App

## Goal

Create a Vite + React + TypeScript app in `tampakan-tcc-web/` that boots and displays a welcome page.

## Steps

1. Scaffold with Vite:
   ```bash
   # From D:\github\tampakan-tcc
   npm create vite@latest tampakan-tcc-web -- --template react-ts
   cd tampakan-tcc-web
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Open `src/App.tsx` — replace the default Vite content with:
   ```
   Tampakan Community College
   ```

4. Update `src/App.css` — minimal styling (centered text, harvest-green palette from the design plan).

## Verification

```bash
npm run dev
# Open http://localhost:5173 — shows "Tampakan Community College"
```

---

## Done

| Step | Status |
|------|--------|
| `npm create vite@latest tampakan-tcc-web -- --template react-ts` | ✅ |
| `npm install` | ✅ |
| `src/App.tsx` — simplified to show college name | ✅ |
| `src/App.css` + `src/index.css` — harvest-green palette, centered layout | ✅ |
| `npx vite build` — compiles without errors | ✅ |
| `npm run dev` — server responds on port 5173 | ✅ |
