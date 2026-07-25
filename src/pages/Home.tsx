import { useTranslation } from 'react-i18next'
import { Hero, HERO_VIDEO_SRC } from '../components/sections/Hero'
import { EssenceMoment } from '../components/sections/EssenceMoment'
import { SensoryHighlights } from '../components/sections/SensoryHighlights'
import { SocialProof } from '../components/sections/SocialProof'
import { PlansTeaser } from '../components/sections/PlansTeaser'
import { StationsTeaser } from '../components/sections/StationsTeaser'
import { CTAReserva } from '../components/sections/CTAReserva'
import { GalleryPreview } from '../components/sections/GalleryPreview'
import { AuroraBackground } from '../components/ui/AuroraBackground'
import { ScrollExpandMedia } from '../components/ui/ScrollExpandMedia'
import { asset } from '../lib/asset'

export function Home() {
  const { t } = useTranslation()

  return (
    <>
      <AuroraBackground />
      <div className="relative z-10">
        <Hero />
        <ScrollExpandMedia
          mediaSrc={HERO_VIDEO_SRC}
          bgImageSrc={asset('/images/hero/hero-fondo-frase-impactante.jpg')}
          title={t('hero.title')}
          scrollHint={t('essence.scrollHint')}
        >
          <EssenceMoment />
        </ScrollExpandMedia>
        <SensoryHighlights />
        <SocialProof />
        <PlansTeaser />
        <StationsTeaser />
        <CTAReserva />
        <GalleryPreview />
      </div>
    </>
  )
}
