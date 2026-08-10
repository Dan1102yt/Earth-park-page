import { useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, PawPrint, PartyPopper, Camera } from 'lucide-react'
import { getPostBySlug, isPublished, resolveTokens, type BlogCategory, type PostImage } from '../data/blogPosts'
import { formatDate } from '../lib/formatDate'
import { Modal } from '../components/ui/Modal'
import { ModalGallery } from '../components/ui/ModalGallery'

const categoryIcons: Record<BlogCategory, typeof Calendar> = {
  'fecha-conmemorativa': Calendar,
  especie: PawPrint,
  aniversario: PartyPopper,
  semanal: Camera,
}

const imgSrc = (img: PostImage) => (typeof img === 'string' ? img : img.src)
const imgPosition = (img: PostImage) => (typeof img === 'string' ? undefined : img.objectPosition)

// Soporte minimo de *cursiva* (nombres cientificos) y {n} como nota al pie
// que remite a la foto n-esima de la seccion — ver ImageGrid.
function richText(text: string) {
  return text.split(/(\*[^*]+\*|\{\d+\})/g).map((part, i) => {
    if (part.startsWith('*') && part.endsWith('*')) return <em key={i}>{part.slice(1, -1)}</em>
    const footnote = /^\{(\d+)\}$/.exec(part)
    if (footnote) return <sup key={i} className="text-dorado font-bold ml-0.5">{footnote[1]}</sup>
    return part
  })
}

function ImageGrid({ images, onOpen }: { images: PostImage[]; onOpen: (index: number) => void }) {
  const cols = images.length === 1 ? 'grid-cols-1 max-w-sm' : images.length === 2 ? 'grid-cols-2' : 'grid-cols-2 sm:grid-cols-3'
  return (
    <div className={`mt-5 grid gap-3 ${cols}`}>
      {images.map((img, i) => (
        <button
          key={imgSrc(img)}
          type="button"
          onClick={() => onOpen(i)}
          className="relative rounded-xl overflow-hidden aspect-[4/3] cursor-zoom-in"
        >
          <img
            src={imgSrc(img)}
            alt=""
            loading="lazy"
            style={{ objectPosition: imgPosition(img) }}
            className="w-full h-full object-cover"
          />
          {images.length > 1 && (
            <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-dorado text-carbon text-xs font-bold flex items-center justify-center">
              {i + 1}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'es'
  const post = slug ? getPostBySlug(slug) : undefined
  const [gallery, setGallery] = useState<{ images: PostImage[]; index: number } | null>(null)

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
            {post.sections ? (
              <div className="space-y-10">
                {post.sections[lang].map((section, si) => (
                  <div key={si}>
                    {section.heading && (
                      <h3 className="font-fraunces text-2xl text-bosque dark:text-crema mb-3">{section.heading}</h3>
                    )}
                    <div className="space-y-4 font-inter text-carbon dark:text-crema text-lg leading-relaxed">
                      {section.paragraphs.map((paragraph, pi) => (
                        <p key={pi}>{richText(resolveTokens(paragraph))}</p>
                      ))}
                    </div>
                    {section.images && (
                      <ImageGrid
                        images={section.images}
                        onOpen={(index) => setGallery({ images: section.images!, index })}
                      />
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-5 font-inter text-carbon dark:text-crema text-lg leading-relaxed">
                {post.content![lang].map((paragraph, i) => (
                  <p key={i}>{resolveTokens(paragraph)}</p>
                ))}
              </div>
            )}
          </motion.article>
        )}
      </div>

      <Modal open={gallery !== null} onClose={() => setGallery(null)}>
        {gallery && (
          <ModalGallery
            images={gallery.images.map(imgSrc)}
            objectPositions={gallery.images.map(imgPosition)}
            alt={resolveTokens(post.title[lang])}
            initialIndex={gallery.index}
          />
        )}
      </Modal>
    </div>
  )
}
