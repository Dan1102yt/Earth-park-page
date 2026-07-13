import { motion } from 'framer-motion'
import { Mail, Phone, Star } from 'lucide-react'
import { PageHeaderBand } from '../components/ui/PageHeaderBand'
import { CTAReserva } from '../components/sections/CTAReserva'
import { TestimonialsCarousel, testimonials } from '../components/ui/TestimonialsCarousel'

const GOOGLE_REVIEWS_URL = 'https://maps.app.goo.gl/tTFDN7FhHJoNBiLG8?g_st=ac'

// lucide-react ya no incluye íconos de marca (Instagram/Facebook/TikTok) — SVG inline con los glifos oficiales
type IconProps = { size?: number; className?: string }

function InstagramIcon({ size = 22, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C8.74 0 8.333.014 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.014 8.333 0 8.74 0 12s.014 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.986 8.74 24 12 24s3.667-.014 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.014-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.014 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.897 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.897-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793 0 1.44.645 1.44 1.439z" />
    </svg>
  )
}

function FacebookIcon({ size = 22, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
    </svg>
  )
}

function TikTokIcon({ size = 22, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" className={className}>
      <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V13a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3V0z" />
    </svg>
  )
}

const infoCards = [
  { icon: Mail, label: 'Email', value: 'info@earthpark.com.co', href: 'mailto:info@earthpark.com.co' },
  { icon: Mail, label: 'Email', value: 'earthparkmacanal@gmail.com', href: 'mailto:earthparkmacanal@gmail.com' },
  { icon: Phone, label: 'Teléfono', value: '+57 323 3195919', href: 'tel:+573233195919' },
]

const socials = [
  { icon: InstagramIcon, label: 'Instagram', handle: '@earthpark.co', href: 'https://instagram.com/earthpark.co' },
  { icon: TikTokIcon, label: 'TikTok', handle: '@earthpark.co', href: 'https://tiktok.com/@earthpark.co' },
  { icon: FacebookIcon, label: 'Facebook', handle: 'Earth Park', href: 'https://facebook.com/earthpark' },
]

export function Contact() {
  return (
    <div className="min-h-screen">
      <PageHeaderBand
        title="Contacto"
        subtitle="Escríbenos, con gusto te ayudamos a planear tu visita"
      />

      <div className="bg-crema dark:bg-bosque-deep py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            {infoCards.map((c, i) => (
              <motion.a
                key={c.value}
                href={c.href}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: i * 0.08, duration: 0.6, ease: 'easeOut' }}
                className="bg-white dark:bg-bosque-surface rounded-2xl p-6 text-center shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <c.icon className="mx-auto mb-3 text-terracota dark:text-dorado" size={26} />
                <p className="font-inter text-carbon/50 dark:text-crema/50 text-xs uppercase tracking-wide mb-1">{c.label}</p>
                <p className="font-fraunces text-bosque dark:text-crema text-lg break-words">{c.value}</p>
              </motion.a>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex justify-center gap-10 mb-16"
          >
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 text-center group"
              >
                <s.icon size={26} className="text-terracota dark:text-dorado group-hover:scale-110 transition-transform" />
                <p className="font-inter text-carbon/60 dark:text-crema/60 text-sm">{s.handle}</p>
              </a>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="rounded-2xl overflow-hidden border border-carbon/10 dark:border-crema/10 shadow-lg"
          >
            <iframe
              src="https://maps.google.com/maps?q=5.0156303,-73.3556643&z=17&output=embed"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación Earth Park — Macanal, Boyacá"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
            className="text-center mt-6"
          >
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-inter text-sm font-bold text-terracota dark:text-dorado hover:underline"
            >
              <Star size={18} className="fill-current" />
              Ver reseñas en Google Maps
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mt-20"
          >
            <h2 className="font-fraunces text-3xl md:text-4xl text-bosque dark:text-crema text-center mb-10">
              Lo que dicen de nosotros
            </h2>
            <TestimonialsCarousel items={testimonials} />
          </motion.div>
        </div>
      </div>

      <CTAReserva />
    </div>
  )
}
