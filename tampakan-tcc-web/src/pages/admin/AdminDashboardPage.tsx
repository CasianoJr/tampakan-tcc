import { useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  Loader2, AlertCircle, Search, ChevronLeft, ChevronRight,
  CheckCircle, XCircle, Filter,
} from 'lucide-react'
import { useAdminAuth } from '../../contexts/AdminAuthContext'
import {
  getPreEnrollments,
  updatePreEnrollmentStatus,
  type PreEnrollmentsResponse,
} from '../../services/auth'

const statusColors: Record<string, string> = {
  PENDING: 'bg-amber-50 text-amber-700 border-amber-200',
  APPROVED: 'bg-green-50 text-success-sprout border-green-200',
  REJECTED: 'bg-red-50 text-red-700 border-red-200',
}

export default function AdminDashboardPage() {
  const { accessToken, logout } = useAdminAuth()
  const [data, setData] = useState<PreEnrollmentsResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [page, setPage] = useState(1)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [rejectModal, setRejectModal] = useState<{ refNo: string } | null>(null)
  const [rejectReason, setRejectReason] = useState('')

  const fetchData = useCallback(async () => {
    if (!accessToken) return
    setLoading(true)
    setError('')

    try {
      const result = await getPreEnrollments(accessToken, {
        status: statusFilter || undefined,
        page,
        limit: 20,
      })
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load pre-enrollments')
      if (err instanceof Error && err.message?.includes('Unauthorized')) {
        logout()
      }
    } finally {
      setLoading(false)
    }
  }, [accessToken, statusFilter, page, logout])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleStatus = async (refNo: string, status: 'APPROVED' | 'REJECTED', reason?: string) => {
    if (!accessToken) return
    setActionLoading(refNo)

    try {
      await updatePreEnrollmentStatus(accessToken, refNo, {
        status,
        rejectionReason: status === 'REJECTED' ? reason : undefined,
      })
      setRejectModal(null)
      setRejectReason('')
      fetchData()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update status')
    } finally {
      setActionLoading(null)
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-deep-soil">Pre-Enrollment Management</h1>
            <p className="mt-1 text-sm text-slate-ink/60">
              {data ? `${data.total} total applications` : 'Loading...'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Filter size={16} className="text-slate-ink/40" />
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setPage(1) }}
              className="rounded-lg border border-sky-field px-3 py-2 text-sm text-slate-ink outline-none focus:border-harvest-green"
            >
              <option value="">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>
        </div>

        {error && (
          <div className="mb-6 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex min-h-[40svh] items-center justify-center">
            <Loader2 size={32} className="animate-spin text-harvest-green" />
          </div>
        ) : data && data.items.length > 0 ? (
          <>
            <div className="overflow-x-auto rounded-xl border border-sky-field bg-cloud-white">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-sky-field bg-sky-field/50">
                    <th className="px-4 py-3 font-semibold text-deep-soil">Ref No.</th>
                    <th className="px-4 py-3 font-semibold text-deep-soil">Full Name</th>
                    <th className="px-4 py-3 font-semibold text-deep-soil">Course</th>
                    <th className="px-4 py-3 font-semibold text-deep-soil">Status</th>
                    <th className="px-4 py-3 font-semibold text-deep-soil">Submitted</th>
                    <th className="px-4 py-3 font-semibold text-deep-soil">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.items.map((item) => (
                    <tr key={item.refNo} className="border-b border-sky-field last:border-0 hover:bg-sky-field/30">
                      <td className="px-4 py-3 font-mono text-xs font-medium text-harvest-green">{item.refNo}</td>
                      <td className="px-4 py-3 font-medium text-deep-soil">{item.fullName}</td>
                      <td className="px-4 py-3 text-slate-ink/70">{item.course}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusColors[item.status] || ''}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-slate-ink/50">
                        {new Date(item.submittedAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        {item.status === 'PENDING' ? (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleStatus(item.refNo, 'APPROVED')}
                              disabled={actionLoading === item.refNo}
                              className="flex cursor-pointer items-center gap-1 rounded-lg bg-success-sprout/10 px-3 py-1.5 text-xs font-medium text-success-sprout transition-colors hover:bg-success-sprout/20 disabled:opacity-50"
                            >
                              {actionLoading === item.refNo ? <Loader2 size={12} className="animate-spin" /> : <CheckCircle size={12} />}
                              Approve
                            </button>
                            <button
                              onClick={() => setRejectModal({ refNo: item.refNo })}
                              disabled={actionLoading === item.refNo}
                              className="flex cursor-pointer items-center gap-1 rounded-lg bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-100 disabled:opacity-50"
                            >
                              <XCircle size={12} /> Reject
                            </button>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-ink/40">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {data.totalPages > 1 && (
              <div className="mt-6 flex items-center justify-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                  className="flex cursor-pointer items-center gap-1 rounded-lg border border-sky-field px-3 py-2 text-sm text-slate-ink/70 transition-colors hover:bg-sky-field disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft size={14} /> Previous
                </button>
                <span className="px-4 text-sm text-slate-ink/60">
                  Page {data.page} of {data.totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
                  disabled={page >= data.totalPages}
                  className="flex cursor-pointer items-center gap-1 rounded-lg border border-sky-field px-3 py-2 text-sm text-slate-ink/70 transition-colors hover:bg-sky-field disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next <ChevronRight size={14} />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="flex min-h-[40svh] flex-col items-center justify-center gap-2">
            <Search size={40} className="text-slate-ink/20" />
            <p className="text-sm text-slate-ink/40">No pre-enrollments found</p>
          </div>
        )}
      </motion.div>

      {rejectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-xl bg-cloud-white p-6 shadow-lg">
            <h3 className="mb-2 text-lg font-bold text-deep-soil">Reject Application</h3>
            <p className="mb-4 text-sm text-slate-ink/60">
              Are you sure you want to reject {rejectModal.refNo}?
            </p>
            <div className="mb-4">
              <label className="mb-1.5 block text-sm font-medium text-deep-soil">Reason (required)</label>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                rows={3}
                className="w-full rounded-lg border border-sky-field px-4 py-2.5 text-sm text-slate-ink outline-none focus:border-harvest-green"
                placeholder="Provide a reason for rejection..."
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => { setRejectModal(null); setRejectReason('') }}
                className="cursor-pointer rounded-lg border border-sky-field px-4 py-2 text-sm font-medium text-slate-ink/70 transition-colors hover:bg-sky-field"
              >
                Cancel
              </button>
              <button
                onClick={() => handleStatus(rejectModal.refNo, 'REJECTED', rejectReason)}
                disabled={!rejectReason.trim() || actionLoading === rejectModal.refNo}
                className="flex cursor-pointer items-center gap-1 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-cloud-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {actionLoading === rejectModal.refNo ? <Loader2 size={14} className="animate-spin" /> : null}
                Confirm Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
