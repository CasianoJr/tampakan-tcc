# NG Phase 12 — POST `/api/auth/admin/login`

## Goal

Provide a dedicated admin login endpoint that validates credentials and only allows users with the `ADMIN` role to authenticate.

## Steps

1. **Create `AdminLoginDto`** — `email`, `password`
2. **Add `adminLogin()` to `AuthService`**
   - Look up user by email
   - Verify password with bcrypt.compare
   - Reject if user not found, inactive, or role ≠ `ADMIN`
   - Return JWT with admin role
3. **Create `AdminGuard`** — extends `JwtAuthGuard`, checks `req.user.role === 'ADMIN'`
4. **Add route to `AuthController`** — `POST /api/auth/admin/login` (public)
5. **Add unit tests** — success, wrong password, user not admin
6. Build & verify

## Verification

```bash
npm run build
npm test
```

## Done

- Created `AdminLoginDto` (email, password with validation)
- Created `AdminGuard` (extends `JwtAuthGuard`, checks role === `'ADMIN'`)
- Added `adminLogin()` to `AuthService` — validates credentials, rejects non-ADMIN roles
- Added `POST /api/auth/admin/login` route to `AuthController` (public)
- Added 3 unit tests: valid admin login, non-admin user rejected, wrong password rejected
- Build: 0 errors | Tests: 33 passing
