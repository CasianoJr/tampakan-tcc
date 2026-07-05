# NG Phase 7 — POST `/api/auth/reset-password`

## Goal

Allow users to reset their password using the token received from `/api/auth/forgot-password`.

## Steps

1. **Create `ResetPasswordDto`** — `token: string`, `newPassword: string` (min 8)
2. **Add `resetPassword()` to `AuthService`**
   - Hash incoming raw token with SHA-256
   - Look up `PasswordResetToken` by hash
   - Reject if not found, expired, or already used
   - Hash new password with bcrypt (12 rounds)
   - Update user password
   - Mark token as `used: true`
   - Return `{ message: "Password has been reset successfully" }`
3. **Add route to `AuthController`** — `POST /api/auth/reset-password` (public)
4. **Add unit tests** — success, token not found, expired, already used
5. Build & verify

## Dependencies

- `bcrypt` (already installed)
- `crypto` (Node.js built-in, already used in forgot-password)

## Verification

```bash
npm run build
npm test
```

---

## Done

| Step | Status |
|------|--------|
| Create `ResetPasswordDto` — `token`, `newPassword` (min 8) | ✅ |
| Add `resetPassword()` to `AuthService` — hash token, look up, validate, update password, mark used | ✅ |
| Add `POST /api/auth/reset-password` route to `AuthController` (public) | ✅ |
| Add 4 unit tests — success, token not found, already used, expired | ✅ |
| `npm run build` — 0 errors | ✅ |
| `npm test` — 17/17 passed | ✅ |
