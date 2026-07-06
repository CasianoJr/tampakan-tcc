import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, HelpCircle } from 'lucide-react'
import { faqItems } from '../data/faq'

const categories: string[] = Array.from(new Set(faqItems.map((f) => f.category)))

export default function FaqPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const filtered =
    activeCategory === 'All'
      ? faqItems
      : faqItems.filter((f) => f.category === activeCategory)

  return (
    <>
      <section className="relative flex min-h-[30svh] items-center justify-center overflow-hidden px-4 text-center text-cloud-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/TCC_LOGO_512x512.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-harvest-green/85 to-deep-soil/90" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <h1 className="text-3xl font-bold md:text-4xl">
            Frequently Asked Questions
          </h1>
          <p className="mx-auto mt-2 max-w-2xl text-sky-field/80">
            Find answers to common questions about Tampakan Community College
          </p>
        </motion.div>
      </section>

      <section className="bg-cloud-white px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 flex flex-wrap gap-2">
            {['All', ...categories].map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat)
                  setOpenIndex(null)
                }}
                className={`cursor-pointer rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? 'bg-harvest-green text-cloud-white'
                    : 'bg-sky-field text-slate-ink/70 hover:bg-harvest-green/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center gap-4 py-20 text-center text-slate-ink/50">
              <HelpCircle size={48} />
              <p className="text-lg">No FAQs in this category.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((item, i) => {
                const idx = faqItems.indexOf(item)
                const isOpen = openIndex === idx
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.03 }}
                    className="overflow-hidden rounded-xl border border-sky-field"
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      className="flex w-full cursor-pointer items-center justify-between px-5 py-4 text-left transition-colors hover:bg-sky-field/50"
                    >
                      <span className="pr-4 font-medium text-deep-soil">
                        {item.question}
                      </span>
                      <ChevronDown
                        size={18}
                        className={`shrink-0 text-slate-ink/40 transition-transform ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="border-t border-sky-field px-5 py-4"
                      >
                        <p className="text-sm text-slate-ink/70 leading-relaxed">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </motion.div>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
