import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft, Users, Target } from 'lucide-react'
import { organizations } from '../../data/studentLife'

export default function OrganizationsPage() {
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
          <h1 className="text-3xl font-bold md:text-4xl">
            Student Organizations
          </h1>
          <p className="mx-auto mt-2 max-w-2xl text-sky-field/80">
            Find your community and make a difference beyond the classroom
          </p>
        </motion.div>
      </section>

      <section className="bg-cloud-white px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <Link
            to="/student-life"
            className="mb-8 inline-flex items-center gap-2 text-sm text-harvest-green hover:underline"
          >
            <ArrowLeft size={16} /> Back to Student Life
          </Link>

          <div className="space-y-6">
            {organizations.map((org, i) => (
              <motion.div
                key={org.acronym}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="rounded-xl border border-sky-field p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-bold text-deep-soil">
                      {org.name}
                    </h3>
                    <span className="text-xs font-semibold text-harvest-green">
                      {org.acronym}
                    </span>
                  </div>
                  <span className="flex items-center gap-1 rounded-full bg-sky-field px-3 py-1 text-xs text-slate-ink/70">
                    <Target size={12} />
                    {org.focus}
                  </span>
                </div>
                <p className="mt-3 text-sm text-slate-ink/70 leading-relaxed">
                  {org.description}
                </p>
              </motion.div>
            ))}
          </div>

          {organizations.length === 0 && (
            <div className="flex flex-col items-center gap-4 py-20 text-center text-slate-ink/50">
              <Users size={48} />
              <p className="text-lg">No organizations listed yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
