import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, ChevronLeft, ChevronRight, FileCheck } from 'lucide-react'

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

export default function PreEnrollmentPage() {
  const [submitted, setSubmitted] = useState(false)
  const [refNo, setRefNo] = useState('')
  const [activeSection, setActiveSection] = useState(0)
  const [sameAddress, setSameAddress] = useState(false)
  const [referrals, setReferrals] = useState<string[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const ref = 'TCC-' + Math.random().toString(36).substring(2, 8).toUpperCase()
    setRefNo(ref)
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const toggleReferral = (opt: string) => {
    setReferrals((prev) =>
      prev.includes(opt) ? prev.filter((r) => r !== opt) : [...prev, opt],
    )
  }

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
          style={{ backgroundImage: "url('/assets/TCC_building.jpg')" }}
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
          {/* Section nav */}
          <div className="mb-10 flex flex-wrap gap-2">
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

          <form onSubmit={handleSubmit}>
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
                  <select
                    required
                    className="w-full rounded-lg border border-sky-field px-4 py-2.5 text-sm text-slate-ink outline-none focus:border-harvest-green"
                  >
                    <option value="">-- Select --</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-deep-soil">
                    Course you want to take? *
                  </label>
                  <select
                    required
                    className="w-full rounded-lg border border-sky-field px-4 py-2.5 text-sm text-slate-ink outline-none focus:border-harvest-green"
                  >
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
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tampakan National High School"
                    className="w-full rounded-lg border border-sky-field px-4 py-2.5 text-sm text-slate-ink outline-none focus:border-harvest-green"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-deep-soil">
                    Year graduated?
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 2026"
                    className="w-full rounded-lg border border-sky-field px-4 py-2.5 text-sm text-slate-ink outline-none focus:border-harvest-green"
                  />
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
                    <select
                      required
                      className="w-full rounded-lg border border-sky-field px-4 py-2.5 text-sm text-slate-ink outline-none focus:border-harvest-green"
                    >
                      <option value="">-- Select --</option>
                      <option value="New Student">New Student</option>
                      <option value="Transferee">Transferee</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-deep-soil">Year Level</label>
                    <select className="w-full rounded-lg border border-sky-field px-4 py-2.5 text-sm text-slate-ink outline-none focus:border-harvest-green">
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
                    <input
                      type="text"
                      placeholder="e.g. 2026–2027"
                      className="w-full rounded-lg border border-sky-field px-4 py-2.5 text-sm text-slate-ink outline-none focus:border-harvest-green"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-deep-soil">Term</label>
                    <input
                      type="text"
                      placeholder="e.g. First Term"
                      className="w-full rounded-lg border border-sky-field px-4 py-2.5 text-sm text-slate-ink outline-none focus:border-harvest-green"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-deep-soil">LRN #</label>
                  <input
                    type="text"
                    placeholder="Learner Reference Number"
                    className="w-full rounded-lg border border-sky-field px-4 py-2.5 text-sm text-slate-ink outline-none focus:border-harvest-green"
                  />
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
                    <input type="text" required className="w-full rounded-lg border border-sky-field px-4 py-2.5 text-sm text-slate-ink outline-none focus:border-harvest-green" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-deep-soil">Middle Name</label>
                    <input type="text" className="w-full rounded-lg border border-sky-field px-4 py-2.5 text-sm text-slate-ink outline-none focus:border-harvest-green" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-deep-soil">Last Name *</label>
                    <input type="text" required className="w-full rounded-lg border border-sky-field px-4 py-2.5 text-sm text-slate-ink outline-none focus:border-harvest-green" />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-deep-soil">Suffix</label>
                  <input type="text" placeholder="e.g. Jr., III" className="w-full rounded-lg border border-sky-field px-4 py-2.5 text-sm text-slate-ink outline-none focus:border-harvest-green" />
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-deep-soil">Gender *</label>
                    <select required className="w-full rounded-lg border border-sky-field px-4 py-2.5 text-sm text-slate-ink outline-none focus:border-harvest-green">
                      <option value="">-- Select --</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-deep-soil">Civil Status</label>
                    <select className="w-full rounded-lg border border-sky-field px-4 py-2.5 text-sm text-slate-ink outline-none focus:border-harvest-green">
                      <option value="">-- Select --</option>
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                      <option value="Widowed">Widowed</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-deep-soil">Citizenship</label>
                    <input type="text" defaultValue="Filipino" className="w-full rounded-lg border border-sky-field px-4 py-2.5 text-sm text-slate-ink outline-none focus:border-harvest-green" />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-deep-soil">Date of Birth *</label>
                    <input type="date" required className="w-full rounded-lg border border-sky-field px-4 py-2.5 text-sm text-slate-ink outline-none focus:border-harvest-green" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-deep-soil">Birthplace</label>
                    <input type="text" className="w-full rounded-lg border border-sky-field px-4 py-2.5 text-sm text-slate-ink outline-none focus:border-harvest-green" />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-deep-soil">Religion</label>
                  <input type="text" className="w-full rounded-lg border border-sky-field px-4 py-2.5 text-sm text-slate-ink outline-none focus:border-harvest-green" />
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
                    <input type="text" className="w-full rounded-lg border border-sky-field px-4 py-2.5 text-sm text-slate-ink outline-none focus:border-harvest-green" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-deep-soil">Street</label>
                    <input type="text" className="w-full rounded-lg border border-sky-field px-4 py-2.5 text-sm text-slate-ink outline-none focus:border-harvest-green" />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-deep-soil">Subdivision / Village / Bldg.</label>
                  <input type="text" className="w-full rounded-lg border border-sky-field px-4 py-2.5 text-sm text-slate-ink outline-none focus:border-harvest-green" />
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-deep-soil">Barangay *</label>
                    <input type="text" required className="w-full rounded-lg border border-sky-field px-4 py-2.5 text-sm text-slate-ink outline-none focus:border-harvest-green" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-deep-soil">City / Municipality *</label>
                    <input type="text" required defaultValue="Tampakan" className="w-full rounded-lg border border-sky-field px-4 py-2.5 text-sm text-slate-ink outline-none focus:border-harvest-green" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-deep-soil">Province</label>
                    <input type="text" defaultValue="South Cotabato" className="w-full rounded-lg border border-sky-field px-4 py-2.5 text-sm text-slate-ink outline-none focus:border-harvest-green" />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-deep-soil">Zip Code</label>
                  <input type="text" className="w-full rounded-lg border border-sky-field px-4 py-2.5 text-sm text-slate-ink outline-none focus:border-harvest-green" />
                </div>

                <label className="flex items-center gap-2 text-sm font-medium text-deep-soil">
                  <input
                    type="checkbox"
                    checked={sameAddress}
                    onChange={(e) => setSameAddress(e.target.checked)}
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
                        <input type="text" className="w-full rounded-lg border border-sky-field px-4 py-2.5 text-sm text-slate-ink outline-none focus:border-harvest-green" />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-deep-soil">Street</label>
                        <input type="text" className="w-full rounded-lg border border-sky-field px-4 py-2.5 text-sm text-slate-ink outline-none focus:border-harvest-green" />
                      </div>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-deep-soil">Subdivision / Village / Bldg.</label>
                      <input type="text" className="w-full rounded-lg border border-sky-field px-4 py-2.5 text-sm text-slate-ink outline-none focus:border-harvest-green" />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-3">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-deep-soil">Barangay</label>
                        <input type="text" className="w-full rounded-lg border border-sky-field px-4 py-2.5 text-sm text-slate-ink outline-none focus:border-harvest-green" />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-deep-soil">City / Municipality</label>
                        <input type="text" className="w-full rounded-lg border border-sky-field px-4 py-2.5 text-sm text-slate-ink outline-none focus:border-harvest-green" />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-deep-soil">Province</label>
                        <input type="text" className="w-full rounded-lg border border-sky-field px-4 py-2.5 text-sm text-slate-ink outline-none focus:border-harvest-green" />
                      </div>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-deep-soil">Zip Code</label>
                      <input type="text" className="w-full rounded-lg border border-sky-field px-4 py-2.5 text-sm text-slate-ink outline-none focus:border-harvest-green" />
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
                    <input type="tel" placeholder="e.g. (083) 123-4567" className="w-full rounded-lg border border-sky-field px-4 py-2.5 text-sm text-slate-ink outline-none focus:border-harvest-green" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-deep-soil">Mobile No. *</label>
                    <input type="tel" required placeholder="e.g. 0917XXXYYYY" className="w-full rounded-lg border border-sky-field px-4 py-2.5 text-sm text-slate-ink outline-none focus:border-harvest-green" />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-deep-soil">Email Address</label>
                  <input type="email" placeholder="you@example.com" className="w-full rounded-lg border border-sky-field px-4 py-2.5 text-sm text-slate-ink outline-none focus:border-harvest-green" />
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
                    <select className="w-full rounded-lg border border-sky-field px-4 py-2.5 text-sm text-slate-ink outline-none focus:border-harvest-green">
                      <option value="">-- Select --</option>
                      <option value="Public">Public</option>
                      <option value="Private">Private</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-deep-soil">Name of School *</label>
                    <input type="text" required className="w-full rounded-lg border border-sky-field px-4 py-2.5 text-sm text-slate-ink outline-none focus:border-harvest-green" />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-deep-soil">Program / Track & Strand / Specialization</label>
                  <input type="text" className="w-full rounded-lg border border-sky-field px-4 py-2.5 text-sm text-slate-ink outline-none focus:border-harvest-green" />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-deep-soil">Date of Graduation</label>
                    <input type="date" className="w-full rounded-lg border border-sky-field px-4 py-2.5 text-sm text-slate-ink outline-none focus:border-harvest-green" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-deep-soil">School Year</label>
                    <input type="text" placeholder="e.g. 2025–2026" className="w-full rounded-lg border border-sky-field px-4 py-2.5 text-sm text-slate-ink outline-none focus:border-harvest-green" />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-deep-soil">Year Level / Grade</label>
                    <input type="text" className="w-full rounded-lg border border-sky-field px-4 py-2.5 text-sm text-slate-ink outline-none focus:border-harvest-green" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-deep-soil">Term</label>
                    <input type="text" className="w-full rounded-lg border border-sky-field px-4 py-2.5 text-sm text-slate-ink outline-none focus:border-harvest-green" />
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
                      <input type="text" className="w-full rounded-lg border border-sky-field px-3 py-2 text-sm text-slate-ink outline-none focus:border-harvest-green" />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-slate-ink/70">Last Name</label>
                      <input type="text" className="w-full rounded-lg border border-sky-field px-3 py-2 text-sm text-slate-ink outline-none focus:border-harvest-green" />
                    </div>
                  </div>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-xs font-medium text-slate-ink/70">Middle Initial</label>
                      <input type="text" maxLength={1} className="w-full rounded-lg border border-sky-field px-3 py-2 text-sm text-slate-ink outline-none focus:border-harvest-green" />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-slate-ink/70">Suffix</label>
                      <input type="text" className="w-full rounded-lg border border-sky-field px-3 py-2 text-sm text-slate-ink outline-none focus:border-harvest-green" />
                    </div>
                  </div>
                  <div className="mt-3 grid gap-3 sm:grid-cols-3">
                    <div>
                      <label className="mb-1 block text-xs font-medium text-slate-ink/70">Mobile Number</label>
                      <input type="tel" className="w-full rounded-lg border border-sky-field px-3 py-2 text-sm text-slate-ink outline-none focus:border-harvest-green" />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-slate-ink/70">Email</label>
                      <input type="email" className="w-full rounded-lg border border-sky-field px-3 py-2 text-sm text-slate-ink outline-none focus:border-harvest-green" />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-slate-ink/70">Occupation</label>
                      <input type="text" className="w-full rounded-lg border border-sky-field px-3 py-2 text-sm text-slate-ink outline-none focus:border-harvest-green" />
                    </div>
                  </div>
                </div>

                {/* Mother */}
                <div className="rounded-lg border border-sky-field p-4">
                  <h3 className="mb-3 font-semibold text-deep-soil">Mother's Information</h3>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-xs font-medium text-slate-ink/70">First Name</label>
                      <input type="text" className="w-full rounded-lg border border-sky-field px-3 py-2 text-sm text-slate-ink outline-none focus:border-harvest-green" />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-slate-ink/70">Last Name</label>
                      <input type="text" className="w-full rounded-lg border border-sky-field px-3 py-2 text-sm text-slate-ink outline-none focus:border-harvest-green" />
                    </div>
                  </div>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-xs font-medium text-slate-ink/70">Middle Initial</label>
                      <input type="text" maxLength={1} className="w-full rounded-lg border border-sky-field px-3 py-2 text-sm text-slate-ink outline-none focus:border-harvest-green" />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-slate-ink/70">Suffix</label>
                      <input type="text" className="w-full rounded-lg border border-sky-field px-3 py-2 text-sm text-slate-ink outline-none focus:border-harvest-green" />
                    </div>
                  </div>
                  <div className="mt-3 grid gap-3 sm:grid-cols-3">
                    <div>
                      <label className="mb-1 block text-xs font-medium text-slate-ink/70">Mobile Number</label>
                      <input type="tel" className="w-full rounded-lg border border-sky-field px-3 py-2 text-sm text-slate-ink outline-none focus:border-harvest-green" />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-slate-ink/70">Email</label>
                      <input type="email" className="w-full rounded-lg border border-sky-field px-3 py-2 text-sm text-slate-ink outline-none focus:border-harvest-green" />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-slate-ink/70">Occupation</label>
                      <input type="text" className="w-full rounded-lg border border-sky-field px-3 py-2 text-sm text-slate-ink outline-none focus:border-harvest-green" />
                    </div>
                  </div>
                </div>

                {/* Guardian */}
                <div className="rounded-lg border border-sky-field p-4">
                  <h3 className="mb-3 font-semibold text-deep-soil">Guardian's Information</h3>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-xs font-medium text-slate-ink/70">First Name</label>
                      <input type="text" className="w-full rounded-lg border border-sky-field px-3 py-2 text-sm text-slate-ink outline-none focus:border-harvest-green" />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-slate-ink/70">Last Name</label>
                      <input type="text" className="w-full rounded-lg border border-sky-field px-3 py-2 text-sm text-slate-ink outline-none focus:border-harvest-green" />
                    </div>
                  </div>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-xs font-medium text-slate-ink/70">Middle Initial</label>
                      <input type="text" maxLength={1} className="w-full rounded-lg border border-sky-field px-3 py-2 text-sm text-slate-ink outline-none focus:border-harvest-green" />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-slate-ink/70">Suffix</label>
                      <input type="text" className="w-full rounded-lg border border-sky-field px-3 py-2 text-sm text-slate-ink outline-none focus:border-harvest-green" />
                    </div>
                  </div>
                  <div className="mt-3 grid gap-3 sm:grid-cols-3">
                    <div>
                      <label className="mb-1 block text-xs font-medium text-slate-ink/70">Mobile Number</label>
                      <input type="tel" className="w-full rounded-lg border border-sky-field px-3 py-2 text-sm text-slate-ink outline-none focus:border-harvest-green" />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-slate-ink/70">Email</label>
                      <input type="email" className="w-full rounded-lg border border-sky-field px-3 py-2 text-sm text-slate-ink outline-none focus:border-harvest-green" />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-slate-ink/70">Occupation</label>
                      <input type="text" className="w-full rounded-lg border border-sky-field px-3 py-2 text-sm text-slate-ink outline-none focus:border-harvest-green" />
                    </div>
                  </div>
                  <div className="mt-3">
                    <label className="mb-1 block text-xs font-medium text-slate-ink/70">Relationship</label>
                    <input type="text" className="w-full rounded-lg border border-sky-field px-3 py-2 text-sm text-slate-ink outline-none focus:border-harvest-green" />
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
                  className="flex cursor-pointer items-center gap-2 rounded-lg bg-harvest-green px-6 py-2.5 text-sm font-semibold text-cloud-white transition-colors hover:bg-deep-soil"
                >
                  <FileCheck size={16} /> Submit Pre-Enrollment
                </button>
              )}
            </div>
          </form>
        </div>
      </section>
    </>
  )
}
