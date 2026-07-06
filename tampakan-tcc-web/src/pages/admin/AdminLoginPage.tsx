import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Shield, Loader2, AlertCircle } from 'lucide-react'
import { useAdminAuth } from '../../contexts/AdminAuthContext'

export default function AdminLoginPage() {
  const navigate = useNavigate()
  const { login, isAuthenticated } = useAdminAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  if (isAuthenticated) {
    navigate('/admin', { replace: true })
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await login({ email, password })
      navigate('/admin', { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-[70svh] items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="rounded-xl border border-sky-field bg-cloud-white p-8 shadow-sm">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-deep-soil/10">
              <Shield size={28} className="text-deep-soil" />
            </div>
            <h1 className="text-2xl font-bold text-deep-soil">Admin Login</h1>
            <p className="mt-1 text-sm text-slate-ink/60">
              Sign in to manage pre-enrollments
            </p>
          </div>

          {error && (
            <div className="mb-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-deep-soil">Email *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@tcc.edu.ph"
                required
                className="w-full rounded-lg border border-sky-field px-4 py-2.5 text-sm text-slate-ink outline-none focus:border-harvest-green"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-deep-soil">Password *</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full rounded-lg border border-sky-field px-4 py-2.5 text-sm text-slate-ink outline-none focus:border-harvest-green"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`flex w-full items-center justify-center gap-2 rounded-lg px-6 py-2.5 text-sm font-semibold text-cloud-white transition-colors ${
                loading
                  ? 'cursor-not-allowed bg-deep-soil/60'
                  : 'cursor-pointer bg-deep-soil hover:bg-harvest-green'
              }`}
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <Shield size={16} />}
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 border-t border-sky-field pt-4 text-center">
            <Link
              to="/"
              className="text-sm text-harvest-green hover:text-deep-soil transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
