import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { BookOpen, Calendar, Sprout } from 'lucide-react'

const links = [
  {
    icon: BookOpen,
    title: 'Programs',
    desc: 'Explore our planned academic programs designed for local and regional needs.',
    to: '/academics/programs',
  },
  {
    icon: Calendar,
    title: 'Academic Calendar',
    desc: 'Key dates, enrollment periods, and the school year schedule.',
    to: '/academics/calendar',
  },
]

export default function AcademicsPage() {
  return (
    <>
      <section className="relative flex min-h-[30svh] items-center justify-center overflow-hidden px-4 text-center text-cloud-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1600&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-harvest-green/85 to-deep-soil/90" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <h1 className="text-3xl font-bold md:text-4xl">Academics</h1>
          <p className="mx-auto mt-2 max-w-2xl text-sky-field/80">
            Quality, relevant, and accessible tertiary education for every Tampakeño
          </p>
        </motion.div>
      </section>

      <section className="relative overflow-hidden px-4 py-16">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1523050854058-8df90110c7f1?w=1600&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-cloud-white/92" />
        <div className="relative z-10 mx-auto max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 text-center text-slate-ink/70 leading-relaxed"
          >
            Tampakan Community College offers programs designed to meet the
            demands of the local economy — with an initial focus on Agri-Business
            and plans to expand into Education and Information Technology. Our
            curriculum combines theoretical foundations with hands-on training
            to produce job-ready graduates.
          </motion.p>

          <div className="grid gap-6 md:grid-cols-2">
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
                  className="flex flex-col items-center rounded-xl border border-sky-field p-8 text-center transition-shadow hover:shadow-lg"
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

      <section className="relative overflow-hidden px-4 py-16">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1600&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-sky-field/90" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative z-10 mx-auto max-w-3xl text-center"
        >
          <Sprout size={48} className="mx-auto mb-4 text-harvest-green" />
          <h2 className="mb-3 text-2xl font-bold text-deep-soil">
            Flagship Program: Agri-Business
          </h2>
          <p className="text-slate-ink/70 leading-relaxed">
            Our flagship program focuses on agricultural economics, farm
            management, and sustainable farming practices — directly aligned
            with Tampakan's agricultural economy. Students gain practical skills
            in agri-entrepreneurship, supply chain management, and rural
            development.
          </p>
        </motion.div>
      </section>
    </>
  )
}
