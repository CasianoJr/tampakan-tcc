# Tampakan Community College — Website Plan

## 1. Project Overview

Tampakan Community College is a modern, responsive institutional website for the LGU-run college being established in Tampakan, South Cotabato under Mayor Leonard T. Escobillo's administration. The site serves three audiences: current residents seeking information on the institution's progress, prospective students researching programs (initial focus on Agri-Business) and enrollment, and LGU stakeholders/press tracking construction and consultative milestones. The primary goal is to inform the public during the pre-launch phase (2026–2028 construction window) while building enrollment interest ahead of opening, using a clean, contemporary visual language rather than a dated government-site aesthetic — legible typography, generous whitespace, motion-enhanced transitions, and mobile-first layouts.

## 2. Tech Stack

| Package | Version | Purpose |
|---|---|---|
| `vite` | ^6.0.0 | Build tool / dev server |
| `react` | ^19.0.0 | UI library |
| `react-dom` | ^19.0.0 | DOM rendering |
| `typescript` | ^5.7.0 | Type safety |
| `tailwindcss` | ^4.0.0 | Utility-first styling |
| `@tailwindcss/vite` | ^4.0.0 | Tailwind Vite plugin |
| `framer-motion` | ^11.15.0 | Animations & page transitions |
| `react-router-dom` | ^7.1.0 | Routing (v7 data APIs) |
| `@vitejs/plugin-react` | ^4.3.0 | React Fast Refresh for Vite |
| `eslint` | ^9.17.0 | Linting |
| `prettier` | ^3.4.0 | Formatting |
| `vitest` | ^2.1.0 | Unit testing |
| `@testing-library/react` | ^16.1.0 | Component testing |
| `lucide-react` | ^0.469.0 | Icon set |
| `clsx` | ^2.1.1 | Conditional classNames |

## 3. Suggested Repository Structure

```
tampakan-tcc-web/
├── public/
│   ├── favicon.ico
│   ├── robots.txt
│   └── assets/
│       ├── logo.svg
│       ├── logo-white.svg
│       └── og-image.jpg
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── router.tsx
│   ├── index.css
│   ├── vite-env.d.ts
│   ├── layouts/
│   │   ├── RootLayout.tsx
│   │   ├── AdminLayout.tsx
│   │   └── PageHeader.tsx
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── about/
│   │   │   ├── AboutPage.tsx
│   │   │   ├── HistoryPage.tsx
│   │   │   ├── VisionMissionPage.tsx
│   │   │   └── LeadershipPage.tsx
│   │   ├── academics/
│   │   │   ├── AcademicsPage.tsx
│   │   │   ├── ProgramsPage.tsx
│   │   │   ├── ProgramDetailPage.tsx
│   │   │   └── AcademicCalendarPage.tsx
│   │   ├── admissions/
│   │   │   ├── AdmissionsPage.tsx
│   │   │   ├── RequirementsPage.tsx
│   │   │   ├── EnrollmentPage.tsx
│   │   │   └── ScholarshipsPage.tsx
│   │   ├── news/
│   │   │   ├── NewsListPage.tsx
│   │   │   └── NewsArticlePage.tsx
│   │   ├── events/
│   │   │   ├── EventsListPage.tsx
│   │   │   └── EventDetailPage.tsx
│   │   ├── student-life/
│   │   │   ├── StudentLifePage.tsx
│   │   │   ├── OrganizationsPage.tsx
│   │   │   └── StudentServicesPage.tsx
│   │   ├── faculty/
│   │   │   ├── FacultyDirectoryPage.tsx
│   │   │   └── FacultyProfilePage.tsx
│   │   ├── ContactPage.tsx
│   │   ├── DownloadsPage.tsx
│   │   ├── GalleryPage.tsx
│   │   ├── FaqPage.tsx
│   │   ├── PreEnrollmentPage.tsx
│   │   ├── NotFoundPage.tsx
│   │   ├── student/
│   │   │   ├── StudentLoginPage.tsx
│   │   │   ├── StudentsHubPage.tsx
│   │   │   └── StudentProfilePage.tsx
│   │   └── admin/
│   │       ├── AdminLoginPage.tsx
│   │       ├── DashboardPage.tsx
│   │       ├── AdminNewsPage.tsx
│   │       ├── AdminEventsPage.tsx
│   │       ├── AdminProgramsPage.tsx
│   │       ├── AdminFacultyPage.tsx
│   │       ├── AdminAdmissionsPage.tsx
│   │       ├── AdminGalleryPage.tsx
│   │       └── AdminUsersPage.tsx
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Skeleton.tsx
│   │   │   └── Pagination.tsx
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── MobileNav.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Breadcrumbs.tsx
│   │   ├── home/
│   │   │   ├── HeroBanner.tsx
│   │   │   ├── PreEnrollNowSection.tsx
│   │   │   ├── KeyDetailsStrip.tsx
│   │   │   ├── TimelineSection.tsx
│   │   │   ├── ProgramsPreview.tsx
│   │   │   └── CtaSection.tsx
│   │   ├── academics/
│   │   │   ├── ProgramCard.tsx
│   │   │   └── CurriculumTable.tsx
│   │   ├── news/
│   │   │   ├── ArticleCard.tsx
│   │   │   └── ArticleContent.tsx
│   │   ├── events/
│   │   │   └── EventCard.tsx
│   │   ├── faculty/
│   │   │   └── FacultyCard.tsx
│   │   ├── forms/
│   │   │   ├── ContactForm.tsx
│   │   │   ├── EnrollmentForm.tsx
│   │   │   └── PreEnrollmentForm.tsx
│   │   ├── auth/
│   │   │   ├── StudentLoginForm.tsx
│   │   │   └── AdminLoginForm.tsx
│   │   ├── student/
│   │   │   ├── ProfileSummaryCard.tsx
│   │   │   ├── ApplicationStatusCard.tsx
│   │   │   └── DocumentChecklist.tsx
│   │   └── motion/
│   │       ├── FadeIn.tsx
│   │       ├── PageTransition.tsx
│   │       └── StaggerList.tsx
│   ├── data/
│   │   ├── programs.ts
│   │   ├── news.ts
│   │   ├── events.ts
│   │   ├── faculty.ts
│   │   └── navigation.ts
│   ├── hooks/
│   │   ├── useMediaQuery.ts
│   │   ├── useScrollPosition.ts
│   │   ├── useSlugData.ts
│   │   └── useAuth.ts
│   ├── lib/
│   │   ├── utils.ts
│   │   └── constants.ts
│   └── types/
│       ├── program.ts
│       ├── news.ts
│       ├── event.ts
│       ├── faculty.ts
│       └── student.ts
├── tests/
│   ├── setup.ts
│   └── components/
│       └── HeroBanner.test.tsx
├── .eslintrc.cjs
├── .prettierrc
├── tailwind.config.ts
├── tsconfig.json
├── vite.config.ts
├── package.json
├── pnpm-lock.yaml
└── README.md
```

