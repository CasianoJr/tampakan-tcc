import { motion } from 'framer-motion'
import { BadgePercent, Landmark, Star } from 'lucide-react'

const programs = [
  {
    icon: BadgePercent,
    title: 'Free Tuition (R.A. 10931)',
    desc: 'Under the Universal Access to Quality Tertiary Education Act, all qualified students enjoy free tuition and miscellaneous fees.',
  },
  {
    icon: Landmark,
    title: 'LGU Scholarship',
    desc: 'The Municipal Government of Tampakan offers financial assistance to deserving students from low-income households.',
  },
  {
    icon: Star,
    title: 'Academic Excellence Grant',
    desc: 'A merit-based grant for students who demonstrate outstanding academic performance during their stay at TCC.',
  },
]

export default function AdmissionsScholarshipsPage() {
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
            Scholarships & Financial Aid
          </h1>
          <p className="mx-auto mt-2 max-w-2xl text-sky-field/80">
            Making higher education attainable for every Tampakeño
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
            Tampakan Community College is committed to ensuring that no
            qualified student is denied access to education due to financial
            constraints. The following financial assistance programs are
            available.
          </motion.p>

          <div className="grid gap-6 md:grid-cols-3">
            {programs.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-xl border border-sky-field p-6 text-center"
              >
                <p.icon size={40} className="mx-auto mb-4 text-harvest-green" />
                <h3 className="mb-2 text-lg font-bold text-deep-soil">
                  {p.title}
                </h3>
                <p className="text-sm text-slate-ink/70">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
