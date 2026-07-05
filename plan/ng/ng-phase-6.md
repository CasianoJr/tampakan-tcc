# Phase 6 — POST /api/auth/forgot-password

## Goal

Implement forgot-password at `POST /api/auth/forgot-password`. Accepts an email, generates a one-time reset token, stores it in the database, and returns the token (development mode — production would email it).

## Steps

1. Add `PasswordResetToken` model to `prisma/schema.prisma`:
   ```prisma
   model PasswordResetToken {
     id        Int      @id @default(autoincrement())
     userId    Int
     token     String   @unique
     expiresAt DateTime
     used      Boolean  @default(false)
     createdAt DateTime @default(now())
     user      User     @relation(fields: [userId], references: [id])
   }
   ```

2. Run migration:
   ```bash
   npx prisma migrate dev --name add_password_reset_token
   ```

3. Create `src/auth/dto/forgot-password.dto.ts` — `email` (IsEmail).

4. Update `src/auth/auth.service.ts` — add `forgotPassword(dto)`:
   - Find user by email (always return success to prevent email enumeration)
   - Generate random 32-byte hex token
   - Hash token with SHA-256, store in `PasswordResetToken` with 15min expiry
   - In dev: return the raw token in response for testing

5. Update `src/auth/auth.controller.ts` — add `@Post('forgot-password')`.

6. Update `src/auth/auth.service.spec.ts` — add forgot-password tests.

## Verification

```bash
npm test
npm run build

curl -X POST http://localhost:3000/api/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{"email":"a@b.com"}'
# → 200 { "message": "If that email is registered, a reset link has been sent" }
```

---

## Done

| Step | Status |
|------|--------|
| Add `PasswordResetToken` model + relation on `User` to Prisma schema | ✅ |
| Run `npx prisma migrate dev --name add_password_reset_token` | ✅ |
| Create `src/auth/dto/forgot-password.dto.ts` — `email` (IsEmail) | ✅ |
| Update `AuthService` — `forgotPassword()` generates random token, stores SHA-256 hash in DB with 15min expiry | ✅ |
| Update `AuthController` — adds `@Post('forgot-password')` | ✅ |
| `npm test` — 13 tests all pass | ✅ |
| `nest build` — 0 errors | ✅ |
