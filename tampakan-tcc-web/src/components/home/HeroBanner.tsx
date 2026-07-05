import { motion } from 'framer-motion'

export default function HeroBanner() {
  return (
    <section className="relative flex min-h-[70svh] items-center justify-center overflow-hidden px-4 text-center text-cloud-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1523050854058-8df90110c7f1?w=1600&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-harvest-green/85 to-deep-soil/90" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 max-w-3xl"
      >
        <h1 className="mb-4 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
          Tampakan Community College: Free, Accessible Higher Education for Every Tampakeño
        </h1>
        <p className="mb-8 text-base text-sky-field/80 sm:text-lg">
          Empowering the youth of Tampakan through quality, tuition-free tertiary education.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="/academics/programs"
            className="rounded-lg bg-golden-grain px-6 py-3 font-semibold text-deep-soil transition-transform hover:scale-105"
          >
            Explore Programs
          </a>
          <a
            href="/contact"
            className="rounded-lg border border-cloud-white px-6 py-3 font-semibold transition-transform hover:scale-105"
          >
            Get Updates
          </a>
        </div>
      </motion.div>
    </section>
  )
}
