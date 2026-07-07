import { Outlet, Link } from 'react-router-dom'
import { LogOut, Home } from 'lucide-react'
import ScrollToTop from '../components/ScrollToTop'
import { useAdminAuth } from '../contexts/AdminAuthContext'

export default function AdminLayout() {
  const { isAuthenticated, logout } = useAdminAuth()

  return (
    <div className="flex min-h-svh flex-col">
      <ScrollToTop />
      <nav className="bg-deep-soil text-cloud-white sticky top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-3">
            <img src="/TCC_LOGO_300x300.png" alt="TCC Logo" className="h-10 w-auto" />
            <span className="text-sm font-semibold">Admin Portal</span>
          </Link>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/admin"
                  className="text-sm text-cloud-white/80 hover:text-cloud-white transition-colors"
                >
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-cloud-white/30 px-3 py-1.5 text-xs font-medium text-cloud-white/80 hover:bg-cloud-white/10 transition-colors"
                >
                  <LogOut size={14} /> Logout
                </button>
              </>
            ) : (
              <Link
                to="/"
                className="flex items-center gap-1.5 text-sm text-cloud-white/80 hover:text-cloud-white transition-colors"
              >
                <Home size={14} /> Back to Home
              </Link>
            )}
          </div>
        </div>
      </nav>

      <main className="flex-1 bg-sky-field/30">
        <Outlet />
      </main>

      <footer className="bg-deep-soil px-4 py-4 text-center text-xs text-sky-field/60">
        &copy; {new Date().getFullYear()} Tampakan Community College. Admin Portal
      </footer>
    </div>
  )
}
