import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { Check, ChevronLeft, ChevronRight, FileCheck, Loader2, AlertCircle, Bug } from 'lucide-react'
import { submitPreEnroll } from '../services/students'

const programs = [
  'Agri-Business',
  'Bachelor of Science in Agriculture',
  'Agricultural Technology',
  'Agri-Entrepreneurship',
]

const referralOptions = [
  'Friends', 'Parents', 'Relatives', 'TV', 'Radio', 'Print',
  'School-led event', 'Flyer / Leaflets', 'Billboards / Banners',
  'Posters', 'Career Orientation Seminar', 'Facebook', 'YouTube', 'Instagram',
]

const sections = [
  'Quick Questions',
  'Admission Information',
  'Personal Details',
  'Address',
  'Contact Details',
  'Last School Attended',
  'Parents / Guardian',
  'Referrals',
]

interface FormValues {
  isTampakanResident: string
  desiredProgram: string
  lastSchool: string
  yearGraduated: string
  admitType: string
  yearLevel: string
  schoolYear: string
  term: string
  lrn: string
  firstName: string
  middleName: string
  lastName: string
  suffix: string
  gender: string
  civilStatus: string
  citizenship: string
  birthdate: string
  birthplace: string
  religion: string
  current_streetNo: string
  current_street: string
  current_subdivision: string
  current_barangay: string
  current_city: string
  current_province: string
  current_zip: string
  addressSameAsCurrent: boolean
  permanent_streetNo: string
  permanent_street: string
  permanent_subdivision: string
  permanent_barangay: string
  permanent_city: string
  permanent_province: string
  permanent_zip: string
  telephoneNo: string
  contactNumber: string
  email: string
  schoolType: string
  schoolProgram: string
  graduationDate: string
  fatherFirstName: string
  fatherLastName: string
  fatherMiddleInitial: string
  fatherSuffix: string
  fatherMobile: string
  fatherEmail: string
  fatherOccupation: string
  motherFirstName: string
  motherLastName: string
  motherMiddleInitial: string
  motherSuffix: string
  motherMobile: string
  motherEmail: string
  motherOccupation: string
  guardianFirstName: string
  guardianLastName: string
  guardianMiddleInitial: string
  guardianSuffix: string
  guardianMobile: string
  guardianEmail: string
  guardianOccupation: string
  guardianRelationship: string
}

const defaultValues: FormValues = {
  isTampakanResident: '',
  desiredProgram: '',
  lastSchool: '',
  yearGraduated: '',
  admitType: '',
  yearLevel: '',
  schoolYear: '',
  term: '',
  lrn: '',
  firstName: '',
  middleName: '',
  lastName: '',
  suffix: '',
  gender: '',
  civilStatus: '',
  citizenship: 'Filipino',
  birthdate: '',
  birthplace: '',
  religion: '',
  current_streetNo: '',
  current_street: '',
  current_subdivision: '',
  current_barangay: '',
  current_city: 'Tampakan',
  current_province: 'South Cotabato',
  current_zip: '',
  addressSameAsCurrent: false,
  permanent_streetNo: '',
  permanent_street: '',
  permanent_subdivision: '',
  permanent_barangay: '',
  permanent_city: '',
  permanent_province: '',
  permanent_zip: '',
  telephoneNo: '',
  contactNumber: '',
  email: '',
  schoolType: '',
  schoolProgram: '',
  graduationDate: '',
  fatherFirstName: '',
  fatherLastName: '',
  fatherMiddleInitial: '',
  fatherSuffix: '',
  fatherMobile: '',
  fatherEmail: '',
  fatherOccupation: '',
  motherFirstName: '',
  motherLastName: '',
  motherMiddleInitial: '',
  motherSuffix: '',
  motherMobile: '',
  motherEmail: '',
  motherOccupation: '',
  guardianFirstName: '',
  guardianLastName: '',
  guardianMiddleInitial: '',
  guardianSuffix: '',
  guardianMobile: '',
  guardianEmail: '',
  guardianOccupation: '',
  guardianRelationship: '',
}

