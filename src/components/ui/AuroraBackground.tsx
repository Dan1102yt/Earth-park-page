// Tonos extraídos programáticamente de public/images/logo.png (promedio y tono más
// saturado de los píxeles verdes/rojos del logo, via script pngjs) — no aproximados:
// verde promedio #8dab5e, verde mas saturado #7eaf17, rojo promedio #a62920.
export function AuroraBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-40 -left-40 w-[38rem] h-[38rem] bg-[#8dab5e]/80 dark:bg-[#8dab5e]/55 rounded-full blur-[90px] animate-aurora-a" />
      <div className="absolute top-1/3 -right-32 w-[34rem] h-[34rem] bg-[#7eaf17]/70 dark:bg-[#7eaf17]/45 rounded-full blur-[90px] animate-aurora-b" />
      {/* Rojo del logo: toque sutil, mas presente en modo claro */}
      <div className="absolute bottom-0 left-1/4 w-[26rem] h-[26rem] bg-[#a62920]/45 dark:bg-[#a62920]/22 rounded-full blur-[100px] animate-aurora-c" />
    </div>
  )
}