## 4. Color Palette

| Name | Hex | Usage | Rationale |
|---|---|---|---|
| Harvest Green | `#2F6E3B` | Primary (nav, buttons, links) | Roots the brand in the region's agricultural economy; reads as growth and institutional trust rather than generic gov green |
| Deep Soil | `#1B3A22` | Primary dark / hover states | Grounds the palette, used for text-on-light and footer background |
| Golden Grain | `#E8A93B` | Secondary / accent (CTAs, highlights) | Warm accent evoking harvest and local produce; used sparingly to draw the eye |
| Sky Field | `#EAF3E9` | Background (section alternation) | Soft, light green-tinted neutral keeps the site airy and modern instead of stark white |
| Slate Ink | `#1F2937` | Body text | High-contrast neutral for readability, avoids pure black for a softer modern feel |
| Cloud White | `#FFFFFF` | Base background, cards | Clean canvas for content and imagery |
| Success Sprout | `#4C9A5B` | Success states, confirmations, active steps | Distinct from primary green but harmonious, used in forms/enrollment flow feedback |

## 5. Routes

Base URL: `https://tampakancommunitycollege.gov.ph`

> **API Reference:** Backend endpoints for all data operations (CRUD, auth, file uploads, etc.) are documented in [`website-ng-plan.md`](./website-ng-plan.md). This frontend routes table covers only the client-side page paths.

**Auth note:** `/student/*` and `/admin/*` (excluding the login pages themselves) are protected routes. `useAuth.ts` holds session state; unauthenticated visits to `/students` or `/student/profile` redirect to `/student/login`, and `/admin` redirects to `/admin/login`. Session/token handling is stubbed client-side in this phase (`localStorage`-free, in-memory or cookie-based) pending backend/API integration.

### Public Routes

