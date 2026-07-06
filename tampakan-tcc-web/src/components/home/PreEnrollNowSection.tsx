import { motion } from 'framer-motion'
import { ArrowRight, LogIn } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function PreEnrollNowSection() {
  return (
    <section className="bg-cloud-white px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-4xl rounded-2xl bg-harvest-green p-8 text-center text-cloud-white md:p-12"
      >
        <h2 className="mb-3 text-2xl font-bold md:text-3xl">
          Secure Your Slot Today
        </h2>
        <p className="mb-6 text-sky-field/80">
          Out-of-school youth, high school graduates, and residents of Tampakan
          and neighboring municipalities can pre-enroll now to reserve a slot in
          the free education program.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to="/pre-enrollment"
            className="inline-flex items-center gap-2 rounded-lg bg-golden-grain px-6 py-3 font-semibold text-deep-soil transition-transform hover:scale-105"
          >
            Pre-Enroll Now <ArrowRight size={18} />
          </Link>
          <Link
            to="/student/login"
            className="inline-flex items-center gap-2 rounded-lg border border-cloud-white px-6 py-3 font-semibold transition-transform hover:scale-105"
          >
            <LogIn size={18} /> Already pre-enrolled? Log in
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
