/** Apartados de "Incluye" de cada plan, en el orden en que se muestran */
export const INCLUDE_SECTIONS = ['gastronomia', 'talleres', 'alojamiento', 'recorridos', 'acompanamiento', 'otros'] as const
export type IncludeSection = (typeof INCLUDE_SECTIONS)[number]
