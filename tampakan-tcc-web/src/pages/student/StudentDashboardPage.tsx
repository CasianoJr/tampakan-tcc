import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FileCheck, Clock, AlertTriangle, CheckCircle, XCircle, User, Loader2 } from 'lucide-react'
import { useStudentAuth } from '../../contexts/StudentAuthContext'
import { getStudentProfile, type StudentProfileResponse } from '../../services/auth'

const statusConfig = {
  PENDING: { icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', label: 'Pending Review' },
  APPROVED: { icon: CheckCircle, color: 'text-success-sprout', bg: 'bg-green-50', border: 'border-green-200', label: 'Approved' },
  REJECTED: { icon: XCircle, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', label: 'Rejected' },
}

export default function StudentDashboardPage() {
  const { accessToken, student, logout } = useStudentAuth()
  const [profile, setProfile] = useState<StudentProfileResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!accessToken) return

    getStudentProfile(accessToken)
      .then(setProfile)
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Failed to load profile')
        if (err.message?.includes('Unauthorized')) {
          logout()
        }
      })
      .finally(() => setLoading(false))
  }, [accessToken, logout])

  if (loading) {
    return (
      <div className="flex min-h-[50svh] items-center justify-center">
        <Loader2 size={32} className="animate-spin text-harvest-green" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-[50svh] flex-col items-center justify-center gap-4 px-4">
        <AlertTriangle size={40} className="text-red-500" />
        <p className="text-sm text-red-600">{error}</p>
        <Link
          to="/student/login"
          className="rounded-lg bg-harvest-green px-4 py-2 text-sm font-medium text-cloud-white"
        >
          Back to Login
        </Link>
      </div>
    )
  }

  const displayName = profile?.fullName || student?.fullName || 'Student'
  const displayRefNo = profile?.refNo || student?.referenceNumber || ''
  const currentStatus = (profile?.status || student?.status || 'PENDING') as keyof typeof statusConfig
  const cfg = statusConfig[currentStatus] || statusConfig.PENDING
  const Icon = cfg.icon

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-deep-soil">
            Welcome, {displayName}
          </h1>
          <p className="mt-1 text-sm text-slate-ink/60">
            Reference Number: <span className="font-mono font-semibold text-harvest-green">{displayRefNo}</span>
          </p>
        </div>

        <div className={`mb-8 rounded-xl border ${cfg.border} ${cfg.bg} p-6`}>
          <div className="flex items-center gap-4">
            <div className={`flex h-14 w-14 items-center justify-center rounded-full ${cfg.bg} ${cfg.color}`}>
              <Icon size={28} />
            </div>
            <div>
              <h2 className={`text-lg font-bold ${cfg.color}`}>{cfg.label}</h2>
              <p className="mt-0.5 text-sm text-slate-ink/60">
                {status === 'PENDING' && 'Your application is being reviewed by the admissions office.'}
                {status === 'APPROVED' && 'Congratulations! Your pre-enrollment has been approved.'}
                {status === 'REJECTED' && 'Your pre-enrollment application was not approved.'}
              </p>
            </div>
          </div>
        </div>

        {profile && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border border-sky-field bg-cloud-white p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-ink/50">Program</p>
              <p className="mt-1 font-semibold text-deep-soil">{profile.desiredProgram}</p>
            </div>
            <div className="rounded-lg border border-sky-field bg-cloud-white p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-ink/50">Submitted</p>
              <p className="mt-1 font-semibold text-deep-soil">
                {new Date(profile.submittedAt).toLocaleDateString()}
              </p>
            </div>
            <div className="rounded-lg border border-sky-field bg-cloud-white p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-ink/50">Last School</p>
              <p className="mt-1 font-semibold text-deep-soil">{profile.lastSchool}</p>
            </div>
          </div>
        )}

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/student/profile"
            className="inline-flex items-center gap-2 rounded-lg bg-harvest-green px-5 py-2.5 text-sm font-medium text-cloud-white transition-colors hover:bg-deep-soil"
          >
            <User size={16} /> View Full Profile
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-lg border border-sky-field px-5 py-2.5 text-sm font-medium text-slate-ink/70 transition-colors hover:bg-sky-field"
          >
            <FileCheck size={16} /> Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
