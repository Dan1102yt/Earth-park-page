interface PageHeaderBandProps {
  title: string
  subtitle: string
}

export function PageHeaderBand({ title, subtitle }: PageHeaderBandProps) {
  return (
    <div className="bg-bosque dark:bg-bosque-deep pt-32 pb-16 px-4 text-center">
      <h1 className="font-fraunces text-4xl md:text-5xl text-crema mb-3">{title}</h1>
      <p className="font-inter text-crema/80 max-w-xl mx-auto">{subtitle}</p>
    </div>
  )
}
