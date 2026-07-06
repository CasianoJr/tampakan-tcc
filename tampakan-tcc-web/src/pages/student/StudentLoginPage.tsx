import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LogIn, Loader2, AlertCircle, UserPlus } from 'lucide-react'
import { useStudentAuth } from '../../contexts/StudentAuthContext'

export default function StudentLoginPage() {
  const navigate = useNavigate()
  const { login, isAuthenticated } = useStudentAuth()
  const [refNo, setRefNo] = useState('')
  const [birthdate, setBirthdate] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  if (isAuthenticated) {
    navigate('/student/dashboard', { replace: true })
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await login({ referenceNumber: refNo, birthdate })
      navigate('/student/dashboard', { replace: true })
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
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-harvest-green/10">
              <LogIn size={28} className="text-harvest-green" />
            </div>
            <h1 className="text-2xl font-bold text-deep-soil">Student Login</h1>
            <p className="mt-1 text-sm text-slate-ink/60">
              Use your reference number and birthdate to sign in
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
              <label className="mb-1.5 block text-sm font-medium text-deep-soil">
                Reference Number *
              </label>
              <input
                type="text"
                value={refNo}
                onChange={(e) => setRefNo(e.target.value.toUpperCase())}
                placeholder="e.g. TCC-XXXXXX"
                required
                className="w-full rounded-lg border border-sky-field px-4 py-2.5 text-sm text-slate-ink outline-none focus:border-harvest-green"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-deep-soil">
                Birthdate *
              </label>
              <input
                type="date"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                required
                className="w-full rounded-lg border border-sky-field px-4 py-2.5 text-sm text-slate-ink outline-none focus:border-harvest-green"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`flex w-full items-center justify-center gap-2 rounded-lg px-6 py-2.5 text-sm font-semibold text-cloud-white transition-colors ${
                loading
                  ? 'cursor-not-allowed bg-harvest-green/60'
                  : 'cursor-pointer bg-harvest-green hover:bg-deep-soil'
              }`}
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <LogIn size={16} />}
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 border-t border-sky-field pt-4 text-center">
            <p className="text-sm text-slate-ink/60">
              Don't have a reference number yet?
            </p>
            <Link
              to="/pre-enrollment"
              className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-harvest-green hover:text-deep-soil transition-colors"
            >
              <UserPlus size={14} /> Pre-Enroll Now
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
