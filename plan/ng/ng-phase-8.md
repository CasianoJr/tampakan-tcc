# NG Phase 8 — POST `/api/auth/verify-email`

## Goal

Allow users to verify their email address using a one-time token (generated during registration or via resend-verification).

## Steps

1. **Update Prisma schema**
   - Add `emailVerified Boolean @default(false)` to `User`
   - Add `EmailVerificationToken` model (id, userId, token unique, expiresAt, used, createdAt, user relation)
2. **Create migration**
3. **Create `VerifyEmailDto`** — `token: string`
4. **Add `verifyEmail()` to `AuthService`**
   - Hash incoming raw token with SHA-256
   - Look up `EmailVerificationToken` by hash
   - Reject if not found, expired, or already used
   - Update user's `emailVerified` to `true`
   - Mark token as `used: true`
   - Return `{ message: "Email verified successfully" }`
5. **Add route** — `POST /api/auth/verify-email` (public)
6. **Add unit tests** — success, token not found, expired, already used
7. Build & verify

## Verification

```bash
npm run build
npm test
```

---

## Done

| Step | Status |
|------|--------|
| Add `emailVerified` to User model + `EmailVerificationToken` model | ✅ |
| Create migration `add_email_verification` | ✅ |
| Create `VerifyEmailDto` — `token: string` | ✅ |
| Add `verifyEmail()` to `AuthService` — hash, lookup, validate, update, mark used | ✅ |
| Add `POST /api/auth/verify-email` route (public) | ✅ |
| Add 4 unit tests — success, not found, already used, expired | ✅ |
| `npm run build` — 0 errors | ✅ |
| `npm test` — 21/21 passed | ✅ |
