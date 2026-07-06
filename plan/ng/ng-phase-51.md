# NG Phase 51 — Student Profile Endpoint (Authenticated)

## Goal

Create an authenticated endpoint for the student portal so that once a student logs in, they can view their pre-enrollment data without re-entering their reference number or birthdate.

## Current State

| Endpoint | Status |
|---|---|
| `POST /api/auth/student/login` | ✅ Done (ng-phase-11) — returns JWT scoped to student |
| `GET /api/students/pre-enroll/:refNo?birthdate=` | ✅ Done (ng-phase-50) — public, requires birthdate |
| `GET /api/students/profile` | ❌ Missing — JWT-guarded, returns the student's own data |

## Problem

The student login (`POST /api/auth/student/login`) validates refNo + birthdate and returns a JWT. But after login, there's no endpoint that uses that JWT to fetch the student's pre-enrollment data — the student would have to call the public `GET /api/students/pre-enroll/:refNo` endpoint again with their birthdate.

## Solution

Add `GET /api/students/profile` — a JWT-guarded endpoint that:
1. Extracts the student's reference number from the JWT payload
2. Looks up the `PreEnrollment` record by that refNo
3. Returns the full pre-enrollment details (without requiring birthdate)

## Implementation Steps

1. Update `StudentsService`:
   - Add `getProfile(refNo)` method — fetch PreEnrollment by refNo (no birthdate validation needed since JWT already verified the student)

2. Update `StudentsController`:
   - Add `GET api/students/profile` route with `@UseGuards(JwtAuthGuard)`
   - Extract refNo from `req.user` (the JWT payload set by JwtStrategy)

3. Create `StudentJwtStrategy` (or update existing):
   - The student JWT from `POST /api/auth/student/login` has a `sub` containing the refNo and `role: 'STUDENT'`
   - The existing `JwtStrategy` already validates the token and attaches the payload to `req.user`
   - Check that the student's JWT payload structure matches what `StudentGuard` or the controller expects

4. Add `StudentGuard` (optional):
   - Similar to `AdminGuard` but checks `role === 'STUDENT'`
   - Ensures only student-scoped JWTs can access student endpoints

5. Add unit tests
6. Build & verify

## Verification

```bash
npm run build
npm test
```

## Wire to Frontend

- After student logs in on `/student/login`, store JWT in memory
- Call `GET /api/students/profile` with `Authorization: Bearer <token>` to display pre-enrollment data on `/student/profile`
