import { Navigate, Outlet } from 'react-router-dom'
import { useAdminAuth } from '../../contexts/AdminAuthContext'

export default function ProtectedAdminRoute() {
  const { isAuthenticated } = useAdminAuth()

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />
  }

  return <Outlet />
}
