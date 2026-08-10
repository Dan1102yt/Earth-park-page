import { useParams, Link, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, PawPrint, PartyPopper } from 'lucide-react'
import { getPostBySlug, isPublished, resolveTokens, type BlogCategory } from '../data/blogPosts'
import { formatDate } from '../lib/formatDate'

const categoryIcons: Record<BlogCategory, typeof Calendar> = {
  'fecha-conmemorativa': Calendar,
  especie: PawPrint,
  aniversario: PartyPopper,
}

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'es'
  const post = slug ? getPostBySlug(slug) : undefined

  if (!post) return <Navigate to="/blog" replace />

  const published = isPublished(post)
  const Icon = categoryIcons[post.category]

  return (
    <div className="min-h-screen">
      {/* Franja oscura bajo el header transparente, igual que PageHeaderBand en el resto del sitio */}
      <div className="bg-bosque dark:bg-bosque-deep pt-32 pb-8 px-4">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 font-inter text-sm text-dorado hover:underline"
          >
            <ArrowLeft size={16} /> {t('blog.backToBlog')}
          </Link>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12">
        {!published ? (
          // Sin acceso al contenido antes de tiempo: no se renderiza titulo/excerpt/content del post.
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-24 bg-white/60 dark:bg-bosque-surface/60 rounded-2xl"
          >
            <Icon className="w-10 h-10 text-dorado mx-auto mb-4" />
            <h1 className="font-fraunces text-3xl text-bosque dark:text-crema mb-2">{t('blog.comingSoonTitle')}</h1>
            <p className="font-inter text-carbon/70 dark:text-crema/70">{t('blog.comingSoonMessage')}</p>
          </motion.div>
        ) : (
          <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="h-56 md:h-72 rounded-2xl overflow-hidden mb-8 bg-gradient-to-br from-bosque to-musgo dark:from-bosque-deep dark:to-bosque flex items-center justify-center">
              {post.coverImage ? (
                <img src={post.coverImage} alt="" className="w-full h-full object-cover" />
              ) : (
                <Icon className="w-16 h-16 text-crema/40" />
              )}
            </div>
            <span className="inline-block font-inter text-xs uppercase tracking-wide text-terracota dark:text-dorado mb-2">
              {t(`blog.categories.${post.category}`)}
            </span>
            <p className="font-inter text-carbon/50 dark:text-crema/50 text-sm mb-3">{formatDate(post.publishDate, lang)}</p>
            <h1 className="font-fraunces text-3xl md:text-4xl text-bosque dark:text-crema mb-8">{resolveTokens(post.title[lang])}</h1>
            <div className="space-y-5 font-inter text-carbon dark:text-crema text-lg leading-relaxed">
              {post.content[lang].map((paragraph, i) => (
                <p key={i}>{resolveTokens(paragraph)}</p>
              ))}
            </div>
          </motion.article>
        )}
      </div>
    </div>
  )
}
