import { motion } from 'framer-motion'

const milestones = [
  {
    year: '2024',
    title: 'Proposal',
    description:
      'Mayor Leonard T. Escobillo proposed the establishment of Tampakan Community College as a flagship education initiative under his administration.',
  },
  {
    year: '2025',
    title: 'Consultative Meetings',
    description:
      'Engaged education experts, LGU officials, and community stakeholders to shape the college\'s vision, programs, and implementation roadmap.',
  },
  {
    year: '2026',
    title: 'Site Preparation',
    description:
      'The former Koronadal Academy site was identified and prepared for construction. Documentation and permits progressed.',
  },
  {
    year: '2026–2028',
    title: 'Construction',
    description:
      'Active construction of campus facilities, including classrooms, admin offices, and student services areas.',
  },
  {
    year: '~2027–2028',
    title: 'Anticipated Opening',
    description:
      'Target opening to welcome the first batch of students and begin delivering free, quality tertiary education.',
  },
]

export default function HistoryPage() {
  return (
    <>
      <section className="relative flex min-h-[30svh] items-center justify-center overflow-hidden px-4 text-center text-cloud-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1461360228754-6e81c478b882?w=1600&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-harvest-green/85 to-deep-soil/90" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <h1 className="text-3xl font-bold md:text-4xl">Our History</h1>
          <p className="mx-auto mt-2 max-w-2xl text-sky-field/80">
            The journey toward accessible higher education in Tampakan
          </p>
        </motion.div>
      </section>

      <section className="relative overflow-hidden px-4 py-16">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1444858291040-58f756a3bdd6?w=1600&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-cloud-white/90" />
        <div className="relative z-10 mx-auto max-w-3xl">
          {milestones.map((m, i) => (
            <motion.div
              key={m.year}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative mb-8 pl-8 border-l-4 border-harvest-green"
            >
              <span className="absolute -left-3 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-harvest-green text-xs font-bold text-cloud-white">
                {i + 1}
              </span>
              <span className="text-sm font-bold text-harvest-green">
                {m.year}
              </span>
              <h3 className="mt-1 text-lg font-bold text-deep-soil">
                {m.title}
              </h3>
              <p className="mt-1 text-sm text-slate-ink/70">{m.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  )
}
