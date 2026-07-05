# NG Phase 10 — POST `/api/auth/change-password`

## Goal

Allow authenticated users to change their password by providing their current password.

## Steps

1. **Create `ChangePasswordDto`** — `currentPassword: string`, `newPassword: string` (min 8)
2. **Add `changePassword()` to `AuthService`**
   - Takes `userId: number` (from JWT) + `dto: ChangePasswordDto`
   - Fetch user, verify current password with bcrypt.compare
   - Hash new password with bcrypt (12 rounds)
   - Update user password
   - Return `{ message: "Password changed successfully" }`
3. **Add route to `AuthController`** — `POST /api/auth/change-password` (JWT-guarded)
4. **Add unit tests** — success, wrong current password, user not found
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
| Create `ChangePasswordDto` — `currentPassword`, `newPassword` (min 8) | ✅ |
| Add `changePassword()` to `AuthService` — verify current password, hash new, update | ✅ |
| Add `POST /api/auth/change-password` route (JWT-guarded) | ✅ |
| Add 3 unit tests — success, wrong password, user not found | ✅ |
| `npm run build` — 0 errors | ✅ |
| `npm test` — 27/27 passed | ✅ |
