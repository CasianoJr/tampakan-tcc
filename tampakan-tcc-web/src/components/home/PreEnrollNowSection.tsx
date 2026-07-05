import { motion } from 'framer-motion'
import { ArrowRight, LogIn } from 'lucide-react'

export default function PreEnrollNowSection() {
  return (
    <section className="relative overflow-hidden px-4 py-16">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1600&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-cloud-white/85" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mx-auto max-w-4xl rounded-2xl bg-harvest-green p-8 text-center text-cloud-white md:p-12"
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
          <a
            href="/pre-enrollment"
            className="inline-flex items-center gap-2 rounded-lg bg-golden-grain px-6 py-3 font-semibold text-deep-soil transition-transform hover:scale-105"
          >
            Pre-Enroll Now <ArrowRight size={18} />
          </a>
          <a
            href="/student/login"
            className="inline-flex items-center gap-2 rounded-lg border border-cloud-white px-6 py-3 font-semibold transition-transform hover:scale-105"
          >
            <LogIn size={18} /> Already pre-enrolled? Log in
          </a>
        </div>
      </motion.div>
    </section>
  )
}
