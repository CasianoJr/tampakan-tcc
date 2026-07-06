import { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, Download, File } from 'lucide-react'
import { downloads } from '../data/downloads'

const categories: string[] = Array.from(new Set(downloads.map((d) => d.category)))

export default function DownloadsPage() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered =
    activeCategory === 'All'
      ? downloads
      : downloads.filter((d) => d.category === activeCategory)

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
          <h1 className="text-3xl font-bold md:text-4xl">Downloads</h1>
          <p className="mx-auto mt-2 max-w-2xl text-sky-field/80">
            Forms, handbooks, guides, and other downloadable resources
          </p>
        </motion.div>
      </section>

      <section className="bg-cloud-white px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 flex flex-wrap gap-2">
            {['All', ...categories].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
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

          <div className="space-y-4">
            {filtered.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                className="flex items-start gap-4 rounded-xl border border-sky-field p-5 transition-shadow hover:shadow-md"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sky-field text-harvest-green">
                  <FileText size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-deep-soil">{item.title}</h3>
                  <p className="mt-1 text-sm text-slate-ink/70">
                    {item.description}
                  </p>
                  <div className="mt-2 flex items-center gap-3 text-xs text-slate-ink/50">
                    <span className="rounded bg-sky-field px-2 py-0.5 font-medium">
                      {item.fileType}
                    </span>
                    <span>{item.fileSize}</span>
                    <span className="text-harvest-green/60">{item.category}</span>
                  </div>
                </div>
                <button className="flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg bg-harvest-green px-4 py-2 text-sm font-medium text-cloud-white transition-colors hover:bg-deep-soil">
                  <Download size={14} /> Download
                </button>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="flex flex-col items-center gap-4 py-20 text-center text-slate-ink/50">
              <File size={48} />
              <p className="text-lg">No downloads in this category.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
