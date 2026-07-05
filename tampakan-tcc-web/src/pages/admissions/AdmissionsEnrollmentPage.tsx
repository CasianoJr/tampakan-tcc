import { motion } from 'framer-motion'

const steps = [
  { title: 'Pre-Enrollment', desc: 'Fill out the online pre-enrollment form or visit the TCC Admissions Office to register your interest.' },
  { title: 'Submit Requirements', desc: 'Submit all required documents for verification. Make sure to bring original copies for validation.' },
  { title: 'Entrance Assessment', desc: 'Take the entrance examination and assessment to determine program eligibility.' },
  { title: 'Interview', desc: 'Attend a brief interview with the admissions committee to discuss your academic goals.' },
  { title: 'Enrollment Confirmation', desc: 'Receive your enrollment confirmation and official student ID number.' },
  { title: 'Orientation', desc: 'Attend the mandatory student orientation before the start of classes.' },
]

export default function AdmissionsEnrollmentPage() {
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
            Enrollment Process
          </h1>
        </motion.div>
      </section>

      <section className="bg-cloud-white px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 text-center text-slate-ink/70 leading-relaxed"
          >
            Follow these steps to complete your enrollment at Tampakan
            Community College. The process is designed to be simple and
            accessible for all applicants.
          </motion.p>

          <div className="space-y-6">
            {steps.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative flex items-start gap-4 pl-8"
              >
                <span className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-harvest-green text-sm font-bold text-cloud-white">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-lg font-bold text-deep-soil">
                    {s.title}
                  </h3>
                  <p className="text-sm text-slate-ink/70">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
