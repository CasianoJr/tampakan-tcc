import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ScrollText, Eye, Users, Quote } from 'lucide-react'

const subpages = [
  {
    icon: ScrollText,
    title: 'History',
    desc: 'From proposal to construction — the journey of Tampakan Community College.',
    to: '/about/history',
  },
  {
    icon: Eye,
    title: 'Vision & Mission',
    desc: 'Our guiding principles and goals for accessible higher education.',
    to: '/about/vision-mission',
  },
  {
    icon: Users,
    title: 'Leadership',
    desc: 'Meet Mayor Leonard T. Escobillo and the team behind the college.',
    to: '/about/leadership',
  },
]

export default function AboutPage() {
  return (
    <>
      <section className="relative flex min-h-[40svh] items-center justify-center overflow-hidden px-4 text-center text-cloud-white">
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
          <h1 className="mb-3 text-3xl font-bold md:text-4xl">
            About Tampakan Community College
          </h1>
          <p className="mx-auto max-w-2xl text-sky-field/80">
            A municipally owned institution committed to providing free,
            accessible, and quality higher education to the people of Tampakan
            and surrounding communities.
          </p>
        </motion.div>
      </section>

      <section className="bg-cloud-white px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-center text-2xl font-bold text-deep-soil md:text-3xl">
            Quick Overview
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {subpages.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link
                  to={s.to}
                  className="flex h-full flex-col items-center rounded-xl border border-sky-field p-6 text-center transition-shadow hover:shadow-lg"
                >
                  <s.icon size={40} className="mb-4 text-harvest-green" />
                  <h3 className="mb-2 text-lg font-bold text-deep-soil">
                    {s.title}
                  </h3>
                  <p className="text-sm text-slate-ink/70">{s.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sky-field px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl"
        >
          <div className="flex items-start gap-4">
            <Quote size={48} className="shrink-0 text-harvest-green/40" />
            <div>
              <p className="mb-4 text-lg leading-relaxed text-slate-ink md:text-xl">
                This college is not just a building — it is a promise to every
                young Tampakeño that their dreams matter, and that the LGU will
                be there to support them every step of the way.
              </p>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-harvest-green flex items-center justify-center text-cloud-white font-bold text-sm">
                  LE
                </div>
                <div>
                  <p className="font-semibold text-deep-soil">
                    Mayor Leonard T. Escobillo, RN
                  </p>
                  <p className="text-sm text-slate-ink/60">
                    Municipal Mayor, Tampakan
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  )
}
