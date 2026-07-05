# Tampakan Community College — Backend API Plan (NestJS)

## Tech Stack

| Package | Purpose |
|---------|---------|
| NestJS ^11.0 | Framework |
| TypeScript ^5.7 | Type safety |
| PostgreSQL 16 | Database |
| Prisma ^6.0 | ORM / migrations |
| JWT (access + refresh tokens) | Auth strategy |
| bcrypt | Password hashing |
| class-validator + class-transformer | DTO validation |
| multer | File uploads (local disk → S3 later) |
| nodemailer / SendGrid | Email (verification, password reset, notifications) |
| sharp | Image resizing / optimization on upload |
| vitest | Unit & integration testing |
| helmet | Security headers |
| compression | Gzip response compression |
| Swagger / @nestjs/swagger | API documentation |

---

## 1. Auth Module — `/api/auth`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | Public | Register a new student account (email, password, full name, contact number). Sends verification email. |
| POST | `/api/auth/login` | Public | Log in with email/password. Returns `access_token` + `refresh_token`. |
| POST | `/api/auth/refresh` | Public (refresh token) | Exchange a valid refresh token for a new access token. |
| POST | `/api/auth/logout` | Private | Invalidate the refresh token (server-side blacklist). |
| POST | `/api/auth/forgot-password` | Public | Send password-reset email with a one-time link. |
| POST | `/api/auth/reset-password` | Public (reset token) | Reset password using the token from email. |
| POST | `/api/auth/verify-email` | Public (verify token) | Verify email address using the token from email. |
| POST | `/api/auth/resend-verification` | Public | Resend the email verification link. |
| POST | `/api/auth/change-password` | Private | Change password (requires current password). |

### Student Login (separate guard)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/student/login` | Public | Student portal login — validates pre-enrollment reference number + birthdate. Returns limited JWT scoped to student role. |
| POST | `/api/auth/admin/login` | Public | Admin dashboard login — email/password with Admin guard. Returns JWT with admin role. |

---

## 2. Students / Pre-Enrollment Module — `/api/students`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/students/pre-enroll` | Public | Submit pre-enrollment form (full name, birthdate, contact info, address, last school attended, desired program, guardian info). Returns reference number for status tracking. |
| GET | `/api/students/pre-enroll/:refNo` | Public | Look up pre-enrollment status using reference number (no auth needed — lightweight check). |
| GET | `/api/students/me` | Private (student) | Get the authenticated student's profile, pre-enrollment details, document checklist, application status. |
| PATCH | `/api/students/me` | Private (student) | Update own profile (contact number, address, guardian info). |
| POST | `/api/students/me/documents` | Private (student) | Upload a requirement document (PSA birth cert, report card, etc.). |
| GET | `/api/students/me/documents` | Private (student) | List uploaded documents with verification status. |
| DELETE | `/api/students/me/documents/:id` | Private (student) | Remove a submitted document. |
| GET | `/api/students/me/status-history` | Private (student) | Get timeline of status changes (pending → for review → approved → enrolled). |

### Admin Overrides

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/students` | Admin | List all pre-enrolled students (paginated, filterable by status, program, date range). |
| GET | `/api/students/:id` | Admin | View full student record including documents and status history. |
| PATCH | `/api/students/:id/status` | Admin | Update application status (approve, reject, mark documents received, confirm enrollment). |
| PATCH | `/api/students/:id/documents/:docId/verify` | Admin | Mark a document as verified or rejected with optional note. |
| GET | `/api/students/stats` | Admin | Summary statistics: total pre-enrolled, by program, by status, new this week/month. |

---

## 3. News Module — `/api/news`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/news` | Public | List published articles (paginated). Supports filtering by category, date range, search (q). Returns summary (title, excerpt, publishedAt, featuredImage, slug). |
| GET | `/api/news/:slug` | Public | Get a single article with full content, author info, publish date, related articles. |
| POST | `/api/news` | Admin | Create a news article (title, slug, content, excerpt, featuredImage, category, tags, isPublished, publishAt). |
| PATCH | `/api/news/:id` | Admin | Update article. |
| DELETE | `/api/news/:id` | Admin | Soft-delete article (moves to trash). |
| PATCH | `/api/news/:id/publish` | Admin | Toggle publish status / schedule publish date. |
| POST | `/api/news/:id/images` | Admin | Upload embedded images for rich text content. |
| GET | `/api/news/categories` | Public | List news categories with article count. |
| POST | `/api/news/categories` | Admin | Create a category (name, slug, description). |
| PATCH | `/api/news/categories/:id` | Admin | Update a category. |
| DELETE | `/api/news/categories/:id` | Admin | Delete a category (reassign articles to uncategorized). |

