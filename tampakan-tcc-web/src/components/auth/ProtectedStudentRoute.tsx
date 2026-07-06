import { Navigate, Outlet } from 'react-router-dom'
import { useStudentAuth } from '../../contexts/StudentAuthContext'

export default function ProtectedStudentRoute() {
  const { isAuthenticated } = useStudentAuth()

  if (!isAuthenticated) {
    return <Navigate to="/student/login" replace />
  }

  return <Outlet />
}
