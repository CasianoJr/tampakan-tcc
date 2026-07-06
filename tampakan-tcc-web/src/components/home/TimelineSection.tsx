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
    <section className="bg-sky-field px-4 py-16">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-12 text-center text-2xl font-bold text-deep-soil md:text-3xl">
          Our Journey
        </h2>

        {/* Mobile: vertical timeline */}
        <div className="relative md:hidden">
          <div className="absolute top-0 bottom-0 left-5 w-0.5 bg-harvest-green/30" />
          <div className="flex flex-col gap-8">
            {steps.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="relative flex items-center gap-4 pl-14"
              >
                <div className="absolute left-2.5 flex h-6 w-6 items-center justify-center rounded-full bg-harvest-green text-cloud-white z-10">
                  <s.icon size={14} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-deep-soil">{s.label}</p>
                  <p className="text-xs text-slate-ink/60">{s.year}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Desktop: horizontal timeline */}
        <div className="relative hidden items-start justify-between gap-2 md:flex">
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-harvest-green/30" />
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
