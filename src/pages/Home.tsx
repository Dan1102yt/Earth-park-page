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

export function Home() {
  return (
    <>
      <AuroraBackground />
      <div className="relative z-10">
        <Hero />
        <ScrollExpandMedia mediaSrc={HERO_VIDEO_SRC}>
          <EssenceMoment />
        </ScrollExpandMedia>
        <PlansTeaser />
        <SensoryHighlights />
        <SocialProof />
        <StationsTeaser />
        <CTAReserva />
        <GalleryPreview />
      </div>
    </>
  )
}
