import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Users, Stethoscope, Heart } from 'lucide-react'

const subpages = [
  {
    icon: Users,
    title: 'Organizations',
    desc: 'Student government, academic clubs, cultural groups, and sports organizations.',
    to: '/student-life/organizations',
  },
  {
    icon: Stethoscope,
    title: 'Student Services',
    desc: 'Guidance, health, library, registrar, and other support services.',
    to: '/student-life/services',
  },
]

export default function StudentLifePage() {
  return (
    <>
      <section className="relative flex min-h-[30svh] items-center justify-center overflow-hidden px-4 text-center text-cloud-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/TCC_LOGO_512x512.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-harvest-green/85 to-deep-soil/90" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <h1 className="text-3xl font-bold md:text-4xl">Student Life</h1>
          <p className="mx-auto mt-2 max-w-2xl text-sky-field/80">
            Beyond the classroom — discover organizations, services, and a vibrant campus community at TCC
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
            Tampakan Community College is committed to developing well-rounded
            students through a rich campus life experience. From student
            organizations to support services, TCC provides an environment where
            every student can thrive academically, socially, and personally.
          </motion.p>

          <div className="grid gap-6 md:grid-cols-2">
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
                  className="flex h-full flex-col items-center rounded-xl border border-sky-field p-8 text-center transition-shadow hover:shadow-lg"
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
            <Heart size={48} className="shrink-0 text-harvest-green/40" />
            <div>
              <h2 className="mb-3 text-2xl font-bold text-deep-soil">
                A Home for Every Tampakeño
              </h2>
              <p className="text-lg leading-relaxed text-slate-ink/80">
                At TCC, we believe that education extends far beyond the
                classroom. Whether you're leading a student organization,
                playing for a varsity team, or seeking guidance and support,
                you'll find a community that welcomes you and helps you grow.
              </p>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  )
}
