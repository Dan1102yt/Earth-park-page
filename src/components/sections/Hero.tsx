import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, type Variants } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Volume2, VolumeX } from 'lucide-react'
import { Button } from '../ui/Button'
import { asset } from '../../lib/asset'

export const HERO_VIDEO_SRC = asset('/videos/hero-video.mp4')
export const HERO_VIDEO_SRC_MOBILE = asset('/videos/hero-video-celular.mp4')
export const HERO_VIDEO_POSTER =
  'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1280,h=720,fit=crop/Yg2ya4gl5Rtg3nyW/ptv6-dJobZpwzLnFrMEzM.jpeg'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' },
  }),
}

export function Hero() {
  const { t } = useTranslation()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)

  const toggleSound = () => {
    const video = videoRef.current
    if (!video) return
    video.muted = !video.muted
    setMuted(video.muted)
  }

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster={HERO_VIDEO_POSTER}
      >
        <source src={HERO_VIDEO_SRC_MOBILE} media="(max-width: 768px)" type="video/mp4" />
        <source src={HERO_VIDEO_SRC} type="video/mp4" />
      </video>

      {/* Sound toggle */}
      <button
        type="button"
        onClick={toggleSound}
        aria-label={t(muted ? 'hero.unmute' : 'hero.mute')}
        className="absolute bottom-20 md:bottom-6 right-4 z-20 flex items-center justify-center w-11 h-11 rounded-full bg-bosque-deep/60 text-crema backdrop-blur-sm hover:bg-bosque-deep/80 transition-colors"
      >
        {muted ? <VolumeX size={20} /> : <Volume2 size={20} className="text-dorado" />}
      </button>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-bosque/80 via-bosque/40 to-bosque/20 dark:from-bosque-deep/85 dark:via-bosque-deep/45 dark:to-bosque-deep/25" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Badge */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="inline-flex items-center gap-2 bg-musgo/80 text-crema text-sm font-inter px-4 py-2 rounded-full mb-6 backdrop-blur-sm"
        >
          {t('hero.badge')}
        </motion.div>

        {/* H1 */}
        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="font-fraunces font-semibold text-5xl md:text-7xl text-crema leading-tight mb-6"
        >
          {t('hero.title')}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="font-inter text-crema/90 text-xl md:text-2xl mb-10 max-w-2xl mx-auto"
        >
          {t('hero.subtitle')}
        </motion.p>

        {/* Buttons */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href="https://wa.me/573228697438" target="_blank" rel="noopener noreferrer">
            <Button variant="terracota" size="lg">{t('hero.cta_primary')}</Button>
          </a>
          <Link to="/planes-turisticos">
            <Button variant="outline" size="lg">{t('hero.cta_secondary')}</Button>
          </Link>
        </motion.div>
      </div>

      {/* Bottom info strip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="absolute bottom-0 left-0 right-0 bg-bosque/70 dark:bg-bosque-deep/75 backdrop-blur-sm border-t border-crema/10"
      >
        <p className="font-inter text-crema/80 text-sm text-center py-3 px-4">
          {t('hero.info')}
        </p>
      </motion.div>
    </section>
  )
}
