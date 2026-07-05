import { motion } from 'framer-motion'
import { newsArticles } from '../../data/news'
import ArticleCard from '../../components/news/ArticleCard'
import { Newspaper } from 'lucide-react'

export default function NewsListPage() {
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
          <h1 className="text-3xl font-bold md:text-4xl">News & Updates</h1>
          <p className="mx-auto mt-2 max-w-2xl text-sky-field/80">
            Latest announcements, developments, and stories from Tampakan Community College
          </p>
        </motion.div>
      </section>

      <section className="bg-cloud-white px-4 py-16">
        <div className="mx-auto max-w-5xl">
          {newsArticles.length === 0 ? (
            <div className="flex flex-col items-center gap-4 py-20 text-center text-slate-ink/50">
              <Newspaper size={48} />
              <p className="text-lg">No news articles yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {newsArticles.map((article, i) => (
                <ArticleCard key={article.slug} article={article} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
