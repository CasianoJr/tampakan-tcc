# NG Phase 11 — POST `/api/auth/student/login`

## Goal

Allow pre-enrolled students to log in using their reference number and birthdate, returning a limited JWT scoped to the student role.

## Steps

1. **Add `PreEnrollment` model to Prisma schema** — referenceNumber (unique), fullName, birthdate, contactNumber, status, etc.
2. **Create migration**
3. **Create `StudentLoginDto`** — `referenceNumber: string`, `birthdate: string`
4. **Add `studentLogin()` to `AuthService`**
   - Look up pre-enrollment by reference number
   - Compare birthdate
   - Reject if not found or birthdate doesn't match
   - Generate JWT with student payload (`sub: preEnrollment.id`, `role: "STUDENT"`, `refNo`)
5. **Add route to `AuthController`** — `POST /api/auth/student/login` (public)
6. **Add unit tests** — success, not found, wrong birthdate
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
| Add `PreEnrollment` model to Prisma schema | ✅ |
| Create migration `add_pre_enrollment` | ✅ |
| Create `StudentLoginDto` — `referenceNumber`, `birthdate` | ✅ |
| Add `studentLogin()` to `AuthService` — lookup refNo, compare birthdate, return JWT | ✅ |
| Add `POST /api/auth/student/login` route (public) | ✅ |
| Add 3 unit tests — success, not found, wrong birthdate | ✅ |
| `npm run build` — 0 errors | ✅ |
| `npm test` — 30/30 passed | ✅ |
