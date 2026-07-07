import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sprout, GraduationCap, Monitor } from 'lucide-react'

const programs = [
  {
    icon: Sprout,
    title: 'Agri-Business',
    description:
      'Focus on agricultural economics, farm management, and sustainable farming practices tailored to the region.',
  },
  {
    icon: GraduationCap,
    title: 'Education',
    description:
      'Prepare future educators with foundational teaching methods and community-based learning approaches.',
  },
  {
    icon: Monitor,
    title: 'Information Technology',
    description:
      'Build digital skills in programming, networking, and systems development for the modern workforce.',
  },
]

export default function ProgramsPreview() {
  return (
    <section className="bg-cloud-white px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-3 text-center text-2xl font-bold text-deep-soil md:text-3xl">
          Planned Programs
        </h2>
        <p className="mb-10 text-center text-slate-ink/60">
          Designed to meet the needs of Tampakan and the SOCCSKSARGEN region
        </p>
        <div className="grid gap-8 md:grid-cols-3">
          {programs.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-xl border border-sky-field p-6 text-center transition-shadow hover:shadow-lg"
            >
              <p.icon size={40} className="mx-auto mb-4 text-harvest-green" />
              <h3 className="mb-2 text-lg font-bold text-deep-soil">
                {p.title}
              </h3>
              <p className="mb-4 text-sm text-slate-ink/70">{p.description}</p>
              <Link
                to="/academics"
                className="text-sm font-semibold text-harvest-green hover:text-golden-grain transition-colors"
              >
                Learn More &rarr;
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
