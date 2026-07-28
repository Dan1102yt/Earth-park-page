// Fondo fijo de 3 bandas horizontales apiladas (verde-rojo-dorado), de arriba a
// abajo. Modo oscuro: cada color mezclado ~22% con bosque-deep (#1A2E1C) para
// que no compita con el texto de las secciones que se superponen.
export function GradientBackground() {
  return <div className="fixed inset-0 z-0 pointer-events-none bg-earth-gradient" />
}
