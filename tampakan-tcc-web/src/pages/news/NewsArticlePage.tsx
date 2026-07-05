import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, User } from 'lucide-react'
import { newsArticles } from '../../data/news'

export default function NewsArticlePage() {
  const { slug } = useParams<{ slug: string }>()
  const article = newsArticles.find((a) => a.slug === slug)

  if (!article) {
    return (
      <section className="flex min-h-[50svh] flex-col items-center justify-center gap-4 px-4 text-center">
        <h1 className="text-2xl font-bold text-deep-soil">Article Not Found</h1>
        <p className="text-slate-ink/60">The article you're looking for doesn't exist or may have been removed.</p>
        <Link
          to="/news"
          className="inline-flex items-center gap-2 text-harvest-green hover:underline"
        >
          <ArrowLeft size={16} /> Back to News
        </Link>
      </section>
    )
  }

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
          className="relative z-10 max-w-3xl"
        >
          <h1 className="text-2xl font-bold md:text-3xl">{article.title}</h1>
          <div className="mt-3 flex items-center justify-center gap-4 text-sm text-sky-field/70">
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              {article.date}
            </span>
            <span className="flex items-center gap-1">
              <User size={14} />
              {article.author}
            </span>
          </div>
        </motion.div>
      </section>

      <section className="bg-cloud-white px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <Link
            to="/news"
            className="mb-8 inline-flex items-center gap-2 text-sm text-harvest-green hover:underline"
          >
            <ArrowLeft size={16} /> Back to News
          </Link>

          <div className="space-y-5 text-slate-ink/80 leading-relaxed">
            {article.content.map((paragraph, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
