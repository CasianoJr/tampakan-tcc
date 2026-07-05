# Phase 5 — POST /api/auth/logout

## Goal

Implement logout at `POST /api/auth/logout`. Accepts a refresh token and blacklists it server-side so it can no longer be used to obtain new access tokens.

## Steps

1. Add `BlacklistedToken` model to `prisma/schema.prisma`:
   ```prisma
   model BlacklistedToken {
     id        Int      @id @default(autoincrement())
     token     String   @unique
     expiresAt DateTime
     createdAt DateTime @default(now())
   }
   ```

2. Run migration:
   ```bash
   npx prisma migrate dev --name add_blacklisted_token
   ```

3. Create `src/auth/dto/logout.dto.ts` — `refreshToken` (IsString).

4. Update `src/auth/auth.service.ts`:
   - Add `logout(dto)` — verify the refresh token, store its hash in the blacklist with its expiry, return success message.
   - Update `refresh(dto)` — check blacklist before issuing new tokens.

5. Update `src/auth/auth.controller.ts` — add `@Post('logout')` with `@UseGuards(JwtAuthGuard)`.

6. Update `src/auth/auth.service.spec.ts` — add logout tests.

## Verification

```bash
npm test
npm run build

# Login → get tokens → logout with the refresh token → try refresh with same token → 401
```

---

## Done

| Step | Status |
|------|--------|
| Add `BlacklistedToken` model to Prisma schema | ✅ |
| Run `npx prisma migrate dev --name add_blacklisted_token` | ✅ |
| Create `src/auth/dto/logout.dto.ts` — `refreshToken` (IsString) | ✅ |
| Update `AuthService` — `logout()` verifies token, stores SHA-256 hash in blacklist with expiry | ✅ |
| Update `AuthService` — `refresh()` checks blacklist before issuing new tokens | ✅ |
| Update `AuthController` — `@Post('logout')` with `@UseGuards(JwtAuthGuard)` | ✅ |
| `npm test` — 11 tests all pass | ✅ |
| `nest build` — 0 errors | ✅ |