---

## 4. Events Module — `/api/events`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/events` | Public | List events (paginated). Supports filtering by month/year, category, upcoming/past, search (q). Returns summary (title, date, time, location, poster image, slug). |
| GET | `/api/events/:slug` | Public | Get a single event with full details, description, schedule, venue map/address. |
| POST | `/api/events` | Admin | Create an event (title, slug, description, start/end datetime, location, category, posterImage, isFeatured). |
| PATCH | `/api/events/:id` | Admin | Update event details. |
| DELETE | `/api/events/:id` | Admin | Delete event. |
| GET | `/api/events/calendar` | Public | Return events in calendar format (array of {date, title, slug, type}) for rendering in a calendar widget. |

---

## 5. Programs Module — `/api/programs`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/programs` | Public | List all offered/planned academic programs. Returns summary (title, description, duration, career paths, icon, slug). |
| GET | `/api/programs/:slug` | Public | Get a single program with full curriculum, faculty list, admission requirements, career outcomes. |
| POST | `/api/programs` | Admin | Create a program (title, slug, description, curriculum, duration, careerPaths, admissionRequirements, learningOutcomes, icon, coverImage, status). |
| PATCH | `/api/programs/:id` | Admin | Update program details. |
| DELETE | `/api/programs/:id` | Admin | Soft-delete / archive a program. |
| PATCH | `/api/programs/:id/featured` | Admin | Toggle featured status (appears on homepage). |
| GET | `/api/programs/:id/curriculum` | Public | Get curriculum breakdown by year/semester for a program. |
| PATCH | `/api/programs/:id/curriculum` | Admin | Update curriculum entries. |

---

## 6. Faculty Module — `/api/faculty`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/faculty` | Public | List faculty/staff (paginated). Supports filtering by department, program. Returns summary (name, title, department, profilePhoto, slug). |
| GET | `/api/faculty/:slug` | Public | Get faculty profile with full bio, education, specialties, publications, subjects taught. |
| POST | `/api/faculty` | Admin | Create faculty profile (name, slug, title, department, bio, education, specialties, profilePhoto, email, contact). |
| PATCH | `/api/faculty/:id` | Admin | Update faculty profile. |
| DELETE | `/api/faculty/:id` | Admin | Remove faculty profile. |

---

## 7. Gallery Module — `/api/gallery`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/gallery` | Public | List gallery albums (paginated). Returns album cover, title, photo count, date. |
| GET | `/api/gallery/:slug` | Public | Get album with full list of images/videos (paginated within album). |
| POST | `/api/gallery` | Admin | Create album (title, slug, description, coverImage, isPublished). |
| PATCH | `/api/gallery/:id` | Admin | Update album details. |
| DELETE | `/api/gallery/:id` | Admin | Delete album and all associated media. |
| POST | `/api/gallery/:id/media` | Admin | Upload images/videos to album (multer, multiple files, sharp compression). |
| DELETE | `/api/gallery/:id/media/:mediaId` | Admin | Remove a specific media item from album. |
| PATCH | `/api/gallery/:id/media/:mediaId/cover` | Admin | Set a media item as the album cover. |

---

