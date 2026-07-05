import { motion } from 'framer-motion'
import { FileText, Users, HardHat, Construction, Flag } from 'lucide-react'

const steps = [
  { icon: FileText, label: 'Proposal', year: '2024' },
  { icon: Users, label: 'Consultative Meetings', year: '2025' },
  { icon: HardHat, label: 'Site Preparation', year: '2026' },
  { icon: Construction, label: 'Construction', year: '2026–2028' },
  { icon: Flag, label: 'Anticipated Opening', year: '~2027–2028' },
]

export default function TimelineSection() {
  return (
    <section className="bg-sky-field py-16 px-4">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-12 text-center text-2xl font-bold text-deep-soil md:text-3xl">
          Our Journey
        </h2>
        <div className="relative flex items-start justify-between gap-2">
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-harvest-green/30 hidden md:block" />
          {steps.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative flex flex-col items-center text-center z-10"
            >
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-harvest-green text-cloud-white">
                <s.icon size={20} />
              </div>
              <p className="text-xs text-slate-ink/60">{s.year}</p>
              <p className="text-sm font-semibold text-deep-soil max-w-24">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
