# NG Phase 13 — POST `/api/students/pre-enroll`

## Goal

Submit the pre-enrollment form with expanded fields and return a reference number for status tracking.

## Steps

1. Expand `PreEnrollment` Prisma model with full field set (admission info, personal details, parents, guardian, referrals)
2. Run `prisma migrate dev` to apply schema changes
3. Create `PreEnrollDto` with full validation
4. Create `StudentsModule` + `StudentsService` + `StudentsController`
5. Implement reference number generation (`TCC-XXXXXX`)
6. Add unit tests
7. Build & verify

## Verification

```bash
npx prisma migrate dev --name expand-pre-enrollment
npm run build
npm test
```

## Done

- Expanded `PreEnrollment` Prisma model with 40+ optional fields (admission info, personal details, parents, guardian, referrals)
- Created and applied migration `20260705221058_expand_pre_enrollment`
- Created `PreEnrollDto` with full validation for required + optional fields
- Created `StudentsModule`, `StudentsService`, `StudentsController`
- Implemented reference number generation (`TCC-XXXXXX`) with collision retry
- Added `POST /api/students/pre-enroll` route (public)
- Added 4 unit tests: successful creation, unique refNo collision retry, duplicate entry conflict, optional fields stored
- Build: 0 errors | Tests: 37 passing
