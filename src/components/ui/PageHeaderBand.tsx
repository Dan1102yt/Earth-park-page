interface PageHeaderBandProps {
  title: string
  subtitle: string
  image?: string
}

export function PageHeaderBand({ title, subtitle, image }: PageHeaderBandProps) {
  return (
    <div className="relative overflow-hidden pt-32 pb-16 px-4 text-center bg-bosque dark:bg-bosque-deep">
      {image && (
        <>
          <img src={image} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-bosque/80 dark:bg-bosque-deep/85" />
        </>
      )}
      <div className="relative z-10">
        <h1 className="font-fraunces text-4xl md:text-5xl text-crema mb-3">{title}</h1>
        <p className="font-inter text-crema/80 max-w-xl mx-auto">{subtitle}</p>
      </div>
    </div>
  )
}
