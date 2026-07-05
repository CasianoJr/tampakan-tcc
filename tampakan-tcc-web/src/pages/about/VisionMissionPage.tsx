import { motion } from 'framer-motion'
import { Eye, Target, Heart } from 'lucide-react'

const values = [
  { icon: Heart, title: 'Compassion', desc: 'Fostering a caring and inclusive learning environment.' },
  { icon: Target, title: 'Excellence', desc: 'Striving for the highest standards in education and service.' },
  { icon: Eye, title: 'Integrity', desc: 'Upholding transparency, honesty, and accountability.' },
]

export default function VisionMissionPage() {
  return (
    <>
      <section className="relative flex min-h-[30svh] items-center justify-center overflow-hidden px-4 text-center text-cloud-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1455846978749-8f1f6113e0f1?w=1600&q=80')",
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
            Vision, Mission & Values
          </h1>
          <p className="mx-auto mt-2 max-w-2xl text-sky-field/80">
            Our guiding principles
          </p>
        </motion.div>
      </section>

      <section className="relative overflow-hidden px-4 py-16">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1529390079861-591de354faf5?w=1600&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-cloud-white/92" />
        <div className="relative z-10 mx-auto max-w-4xl space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-xl border border-sky-field p-8 text-center"
          >
            <h2 className="mb-4 text-xl font-bold text-deep-soil">Our Vision</h2>
            <p className="text-lg leading-relaxed text-slate-ink italic">
              "A premier community college that empowers every Tampakeño through
              accessible, quality, and relevant tertiary education — producing
              skilled, values-driven graduates who contribute to local and
              national progress."
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-xl border border-sky-field p-8"
          >
            <h2 className="mb-4 text-center text-xl font-bold text-deep-soil">
              Our Mission
            </h2>
            <ul className="space-y-3">
              {[
                'Provide free, quality tertiary education to residents of Tampakan and neighboring municipalities.',
                'Develop academic programs aligned with local industry needs and agricultural economy.',
                'Foster holistic student development through academic excellence, skills training, and values formation.',
                'Promote community engagement and research that addresses local challenges.',
                'Ensure efficient and transparent governance of institutional resources.',
              ].map((m, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-ink/80">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-harvest-green" />
                  {m}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="mb-6 text-center text-xl font-bold text-deep-soil">
              Core Values
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {values.map((v) => (
                <div
                  key={v.title}
                  className="rounded-xl border border-sky-field p-6 text-center"
                >
                  <v.icon size={32} className="mx-auto mb-3 text-harvest-green" />
                  <h3 className="mb-2 font-bold text-deep-soil">{v.title}</h3>
                  <p className="text-sm text-slate-ink/70">{v.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
