# Phase 1 — Base URL Health Check

## Goal

Create a NestJS server in `tampakan-tcc-ng/` that responds to `GET /` with a health-check message.

## Steps

1. Install the NestJS CLI globally:
   ```bash
   npm i -g @nestjs/cli
   ```

2. Scaffold the project:
   ```bash
   # From D:\github\tampakan-tcc
   nest new tampakan-tcc-ng --skip-git --package-manager npm
   cd tampakan-tcc-ng
   ```

3. Open `src/app.controller.ts` — change the `@Get()` handler to return:
   ```
   Tampakan Community College API — running
   ```

4. Open `src/main.ts` — confirm it listens on port `3000` (default).

5. Create `src/app.controller.spec.ts` — test that `getRoot()` returns the health check string.

## Verification

```bash
# Run tests
npm test

# Start dev server
npm run start:dev

# Test endpoint
curl http://localhost:3000/
# → Tampakan Community College API — running

---

## Done

| Step | Status |
|------|--------|
| `npm i -g @nestjs/cli` | ✅ |
| `nest new tampakan-tcc-ng --skip-git --package-manager npm` | ✅ |
| `src/app.service.ts` — `getRoot()` returns health check string | ✅ |
| `src/app.controller.ts` — `@Get()` calls `getRoot()` | ✅ |
| `src/app.controller.spec.ts` — test expects `getRoot()` response | ✅ |
| `npm test` — 1 test passed | ✅ |
| `curl http://localhost:3000/` — returns `"Tampakan Community College API — running"` | ✅ |
```
