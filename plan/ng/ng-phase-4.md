# Phase 4 — POST /api/auth/refresh

## Goal

Implement token refresh at `POST /api/auth/refresh`. Accepts a valid refresh token and returns a new access token + refresh token pair.

## Steps

1. Create `src/auth/dto/refresh.dto.ts` — `refreshToken` (IsString).

2. Update `src/auth/auth.service.ts` — add `refresh(dto)`:
   - Verify the refresh token with `jwtService.verifyAsync()`
   - Throw `UnauthorizedException` if invalid/expired
   - Look up user by `payload.sub`
   - Throw `UnauthorizedException` if not found or inactive
   - Sign and return new `access_token` + `refresh_token` + `user`

3. Update `src/auth/auth.controller.ts` — add `@Post('refresh')` calling `authService.refresh(dto)`.

4. Update `src/auth/auth.service.spec.ts` — add refresh tests:
   - Valid refresh token returns new token pair
   - Invalid token throws `UnauthorizedException`
   - Inactive user throws `UnauthorizedException`

## Verification

```bash
npm test
npm run start:dev

# First login to get tokens
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"a@b.com","password":"password123"}'
# Save the refresh_token from response

# Use refresh token to get new tokens
curl -X POST http://localhost:3000/api/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{"refreshToken":"<refresh_token>"}'
# → 200 { "access_token": "...", "refresh_token": "...", "user": { ... } }

# Invalid token → 401 Unauthorized
```

---

## Done

| Step | Status |
|------|--------|
| Create `src/auth/dto/refresh.dto.ts` — `refreshToken` (IsString) | ✅ |
| Update `AuthService` — `refresh()` verifies token, validates user, returns new token pair | ✅ |
| Update `AuthController` — adds `POST /api/auth/refresh` | ✅ |
| Update `auth.service.spec.ts` — adds 3 refresh test cases (valid, invalid token, inactive user) | ✅ |
| `npm test` — 8 tests pass (5 login + 3 refresh) | ✅ |
| `nest build` — 0 errors | ✅ |
