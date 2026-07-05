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
    ],
  },
])
