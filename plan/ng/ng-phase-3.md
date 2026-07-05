# Phase 3 — POST /api/auth/login

## Goal

Implement user login at `POST /api/auth/login`. Validates email/password credentials and returns JWT access + refresh tokens.

## Steps

1. Install JWT dependencies:
   ```bash
   npm install @nestjs/jwt passport passport-jwt
   npm install -D @types/passport-jwt
   ```

2. Create `src/config/jwt.config.ts` — export `jwtConstants` object with `secret` and token expiry durations.

3. Create `src/auth/dto/login.dto.ts` — `email` (IsEmail), `password` (IsString, MinLength 1).

4. Update `src/auth/auth.service.ts` — add `login(dto)`:
   - Find user by email
   - Throw `UnauthorizedException` if not found or not active
   - Compare password with `bcrypt.compare`
   - Throw `UnauthorizedException` if mismatch
   - Sign access token (15m) and refresh token (7d) using `JwtService`
   - Return `{ access_token, refresh_token, user: { id, email, name, role } }`

5. Update `src/auth/auth.controller.ts` — add `@Post('login')` calling `authService.login(dto)`.

6. Create `src/auth/strategies/jwt.strategy.ts` — `JwtStrategy` extending `PassportStrategy` that extracts user from JWT payload.

7. Update `src/auth/auth.module.ts`:
   - Import `JwtModule.register({ secret, signOptions })` from `@nestjs/jwt`
   - Add `JwtStrategy` to providers
   - Export `JwtModule` so other modules can use guards

8. Add `JwtAuthGuard` at `src/auth/guards/jwt-auth.guard.ts` (for future protected routes).

9. Create `src/auth/auth.service.spec.ts` — unit tests for `login()`:
   - Valid credentials return `{ access_token, refresh_token, user }`
   - Unknown email throws `UnauthorizedException`
   - Inactive user throws `UnauthorizedException`
   - Wrong password throws `UnauthorizedException`

## Verification

```bash
npm test
npm run start:dev

# Login with the user created in phase 2
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"a@b.com","password":"password123"}'
# → 200 { "access_token": "...", "refresh_token": "...", "user": { "id": 1, "email": "a@b.com", "name": "Test", "role": "STUDENT" } }

# Wrong password → 401 Unauthorized
# Unknown email → 401 Unauthorized
```

---

## Done

| Step | Status |
|------|--------|
| Install `@nestjs/jwt`, `passport`, `passport-jwt`, `@nestjs/passport`, `@types/passport-jwt` | ✅ |
| Create `src/config/jwt.config.ts` with secret + expiry constants | ✅ |
| Create `src/auth/dto/login.dto.ts` — `email` (IsEmail), `password` (IsString) | ✅ |
| Create `JwtStrategy` — validates JWT, checks user exists + is active | ✅ |
| Create `JwtAuthGuard` — wraps passport `AuthGuard('jwt')` | ✅ |
| Update `AuthModule` — imports `JwtModule` + `PassportModule`, provides `JwtStrategy` | ✅ |
| Update `AuthService` — `login()` validates credentials, returns `access_token` + `refresh_token` + user | ✅ |
| Update `AuthController` — adds `POST /api/auth/login` | ✅ |
| `npm test` — all tests pass | ✅ |
| `nest build` — 0 errors | ✅ |
| `POST /api/auth/login` returns `{ access_token, refresh_token, user }` (200) | ✅ |
| Invalid credentials return `401 Unauthorized` | ✅ |
