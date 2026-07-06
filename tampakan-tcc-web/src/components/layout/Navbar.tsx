import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, LogIn, Shield, ChevronDown } from 'lucide-react'

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
  const [signInOpen, setSignInOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setSignInOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <nav className="bg-harvest-green text-cloud-white sticky top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-3">
          <img src="/TCC_LOGO_300x300.png" alt="TCC Logo" className="h-12 w-auto" />
          <div className="italic leading-tight text-cloud-white" style={{ fontFamily: "'Playfair Display', serif" }}>
            <div style={{ fontSize: "1.25rem" }}>Tampakan</div>
            <div style={{ fontSize: "0.9rem" }}>Community College</div>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <ul className="hidden gap-6 md:flex">
            {links.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-sm hover:text-golden-grain transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="relative hidden md:block" ref={dropdownRef}>
            <button
              onClick={() => setSignInOpen(!signInOpen)}
              className="flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-cloud-white hover:bg-cloud-white/10 transition-colors"
            >
              <LogIn size={13} /> Sign In <ChevronDown size={12} className={`transition-transform ${signInOpen ? 'rotate-180' : ''}`} />
            </button>
            {signInOpen && (
              <div className="absolute right-0 top-full mt-1 w-44 rounded-lg bg-cloud-white py-1 shadow-lg">
                <Link
                  to="/student/login"
                  onClick={() => setSignInOpen(false)}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-ink hover:bg-sky-field transition-colors"
                >
                  <LogIn size={14} className="text-harvest-green" /> Student Login
                </Link>
                <Link
                  to="/admin/login"
                  onClick={() => setSignInOpen(false)}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-ink hover:bg-sky-field transition-colors"
                >
                  <Shield size={14} className="text-deep-soil" /> Admin Login
                </Link>
              </div>
            )}
          </div>

          <button
            className="cursor-pointer md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
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
          <li className="border-t border-cloud-white/20 pt-2 mt-2">
            <Link
              to="/student/login"
              className="flex items-center gap-2 text-sm hover:text-golden-grain transition-colors"
              onClick={() => setOpen(false)}
            >
              <LogIn size={14} /> Student Login
            </Link>
          </li>
          <li>
            <Link
              to="/admin/login"
              className="flex items-center gap-2 text-sm hover:text-golden-grain transition-colors"
              onClick={() => setOpen(false)}
            >
              <Shield size={14} /> Admin Login
            </Link>
          </li>
        </ul>
      )}
    </nav>
  )
}