## 8. Downloads Module — `/api/downloads`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/downloads` | Public | List downloadable files (paginated). Grouped by category (forms, handbooks, brochures, LGU issuances). Returns file name, description, file size, download count, updatedAt. |
| GET | `/api/downloads/:id` | Public | Get download details and increment download counter. |
| POST | `/api/downloads` | Admin | Upload a downloadable file (file, title, description, category). |
| PATCH | `/api/downloads/:id` | Admin | Update file details or replace file. |
| DELETE | `/api/downloads/:id` | Admin | Remove file. |
| GET | `/api/downloads/categories` | Public | List download categories. |

---

## 9. FAQ Module — `/api/faq`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/faq` | Public | List FAQs grouped by category. Returns question, answer, order. |
| POST | `/api/faq` | Admin | Create FAQ item (question, answer, category, sortOrder). |
| PATCH | `/api/faq/:id` | Admin | Update FAQ item. |
| DELETE | `/api/faq/:id` | Admin | Delete FAQ item. |
| PUT | `/api/faq/reorder` | Admin | Batch reorder FAQ items (array of {id, sortOrder}). |

---

## 10. Contact / Inquiries Module — `/api/contact`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/contact` | Public | Submit a contact form inquiry (name, email, subject, message, department/recipient). Sends auto-reply acknowledgement email. |
| GET | `/api/contact` | Admin | List all inquiries (paginated, filterable by status, date range). |
| GET | `/api/contact/:id` | Admin | View inquiry details. |
| PATCH | `/api/contact/:id/status` | Admin | Mark as read / replied / resolved. |
| POST | `/api/contact/:id/reply` | Admin | Send a reply email directly from dashboard. |

---

## 11. Announcements / Banner Module — `/api/announcements`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/announcements` | Public | List active announcements (banners, alerts, popups). Filtered by active date range automatically. |
| POST | `/api/announcements` | Admin | Create announcement (title, message, type: banner/alert/popup, linkUrl, startAt, endAt, isActive). |
| PATCH | `/api/announcements/:id` | Admin | Update announcement. |
| DELETE | `/api/announcements/:id` | Admin | Delete announcement. |
| PATCH | `/api/announcements/:id/activate` | Admin | Toggle active status. |

---

## 12. Pages / Content Module — `/api/pages`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/pages/:slug` | Public | Get a dynamic page's content (for editable sections like About, History, Vision-Mission, Student Life, etc.). Returns structured content blocks (JSON). |
| GET | `/api/pages` | Admin | List all dynamic pages. |
| POST | `/api/pages` | Admin | Create a new dynamic page (slug, title, content blocks, meta). |
| PATCH | `/api/pages/:id` | Admin | Update page content (full rich-text or block-based editor). |
| DELETE | `/api/pages/:id` | Admin | Delete a dynamic page. |

---

## 13. Uploads Module — `/api/uploads`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/uploads` | Admin | Upload a single file (image, PDF, document). Returns optimized variants (thumbnail, medium, full) for images. |
| POST | `/api/uploads/multiple` | Admin | Upload multiple files at once. |
| DELETE | `/api/uploads/:id` | Admin | Delete an uploaded file. |

---

## 14. Settings Module — `/api/settings`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/settings/public` | Public | Get public-facing settings (school name, address, contact, social links, operating hours, logo URL). |
| GET | `/api/settings` | Admin | Get all settings including internal ones. |
| PATCH | `/api/settings` | Admin | Update settings (batch update grouped by category: general, contact, social, seo, maintenance, features). |

---

## 15. Admin / Dashboard Module — `/api/admin`

