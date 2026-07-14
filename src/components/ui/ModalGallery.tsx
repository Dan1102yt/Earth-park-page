import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export function ModalGallery({ images, alt }: { images: string[]; alt: string }) {
  const [index, setIndex] = useState(0)

  return (
    <div>
      <div className="relative h-72 sm:h-96 bg-carbon/10">
        <img src={images[index]} alt={`${alt} — foto ${index + 1}`} loading="lazy" className="w-full h-full object-cover" />
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => setIndex((i) => (i - 1 + images.length) % images.length)}
              aria-label="Foto anterior"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-carbon/50 hover:bg-carbon/70 text-crema rounded-full w-9 h-9 flex items-center justify-center transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={() => setIndex((i) => (i + 1) % images.length)}
              aria-label="Foto siguiente"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-carbon/50 hover:bg-carbon/70 text-crema rounded-full w-9 h-9 flex items-center justify-center transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 p-3 overflow-x-auto">
          {images.map((img, i) => (
            <button
              key={img}
              type="button"
              onClick={() => setIndex(i)}
              className={`shrink-0 w-16 h-14 rounded-lg overflow-hidden border-2 transition-colors ${
                i === index ? 'border-terracota dark:border-dorado' : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <img src={img} alt="" loading="lazy" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
