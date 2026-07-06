import { createBrowserRouter } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import StudentLayout from './layouts/StudentLayout'
import AdminLayout from './layouts/AdminLayout'
import ProtectedStudentRoute from './components/auth/ProtectedStudentRoute'
import ProtectedAdminRoute from './components/auth/ProtectedAdminRoute'
import HomePage from './pages/HomePage'
import AboutPage from './pages/about/AboutPage'
import HistoryPage from './pages/about/HistoryPage'
import VisionMissionPage from './pages/about/VisionMissionPage'
import LeadershipPage from './pages/about/LeadershipPage'
import AcademicsPage from './pages/academics/AcademicsPage'
import AdmissionsPage from './pages/admissions/AdmissionsPage'
import AdmissionsRequirementsPage from './pages/admissions/AdmissionsRequirementsPage'
import AdmissionsEnrollmentPage from './pages/admissions/AdmissionsEnrollmentPage'
import AdmissionsScholarshipsPage from './pages/admissions/AdmissionsScholarshipsPage'
import NewsListPage from './pages/news/NewsListPage'
import NewsArticlePage from './pages/news/NewsArticlePage'
import EventsListPage from './pages/events/EventsListPage'
import EventDetailPage from './pages/events/EventDetailPage'
import StudentLifePage from './pages/student-life/StudentLifePage'
import OrganizationsPage from './pages/student-life/OrganizationsPage'
import StudentServicesPage from './pages/student-life/StudentServicesPage'
import FacultyDirectoryPage from './pages/faculty/FacultyDirectoryPage'
import FacultyProfilePage from './pages/faculty/FacultyProfilePage'
import ContactPage from './pages/ContactPage'
import DownloadsPage from './pages/DownloadsPage'
import GalleryPage from './pages/GalleryPage'
import FaqPage from './pages/FaqPage'
import PreEnrollmentPage from './pages/PreEnrollmentPage'
import StudentLoginPage from './pages/student/StudentLoginPage'
import StudentDashboardPage from './pages/student/StudentDashboardPage'
import StudentProfilePage from './pages/student/StudentProfilePage'
import AdminLoginPage from './pages/admin/AdminLoginPage'
import AdminDashboardPage from './pages/admin/AdminDashboardPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: '/about', element: <AboutPage /> },
      { path: '/about/history', element: <HistoryPage /> },
      { path: '/about/vision-mission', element: <VisionMissionPage /> },
      { path: '/about/leadership', element: <LeadershipPage /> },
      { path: '/academics', element: <AcademicsPage /> },
      { path: '/admissions', element: <AdmissionsPage /> },
      { path: '/admissions/requirements', element: <AdmissionsRequirementsPage /> },
      { path: '/admissions/enrollment', element: <AdmissionsEnrollmentPage /> },
      { path: '/admissions/scholarships', element: <AdmissionsScholarshipsPage /> },
      { path: '/news', element: <NewsListPage /> },
      { path: '/news/:slug', element: <NewsArticlePage /> },
      { path: '/events', element: <EventsListPage /> },
      { path: '/events/:slug', element: <EventDetailPage /> },
      { path: '/student-life', element: <StudentLifePage /> },
      { path: '/student-life/organizations', element: <OrganizationsPage /> },
      { path: '/student-life/services', element: <StudentServicesPage /> },
      { path: '/faculty', element: <FacultyDirectoryPage /> },
      { path: '/faculty/:slug', element: <FacultyProfilePage /> },
      { path: '/contact', element: <ContactPage /> },
      { path: '/downloads', element: <DownloadsPage /> },
      { path: '/gallery', element: <GalleryPage /> },
      { path: '/faq', element: <FaqPage /> },
      { path: '/pre-enrollment', element: <PreEnrollmentPage /> },
    ],
  },
  {
    path: '/student',
    element: <StudentLayout />,
    children: [
      { path: 'login', element: <StudentLoginPage /> },
      {
        element: <ProtectedStudentRoute />,
        children: [
          { path: 'dashboard', element: <StudentDashboardPage /> },
          { path: 'profile', element: <StudentProfilePage /> },
          { index: true, element: <StudentDashboardPage /> },
        ],
      },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { path: 'login', element: <AdminLoginPage /> },
      {
        element: <ProtectedAdminRoute />,
        children: [
          { index: true, element: <AdminDashboardPage /> },
          { path: 'dashboard', element: <AdminDashboardPage /> },
        ],
      },
    ],
  },
])
