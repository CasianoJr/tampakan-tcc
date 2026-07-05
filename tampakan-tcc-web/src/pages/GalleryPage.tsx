import { useState } from 'react'
import { motion } from 'framer-motion'
import { Image } from 'lucide-react'
import { galleryItems } from '../data/gallery'

const categories: string[] = Array.from(new Set(galleryItems.map((g) => g.category)))

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selected, setSelected] = useState<number | null>(null)

  const filtered =
    activeCategory === 'All'
      ? galleryItems
      : galleryItems.filter((g) => g.category === activeCategory)

  return (
    <>
      <section className="relative flex min-h-[30svh] items-center justify-center overflow-hidden px-4 text-center text-cloud-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/assets/TCC_building.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-harvest-green/85 to-deep-soil/90" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <h1 className="text-3xl font-bold md:text-4xl">Gallery</h1>
          <p className="mx-auto mt-2 max-w-2xl text-sky-field/80">
            Photos and snapshots of TCC milestones, events, and the Tampakan community
          </p>
        </motion.div>
      </section>

      <section className="bg-cloud-white px-4 py-16">
        <div className="mx-auto max-w-6xl">
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

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center gap-4 py-20 text-center text-slate-ink/50">
              <Image size={48} />
              <p className="text-lg">No photos in this category.</p>
            </div>
          ) : (
            <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
              {filtered.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.03 }}
                  className="mb-4 break-inside-avoid"
                >
                  <button
                    onClick={() => setSelected(i)}
                    className="group relative block w-full overflow-hidden rounded-xl transition-shadow hover:shadow-lg"
                  >
                    <div
                      className="aspect-[4/3] w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundImage: `url('${item.src}')` }}
                    />
                    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/50 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                      <p className="text-sm font-medium text-cloud-white">
                        {item.caption}
                      </p>
                    </div>
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {selected !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setSelected(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-h-[90vh] max-w-3xl overflow-hidden rounded-xl bg-cloud-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="aspect-[16/9] w-full bg-cover bg-center"
              style={{
                backgroundImage: `url('${galleryItems[selected].src}')`,
              }}
            />
            <div className="p-4">
              <p className="font-bold text-deep-soil">
                {galleryItems[selected].caption}
              </p>
              <p className="mt-1 text-xs text-slate-ink/50">
                {galleryItems[selected].category}
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </>
  )
}