All endpoints require **Admin** role.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/dashboard` | Overview stats: total pre-enrolled (count by status), new inquiries (today/week), upcoming events, latest news drafts, student growth chart data. |
| GET | `/api/admin/stats/enrollment` | Enrollment analytics (by program, by month, by status). |
| GET | `/api/admin/stats/inquiries` | Inquiry analytics (by department, by status, trend over time). |
| GET | `/api/admin/stats/content` | Content publishing stats (news articles by month, gallery uploads, download counts). |

### Admin User Management

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/admin/users` | Admin | List admin users. |
| POST | `/api/admin/users` | Super Admin | Create a new admin user (email, password, name, role: admin/superadmin). |
| PATCH | `/api/admin/users/:id` | Super Admin | Update admin user details or role. |
| DELETE | `/api/admin/users/:id` | Super Admin | Remove an admin user. |

---

## 16. Notifications Module — `/api/notifications`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/notifications` | Admin | List admin notifications (new enrollments, inquiries, system alerts) — paginated. |
| PATCH | `/api/notifications/:id/read` | Admin | Mark a notification as read. |
| PATCH | `/api/notifications/read-all` | Admin | Mark all notifications as read. |
| GET | `/api/notifications/unread-count` | Admin | Get count of unread notifications (for badge). |

---

## 17. Search Module — `/api/search`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/search` | Public | Full-text search across news, events, programs, faculty, downloads, faq, and pages (q, type filter, page). Returns grouped results with total counts per type. |

---

## 18. Site Map / Structured Data Module — `/api/sitemap`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/sitemap` | Public | Returns the full site tree as JSON (used by footer sitemap, breadcrumb generation, and SEO robots). |

---

## Common Patterns

### Pagination
All `GET` list endpoints accept `?page=1&limit=20` and return:
```json
{
  "data": [...],
  "meta": { "total", "page", "limit", "totalPages" }
}
```

### Response Envelope
```json
{
  "success": true,
  "data": {},
  "message": "optional message"
}
```

### Error Response
```json
{
  "success": false,
  "statusCode": 400,
  "message": "Human-readable message",
  "errors": ["field-level errors if any"]
}
```

### Auth Guards
- **Public** — no token required
- **Private (student)** — valid JWT with role `student`
- **Admin** — valid JWT with role `admin`
- **Super Admin** — valid JWT with role `superadmin`

### Module NestJS Structure
```
src/
├── auth/
├── students/
├── news/
├── events/
├── programs/
├── faculty/
├── gallery/
├── downloads/
├── faq/
├── contact/
├── announcements/
├── pages/
├── uploads/
├── settings/
├── admin/
├── notifications/
├── search/
├── sitemap/
├── common/          # guards, decorators, filters, interceptors, pipes
└── config/          # env validation, database config
```

### Prisma Schema Models (Core)
```
User (admin)            → id, email, password, name, role, createdAt, updatedAt
Student                 → id, refNo, firstName, lastName, birthdate, contact, email, address, guardian, lastSchool, desiredProgramId, status, documents[], statusHistory[], createdAt, updatedAt
NewsArticle             → id, slug, title, content, excerpt, featuredImage, categoryId, authorId, tags, isPublished, publishedAt, createdAt, updatedAt
Event                   → id, slug, title, description, startDate, endDate, location, category, posterImage, isFeatured, createdAt, updatedAt
Program                 → id, slug, title, description, duration, careerPaths, admissionRequirements, learningOutcomes, icon, coverImage, status, isFeatured, createdAt, updatedAt
Faculty                 → id, slug, name, title, department, bio, education, specialties, profilePhoto, email, contact, createdAt, updatedAt
Album                   → id, slug, title, description, coverImageId, isPublished, createdAt, updatedAt
Media                   → id, url, thumbnailUrl, type (image/video), albumId, createdAt
Download                → id, title, description, fileUrl, fileSize, category, downloadCount, createdAt, updatedAt
FaqItem                 → id, question, answer, category, sortOrder, createdAt, updatedAt
Inquiry                 → id, name, email, subject, message, department, status, createdAt, updatedAt
Announcement            → id, title, message, type, linkUrl, startAt, endAt, isActive, createdAt, updatedAt
Page                    → id, slug, title, content (JSON), meta, createdAt, updatedAt
Setting                 → id, key, value, category, createdAt, updatedAt
Notification            → id, type, title, message, isRead, userId, createdAt, updatedAt
Upload                  → id, url, thumbnailUrl, filename, mimetype, size, createdAt, updatedAt
```

