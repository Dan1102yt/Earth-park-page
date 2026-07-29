import { Hero } from '../components/sections/Hero'
import { EssenceMoment } from '../components/sections/EssenceMoment'
import { SensoryHighlights } from '../components/sections/SensoryHighlights'
import { SocialProof } from '../components/sections/SocialProof'
import { PlansTeaser } from '../components/sections/PlansTeaser'
import { StationsTeaser } from '../components/sections/StationsTeaser'
import { CTAReserva } from '../components/sections/CTAReserva'
import { GalleryPreview } from '../components/sections/GalleryPreview'
import { ScrollExpandMedia } from '../components/ui/ScrollExpandMedia'
import { asset } from '../lib/asset'

const ESSENCE_IMAGE = asset('/images/hero/hero-galeria-18.jpeg')

export function Home() {
  return (
    <>
      <Hero />
      <ScrollExpandMedia mediaType="image" mediaSrc={ESSENCE_IMAGE}>
        <EssenceMoment />
      </ScrollExpandMedia>
      <PlansTeaser />
      <SensoryHighlights />
      <SocialProof />
      <StationsTeaser />
      <CTAReserva />
      <GalleryPreview />
    </>
  )
}
