import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-deep-soil text-cloud-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <h3 className="mb-3 text-lg font-bold">Tampakan Community College</h3>
          <p className="text-sm text-sky-field/80">
            Free, accessible higher education for every Tampakeño.
          </p>
        </div>

        <div>
          <h4 className="mb-3 font-semibold">Quick Links</h4>
          <ul className="space-y-1 text-sm">
            {[
              { to: '/about', label: 'About Us' },
              { to: '/academics/programs', label: 'Programs' },
              { to: '/admissions', label: 'Admissions' },
              { to: '/contact', label: 'Contact' },
              { to: '/faq', label: 'FAQ' },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-sky-field/70 hover:text-golden-grain transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-3 font-semibold">Contact</h4>
          <ul className="space-y-2 text-sm text-sky-field/70">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0" />
              <span>Former Koronadal Academy, Tampakan, South Cotabato</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="shrink-0" />
              <span>(083) 123-4567</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="shrink-0" />
              <span>info@tampakancollege.edu.ph</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cloud-white/10 px-4 py-4 text-center text-xs text-sky-field/60">
        &copy; {new Date().getFullYear()} Tampakan Community College. All rights reserved.
      </div>
    </footer>
  )
}
