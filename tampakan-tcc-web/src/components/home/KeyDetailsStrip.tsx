import { MapPin, Clock, BadgePercent, BookOpen } from 'lucide-react'

const details = [
  { icon: MapPin, label: 'Location', value: 'Former Koronadal Academy, Tampakan' },
  { icon: Clock, label: 'Target Opening', value: '~2027–2028' },
  { icon: BadgePercent, label: 'Tuition', value: 'Free' },
  { icon: BookOpen, label: 'Flagship Program', value: 'Agri-Business' },
]

export default function KeyDetailsStrip() {
  return (
    <section className="relative overflow-hidden py-8">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=1600&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-sky-field/95" />
      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 md:grid-cols-4">
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
