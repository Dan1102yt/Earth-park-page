import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Volume2, VolumeX } from 'lucide-react'
import { asset } from '../../lib/asset'
import { LOGO_SRC } from '../../config/brand'

export const HERO_VIDEO_SRC = asset('/videos/hero-video.mp4')
export const HERO_VIDEO_SRC_MOBILE = asset('/videos/hero-video-celular.mp4')

/** Tamaño del logo sobre el video del hero */
const HERO_LOGO_SIZE = 'clamp(140px, 22vw, 280px)'

export function Hero() {
  const { t } = useTranslation()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)
  const [videoReady, setVideoReady] = useState(false)

  const toggleSound = () => {
    const video = videoRef.current
    if (!video) return
    video.muted = !video.muted
    setMuted(video.muted)
  }

  return (
    <section className="hero-viewport relative flex items-center justify-center overflow-hidden bg-bosque-deep">
      {/* Solo video: sin poster ni imagen estática. Fondo verde bosque mientras
          carga y fade-in cuando el primer frame está listo. */}
      <video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out ${videoReady ? 'opacity-100' : 'opacity-0'}`}
        autoPlay
        muted
        loop
        playsInline
        onLoadedData={() => setVideoReady(true)}
      >
        <source src={HERO_VIDEO_SRC_MOBILE} media="(max-width: 768px)" type="video/mp4" />
        <source src={HERO_VIDEO_SRC} type="video/mp4" />
      </video>

      <h1 className="sr-only">{t('hero.title')}</h1>

      {/* Logo centrado */}
      <motion.img
        src={LOGO_SRC}
        alt="Earth Park"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{ width: HERO_LOGO_SIZE }}
        className="relative z-10 h-auto drop-shadow-[0_4px_18px_rgba(0,0,0,0.45)]"
      />

      {/* Sound toggle */}
      <button
        type="button"
        onClick={toggleSound}
        aria-label={t(muted ? 'hero.unmute' : 'hero.mute')}
        className="absolute bottom-6 right-4 z-20 flex items-center justify-center w-11 h-11 rounded-full bg-bosque-deep/60 text-crema backdrop-blur-sm hover:bg-bosque-deep/80 transition-colors"
      >
        {muted ? <VolumeX size={20} /> : <Volume2 size={20} className="text-dorado" />}
      </button>
    </section>
  )
}