const mockData: FormValues = {
  isTampakanResident: 'yes',
  desiredProgram: 'Agri-Business',
  lastSchool: 'Tampakan National High School',
  yearGraduated: '2026',
  admitType: 'New Student',
  yearLevel: '1st',
  schoolYear: '2026–2027',
  term: 'First Term',
  lrn: '123456789012',
  firstName: 'Juan',
  middleName: 'M',
  lastName: 'Dela Cruz',
  suffix: '',
  gender: 'Male',
  civilStatus: 'Single',
  citizenship: 'Filipino',
  birthdate: '2000-01-15',
  birthplace: 'Tampakan, South Cotabato',
  religion: 'Roman Catholic',
  current_streetNo: '123',
  current_street: 'Rizal St',
  current_subdivision: '',
  current_barangay: 'Poblacion',
  current_city: 'Tampakan',
  current_province: 'South Cotabato',
  current_zip: '9507',
  addressSameAsCurrent: true,
  permanent_streetNo: '',
  permanent_street: '',
  permanent_subdivision: '',
  permanent_barangay: '',
  permanent_city: '',
  permanent_province: '',
  permanent_zip: '',
  telephoneNo: '(083) 123-4567',
  contactNumber: '09171234567',
  email: 'juan.delacruz@example.com',
  schoolType: 'Public',
  schoolProgram: 'STEM',
  graduationDate: '2026-06-15',
  fatherFirstName: 'Pedro',
  fatherLastName: 'Dela Cruz',
  fatherMiddleInitial: 'R',
  fatherSuffix: '',
  fatherMobile: '09181234567',
  fatherEmail: 'pedro.dc@example.com',
  fatherOccupation: 'Farmer',
  motherFirstName: 'Maria',
  motherLastName: 'Dela Cruz',
  motherMiddleInitial: 'L',
  motherSuffix: '',
  motherMobile: '09191234567',
  motherEmail: 'maria.dc@example.com',
  motherOccupation: 'Teacher',
  guardianFirstName: 'Juan',
  guardianLastName: 'Santos',
  guardianMiddleInitial: 'A',
  guardianSuffix: '',
  guardianMobile: '09201234567',
  guardianEmail: 'juan.santos@example.com',
  guardianOccupation: 'Engineer',
  guardianRelationship: 'Uncle',
}

function composeAddress(v: FormValues, prefix: 'current' | 'permanent'): string {
  const parts: string[] = []
  const streetNo = v[`${prefix}_streetNo` as keyof FormValues] as string
  const street = v[`${prefix}_street` as keyof FormValues] as string
  const subdivision = v[`${prefix}_subdivision` as keyof FormValues] as string
  const barangay = v[`${prefix}_barangay` as keyof FormValues] as string
  const city = v[`${prefix}_city` as keyof FormValues] as string
  const province = v[`${prefix}_province` as keyof FormValues] as string
  const zip = v[`${prefix}_zip` as keyof FormValues] as string
  if (streetNo) parts.push(streetNo)
  if (street) parts.push(street)
  if (subdivision) parts.push(subdivision)
  if (barangay) parts.push(barangay)
  if (city) parts.push(city)
  if (province) parts.push(province)
  if (zip) parts.push(zip)
  return parts.join(', ')
}