| Path | Page | Description |
|---|---|---|
| `/` | Home | Hero banner, featured news, quick links |
| `/about` | About | History, vision, mission, core values overview |
| `/about/history` | History | Institutional timeline from founding proposal to present |
| `/about/vision-mission` | Vision & Mission | VMGO statement |
| `/about/leadership` | Leadership | Mayor's message, admin team, board of trustees |
| `/academics` | Academics | Programs overview and academic structure |
| `/academics/programs` | Programs | List of all offered/planned programs |
| `/academics/programs/:slug` | Program Detail | Single program info, curriculum, career paths |
| `/academics/calendar` | Academic Calendar | School year calendar, key academic dates |
| `/admissions` | Admissions | Enrollment overview and steps |
| `/admissions/requirements` | Requirements | Document checklist for applicants |
| `/admissions/enrollment` | Enrollment | Online enrollment/interest-registration form |
| `/admissions/scholarships` | Scholarships | Available scholarships and LGU subsidies |
| `/news` | News & Events | List of articles and announcements |
| `/news/:slug` | News Article | Single article view |
| `/events` | Events | Upcoming events calendar |
| `/events/:slug` | Event Detail | Single event view |
| `/student-life` | Student Life | Overview of organizations, activities, services |
| `/student-life/organizations` | Organizations | Student organizations list |
| `/student-life/services` | Student Services | Guidance office, library, health services |
| `/faculty` | Faculty & Staff | Directory overview |
| `/faculty/:slug` | Faculty Profile | Individual faculty/staff profile |
| `/pre-enrollment` | Pre-Enrollment | Public pre-enrollment form for out-of-school youth, high school graduates, and residents of Tampakan or other municipalities to reserve a slot in the free education program |
| `/contact` | Contact | Contact form, map, LGU office details |
| `/downloads` | Downloads | Forms, handbooks, brochures |
| `/gallery` | Gallery | Photo & video gallery of construction/events |
| `/faq` | FAQ | Frequently asked questions |
| `*` | Not Found | 404 fallback page |

### Student Portal Routes

| Path | Page | Description |
|---|---|---|
| `/student/login` | Student Login | Login for pre-enrolled applicants/students to access their status and profile |
| `/students` | Students Hub | Landing page for the student portal (redirects to login if unauthenticated, else to profile) |
| `/student/profile` | Student Profile | Authenticated view of pre-enrollment/application status, personal details, submitted documents, and program of interest |

### Admin/Dashboard Routes (future)

| Path | Page |
|---|---|
| `/admin/login` | Admin Login |
| `/admin` | Dashboard |
| `/admin/news` | Manage news/articles |
| `/admin/events` | Manage events |
| `/admin/programs` | Manage programs |
| `/admin/faculty` | Manage faculty |
| `/admin/admissions` | Manage admissions submissions |
| `/admin/gallery` | Manage gallery |
| `/admin/users` | Manage admin users |

## 6. Content Sections — Homepage

- **Hero Banner** — full-width, motion-in headline ("Tampakan Community College: Free, Accessible Higher Education for Every Tampakeño"), subtext, primary CTA ("Explore Programs") + secondary CTA ("Get Updates")
- **Pre-Enroll Now** — high-visibility banner/card section inviting out-of-school youth, high school graduates, Tampakan residents, and residents of neighboring municipalities to pre-enroll and reserve a slot in the free education program; primary CTA button ("Pre-Enroll Now") linking to `/pre-enrollment`, secondary link ("Already pre-enrolled? Log in") linking to `/student/login`
- **Key Details Strip** — quick-glance stats: location (former Koronadal Academy site), target opening (~2027–2028), tuition (Free), flagship program (Agri-Business)
- **Timeline Section** — horizontal/vertical scroll-triggered timeline: proposal → consultative meetings → site prep → construction → anticipated opening
- **Programs Preview** — card grid of 3–4 planned programs linking to `/academics/programs`
- **News & Updates Preview** — latest 3 articles linking to `/news`
- **Leadership Spotlight** — brief message/photo from Mayor Escobillo linking to `/about/leadership`
- **CTA Section** — "Stay Informed" email/interest signup, links to Facebook/LGU social channels
- **Footer** — LGU contact info, quick links, social icons, map snippet

## 7. Assets Needed

| Asset | Type | Status |
|---|---|---|
| Primary logo (color) | SVG | Placeholder — needs real LGU-approved mark |
| Primary logo (white/reverse) | SVG | Placeholder |
| Hero banner imagery (campus site / construction photos) | JPG/WebP | Placeholder — request real photos from LGU Tampakan comms team |
| Mayor Escobillo official photo | JPG | Real asset needed from LGU |
| Program icons (Agri-Business, future programs) | SVG (lucide-react or custom) | Can use `lucide-react` stand-ins initially |
| Site map / campus location graphic | Custom illustration or map embed | Placeholder — use Google Maps embed of former Koronadal Academy site as interim |
| OG image (social share) | JPG, 1200×630 | Placeholder — generate from hero imagery once available |
| Favicon | ICO/SVG | Derive from primary logo once finalized |

## 8. Backend API Plan

The backend is documented in [`website-ng-plan.md`](./website-ng-plan.md) — a NestJS + PostgreSQL API with 18 modules covering auth, students/pre-enrollment, news, events, programs, faculty, gallery, downloads, FAQ, contact, announcements, pages, uploads, settings, admin dashboard, notifications, search, and sitemap.