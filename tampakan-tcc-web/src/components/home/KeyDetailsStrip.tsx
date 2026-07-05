import { MapPin, Clock, BadgePercent, BookOpen } from 'lucide-react'

const details = [
  { icon: MapPin, label: 'Location', value: 'Former Koronadal Academy, Tampakan' },
  { icon: Clock, label: 'Target Opening', value: '~2027–2028' },
  { icon: BadgePercent, label: 'Tuition', value: 'Free' },
  { icon: BookOpen, label: 'Flagship Program', value: 'Agri-Business' },
]

export default function KeyDetailsStrip() {
  return (
    <section className="bg-sky-field py-8">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 md:grid-cols-4">
        {details.map((d) => (
          <div key={d.label} className="flex items-center gap-3">
            <d.icon size={28} className="shrink-0 text-harvest-green" />
            <div>
              <p className="text-xs text-slate-ink/60">{d.label}</p>
              <p className="text-sm font-semibold text-deep-soil">{d.value}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
