import { motion } from 'framer-motion'
import { events } from '../../data/events'
import EventCard from '../../components/events/EventCard'
import { CalendarX } from 'lucide-react'

export default function EventsListPage() {
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
          <h1 className="text-3xl font-bold md:text-4xl">Events</h1>
          <p className="mx-auto mt-2 max-w-2xl text-sky-field/80">
            Upcoming activities, forums, and important dates at Tampakan Community College
          </p>
        </motion.div>
      </section>

      <section className="bg-cloud-white px-4 py-16">
        <div className="mx-auto max-w-5xl">
          {events.length === 0 ? (
            <div className="flex flex-col items-center gap-4 py-20 text-center text-slate-ink/50">
              <CalendarX size={48} />
              <p className="text-lg">No upcoming events. Check back soon!</p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {events.map((e, i) => (
                <EventCard key={e.slug} event={e} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
