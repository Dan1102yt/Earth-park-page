// Tonos extraídos programáticamente de public/images/logo.png (promedio y tono más
// saturado de los píxeles verdes/rojos del logo, via script pngjs) — no aproximados:
// verde promedio #8dab5e, verde mas saturado #7eaf17, rojo promedio #a62920.
// Dorado #D4A24E de la paleta de marca. Composición diagonal: verde arriba-izq,
// dorado al centro, verde abajo-der, rojo arriba-der — opacidades mas altas en
// modo oscuro para que los blobs brillen sobre el fondo bosque-deep.
export function AuroraBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-40 -left-40 w-[38rem] h-[38rem] bg-[#8dab5e]/60 dark:bg-[#8dab5e]/75 rounded-full blur-[90px] animate-aurora-a" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[36rem] h-[36rem] bg-[#D4A24E]/55 dark:bg-[#D4A24E]/70 rounded-full blur-[100px] animate-aurora-d" />
      <div className="absolute -bottom-40 -right-40 w-[34rem] h-[34rem] bg-[#7eaf17]/60 dark:bg-[#7eaf17]/75 rounded-full blur-[90px] animate-aurora-b" />
      <div className="absolute -top-32 -right-20 w-[28rem] h-[28rem] bg-[#a62920]/50 dark:bg-[#a62920]/60 rounded-full blur-[100px] animate-aurora-c" />
    </div>
  )
}
