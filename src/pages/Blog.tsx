import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Calendar, PawPrint, PartyPopper } from 'lucide-react'
import { PageHeaderBand } from '../components/ui/PageHeaderBand'
import { getPublishedPosts, resolveTokens, type BlogCategory } from '../data/blogPosts'
import { formatDate } from '../lib/formatDate'

const categoryIcons: Record<BlogCategory, typeof Calendar> = {
  'fecha-conmemorativa': Calendar,
  especie: PawPrint,
  aniversario: PartyPopper,
}

export function Blog() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'es'
  const posts = getPublishedPosts()

  return (
    <div className="min-h-screen">
      <PageHeaderBand title={t('blog.heading')} subtitle={t('blog.subtitle')} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {posts.length === 0 ? (
          <p className="text-center font-inter text-carbon/60 dark:text-crema/60">{t('blog.empty')}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => {
              const Icon = categoryIcons[post.category]
              return (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ delay: i * 0.06, duration: 0.5, ease: 'easeOut' }}
                >
                  <Link
                    to={`/blog/${post.slug}`}
                    className="group block h-full bg-white dark:bg-bosque-surface rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="h-44 overflow-hidden bg-gradient-to-br from-bosque to-musgo dark:from-bosque-deep dark:to-bosque flex items-center justify-center">
                      {post.coverImage ? (
                        <img src={post.coverImage} alt="" loading="lazy" className="w-full h-full object-cover" />
                      ) : (
                        <Icon className="w-10 h-10 text-crema/50" />
                      )}
                    </div>
                    <div className="p-6">
                      <span className="inline-block font-inter text-xs uppercase tracking-wide text-terracota dark:text-dorado mb-2">
                        {t(`blog.categories.${post.category}`)}
                      </span>
                      <p className="font-inter text-carbon/50 dark:text-crema/50 text-xs mb-2">{formatDate(post.publishDate, lang)}</p>
                      <h3 className="font-fraunces text-xl text-bosque dark:text-crema mb-2 group-hover:text-terracota dark:group-hover:text-dorado transition-colors">
                        {resolveTokens(post.title[lang])}
                      </h3>
                      <p className="font-inter text-carbon/70 dark:text-crema/70 text-sm leading-relaxed">{resolveTokens(post.excerpt[lang])}</p>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
