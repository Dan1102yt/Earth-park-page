import { Hero } from '../components/sections/Hero'
import { EssenceMoment } from '../components/sections/EssenceMoment'
import { SensoryHighlights } from '../components/sections/SensoryHighlights'
import { SocialProof } from '../components/sections/SocialProof'
import { PlansTeaser } from '../components/sections/PlansTeaser'
import { StationsTeaser } from '../components/sections/StationsTeaser'
import { CTAReserva } from '../components/sections/CTAReserva'
import { GalleryPreview } from '../components/sections/GalleryPreview'

export function Home() {
  return (
    <>
      <Hero />
      <EssenceMoment />
      <SensoryHighlights />
      <SocialProof />
      <PlansTeaser />
      <StationsTeaser />
      <CTAReserva />
      <GalleryPreview />
    </>
  )
}
