import { motion } from 'framer-motion'
import { Mail, Globe, ExternalLink } from 'lucide-react'

export default function CtaSection() {
  return (
    <section className="relative overflow-hidden px-4 py-16 text-cloud-white">
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1600&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-deep-soil/90 to-harvest-green/90" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mx-auto max-w-2xl text-center"
      >
        <h2 className="mb-3 text-2xl font-bold md:text-3xl">Stay Informed</h2>
        <p className="mb-8 text-sky-field/80">
          Follow the journey of Tampakan Community College. Get updates on
          construction progress, program offerings, and enrollment announcements.
        </p>
        <div className="mb-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <div className="flex items-center gap-2 rounded-lg bg-cloud-white/10 px-4 py-2">
            <Mail size={18} />
            <span className="text-sm">info@tampakancollege.edu.ph</span>
          </div>
          <div className="flex gap-3">
            <a
              href="#"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-cloud-white/10 transition-colors hover:bg-cloud-white/20"
              aria-label="Facebook"
            >
              <ExternalLink size={20} />
            </a>
            <a
              href="#"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-cloud-white/10 transition-colors hover:bg-cloud-white/20"
              aria-label="Website"
            >
              <Globe size={20} />
            </a>
          </div>
        </div>
        <p className="text-xs text-sky-field/60">
          &copy; {new Date().getFullYear()} LGU Tampakan. All rights reserved.
        </p>
      </motion.div>
    </section>
  )
}
