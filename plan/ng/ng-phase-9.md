# NG Phase 9 — POST `/api/auth/resend-verification`

## Goal

Allow users to request a new email verification token if the original was lost or expired.

## Steps

1. **Create `ResendVerificationDto`** — `email: string`
2. **Add `resendVerification()` to `AuthService`**
   - Look up user by email
   - Return same message whether user exists or not (prevent enumeration)
   - If user exists, create new `EmailVerificationToken` (hash raw token, 15-min expiry)
   - Return `{ message, verificationToken: rawToken }` (raw token in dev mode)
3. **Add route to `AuthController`** — `POST /api/auth/resend-verification` (public)
4. **Add unit tests** — success (existing user), unknown email
5. Build & verify

## Verification

```bash
npm run build
npm test
```

---

## Done

| Step | Status |
|------|--------|
| Create `ResendVerificationDto` — `email` | ✅ |
| Add `resendVerification()` to `AuthService` — lookup user, create token, return | ✅ |
| Add `POST /api/auth/resend-verification` route (public) | ✅ |
| Add 3 unit tests — existing unverified user, unknown email, already verified | ✅ |
| `npm run build` — 0 errors | ✅ |
| `npm test` — 24/24 passed | ✅ |
