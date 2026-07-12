interface SectionTitleProps {
  title: string
  subtitle?: string
  centered?: boolean
  light?: boolean
}

export function SectionTitle({ title, subtitle, centered = true, light = false }: SectionTitleProps) {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
      <h2 className={`font-display text-4xl md:text-5xl mb-4 ${light ? 'text-cream' : 'text-cream'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className="font-body text-cream/70 text-lg max-w-2xl mx-auto">{subtitle}</p>
      )}
    </div>
  )
}
