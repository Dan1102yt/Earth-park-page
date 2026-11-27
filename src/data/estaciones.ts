import { asset } from '../lib/asset'

type Bilingual = { es: string; en: string }

export interface Estacion {
  slug: string
  nombre: Bilingual
  /** Una o más fotos; la primera es la principal (tarjetas). */
  fotos: string[]
  /** Una línea para las tarjetas */
  resumen: Bilingual
  /** Texto de la página de la estación, en párrafos */
  texto: { es: string[]; en: string[] }
}

const foto = (file: string) => asset(`/images/estaciones/${file}`)

const CUATRO_ELEMENTOS: Bilingual = {
  es: 'Cuatro Elementos: una experiencia sensorial que celebra Agua, Tierra, Aire y Fuego.',
  en: 'Four Elements: a sensory experience that celebrates Water, Earth, Air and Fire.',
}

/** Las 7 estaciones del recorrido, en el orden del sendero (también usado por Anterior / Siguiente). */
export const ESTACIONES: Estacion[] = [
  {
    slug: 'piramide-teguas',
    nombre: { es: 'Pirámide de los Teguas', en: 'Pirámide de los Teguas (Pyramid of the Teguas)' },
    fotos: [foto('estacion-piramide.jpeg')],
    resumen: {
      es: 'Un tributo viviente a la sabiduría ancestral de los pueblos que habitaron esta región.',
      en: 'A living tribute to the ancestral wisdom of the peoples who inhabited this region.',
    },
    texto: {
      es: [
        'La Pirámide de los Teguas es un lugar donde la historia y la naturaleza se encuentran. Un tributo viviente a las culturas indígenas que habitaron esta región mucho antes de nosotros. Este espacio sagrado honra la profunda conexión entre los pueblos originarios y la tierra. A través de la piedra, el cielo y las plantas, nos invita a reflexionar sobre la relación de nuestras civilizaciones con el entorno natural. Aquí los elementos se convierten en maestros que nos guían hacia una comprensión más profunda de nuestra esencia en el planeta.',
      ],
      en: [
        'The Pyramid of the Teguas is a place where history and nature meet. A living tribute to the Indigenous cultures that inhabited this region long before us. This sacred space honors the deep connection between the original peoples and the land. Through stone, sky and plants, it invites us to reflect on the relationship between our civilizations and the natural environment. Here the elements become teachers that guide us toward a deeper understanding of our essence on the planet.',
      ],
    },
  },
  {
    slug: 'mariposa-88',
    nombre: { es: 'Mariposa 88 (Columpio)', en: 'Mariposa 88 (Swing)' },
    fotos: [foto('estacion-mariposa.jpeg')],
    resumen: {
      es: 'Un columpio icónico que simboliza la libertad y el infinito de la vida.',
      en: 'An iconic swing that symbolizes freedom and the infinity of life.',
    },
    texto: {
      es: [
        'Mariposa 88 es una estructura icónica que simboliza la libertad y el infinito de la vida. Representa la libertad de la infancia: un espacio para dejar atrás el miedo y disfrutar del momento presente. Conecta con la naturaleza mientras te balanceas en el aire, deja que la brisa te acaricie y que el paisaje te rodee. Ven a liberarte, disfrutar del presente y vivir una experiencia mágica.',
      ],
      en: [
        'Mariposa 88 is an iconic structure that symbolizes freedom and the infinity of life. It represents the freedom of childhood: a space to leave fear behind and enjoy the present moment. Connect with nature as you swing through the air, let the breeze caress you and the landscape surround you. Come set yourself free, enjoy the present and live a magical experience.',
      ],
    },
  },
  {
    slug: 'aire',
    nombre: { es: 'Aire', en: 'Air' },
    fotos: [foto('estacion-aire.webp')],
    resumen: {
      es: 'Conecta con la importancia de respirar cada día y aprecia la libertad que nos brinda.',
      en: 'Connect with the importance of breathing every day and appreciate the freedom it gives us.',
    },
    texto: {
      es: [CUATRO_ELEMENTOS.es, 'Aire: conecta con la importancia de respirar cada día y aprecia la libertad que nos brinda.'],
      en: [CUATRO_ELEMENTOS.en, 'Air: connect with the importance of breathing every day and appreciate the freedom it gives us.'],
    },
  },
  {
    slug: 'agua',
    nombre: { es: 'Agua', en: 'Water' },
    fotos: [foto('estacion-agua.webp')],
    resumen: {
      es: 'Siente la frescura de un recurso valioso a través del juego de mojarse y explorar.',
      en: 'Feel the freshness of a precious resource through the play of getting wet and exploring.',
    },
    texto: {
      es: [CUATRO_ELEMENTOS.es, 'Agua: siente la frescura y el valor de un recurso esencial para la vida, a través del juego de mojarse y explorar.'],
      en: [CUATRO_ELEMENTOS.en, 'Water: feel the freshness and value of a resource essential to life, through the play of getting wet and exploring.'],
    },
  },
  {
    slug: 'fuego',
    nombre: { es: 'Fuego', en: 'Fire' },
    fotos: [foto('estacion-fuego.jpeg')],
    resumen: {
      es: 'Escribe lo que deseas perdonar y quémalo en la fogata: renovación y transformación.',
      en: 'Write down what you wish to forgive and burn it in the bonfire: renewal and transformation.',
    },
    texto: {
      es: [CUATRO_ELEMENTOS.es, 'Fuego: libera emociones escribiendo lo que deseas perdonar y quémalo en la fogata, celebrando la renovación y la transformación.'],
      en: [CUATRO_ELEMENTOS.en, 'Fire: release emotions by writing down what you wish to forgive and burn it in the bonfire, celebrating renewal and transformation.'],
    },
  },
  {
    slug: 'tierra',
    nombre: { es: 'Tierra', en: 'Earth' },
    fotos: [foto('estacion-tierra.webp')],
    resumen: {
      es: 'Aprende cómo se produce abono en la finca y descubre el valor de la tierra que nos da vida.',
      en: 'Learn how compost is made on the farm and discover the value of the soil that gives us life.',
    },
    texto: {
      es: [CUATRO_ELEMENTOS.es, 'Tierra: aprende cómo se produce abono en la finca y comprende el valor de la tierra que nos da vida.'],
      en: [CUATRO_ELEMENTOS.en, 'Earth: learn how compost is made on the farm and understand the value of the soil that gives us life.'],
    },
  },
  {
    slug: 'luna-360',
    nombre: { es: 'Luna 360° y Rover Lunar', en: 'Luna 360° and Lunar Rover' },
    fotos: [foto('estacion-luna360.jpeg'), foto('estacion-rover.jpeg')],
    resumen: {
      es: 'Contempla el universo desde otro ángulo y viaja al futuro sin salir de la Tierra.',
      en: 'Contemplate the universe from another angle and travel to the future without leaving Earth.',
    },
    texto: {
      es: [
        'Luna 360°: una estructura inmersiva que te invita a contemplar el universo desde otro ángulo. Al subirte, sentirás cómo gira suavemente contigo, uniendo la inmensidad del cosmos con la paz interior. Un espacio para observar el atardecer, las estrellas o el amanecer, suspendido en silencio. A veces basta con cambiar la perspectiva para que todo vuelva a brillar.',
        'Rover Lunar: inspirada en los rovers lunares, esta estación te hace sentir la exploración de otro planeta y te invita a imaginar cómo la tecnología puede ayudarnos a construir un futuro sostenible, entre ingeniería espacial, curiosidad humana y compromiso con la vida en la Tierra.',
      ],
      en: [
        'Luna 360°: an immersive structure that invites you to contemplate the universe from another angle. As you climb aboard, you will feel it gently turn with you, joining the vastness of the cosmos with inner peace. A space to watch the sunset, the stars or the sunrise, suspended in silence. Sometimes all it takes is a change of perspective for everything to shine again.',
        'Lunar Rover: inspired by lunar rovers, this station lets you feel what it is like to explore another planet and invites you to imagine how technology can help us build a sustainable future, bringing together space engineering, human curiosity and a commitment to life on Earth.',
      ],
    },
  },
]

export const getEstacion = (slug: string | undefined) => ESTACIONES.find((e) => e.slug === slug)

/** Elige el idioma del contenido según i18n.language */
export const pick = <T,>(value: { es: T; en: T }, lang: string): T => (lang.startsWith('en') ? value.en : value.es)
