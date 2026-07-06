import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  Heart,
  BookOpen,
  Stethoscope,
  GraduationCap,
  FileText,
  Users,
  ClipboardList,
  type LucideIcon,
} from 'lucide-react'
import { services } from '../../data/studentLife'

const iconMap: Record<string, LucideIcon> = {
  Heart,
  BookOpen,
  Stethoscope,
  GraduationCap,
  FileText,
  Users,
  ClipboardList,
}

export default function StudentServicesPage() {
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
            Student Services
          </h1>
          <p className="mx-auto mt-2 max-w-2xl text-sky-field/80">
            Support services designed to help you succeed at TCC
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

          <div className="grid gap-6 md:grid-cols-2">
            {services.map((service, i) => {
              const Icon = iconMap[service.icon] || Heart
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="rounded-xl border border-sky-field p-6"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <Icon size={24} className="text-harvest-green" />
                    <h3 className="text-lg font-bold text-deep-soil">
                      {service.title}
                    </h3>
                  </div>
                  <p className="mb-3 text-sm text-slate-ink/70 leading-relaxed">
                    {service.description}
                  </p>
                  <span className="text-xs text-slate-ink/50">
                    {service.availability}
                  </span>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
