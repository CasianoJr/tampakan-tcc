import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react'
import type { EventItem } from '../../data/events'

interface Props {
  event: EventItem
  index: number
}

export default function EventCard({ event, index }: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <Link
        to={`/events/${event.slug}`}
        className="flex h-full flex-col overflow-hidden rounded-xl border border-sky-field transition-shadow hover:shadow-lg"
      >
        <div className="aspect-[16/9] overflow-hidden bg-sky-field">
          <div
            className="h-full w-full bg-cover bg-center transition-transform duration-500 hover:scale-105"
            style={{ backgroundImage: `url('${event.image}')` }}
          />
        </div>
        <div className="flex flex-1 flex-col p-5">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-ink/60">
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              {event.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {event.time}
            </span>
            <span className="flex items-center gap-1">
              <MapPin size={14} />
              {event.location}
            </span>
          </div>
          <h3 className="mt-2 text-lg font-bold text-deep-soil">
            {event.title}
          </h3>
          <p className="mt-1 flex-1 text-sm text-slate-ink/70 leading-relaxed">
            {event.description}
          </p>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-harvest-green">
            View Event <ArrowRight size={14} />
          </span>
        </div>
      </Link>
    </motion.article>
  )
}
