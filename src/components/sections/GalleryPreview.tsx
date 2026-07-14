import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Button } from '../ui/Button'
import { asset } from '../../lib/asset'

// Selección diversa del pool hero-galeria-1..29: paisaje, familia, animal, cascada, actividad, flor
const PREVIEW_NUMBERS = [8, 18, 11, 19, 24, 16]
const previewImages = PREVIEW_NUMBERS.map((n) => asset(`/images/hero/hero-galeria-${n}.jpeg`))
const moreImages = Array.from({ length: 29 }, (_, i) => i + 1)
  .filter((n) => !PREVIEW_NUMBERS.includes(n))
  .map((n) => asset(`/images/hero/hero-galeria-${n}.jpeg`))

export function GalleryPreview() {
  const { t } = useTranslation()
  const [expanded, setExpanded] = useState(false)

  return (
    <section className="py-24 bg-crema dark:bg-bosque-deep">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-fraunces text-4xl md:text-5xl text-bosque dark:text-crema text-center mb-12">
          {t('galleryPreview.heading')}
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          {previewImages.map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: i * 0.06, duration: 0.5, ease: 'easeOut' }}
              className="aspect-square rounded-xl overflow-hidden"
            >
              <img src={src} alt="Earth Park" loading="lazy" className="w-full h-full object-cover" />
            </motion.div>
          ))}
        </div>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                {moreImages.map((src, i) => (
                  <motion.div
                    key={src}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ delay: (i % 6) * 0.06, duration: 0.5, ease: 'easeOut' }}
                    className="aspect-square rounded-xl overflow-hidden"
                  >
                    <img src={src} alt="Earth Park" loading="lazy" className="w-full h-full object-cover" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="text-center mt-6">
          <Button variant="terracota" size="lg" onClick={() => setExpanded((v) => !v)}>
            {expanded ? t('galleryPreview.showLess') : t('galleryPreview.showMore')}
          </Button>
        </div>
      </div>
    </section>
  )
}
