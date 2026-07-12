import { motion } from 'framer-motion'
import { Mail, Phone } from 'lucide-react'
import { PageHeaderBand } from '../components/ui/PageHeaderBand'
import { CTAReserva } from '../components/sections/CTAReserva'

const infoCards = [
  { icon: Mail, label: 'Email', value: 'info@earthpark.com.co', href: 'mailto:info@earthpark.com.co' },
  { icon: Mail, label: 'Email', value: 'earthparkmacanal@gmail.com', href: 'mailto:earthparkmacanal@gmail.com' },
  { icon: Phone, label: 'Teléfono', value: '+57 323 3195919', href: 'tel:+573233195919' },
]

const socials = [
  { label: 'Instagram', handle: '@earthpark.co', href: 'https://instagram.com/earthpark.co' },
  { label: 'TikTok', handle: '@earthpark.co', href: 'https://tiktok.com/@earthpark.co' },
  { label: 'Facebook', handle: 'Earth Park', href: 'https://facebook.com/earthpark' },
]

export function Contact() {
  return (
    <div className="min-h-screen">
      <PageHeaderBand
        title="Contacto"
        subtitle="Escríbenos, con gusto te ayudamos a planear tu visita"
      />

      <div className="bg-crema py-20 px-4">
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
                className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <c.icon className="mx-auto mb-3 text-terracota" size={26} />
                <p className="font-inter text-carbon/50 text-xs uppercase tracking-wide mb-1">{c.label}</p>
                <p className="font-fraunces text-bosque text-lg break-words">{c.value}</p>
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
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="text-center">
                <p className="font-fraunces text-bosque">{s.label}</p>
                <p className="font-inter text-carbon/60 text-sm">{s.handle}</p>
              </a>
            ))}
          </motion.div>

          {/* REVISAR: usar coordenadas exactas de Earth Park cuando estén disponibles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="rounded-2xl overflow-hidden border border-carbon/10 shadow-lg"
          >
            <iframe
              src="https://maps.google.com/maps?q=Macanal,+Boyac%C3%A1,+Colombia&output=embed"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación Earth Park — Macanal, Boyacá"
            />
          </motion.div>
        </div>
      </div>

      <CTAReserva />
    </div>
  )
}