export default function PreEnrollmentPage() {
  const [submitted, setSubmitted] = useState(false)
  const [refNo, setRefNo] = useState('')
  const [activeSection, setActiveSection] = useState(0)
  const [referrals, setReferrals] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { register, handleSubmit: rhfHandleSubmit, setValue, watch } = useForm<FormValues>({ defaultValues })

  const sameAddress = watch('addressSameAsCurrent')

  const prePopulate = () => {
    for (const [key, val] of Object.entries(mockData)) {
      setValue(key as keyof FormValues, val)
    }
    setReferrals(['Friends', 'Facebook'])
  }

  const onSubmit = async (v: FormValues) => {
    setLoading(true)
    setError('')

    const currentAddr = composeAddress(v, 'current')
    const permanentAddr = v.addressSameAsCurrent ? currentAddr : composeAddress(v, 'permanent')

    const payload = {
      fullName: `${v.firstName} ${v.middleName} ${v.lastName}`.replace(/\s+/g, ' ').trim(),
      firstName: v.firstName || undefined,
      middleName: v.middleName || undefined,
      lastName: v.lastName || undefined,
      suffix: v.suffix || undefined,
      birthdate: v.birthdate,
      gender: v.gender || undefined,
      civilStatus: v.civilStatus || undefined,
      citizenship: v.citizenship || undefined,
      birthplace: v.birthplace || undefined,
      religion: v.religion || undefined,
      contactNumber: v.contactNumber,
      telephoneNo: v.telephoneNo || undefined,
      email: v.email || undefined,
      address: currentAddr,
      currentAddress: currentAddr || undefined,
      permanentAddress: v.addressSameAsCurrent ? undefined : (permanentAddr || undefined),
      addressSameAsCurrent: v.addressSameAsCurrent || undefined,
      lastSchool: v.lastSchool,
      desiredProgram: v.desiredProgram,
      isTampakanResident: v.isTampakanResident === 'yes' || undefined,
      admitType: v.admitType || undefined,
      yearLevel: v.yearLevel || undefined,
      schoolYear: v.schoolYear || undefined,
      term: v.term || undefined,
      lrn: v.lrn || undefined,
      fatherFirstName: v.fatherFirstName || undefined,
      fatherLastName: v.fatherLastName || undefined,
      fatherMiddleInitial: v.fatherMiddleInitial || undefined,
      fatherSuffix: v.fatherSuffix || undefined,
      fatherMobile: v.fatherMobile || undefined,
      fatherEmail: v.fatherEmail || undefined,
      fatherOccupation: v.fatherOccupation || undefined,
      motherFirstName: v.motherFirstName || undefined,
      motherLastName: v.motherLastName || undefined,
      motherMiddleInitial: v.motherMiddleInitial || undefined,
      motherSuffix: v.motherSuffix || undefined,
      motherMobile: v.motherMobile || undefined,
      motherEmail: v.motherEmail || undefined,
      motherOccupation: v.motherOccupation || undefined,
      guardianFirstName: v.guardianFirstName || undefined,
      guardianLastName: v.guardianLastName || undefined,
      guardianMiddleInitial: v.guardianMiddleInitial || undefined,
      guardianSuffix: v.guardianSuffix || undefined,
      guardianMobile: v.guardianMobile || undefined,
      guardianEmail: v.guardianEmail || undefined,
      guardianOccupation: v.guardianOccupation || undefined,
      guardianRelationship: v.guardianRelationship || undefined,
      guardianName: v.guardianFirstName ? `${v.guardianFirstName} ${v.guardianLastName || ''}`.trim() : '',
      guardianContact: v.guardianMobile || '',
      referralSources: referrals.length > 0 ? referrals.join(', ') : undefined,
    }

    try {
      const result = await submitPreEnroll(payload)
      setRefNo(result.referenceNumber)
      setSubmitted(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Submission failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const toggleReferral = (opt: string) => {
    setReferrals((prev) =>
      prev.includes(opt) ? prev.filter((r) => r !== opt) : [...prev, opt],
    )
  }

  const inp = (field: keyof FormValues, opts?: Record<string, any>) =>
    ({
      ...register(field, opts),
      className:
        'w-full rounded-lg border border-sky-field px-4 py-2.5 text-sm text-slate-ink outline-none focus:border-harvest-green',
    } as any)

  const sel = (field: keyof FormValues, opts?: Record<string, any>) => inp(field, opts)

  if (submitted) {
    return (
      <section className="flex min-h-[70svh] flex-col items-center justify-center px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg"
        >
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-success-sprout/10">
            <FileCheck size={40} className="text-success-sprout" />
          </div>
          <h1 className="mb-3 text-2xl font-bold text-deep-soil">
            Pre-Enrollment Submitted!
          </h1>
          <p className="mb-4 text-slate-ink/70">
            Your pre-enrollment has been received. Use this reference number to
            track your application status:
          </p>
          <div className="mx-auto mb-6 inline-block rounded-xl bg-sky-field px-8 py-4">
            <span className="text-2xl font-bold tracking-widest text-harvest-green">
              {refNo}
            </span>
          </div>
          <p className="text-sm text-slate-ink/50">
            Save this number. You will need it to log in to the student portal
            and check your pre-enrollment status.
          </p>
        </motion.div>
      </section>
    )
  }

  return (
    <>
      <section className="relative flex min-h-[30svh] items-center justify-center overflow-hidden px-4 text-center text-cloud-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/TCC_LOGO_512x512.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-harvest-green/85 to-deep-soil/90" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <h1 className="text-3xl font-bold md:text-4xl">Pre-Enrollment</h1>
          <p className="mx-auto mt-2 max-w-2xl text-sky-field/80">
            Reserve your slot at Tampakan Community College — free tuition, quality education
          </p>
        </motion.div>
      </section>

      <section className="bg-cloud-white px-4 py-16">
        <div className="mx-auto max-w-4xl">
          {/* Section nav + Dev button */}
          <div className="mb-10 flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap gap-2">
              {sections.map((s, i) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setActiveSection(i)}
                  className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                    activeSection === i
                      ? 'bg-harvest-green text-cloud-white'
                      : 'bg-sky-field text-slate-ink/60 hover:bg-harvest-green/10'
                  }`}
                >
                  {i < activeSection && <Check size={12} />}
                  {i + 1}. {s}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={prePopulate}
              className="flex items-center gap-1.5 rounded-lg border border-amber-300 bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-700 transition-colors hover:bg-amber-100"
            >
              <Bug size={14} /> Dev Pre-Populate
            </button>
          </div>

          {error && (
            <div className="mb-6 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <form onSubmit={rhfHandleSubmit(onSubmit)}>
            {activeSection === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-5 rounded-xl border border-sky-field p-6 md:p-8"
              >
                <h2 className="text-xl font-bold text-deep-soil">Quick Questions</h2>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-deep-soil">
                    Are you a resident of Tampakan? *
                  </label>
                  <select {...sel('isTampakanResident', { required: true })}>
                    <option value="">-- Select --</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-deep-soil">
                    Course you want to take? *
                  </label>
                  <select {...sel('desiredProgram', { required: true })}>
                    <option value="">-- Select --</option>
                    {programs.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-deep-soil">
                    School you graduated from? *
                  </label>
                  <input {...inp('lastSchool', { required: true })} type="text" placeholder="e.g. Tampakan National High School" />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-deep-soil">
                    Year graduated?
                  </label>
                  <input {...inp('yearGraduated')} type="text" placeholder="e.g. 2026" />
                </div>
              </motion.div>
            )}

            {activeSection === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-5 rounded-xl border border-sky-field p-6 md:p-8"
              >
                <h2 className="text-xl font-bold text-deep-soil">Admission Information</h2>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-deep-soil">Admit Type *</label>
                    <select {...sel('admitType', { required: true })}>
                      <option value="">-- Select --</option>
                      <option value="New Student">New Student</option>
                      <option value="Transferee">Transferee</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-deep-soil">Year Level</label>
                    <select {...sel('yearLevel')}>
                      <option value="">-- Select --</option>
                      <option value="1st">1st</option>
                      <option value="2nd">2nd</option>
                      <option value="3rd">3rd</option>
                      <option value="4th">4th</option>
                    </select>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-deep-soil">School Year</label>
                    <input {...inp('schoolYear')} type="text" placeholder="e.g. 2026–2027" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-deep-soil">Term</label>
                    <input {...inp('term')} type="text" placeholder="e.g. First Term" />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-deep-soil">LRN #</label>
                  <input {...inp('lrn')} type="text" placeholder="Learner Reference Number" />
                </div>
              </motion.div>
            )}

            {activeSection === 2 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-5 rounded-xl border border-sky-field p-6 md:p-8"
              >
                <h2 className="text-xl font-bold text-deep-soil">Student's Information</h2>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-deep-soil">First Name *</label>
                    <input {...inp('firstName', { required: true })} type="text" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-deep-soil">Middle Name</label>
                    <input {...inp('middleName')} type="text" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-deep-soil">Last Name *</label>
                    <input {...inp('lastName', { required: true })} type="text" />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-deep-soil">Suffix</label>
                  <input {...inp('suffix')} type="text" placeholder="e.g. Jr., III" />
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-deep-soil">Gender *</label>
                    <select {...sel('gender', { required: true })}>
                      <option value="">-- Select --</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-deep-soil">Civil Status</label>
                    <select {...sel('civilStatus')}>
                      <option value="">-- Select --</option>
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                      <option value="Widowed">Widowed</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-deep-soil">Citizenship</label>
                    <input {...inp('citizenship')} type="text" />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-deep-soil">Date of Birth *</label>
                    <input {...inp('birthdate', { required: true })} type="date" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-deep-soil">Birthplace</label>
                    <input {...inp('birthplace')} type="text" />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-deep-soil">Religion</label>
                  <input {...inp('religion')} type="text" />
                </div>
              </motion.div>
            )}

            {activeSection === 3 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-5 rounded-xl border border-sky-field p-6 md:p-8"
              >
                <h2 className="text-xl font-bold text-deep-soil">Address</h2>

                <h3 className="font-semibold text-deep-soil">Current Address</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-deep-soil">Street # / Unit #</label>
                    <input {...inp('current_streetNo')} type="text" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-deep-soil">Street</label>
                    <input {...inp('current_street')} type="text" />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-deep-soil">Subdivision / Village / Bldg.</label>
                  <input {...inp('current_subdivision')} type="text" />
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-deep-soil">Barangay *</label>
                    <input {...inp('current_barangay', { required: true })} type="text" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-deep-soil">City / Municipality *</label>
                    <input {...inp('current_city', { required: true })} type="text" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-deep-soil">Province</label>
                    <input {...inp('current_province')} type="text" />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-deep-soil">Zip Code</label>
                  <input {...inp('current_zip')} type="text" />
                </div>

                <label className="flex items-center gap-2 text-sm font-medium text-deep-soil">
                  <input
                    type="checkbox"
                    {...register('addressSameAsCurrent')}
                    className="h-4 w-4 accent-harvest-green"
                  />
                  Same as Current Address for Permanent Address
                </label>

                {!sameAddress && (
                  <>
                    <h3 className="mt-4 font-semibold text-deep-soil">Permanent Address</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-deep-soil">Street # / Unit #</label>
                        <input {...inp('permanent_streetNo')} type="text" />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-deep-soil">Street</label>
                        <input {...inp('permanent_street')} type="text" />
                      </div>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-deep-soil">Subdivision / Village / Bldg.</label>
                      <input {...inp('permanent_subdivision')} type="text" />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-3">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-deep-soil">Barangay</label>
                        <input {...inp('permanent_barangay')} type="text" />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-deep-soil">City / Municipality</label>
                        <input {...inp('permanent_city')} type="text" />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-deep-soil">Province</label>
                        <input {...inp('permanent_province')} type="text" />
                      </div>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-deep-soil">Zip Code</label>
                      <input {...inp('permanent_zip')} type="text" />
                    </div>
                  </>
                )}
              </motion.div>
            )}

            {activeSection === 4 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-5 rounded-xl border border-sky-field p-6 md:p-8"
              >
                <h2 className="text-xl font-bold text-deep-soil">Contact Details</h2>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-deep-soil">Telephone No.</label>
                    <input {...inp('telephoneNo')} type="tel" placeholder="e.g. (083) 123-4567" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-deep-soil">Mobile No. *</label>
                    <input {...inp('contactNumber', { required: true })} type="tel" placeholder="e.g. 0917XXXYYYY" />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-deep-soil">Email Address</label>
                  <input {...inp('email')} type="email" placeholder="you@example.com" />
                </div>
              </motion.div>
            )}

            {activeSection === 5 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-5 rounded-xl border border-sky-field p-6 md:p-8"
              >
                <h2 className="text-xl font-bold text-deep-soil">Current or Last School Attended</h2>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-deep-soil">School Type</label>
                    <select {...sel('schoolType')}>
                      <option value="">-- Select --</option>
                      <option value="Public">Public</option>
                      <option value="Private">Private</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-deep-soil">Name of School *</label>
                    <input {...inp('lastSchool', { required: true })} type="text" />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-deep-soil">Program / Track & Strand / Specialization</label>
                  <input {...inp('schoolProgram')} type="text" />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-deep-soil">Date of Graduation</label>
                    <input {...inp('graduationDate')} type="date" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-deep-soil">School Year</label>
                    <input {...inp('schoolYear')} type="text" placeholder="e.g. 2025–2026" />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-deep-soil">Year Level / Grade</label>
                    <input {...inp('yearLevel')} type="text" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-deep-soil">Term</label>
                    <input {...inp('term')} type="text" />
                  </div>
                </div>
              </motion.div>
            )}

            {activeSection === 6 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-5 rounded-xl border border-sky-field p-6 md:p-8"
              >
                <h2 className="text-xl font-bold text-deep-soil">Parents / Guardian's Information</h2>
                <p className="text-xs text-slate-ink/50">Please complete at least one parent/guardian information.</p>

                {/* Father */}
                <div className="rounded-lg border border-sky-field p-4">
                  <h3 className="mb-3 font-semibold text-deep-soil">Father's Information</h3>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-xs font-medium text-slate-ink/70">First Name</label>
                      <input {...inp('fatherFirstName')} type="text" />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-slate-ink/70">Last Name</label>
                      <input {...inp('fatherLastName')} type="text" />
                    </div>
                  </div>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-xs font-medium text-slate-ink/70">Middle Initial</label>
                      <input {...inp('fatherMiddleInitial')} type="text" maxLength={1} />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-slate-ink/70">Suffix</label>
                      <input {...inp('fatherSuffix')} type="text" />
                    </div>
                  </div>
                  <div className="mt-3 grid gap-3 sm:grid-cols-3">
                    <div>
                      <label className="mb-1 block text-xs font-medium text-slate-ink/70">Mobile Number</label>
                      <input {...inp('fatherMobile')} type="tel" />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-slate-ink/70">Email</label>
                      <input {...inp('fatherEmail')} type="email" />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-slate-ink/70">Occupation</label>
                      <input {...inp('fatherOccupation')} type="text" />
                    </div>
                  </div>
                </div>

                {/* Mother */}
                <div className="rounded-lg border border-sky-field p-4">
                  <h3 className="mb-3 font-semibold text-deep-soil">Mother's Information</h3>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-xs font-medium text-slate-ink/70">First Name</label>
                      <input {...inp('motherFirstName')} type="text" />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-slate-ink/70">Last Name</label>
                      <input {...inp('motherLastName')} type="text" />
                    </div>
                  </div>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-xs font-medium text-slate-ink/70">Middle Initial</label>
                      <input {...inp('motherMiddleInitial')} type="text" maxLength={1} />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-slate-ink/70">Suffix</label>
                      <input {...inp('motherSuffix')} type="text" />
                    </div>
                  </div>
                  <div className="mt-3 grid gap-3 sm:grid-cols-3">
                    <div>
                      <label className="mb-1 block text-xs font-medium text-slate-ink/70">Mobile Number</label>
                      <input {...inp('motherMobile')} type="tel" />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-slate-ink/70">Email</label>
                      <input {...inp('motherEmail')} type="email" />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-slate-ink/70">Occupation</label>
                      <input {...inp('motherOccupation')} type="text" />
                    </div>
                  </div>
                </div>

                {/* Guardian */}
                <div className="rounded-lg border border-sky-field p-4">
                  <h3 className="mb-3 font-semibold text-deep-soil">Guardian's Information</h3>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-xs font-medium text-slate-ink/70">First Name</label>
                      <input {...inp('guardianFirstName')} type="text" />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-slate-ink/70">Last Name</label>
                      <input {...inp('guardianLastName')} type="text" />
                    </div>
                  </div>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-xs font-medium text-slate-ink/70">Middle Initial</label>
                      <input {...inp('guardianMiddleInitial')} type="text" maxLength={1} />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-slate-ink/70">Suffix</label>
                      <input {...inp('guardianSuffix')} type="text" />
                    </div>
                  </div>
                  <div className="mt-3 grid gap-3 sm:grid-cols-3">
                    <div>
                      <label className="mb-1 block text-xs font-medium text-slate-ink/70">Mobile Number</label>
                      <input {...inp('guardianMobile')} type="tel" />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-slate-ink/70">Email</label>
                      <input {...inp('guardianEmail')} type="email" />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-slate-ink/70">Occupation</label>
                      <input {...inp('guardianOccupation')} type="text" />
                    </div>
                  </div>
                  <div className="mt-3">
                    <label className="mb-1 block text-xs font-medium text-slate-ink/70">Relationship</label>
                    <input {...inp('guardianRelationship')} type="text" />
                  </div>
                </div>
              </motion.div>
            )}

            {activeSection === 7 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-5 rounded-xl border border-sky-field p-6 md:p-8"
              >
                <h2 className="text-xl font-bold text-deep-soil">Referrals</h2>

                <div>
                  <p className="mb-3 text-sm text-slate-ink/70">Who referred you to TCC?</p>
                  <div className="flex flex-wrap gap-2">
                    {['Friends', 'Parents', 'Relatives'].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => toggleReferral(opt)}
                        className={`cursor-pointer rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                          referrals.includes(opt)
                            ? 'bg-harvest-green text-cloud-white'
                            : 'bg-sky-field text-slate-ink/60 hover:bg-harvest-green/10'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-3 text-sm text-slate-ink/70">How did you find out about TCC?</p>
                  <div className="flex flex-wrap gap-2">
                    {referralOptions.slice(3).map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => toggleReferral(opt)}
                        className={`cursor-pointer rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                          referrals.includes(opt)
                            ? 'bg-harvest-green text-cloud-white'
                            : 'bg-sky-field text-slate-ink/60 hover:bg-harvest-green/10'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Navigation buttons */}
            <div className="mt-8 flex items-center justify-between">
              <button
                type="button"
                disabled={activeSection === 0}
                onClick={() => setActiveSection((s) => Math.max(0, s - 1))}
                className={`flex items-center gap-1 rounded-lg px-5 py-2.5 text-sm font-medium transition-colors ${
                  activeSection === 0
                    ? 'cursor-not-allowed bg-sky-field text-slate-ink/30'
                    : 'cursor-pointer border border-sky-field text-slate-ink/70 hover:bg-sky-field'
                }`}
              >
                <ChevronLeft size={16} /> Previous
              </button>

              {activeSection < sections.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setActiveSection((s) => s + 1)}
                  className="flex cursor-pointer items-center gap-1 rounded-lg bg-harvest-green px-5 py-2.5 text-sm font-medium text-cloud-white transition-colors hover:bg-deep-soil"
                >
                  Next <ChevronRight size={16} />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className={`flex items-center gap-2 rounded-lg px-6 py-2.5 text-sm font-semibold text-cloud-white transition-colors ${
                    loading
                      ? 'cursor-not-allowed bg-harvest-green/60'
                      : 'cursor-pointer bg-harvest-green hover:bg-deep-soil'
                  }`}
                >
                  {loading ? <Loader2 size={16} className="animate-spin" /> : <FileCheck size={16} />}
                  {loading ? 'Submitting...' : 'Submit Pre-Enrollment'}
                </button>
              )}
            </div>
          </form>
        </div>
      </section>
    </>
  )
}
