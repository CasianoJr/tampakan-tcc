import { motion } from 'framer-motion'

const requirements = [
  'Certified True Copy of Birth Certificate (PSA)',
  'Form 138 / Report Card (Grade 12)',
  'Certificate of Good Moral Character',
  '2×2 ID pictures (2 pieces)',
  '1×1 ID pictures (2 pieces)',
  'Medical Clearance Certificate',
  'Barangay Clearance',
  'Parent / Guardian Consent Form',
]

export default function AdmissionsRequirementsPage() {
  return (
    <>
      <section className="relative flex min-h-[30svh] items-center justify-center overflow-hidden px-4 text-center text-cloud-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/assets/TCC_building.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-harvest-green/85 to-deep-soil/90" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <h1 className="text-3xl font-bold md:text-4xl">
            Admission Requirements
          </h1>
        </motion.div>
      </section>

      <section className="bg-cloud-white px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 text-center text-slate-ink/70 leading-relaxed"
          >
            To qualify for admission, applicants must submit the following
            requirements either in person at the TCC Admissions Office or
            through the online pre-enrollment portal.
          </motion.p>

          <ul className="space-y-4">
            {requirements.map((req, i) => (
              <motion.li
                key={req}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="flex items-start gap-3 rounded-lg border border-sky-field p-4"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-harvest-green text-xs font-bold text-cloud-white">
                  {i + 1}
                </span>
                <span className="text-sm text-slate-ink/80">{req}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
