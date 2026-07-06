import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Loader2, AlertTriangle } from 'lucide-react'
import { useStudentAuth } from '../../contexts/StudentAuthContext'
import { getStudentProfile, type StudentProfileResponse } from '../../services/auth'

function Field({ label, value }: { label: string; value: string | null | undefined }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-slate-ink/50">{label}</p>
      <p className="mt-0.5 text-sm font-medium text-deep-soil">{value || '—'}</p>
    </div>
  )
}

export default function StudentProfilePage() {
  const { accessToken, logout } = useStudentAuth()
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

  if (error || !profile) {
    return (
      <div className="flex min-h-[50svh] flex-col items-center justify-center gap-4 px-4">
        <AlertTriangle size={40} className="text-red-500" />
        <p className="text-sm text-red-600">{error || 'Profile not found'}</p>
        <Link to="/student/login" className="rounded-lg bg-harvest-green px-4 py-2 text-sm font-medium text-cloud-white">
          Back to Login
        </Link>
      </div>
    )
  }

  const sections = [
    {
      title: 'Application Status',
      fields: [
        { label: 'Reference Number', value: profile.refNo },
        { label: 'Status', value: profile.status },
        { label: 'Full Name', value: profile.fullName },
        { label: 'Submitted On', value: new Date(profile.submittedAt).toLocaleDateString() },
      ],
    },
    {
      title: 'Personal Details',
      fields: [
        { label: 'First Name', value: profile.firstName },
        { label: 'Middle Name', value: profile.middleName },
        { label: 'Last Name', value: profile.lastName },
        { label: 'Suffix', value: profile.suffix },
        { label: 'Gender', value: profile.gender },
        { label: 'Civil Status', value: profile.civilStatus },
        { label: 'Citizenship', value: profile.citizenship },
        { label: 'Birthdate', value: profile.birthdate ? new Date(profile.birthdate).toLocaleDateString() : null },
        { label: 'Birthplace', value: profile.birthplace },
        { label: 'Religion', value: profile.religion },
      ],
    },
    {
      title: 'Admission Information',
      fields: [
        { label: 'Desired Program', value: profile.desiredProgram },
        { label: 'Admit Type', value: profile.admitType },
        { label: 'Year Level', value: profile.yearLevel },
        { label: 'School Year', value: profile.schoolYear },
        { label: 'Term', value: profile.term },
        { label: 'LRN', value: profile.lrn },
        { label: 'Tampakan Resident', value: profile.isTampakanResident ? 'Yes' : 'No' },
      ],
    },
    {
      title: 'Contact Details',
      fields: [
        { label: 'Mobile Number', value: profile.contactNumber },
        { label: 'Telephone No.', value: profile.telephoneNo },
        { label: 'Email', value: profile.email },
      ],
    },
    {
      title: 'Address',
      fields: [
        { label: 'Current Address', value: profile.currentAddress || profile.address },
        { label: 'Permanent Address', value: profile.permanentAddress },
        { label: 'Same as Current', value: profile.addressSameAsCurrent ? 'Yes' : 'No' },
      ],
    },
    {
      title: 'Last School Attended',
      fields: [
        { label: 'School', value: profile.lastSchool },
      ],
    },
    {
      title: 'Father\'s Information',
      fields: [
        { label: 'First Name', value: profile.fatherFirstName },
        { label: 'Last Name', value: profile.fatherLastName },
        { label: 'Middle Initial', value: profile.fatherMiddleInitial },
        { label: 'Suffix', value: profile.fatherSuffix },
        { label: 'Mobile', value: profile.fatherMobile },
        { label: 'Email', value: profile.fatherEmail },
        { label: 'Occupation', value: profile.fatherOccupation },
      ],
    },
    {
      title: 'Mother\'s Information',
      fields: [
        { label: 'First Name', value: profile.motherFirstName },
        { label: 'Last Name', value: profile.motherLastName },
        { label: 'Middle Initial', value: profile.motherMiddleInitial },
        { label: 'Suffix', value: profile.motherSuffix },
        { label: 'Mobile', value: profile.motherMobile },
        { label: 'Email', value: profile.motherEmail },
        { label: 'Occupation', value: profile.motherOccupation },
      ],
    },
    {
      title: 'Guardian\'s Information',
      fields: [
        { label: 'First Name', value: profile.guardianFirstName },
        { label: 'Last Name', value: profile.guardianLastName },
        { label: 'Middle Initial', value: profile.guardianMiddleInitial },
        { label: 'Suffix', value: profile.guardianSuffix },
        { label: 'Mobile', value: profile.guardianMobile },
        { label: 'Email', value: profile.guardianEmail },
        { label: 'Occupation', value: profile.guardianOccupation },
        { label: 'Relationship', value: profile.guardianRelationship },
      ],
    },
    {
      title: 'Referrals',
      fields: [
        { label: 'Referral Sources', value: profile.referralSources },
      ],
    },
  ]

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <Link
          to="/student/dashboard"
          className="mb-6 inline-flex items-center gap-1 text-sm text-harvest-green hover:text-deep-soil transition-colors"
        >
          <ArrowLeft size={14} /> Back to Dashboard
        </Link>

        <h1 className="mb-2 text-2xl font-bold text-deep-soil">My Profile</h1>
        <p className="mb-8 text-sm text-slate-ink/60">
          Your pre-enrollment application details
        </p>

        <div className="space-y-6">
          {sections.map((section) => (
            <div
              key={section.title}
              className="rounded-xl border border-sky-field bg-cloud-white p-6"
            >
              <h2 className="mb-4 text-lg font-bold text-deep-soil">{section.title}</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {section.fields.map((field) => (
                  <Field key={field.label} label={field.label} value={field.value} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
