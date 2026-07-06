import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[70svh] flex-col items-center justify-center px-4 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-7xl font-bold text-harvest-green md:text-9xl">404</h1>
        <p className="mt-4 text-xl font-semibold text-deep-soil">Page Not Found</p>
        <p className="mt-2 text-sm text-slate-ink/60 max-w-sm">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-harvest-green px-6 py-3 text-sm font-semibold text-cloud-white transition-colors hover:bg-deep-soil"
        >
          <Home size={18} /> Back to Home
        </Link>
      </motion.div>
    </div>
  )
}
