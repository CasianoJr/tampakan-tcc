# Web Phase 80 — Wire Pre-Enrollment Form to Backend API

## Goal

Replace mock data submission in the pre-enrollment form with real API calls to the backend.

## Current State

- `PreEnrollmentPage.tsx` uses mock data — form submission generates a fake `TCC-XXXXXX` reference number in the success screen
- All backend endpoints are ready (`POST /api/students/pre-enroll`, `GET /api/students/pre-enroll/:refNo`)

## Backend Dependencies

| Endpoint | Method | Status |
|---|---|---|
| `/api/students/pre-enroll` | POST | ✅ ng-phase-13 |
| `/api/students/pre-enroll/:refNo?birthdate=` | GET | ✅ ng-phase-50 |
| `/api/auth/student/login` | POST | ✅ ng-phase-11 |
| `/api/students/profile` | GET | ✅ ng-phase-51 |

## Implementation Steps

1. Create `src/services/api.ts` — shared fetch wrapper with base URL, JSON headers, error handling
2. Create `src/services/students.ts` — student API functions (`submitPreEnroll`, `checkStatus`)
3. Update `PreEnrollmentPage.tsx`:
   - On form submit: call `POST /api/students/pre-enroll` with form data instead of mock
   - Show real `referenceNumber` from API response on success screen
   - Handle loading state (disable submit button, show spinner)
   - Handle error state (show error banner, allow retry)
4. Update "Check Status" functionality on success screen to call `GET /api/students/pre-enroll/:refNo?birthdate=`
5. Add `.env` variable `VITE_API_URL=http://localhost:3000` for the NestJS backend URL
6. Test with local Docker PostgreSQL + NestJS backend running

## Verification

```bash
npm run build
# Start backend: npm run start:dev (in tampakan-tcc-ng)
# Start frontend: npm run dev
# Submit pre-enrollment form, verify real reference number appears
```

## Done

- Created `src/services/api.ts` — shared fetch wrapper with base URL, JSON headers, error handling
- Created `src/services/students.ts` — `PreEnrollPayload` interface + `submitPreEnroll()` function
- Added `.env` with `VITE_API_URL=http://localhost:3000`
- Updated `PreEnrollmentPage.tsx`:
  - Added `name` attributes to all 50+ form inputs matching DTO field names
  - Replaced mock `Math.random()` reference number with real `POST /api/students/pre-enroll` API call
  - Added `composeAddress()` helper to merge address sub-fields into single strings
  - Added `loading` state with spinner + disabled submit button
  - Added `error` state with red error banner and `AlertCircle` icon
  - Form collects all fields via `FormData` and maps to `PreEnrollPayload` shape
- Build: 0 errors
