import { motion } from 'framer-motion'
import { Quote, Users } from 'lucide-react'
import mayorImg from '../../assets/mayors-image.jpg'

const team = [
  { name: 'Dr. Maria Giovanna Abecia', role: 'Education Consultant', initials: 'MA' },
  { name: 'Hon. Leonard T. Escobillo, RN', role: 'Municipal Mayor', initials: 'LE' },
]

export default function LeadershipPage() {
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
          <h1 className="text-3xl font-bold md:text-4xl">Leadership</h1>
          <p className="mx-auto mt-2 max-w-2xl text-sky-field/80">
            The people behind Tampakan Community College
          </p>
        </motion.div>
      </section>

      <section className="bg-cloud-white py-16 px-4">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 rounded-xl border border-sky-field p-8"
          >
            <div className="flex flex-col items-center gap-6 md:flex-row">
              <img
                src={mayorImg}
                alt="Mayor Leonard T. Escobillo portrait"
                loading="lazy"
                className="h-28 w-28 shrink-0 rounded-full object-cover"
              />
              <div>
                <div className="flex items-start gap-2">
                  <Quote size={24} className="shrink-0 text-harvest-green/40" />
                  <p className="text-base leading-relaxed text-slate-ink italic">
                    Education is the most powerful tool we can give our youth.
                    Tampakan Community College is our commitment to a future
                    where no Tampakeño is left behind.
                  </p>
                </div>
                <p className="mt-3 font-bold text-deep-soil">
                  Mayor Leonard T. Escobillo, RN
                </p>
                <p className="text-sm text-slate-ink/60">
                  Municipal Mayor, Tampakan
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-deep-soil">
              <Users size={24} /> Administration & Board
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {team.map((m) => (
                <div
                  key={m.name}
                  className="flex items-center gap-4 rounded-xl border border-sky-field p-6"
                >
                  <img
                    src={
                      'https://images.unsplash.com/photo-' +
                      (m.initials === 'MA'
                        ? '1573496359142-b8d87734a5a2?w=160&q=80'
                        : '1507003211169-0a1dd7228f2d?w=160&q=80')
                    }
                    alt={`${m.name} portrait`}
                    loading="lazy"
                    className="h-14 w-14 shrink-0 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-deep-soil">{m.name}</p>
                    <p className="text-sm text-slate-ink/60">{m.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
