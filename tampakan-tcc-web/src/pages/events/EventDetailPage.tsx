import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Clock, MapPin } from 'lucide-react'
import { events } from '../../data/events'

export default function EventDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const event = events.find((e) => e.slug === slug)

  if (!event) {
    return (
      <section className="flex min-h-[50svh] flex-col items-center justify-center gap-4 px-4 text-center">
        <h1 className="text-2xl font-bold text-deep-soil">Event Not Found</h1>
        <p className="text-slate-ink/60">The event you're looking for doesn't exist or may have been removed.</p>
        <Link
          to="/events"
          className="inline-flex items-center gap-2 text-harvest-green hover:underline"
        >
          <ArrowLeft size={16} /> Back to Events
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
          className="relative z-10 max-w-3xl"
        >
          <h1 className="text-2xl font-bold md:text-3xl">{event.title}</h1>
        </motion.div>
      </section>

      <section className="bg-cloud-white px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <Link
            to="/events"
            className="mb-8 inline-flex items-center gap-2 text-sm text-harvest-green hover:underline"
          >
            <ArrowLeft size={16} /> Back to Events
          </Link>

          <div className="mb-8 flex flex-wrap gap-6 text-sm text-slate-ink/70">
            <span className="flex items-center gap-2">
              <Calendar size={18} className="text-harvest-green" />
              {event.date}
            </span>
            <span className="flex items-center gap-2">
              <Clock size={18} className="text-harvest-green" />
              {event.time}
            </span>
            <span className="flex items-center gap-2">
              <MapPin size={18} className="text-harvest-green" />
              {event.location}
            </span>
          </div>

          <div className="space-y-5 text-slate-ink/80 leading-relaxed">
            {event.content.map((paragraph, i) => (
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
        </div>
      </section>
    </>
  )
}
