import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Users } from 'lucide-react'
import { faculty } from '../../data/faculty'
import FacultyCard from '../../components/faculty/FacultyCard'

export default function FacultyDirectoryPage() {
  const [search, setSearch] = useState('')

  const filtered = faculty.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.department.toLowerCase().includes(search.toLowerCase()),
  )

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
          <h1 className="text-3xl font-bold md:text-4xl">
            Faculty & Staff
          </h1>
          <p className="mx-auto mt-2 max-w-2xl text-sky-field/80">
            Meet the dedicated educators and professionals behind Tampakan Community College
          </p>
        </motion.div>
      </section>

      <section className="bg-cloud-white px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="relative mb-8 mx-auto max-w-md">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-ink/40"
            />
            <input
              type="text"
              placeholder="Search faculty by name, title, or department..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-sky-field py-2.5 pl-10 pr-4 text-sm text-slate-ink outline-none focus:border-harvest-green"
            />
          </div>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center gap-4 py-20 text-center text-slate-ink/50">
              <Users size={48} />
              <p className="text-lg">No faculty members match your search.</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((m, i) => (
                <FacultyCard key={m.slug} member={m} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
