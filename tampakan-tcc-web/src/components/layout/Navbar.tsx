import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/academics', label: 'Academics' },
  { to: '/admissions', label: 'Admissions' },
  { to: '/news', label: 'News' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="bg-harvest-green text-cloud-white sticky top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link to="/" className="text-lg font-bold tracking-tight">
          TCC
        </Link>

        <button
          className="cursor-pointer md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>

        <ul className="hidden gap-6 md:flex">
          {links.map((l) => (
            <li key={l.to}>
              <Link to={l.to} className="text-sm hover:text-golden-grain transition-colors">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {open && (
        <ul className="flex flex-col gap-2 px-4 pb-4 md:hidden">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className="block text-sm hover:text-golden-grain transition-colors"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  )
}
