import { useState, useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Button } from '../ui/Button'
import { asset } from '../../lib/asset'

const hero = (n: number) => asset(`/images/hero/hero-galeria-${n}.jpeg`)
const tesoros = (n: number) => asset(`/images/planes/tesoros-del-valle-de-tenza/tesoros-del-valle-de-tenza-${n}.${n <= 9 ? 'jpg' : 'jpeg'}`)
const macanal = (n: number) => asset(`/images/planes/conoce-y-descansa-en-macanal/conoce-y-descansa-en-macanal-${n}.jpeg`)

const albums = [
  { key: 'naturaleza', images: [hero(7), hero(9), hero(14), hero(15), hero(8), hero(18), hero(19), hero(23), hero(27), tesoros(1), macanal(1), macanal(10), macanal(13)] },
  { key: 'actividades', images: [hero(20), hero(21), hero(22), hero(24), hero(25), hero(26), macanal(11), macanal(3)] },
  { key: 'familia', images: [hero(1), hero(2), hero(5), hero(6), hero(10), hero(12), hero(13), hero(17)] },
  { key: 'earthpark', images: [hero(3), hero(4), hero(11), hero(16), hero(28), hero(29), macanal(4)] },
]

// Pool completo (todas las fotos unicas de los albumes) para el carrusel continuo
const allPhotos = Array.from(new Set(albums.flatMap((a) => a.images)))

export function GalleryPreview() {
  const { t } = useTranslation()
  const [expanded, setExpanded] = useState(false)
  const [active, setActive] = useState(0)
  const track = useMemo(() => [...allPhotos, ...allPhotos], [])

  return (
    <section className="py-24 bg-crema/80 dark:bg-bosque-deep/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-fraunces text-4xl md:text-5xl text-bosque dark:text-crema text-center mb-12">
          {t('galleryPreview.heading')}
        </h2>
      </div>

      <div className="overflow-hidden">
        <div className="flex gap-4 w-max animate-marquee hover:[animation-play-state:paused]">
          {track.map((src, i) => (
            <div key={i} className="shrink-0 w-64 sm:w-80 aspect-[4/5] rounded-2xl overflow-hidden">
              <img src={src} alt="Earth Park" loading="lazy" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mt-8">
          <Button variant="terracota" size="lg" onClick={() => setExpanded((v) => !v)}>
            {expanded ? t('galleryPreview.showLess') : t('galleryPreview.showMore')}
          </Button>
        </div>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="overflow-hidden mt-10"
            >
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {albums.map((a, i) => (
                  <button
                    key={a.key}
                    onClick={() => setActive(i)}
                    className={`font-inter text-sm px-4 py-2 rounded-full border transition-colors ${
                      active === i
                        ? 'bg-terracota text-crema border-terracota'
                        : 'border-carbon/20 text-carbon/70 hover:border-terracota dark:border-crema/20 dark:text-crema/70'
                    }`}
                  >
                    {t(`galleryPreview.albums.${a.key}`)}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {albums[active].images.map((src, i) => (
                  <motion.div
                    key={src}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ delay: (i % 8) * 0.05, duration: 0.5, ease: 'easeOut' }}
                    className="aspect-square rounded-xl overflow-hidden"
                  >
                    <img src={src} alt="Earth Park" loading="lazy" className="w-full h-full object-cover" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
