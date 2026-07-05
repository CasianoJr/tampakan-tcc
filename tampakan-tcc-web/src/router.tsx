import { createBrowserRouter } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
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
    ],
  },
])
