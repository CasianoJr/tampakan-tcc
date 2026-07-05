# Phase 2 — POST /api/auth/register

## Goal

Implement user registration at `POST /api/auth/register`. Creates a new user with hashed password and returns the public profile.

## Steps

1. Install dependencies:
   ```bash
   npm install @prisma/client class-validator class-transformer bcrypt
   npm install -D prisma @types/bcrypt
   ```

2. Set up Prisma:
   - `npx prisma init`
   - Add `DATABASE_URL` to `.env` (PostgreSQL connection string)
   - Create `User` model in `prisma/schema.prisma` (id, email, name, password, role, isActive, timestamps)
   - Run `npx prisma migrate dev --name init`

3. Create `src/prisma/prisma.service.ts` — `extends PrismaClient`, implements `OnModuleInit`/`OnModuleDestroy`
4. Create `src/prisma/prisma.module.ts` — `@Global()` module exporting `PrismaService`
5. Import `PrismaModule` in `app.module.ts`

6. Generate auth resource:
   ```bash
   npx nest g module auth
   npx nest g controller auth --no-spec
   npx nest g service auth --no-spec
   ```

7. Create `src/auth/dto/register.dto.ts` — `email` (IsEmail), `name` (IsString, MinLength 2), `password` (IsString, MinLength 8)

8. Wire `auth.service.ts` — check duplicate email → bcrypt hash (12 rounds) → `prisma.user.create` → return `{ id, email, name, role }`

9. Wire `auth.controller.ts` — `@Post('register')` with `@Body() dto: RegisterDto`, returns 201

## Verification

```bash
npm test
npm run start:dev

# Success
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"a@b.com","name":"Test","password":"password123"}'
# → 201 { "id": 1, "email": "a@b.com", "name": "Test", "role": "STUDENT" }

# Duplicate → 409 Conflict
# Invalid body → 400 Validation failed
```

---

## Done

| Step | Status |
|------|--------|
| Install `@prisma/client`, `prisma`, `class-validator`, `class-transformer`, `bcrypt`, `@types/bcrypt` | ✅ |
| Create `prisma/schema.prisma` with `User` model | ✅ |
| Run `npx prisma migrate dev --name init` | ✅ |
| Create `PrismaService` + `PrismaModule` (`@Global`) | ✅ |
| Wire `PrismaModule` + `AuthModule` in `AppModule` | ✅ |
| Create `AuthModule`, `AuthController`, `AuthService`, `RegisterDto` | ✅ |
| `POST /api/auth/register` returns `{id, email, name, role}` (201) | ✅ |
| Duplicate email returns `409 Conflict` | ✅ |
| Invalid body returns `400 Bad Request` | ✅ |
| `npm test` — all tests pass | ✅ |
| `nest build` — 0 errors | ✅ |
