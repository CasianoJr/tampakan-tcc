import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FileText, ClipboardList, GraduationCap } from 'lucide-react'

const links = [
  {
    icon: FileText,
    title: 'Requirements',
    desc: 'Documents and qualifications needed to apply for admission.',
    to: '/admissions/requirements',
  },
  {
    icon: ClipboardList,
    title: 'Enrollment Process',
    desc: 'Step-by-step guide through the application and enrollment procedure.',
    to: '/admissions/enrollment',
  },
  {
    icon: GraduationCap,
    title: 'Scholarships',
    desc: 'Financial assistance programs and tuition-free opportunities.',
    to: '/admissions/scholarships',
  },
]

export default function AdmissionsPage() {
  return (
    <>
      <section className="relative flex min-h-[30svh] items-center justify-center overflow-hidden px-4 text-center text-cloud-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/TCC_LOGO_512x512.png')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-harvest-green/85 to-deep-soil/90" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <h1 className="text-3xl font-bold md:text-4xl">Admissions</h1>
          <p className="mx-auto mt-2 max-w-2xl text-sky-field/80">
            Your pathway to free, quality tertiary education at Tampakan Community College
          </p>
        </motion.div>
      </section>

      <section className="bg-cloud-white px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 text-center text-slate-ink/70 leading-relaxed"
          >
            Tampakan Community College is committed to providing accessible,
            tuition-free education. Our admissions process is designed to be
            straightforward and inclusive, ensuring every qualified Tampakeño
            can pursue higher education.
          </motion.p>

          <div className="grid gap-6 md:grid-cols-3">
            {links.map((l, i) => (
              <motion.div
                key={l.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link
                  to={l.to}
                  className="flex h-full flex-col items-center rounded-xl border border-sky-field p-8 text-center transition-shadow hover:shadow-lg"
                >
                  <l.icon size={40} className="mb-4 text-harvest-green" />
                  <h3 className="mb-2 text-lg font-bold text-deep-soil">
                    {l.title}
                  </h3>
                  <p className="text-sm text-slate-ink/70">{l.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
