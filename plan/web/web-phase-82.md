# Web Phase 82 — Admin Portal (Login + Pre-Enrollment Management Dashboard)

## Goal

Build the admin portal pages with real API integration — login via email/password, authenticated dashboard showing all pre-enrollments with status management (approve/reject).

## Backend Dependencies

| Endpoint | Method | Status |
|---|---|---|
| `/api/auth/admin/login` | POST | ✅ ng-phase-11 |
| `/api/admin/pre-enrollments` | GET | ✅ ng-phase-50 |
| `/api/admin/pre-enrollments/:refNo/status` | PATCH | ✅ ng-phase-50 |

## Implementation Steps

1. Create `src/layouts/AdminLayout.tsx` — minimal navbar with logo, Dashboard link, Logout button
2. Create `src/pages/admin/AdminLoginPage.tsx` — form with email + password, calls `adminLogin()`, redirects to dashboard on success
3. Create `src/pages/admin/AdminDashboardPage.tsx` — fetches paginated pre-enrollments, status filter dropdown, table with: refNo, name, course, status badge, submitted date, action buttons (Approve/Reject), pagination controls, reject confirmation modal with required reason
4. Update `src/router.tsx` — add `/admin` routes under `AdminLayout` with `ProtectedAdminRoute` wrapper
5. Build: verify 0 errors

## Files Created

```
src/layouts/AdminLayout.tsx
src/pages/admin/AdminLoginPage.tsx
src/pages/admin/AdminDashboardPage.tsx
```

## Files Modified

```
src/router.tsx    — add /admin/* routes
```

## Verification

```bash
npm run build
# Start backend with seeded admin user, start frontend
# Visit /admin/login, log in, verify pre-enrollment table with approve/reject
```

## Done

- Created `src/layouts/AdminLayout.tsx` — minimal navbar with Dashboard/Logout
- Created `src/pages/admin/AdminLoginPage.tsx` — email + password login form
- Created `src/pages/admin/AdminDashboardPage.tsx` — paginated table with status filter, approve/reject actions, reject modal with reason
- Updated `src/router.tsx` — added `/admin/*` routes under `AdminLayout` with `ProtectedAdminRoute`
- Build: 0 errors
