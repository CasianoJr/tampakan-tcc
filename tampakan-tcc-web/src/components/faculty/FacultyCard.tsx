import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import type { FacultyMember } from '../../data/faculty'

interface Props {
  member: FacultyMember
  index: number
}

export default function FacultyCard({ member, index }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link
        to={`/faculty/${member.slug}`}
        className="flex h-full flex-col items-center rounded-xl border border-sky-field p-6 text-center transition-shadow hover:shadow-lg"
      >
        <div className="mb-4 h-24 w-24 overflow-hidden rounded-full bg-sky-field">
          <div
            className="h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url('${member.image}')` }}
          />
        </div>
        <h3 className="text-lg font-bold text-deep-soil">{member.name}</h3>
        <p className="mt-1 text-sm font-medium text-harvest-green">
          {member.title}
        </p>
        <p className="mt-1 text-xs text-slate-ink/50">{member.department}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-harvest-green">
          View Profile <ArrowRight size={14} />
        </span>
      </Link>
    </motion.div>
  )
}
