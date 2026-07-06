# NG Phase 50 — Pre-Enrollment Status & Management Endpoints

## Goal

Add backend endpoints to support the pre-enrollment workflow beyond submission: status lookup, list/detail for admin, and the student login portal.

## Endpoints

### 1. GET `/api/students/pre-enroll/:refNo`

Check pre-enrollment status by reference number + birthdate. Returns the full submission details (admission info, personal details, address, contact, school, parents, guardian, referrals) and current status (`pending`, `approved`, `rejected`).

**Request**: `GET /api/students/pre-enroll/TCC-123456?birthdate=2000-01-15`

**Response** (200):
```json
{
  "refNo": "TCC-123456",
  "status": "pending",
  "course": "Agri-Business",
  "firstName": "Juan",
  "lastName": "Dela Cruz",
  "birthdate": "2000-01-15",
  "email": "juan@example.com",
  "phone": "09171234567",
  "submittedAt": "2026-07-06T00:00:00.000Z"
}
```

### 2. GET `/api/admin/pre-enrollments`

List all pre-enrollments with optional filtering by status, course, date range. Admin-guarded.

### 3. PATCH `/api/admin/pre-enrollments/:refNo/status`

Update pre-enrollment status (`approved` / `rejected`). Admin-guarded. Requires rejection reason if `rejected`.

## Implementation Steps

1. Add `status` field to `PreEnrollment` model in Prisma schema (`pending` | `approved` | `rejected`, default `pending`)
2. Run `npx prisma migrate dev --name add-pre-enrollment-status`
3. Create `PreEnrollmentStatusDto` with status + optional reason
4. Create `PreEnrollmentQueryDto` for filtering (status, course, dateFrom, dateTo, page, limit)
5. Add `getByRefNo()` method in `StudentsService` — validate refNo exists + birthdate matches
6. Add `findAll()` (admin) + `updateStatus()` methods in a new `AdminPreEnrollmentsService` (or reuse `StudentsService`)
7. Add GET and PATCH routes with guards
8. Add unit tests
9. Build & verify

## Dependencies

- `PreEnrollment` model already exists with all fields (from phase 13)
- `JwtAuthGuard` + `AdminGuard` already implemented (from phases 3, 12)
- `StudentsModule` already exists (from phase 13)

## Verification

```bash
npx prisma migrate dev
npm run build
npm test
```

## Wire to Frontend

- `PreEnrollmentPage.tsx` success screen already shows refNo — wire the "Check Status" button to `GET /api/students/pre-enroll/:refNo`
- `/student/login` page (future web phase) uses `POST /api/auth/student/login` (phase 11)

## Done

- Created `RefNoLookupDto`, `PreEnrollmentStatusDto`, `PreEnrollmentQueryDto` with validation
- Added `getByRefNo()` to StudentsService — validates refNo exists + birthdate matches, returns enrollment summary
- Added `findAll()` to StudentsService — paginated list with optional status/course filters
- Added `updateStatus()` to StudentsService — validates not already approved/rejected, requires rejection reason
- Added `GET /api/students/pre-enroll/:refNo` — public endpoint with birthdate query param
- Added `GET /api/admin/pre-enrollments` — admin-guarded, paginated, filterable
- Added `PATCH /api/admin/pre-enrollments/:refNo/status` — admin-guarded, approve/reject
- Updated StudentsModule to import AuthModule for guard access
- No schema changes needed (status field already existed)
- Build: 0 errors | Tests: 48 passing (+11 new)
