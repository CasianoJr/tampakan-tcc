# NG Phase 14 — Prepare Backend for Vercel Deployment

## Goal

Configure the NestJS backend for deployment on Vercel as a serverless function. This phase does not add new API endpoints — it adds the infrastructure layer needed to run on Vercel's Node.js runtime.

## Changes

### 1. Serverless entry point — `api/index.ts`

Create a Vercel serverless function that bootstraps the NestJS app using the Express adapter. The handler caches the initialized app across warm invocations so subsequent requests reuse the same instance.

### 2. Vercel config — `vercel.json`

Route all incoming requests (`/(.*)`) to `api/index.ts` and build it with `@vercel/node`.

### 3. CORS from environment — `src/main.ts` + `api/index.ts`

Replace hardcoded `http://localhost:5173` with `process.env.CORS_ORIGIN?.split(',')` so the production frontend URL can be set via environment variable on Vercel.

### 4. JWT secret from environment — `src/config/jwt.config.ts`

Replace the hardcoded dev secret with `process.env.JWT_SECRET` so a production secret can be set on Vercel.

### 5. Prisma generate on build — `package.json`

Add `vercel-build` script (`prisma generate && nest build`) and `postinstall` hook (`prisma generate`) so the Prisma client is generated during Vercel's build phase.

### 6. Updated `.env.example`

Add `JWT_SECRET` and `CORS_ORIGIN` to the example env file.

## Environment Variables Required on Vercel

| Variable | Description |
|---|---|
| `DATABASE_URL` | Neon PostgreSQL connection string |
| `JWT_SECRET` | Strong random value for JWT signing |
| `CORS_ORIGIN` | Comma-separated allowed origins (e.g. `https://tampakan-tcc.vercel.app`) |

## Verification

```bash
npm run build
# If the build succeeds, the Vercel deploy should work
# Deploy on Vercel: connect repo, set env vars, deploy
```

## Done

- Created `api/index.ts` — ExpressAdapter-based serverless handler with cached app initialization
- Created `vercel.json` — routes all traffic to `api/index.ts`
- Updated `src/main.ts` — CORS origin reads from `CORS_ORIGIN` env var
- Updated `api/index.ts` — same CORS logic for serverless entry point
- Updated `src/config/jwt.config.ts` — JWT secret reads from `JWT_SECRET` env var
- Updated `package.json` — added `vercel-build` and `postinstall` scripts for Prisma
- Updated `.env.example` — documented `JWT_SECRET` and `CORS_ORIGIN`
- Build: succeeds