---

## Phased Implementation — 1 Endpoint Per Phase

Each phase builds exactly **one endpoint**. The order follows dependency order (auth → students → news → events → programs → faculty → gallery → etc.).

| Phase | Module | Method | Endpoint |
|-------|--------|--------|----------|
| 1 | Auth | POST | `/api/auth/register` |
| 2 | Auth | POST | `/api/auth/login` |
| 3 | Auth | POST | `/api/auth/refresh` |
| 4 | Auth | POST | `/api/auth/logout` |
| 5 | Auth | POST | `/api/auth/forgot-password` |
| 6 | Auth | POST | `/api/auth/reset-password` |
| 7 | Auth | POST | `/api/auth/verify-email` |
| 8 | Auth | POST | `/api/auth/resend-verification` |
| 9 | Auth | POST | `/api/auth/change-password` |
| 10 | Auth | POST | `/api/auth/student/login` |
| 11 | Auth | POST | `/api/auth/admin/login` |
| 12 | Students | POST | `/api/students/pre-enroll` |
| 13 | Students | GET | `/api/students/pre-enroll/:refNo` |
| 14 | Students | GET | `/api/students/me` |
| 15 | Students | PATCH | `/api/students/me` |
| 16 | Students | POST | `/api/students/me/documents` |
| 17 | Students | GET | `/api/students/me/documents` |
| 18 | Students | DELETE | `/api/students/me/documents/:id` |
| 19 | Students | GET | `/api/students/me/status-history` |
| 20 | Students | GET | `/api/students` |
| 21 | Students | GET | `/api/students/:id` |
| 22 | Students | PATCH | `/api/students/:id/status` |
| 23 | Students | PATCH | `/api/students/:id/documents/:docId/verify` |
| 24 | Students | GET | `/api/students/stats` |
| 25 | Settings | GET | `/api/settings/public` |
| 26 | Settings | GET | `/api/settings` |
| 27 | Settings | PATCH | `/api/settings` |
| 28 | News | GET | `/api/news/categories` |
| 29 | News | POST | `/api/news/categories` |
| 30 | News | PATCH | `/api/news/categories/:id` |
| 31 | News | DELETE | `/api/news/categories/:id` |
| 32 | News | GET | `/api/news` |
| 33 | News | GET | `/api/news/:slug` |
| 34 | News | POST | `/api/news` |
| 35 | News | PATCH | `/api/news/:id` |
| 36 | News | DELETE | `/api/news/:id` |
| 37 | News | PATCH | `/api/news/:id/publish` |
| 38 | News | POST | `/api/news/:id/images` |
| 39 | Events | GET | `/api/events` |
| 40 | Events | GET | `/api/events/:slug` |
| 41 | Events | POST | `/api/events` |
| 42 | Events | PATCH | `/api/events/:id` |
| 43 | Events | DELETE | `/api/events/:id` |
| 44 | Events | GET | `/api/events/calendar` |
| 45 | Programs | GET | `/api/programs` |
| 46 | Programs | GET | `/api/programs/:slug` |
| 47 | Programs | POST | `/api/programs` |
| 48 | Programs | PATCH | `/api/programs/:id` |
| 49 | Programs | DELETE | `/api/programs/:id` |
| 50 | Programs | PATCH | `/api/programs/:id/featured` |
| 51 | Programs | GET | `/api/programs/:id/curriculum` |
| 52 | Programs | PATCH | `/api/programs/:id/curriculum` |
| 53 | Faculty | GET | `/api/faculty` |
| 54 | Faculty | GET | `/api/faculty/:slug` |
| 55 | Faculty | POST | `/api/faculty` |
| 56 | Faculty | PATCH | `/api/faculty/:id` |
| 57 | Faculty | DELETE | `/api/faculty/:id` |
| 58 | Gallery | GET | `/api/gallery` |
| 59 | Gallery | GET | `/api/gallery/:slug` |
| 60 | Gallery | POST | `/api/gallery` |
| 61 | Gallery | PATCH | `/api/gallery/:id` |
| 62 | Gallery | DELETE | `/api/gallery/:id` |
| 63 | Gallery | POST | `/api/gallery/:id/media` |
| 64 | Gallery | DELETE | `/api/gallery/:id/media/:mediaId` |
| 65 | Gallery | PATCH | `/api/gallery/:id/media/:mediaId/cover` |
| 66 | Downloads | GET | `/api/downloads/categories` |
| 67 | Downloads | GET | `/api/downloads` |
| 68 | Downloads | GET | `/api/downloads/:id` |
| 69 | Downloads | POST | `/api/downloads` |
| 70 | Downloads | PATCH | `/api/downloads/:id` |
| 71 | Downloads | DELETE | `/api/downloads/:id` |
| 72 | FAQ | GET | `/api/faq` |
| 73 | FAQ | POST | `/api/faq` |
| 74 | FAQ | PATCH | `/api/faq/:id` |
| 75 | FAQ | DELETE | `/api/faq/:id` |
| 76 | FAQ | PUT | `/api/faq/reorder` |
| 77 | Contact | POST | `/api/contact` |
| 78 | Contact | GET | `/api/contact` |
| 79 | Contact | GET | `/api/contact/:id` |
| 80 | Contact | PATCH | `/api/contact/:id/status` |
| 81 | Contact | POST | `/api/contact/:id/reply` |
| 82 | Announcements | GET | `/api/announcements` |
| 83 | Announcements | POST | `/api/announcements` |
| 84 | Announcements | PATCH | `/api/announcements/:id` |
| 85 | Announcements | DELETE | `/api/announcements/:id` |
| 86 | Announcements | PATCH | `/api/announcements/:id/activate` |
| 87 | Pages | GET | `/api/pages` |
| 88 | Pages | GET | `/api/pages/:slug` |
| 89 | Pages | POST | `/api/pages` |
| 90 | Pages | PATCH | `/api/pages/:id` |
| 91 | Pages | DELETE | `/api/pages/:id` |
| 92 | Uploads | POST | `/api/uploads` |
| 93 | Uploads | POST | `/api/uploads/multiple` |
| 94 | Uploads | DELETE | `/api/uploads/:id` |
| 95 | Admin | GET | `/api/admin/dashboard` |
| 96 | Admin | GET | `/api/admin/stats/enrollment` |
| 97 | Admin | GET | `/api/admin/stats/inquiries` |
| 98 | Admin | GET | `/api/admin/stats/content` |
| 99 | Admin | GET | `/api/admin/users` |
| 100 | Admin | POST | `/api/admin/users` |
| 101 | Admin | PATCH | `/api/admin/users/:id` |
| 102 | Admin | DELETE | `/api/admin/users/:id` |
| 103 | Notifications | GET | `/api/notifications` |
| 104 | Notifications | PATCH | `/api/notifications/:id/read` |
| 105 | Notifications | PATCH | `/api/notifications/read-all` |
| 106 | Notifications | GET | `/api/notifications/unread-count` |
| 107 | Search | GET | `/api/search` |
| 108 | Sitemap | GET | `/api/sitemap` |

### Phase Workflow

> **One endpoint per phase.** Each phase implements exactly one endpoint. No bundling.

For each phase:
1. Add/update Prisma schema (if new models/fields needed)
2. Run `npx prisma migrate dev`
3. Generate the NestJS resource (`nest g resource`)
4. Implement DTOs with class-validator decorators
5. Implement service logic
6. Wire up controller endpoint
7. Add guards / decorators as needed
8. Manual test via curl / Postman / Swagger
9. Write vitest unit/integration test
10. Add a `## Done` section at the bottom of the phase `.md` file listing each completed step with status (`✅` / `❌`).
