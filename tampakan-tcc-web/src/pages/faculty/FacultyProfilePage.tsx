import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, BookOpen, GraduationCap, Mail } from 'lucide-react'
import { faculty } from '../../data/faculty'

export default function FacultyProfilePage() {
  const { slug } = useParams<{ slug: string }>()
  const member = faculty.find((m) => m.slug === slug)

  if (!member) {
    return (
      <section className="flex min-h-[50svh] flex-col items-center justify-center gap-4 px-4 text-center">
        <h1 className="text-2xl font-bold text-deep-soil">Faculty Not Found</h1>
        <p className="text-slate-ink/60">The faculty member you're looking for doesn't exist.</p>
        <Link
          to="/faculty"
          className="inline-flex items-center gap-2 text-harvest-green hover:underline"
        >
          <ArrowLeft size={16} /> Back to Faculty
        </Link>
      </section>
    )
  }

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
          <h1 className="text-2xl font-bold md:text-3xl">{member.name}</h1>
          <p className="mt-2 text-sky-field/80">{member.title}</p>
        </motion.div>
      </section>

      <section className="bg-cloud-white px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <Link
            to="/faculty"
            className="mb-8 inline-flex items-center gap-2 text-sm text-harvest-green hover:underline"
          >
            <ArrowLeft size={16} /> Back to Faculty
          </Link>

          <div className="mb-10 flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            <div className="h-32 w-32 shrink-0 overflow-hidden rounded-full bg-sky-field">
              <div
                className="h-full w-full bg-cover bg-center"
                style={{ backgroundImage: `url('${member.image}')` }}
              />
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-bold text-deep-soil">
                {member.name}
              </h2>
              <p className="text-sm font-medium text-harvest-green">
                {member.title}
              </p>
              <span className="inline-block mt-1 rounded-full bg-sky-field px-3 py-1 text-xs text-slate-ink/70">
                {member.department}
              </span>
              {member.email && (
                <p className="mt-3 flex items-center justify-center gap-1.5 text-sm text-slate-ink/60 sm:justify-start">
                  <Mail size={14} />
                  {member.email}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-5 text-slate-ink/80 leading-relaxed">
            {member.bio.map((paragraph, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          <div className="mt-10">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-deep-soil">
              <GraduationCap size={20} className="text-harvest-green" />
              Education
            </h3>
            <ul className="space-y-3">
              {member.education.map((deg, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="flex items-start gap-3 rounded-lg border border-sky-field p-3"
                >
                  <BookOpen size={16} className="mt-0.5 shrink-0 text-harvest-green" />
                  <span className="text-sm text-slate-ink/80">{deg}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}
