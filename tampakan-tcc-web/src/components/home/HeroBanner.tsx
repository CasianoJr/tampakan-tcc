import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function HeroBanner() {
  return (
    <section className="flex min-h-[70svh] items-center justify-center bg-gradient-to-br from-harvest-green to-deep-soil px-4 text-center text-cloud-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-3xl"
      >
        <h1 className="mb-4 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
          Tampakan Community College: Free, Accessible Higher Education for Every Tampakeño
        </h1>
        <p className="mb-8 text-base text-sky-field/80 sm:text-lg">
          Empowering the youth of Tampakan through quality, tuition-free tertiary education.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to="/academics"
            className="rounded-lg bg-golden-grain px-6 py-3 font-semibold text-deep-soil transition-transform hover:scale-105"
          >
            Explore Programs
          </Link>
          <Link
            to="/contact"
            className="rounded-lg border border-cloud-white px-6 py-3 font-semibold transition-transform hover:scale-105"
          >
            Get Updates
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
