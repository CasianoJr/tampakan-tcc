# Web Phase 81 — Student Portal (Login + Dashboard + Profile)

## Goal

Build the student portal pages with real API integration — login via reference number/birthdate, authenticated dashboard showing pre-enrollment status, and full profile view.

## Backend Dependencies

| Endpoint | Method | Status |
|---|---|---|
| `/api/auth/student/login` | POST | ✅ ng-phase-11 |
| `/api/students/profile` | GET | ✅ ng-phase-51 |

## Implementation Steps

1. Create `src/services/auth.ts` — API functions: `studentLogin()`, `adminLogin()`, `getStudentProfile()`, `getPreEnrollments()`, `updatePreEnrollmentStatus()`
2. Create `src/contexts/StudentAuthContext.tsx` — student auth state managed via React Context + `sessionStorage`
3. Create `src/contexts/AdminAuthContext.tsx` — admin auth state managed via React Context + `sessionStorage`
4. Create `src/components/auth/ProtectedStudentRoute.tsx` — redirects unauthenticated students to `/student/login`
5. Create `src/components/auth/ProtectedAdminRoute.tsx` — redirects unauthenticated admins to `/admin/login`
6. Create `src/layouts/StudentLayout.tsx` — minimalist navbar with logo, Dashboard/Profile navigation, Logout button
7. Create `src/pages/student/StudentLoginPage.tsx` — form with reference number + birthdate, calls `studentLogin()`, redirects to dashboard on success
8. Create `src/pages/student/StudentDashboardPage.tsx` — fetches profile on mount, shows welcome message, prominent status badge (Pending/Approved/Rejected), quick info cards (program, submitted date, last school), links to full profile
9. Create `src/pages/student/StudentProfilePage.tsx` — fetches profile on mount, renders all pre-enrollment fields in read-only sections (Personal Details, Admission Info, Address, Contact, Parents/Guardian, Referrals)
10. Update `src/router.tsx` — add `/student` routes under `StudentLayout` with `ProtectedStudentRoute` wrapper for dashboard + profile
11. Update `src/main.tsx` — wrap `<RouterProvider>` with `<StudentAuthProvider>` and `<AdminAuthProvider>`
12. Build: verify 0 errors

## Files Created

```
src/services/auth.ts
src/contexts/StudentAuthContext.tsx
src/contexts/AdminAuthContext.tsx
src/components/auth/ProtectedStudentRoute.tsx
src/components/auth/ProtectedAdminRoute.tsx
src/layouts/StudentLayout.tsx
src/pages/student/StudentLoginPage.tsx
src/pages/student/StudentDashboardPage.tsx
src/pages/student/StudentProfilePage.tsx
```

## Files Modified

```
src/router.tsx          — add /student/* routes
src/main.tsx            — wrap with StudentAuthProvider + AdminAuthProvider
```

## Verification

```bash
npm run build
# Start backend: npm run start:dev (in tampakan-tcc-ng)
# Start frontend: npm run dev
# Visit /student/login, log in with refNo + birthdate, verify dashboard and profile
```

## Done

- Created `src/services/auth.ts` — all auth API functions with typed interfaces
- Created `src/contexts/StudentAuthContext.tsx` — student auth state via React Context + `sessionStorage`
- Created `src/contexts/AdminAuthContext.tsx` — admin auth state via React Context + `sessionStorage`
- Created `src/components/auth/ProtectedStudentRoute.tsx` — guards `/student/dashboard` and `/student/profile`
- Created `src/components/auth/ProtectedAdminRoute.tsx` — guards `/admin/*`
- Created `src/layouts/StudentLayout.tsx` — minimalist navbar with Dashboard/Profile/Logout
- Created `src/pages/student/StudentLoginPage.tsx` — login form with refNo + birthdate, redirects on success
- Created `src/pages/student/StudentDashboardPage.tsx` — fetches profile, shows status badge + quick info cards
- Created `src/pages/student/StudentProfilePage.tsx` — full read-only profile with all pre-enrollment sections
- Updated `src/router.tsx` — added `/student/*` routes under `StudentLayout` with `ProtectedStudentRoute`
- Updated `src/main.tsx` — wrapped with `StudentAuthProvider` + `AdminAuthProvider`
- Build: 0 errors
