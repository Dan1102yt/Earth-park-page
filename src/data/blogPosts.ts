import { asset } from '../lib/asset'

export type BlogCategory = 'fecha-conmemorativa' | 'especie' | 'aniversario' | 'semanal'

// Seccion de contenido enriquecido (encabezado + parrafos + fotos intercaladas),
// usada por posts tipo resumen semanal. Los posts simples solo usan `content`.
export interface PostSection {
  heading?: string
  paragraphs: string[]
  images?: string[]
}

export interface BlogPost {
  slug: string
  publishDate: string // ISO yyyy-mm-dd
  category: BlogCategory
  title: { es: string; en: string }
  excerpt: { es: string; en: string }
  content?: { es: string[]; en: string[] }
  sections?: { es: PostSection[]; en: PostSection[] }
  coverImage: string | null // null = sin foto real todavia (PLACEHOLDER), Oscar la agrega despues
}

const weeklyImg = (n: number) => asset(`/images/BLOG/semana-02-09-agosto/${n}.jpg`)

export const EARTH_PARK_FOUNDING_DATE = new Date('2024-12-07T00:00:00')

export function yearsSinceFounding(now: Date = new Date()): number {
  let years = now.getFullYear() - EARTH_PARK_FOUNDING_DATE.getFullYear()
  const anniversaryPassed =
    now.getMonth() > EARTH_PARK_FOUNDING_DATE.getMonth() ||
    (now.getMonth() === EARTH_PARK_FOUNDING_DATE.getMonth() && now.getDate() >= EARTH_PARK_FOUNDING_DATE.getDate())
  if (!anniversaryPassed) years -= 1
  return years
}

// Los posts existen de antemano; se "publican" solos comparando publishDate
// contra la fecha real del navegador (ver isPublished / getPublishedPosts).
export const blogPosts: BlogPost[] = [
  {
    slug: 'humedales-2026',
    publishDate: '2026-02-02',
    category: 'fecha-conmemorativa',
    title: { es: 'Nuestro lago y la vida que protege', en: 'Our lake and the life it protects' },
    excerpt: {
      es: 'Hoy es el Día Mundial de los Humedales, y en Earth Park lo celebramos recordando por qué decidimos proteger el agua de nuestra finca. Nuestro lago no es solo un paisaje: es parte de la vida que regresó.',
      en: "Today is World Wetlands Day, and at Earth Park we mark it by remembering why we decided to protect the water on our farm. Our lake is not just scenery: it's part of the life that came back.",
    },
    content: {
      es: [
        'Cuando decidimos cambiar la manera de relacionarnos con la tierra, proteger el agua fue una de las primeras decisiones que tomamos. El agua es el punto de partida de todo lo demás.',
        'El lago de Earth Park forma parte de ese compromiso: un espacio que cuidamos para que la vida —las plantas, los insectos, las aves— tenga un lugar donde volver.',
        'Hoy, en el Día Mundial de los Humedales, queremos recordar que proteger el agua no es un gesto simbólico. Es una decisión diaria, la misma que tomamos hace años en esta finca del Valle de Tenza.',
        'Los invitamos a caminar hasta el lago la próxima vez que nos visiten, y a observar con calma todo lo que ha vuelto a habitarlo.',
      ],
      en: [
        'When we decided to change the way we related to the land, protecting the water was one of the first decisions we made. Water is the starting point for everything else.',
        "Earth Park's lake is part of that commitment: a space we care for so that life — plants, insects, birds — has a place to return to.",
        "Today, on World Wetlands Day, we want to remember that protecting water isn't a symbolic gesture. It's a daily decision, the same one we made years ago on this farm in the Tenza Valley.",
        'We invite you to walk down to the lake next time you visit, and take a quiet moment to observe everything that has come back to live there.',
      ],
    },
    coverImage: null,
  },
  {
    slug: 'bosques-2026',
    publishDate: '2026-03-21',
    category: 'fecha-conmemorativa',
    title: { es: 'Sembrar bosque, sembrar futuro', en: 'Planting forest, planting future' },
    excerpt: {
      es: 'Cada árbol que sembramos en Earth Park es parte de una decisión que tomamos hace años: dejar de agotar la tierra y empezar a devolverle vida.',
      en: 'Every tree we plant at Earth Park is part of a decision we made years ago: to stop depleting the land and start giving it life back.',
    },
    content: {
      es: [
        'Cuando la producción de la finca dependía de químicos, el bosque también se fue reduciendo. Recuperarlo fue una de las primeras tareas que nos propusimos.',
        'Sembramos árboles y plantas nativas, poco a poco, sin prisa. No sabíamos exactamente qué resultaría, solo sabíamos que la tierra necesitaba volver a respirar.',
        'Hoy, en el Día Internacional de los Bosques, ese trabajo silencioso sigue dando frutos: sombra, refugio, y un ecosistema que cada año se ve un poco más vivo.',
        'Sembrar un árbol es también sembrar una promesa. En Earth Park seguimos cumpliéndola.',
      ],
      en: [
        "When the farm's production depended on chemicals, the forest kept shrinking too. Recovering it was one of the first tasks we set for ourselves.",
        "We planted native trees and plants, little by little, without rushing. We didn't know exactly what would come of it — we only knew the land needed to breathe again.",
        'Today, on International Day of Forests, that quiet work keeps paying off: shade, shelter, and an ecosystem that feels a little more alive every year.',
        'Planting a tree is also planting a promise. At Earth Park, we keep it.',
      ],
    },
    coverImage: null,
  },
  {
    slug: 'agua-2026',
    publishDate: '2026-03-22',
    category: 'fecha-conmemorativa',
    title: { es: 'El agua que aprendimos a proteger', en: 'The water we learned to protect' },
    excerpt: {
      es: 'Aprendimos, no sin esfuerzo, que cuidar el agua era cuidar todo lo demás. Hoy, en el Día Mundial del Agua, recordamos esa lección.',
      en: 'We learned, not without effort, that caring for water meant caring for everything else. Today, on World Water Day, we remember that lesson.',
    },
    content: {
      es: [
        'Durante años, la manera en que trabajábamos la tierra afectó también al agua. Fue una de las señales que más claramente nos mostró que algo tenía que cambiar.',
        'Protegimos nacimientos y quebradas, recuperamos espacios alrededor del agua y dejamos que la vegetación volviera a crecer en sus orillas.',
        'El resultado no fue inmediato. Pero con el tiempo, el agua —como todo lo demás en Earth Park— empezó a sostener vida de nuevo: plantas, insectos, aves.',
        'En el Día Mundial del Agua, en Earth Park recordamos que proteger este recurso fue, para nosotros, el primer paso de una transformación mucho más grande.',
      ],
      en: [
        'For years, the way we worked the land also affected the water. It was one of the clearest signs that something had to change.',
        'We protected springs and streams, restored the spaces around the water, and let the vegetation grow back along its banks.',
        'The result was not immediate. But over time, water — like everything else at Earth Park — began to sustain life again: plants, insects, birds.',
        'On World Water Day, we remember that protecting this resource was, for us, the first step of a much bigger transformation.',
      ],
    },
    coverImage: null,
  },
  {
    slug: 'dia-de-la-tierra-2026',
    publishDate: '2026-04-22',
    category: 'fecha-conmemorativa',
    title: { es: 'Por qué nos llamamos Earth Park', en: "Why we're called Earth Park" },
    excerpt: {
      es: 'Nuestro nombre no es casualidad. Es un homenaje al planeta y una promesa que renovamos cada Día de la Tierra.',
      en: "Our name is no accident. It's a tribute to the planet, and a promise we renew every Earth Day.",
    },
    content: {
      es: [
        'Earth Park nació de una decisión de familia: rendir homenaje al planeta Tierra creando un espacio vivo para honrarla, protegerla y compartir su belleza con quienes nos visitan.',
        'El nombre lo elegimos a propósito. Queríamos que cada persona que llegara sintiera, desde el primer momento, de qué se trata este lugar.',
        'En el Día de la Tierra recordamos que este parque nació de una tierra agotada que decidimos ayudar a sanar, y que ese propósito sigue siendo el mismo hoy.',
        'Cuidar el planeta no comienza en los grandes discursos. Comienza cuando aprendemos a valorar lo que tenemos cerca — y eso es, en el fondo, lo que Earth Park quiere recordarle a cada visitante.',
      ],
      en: [
        'Earth Park was born from a family decision: to pay tribute to planet Earth by creating a living space to honor it, protect it, and share its beauty with everyone who visits.',
        'We chose the name on purpose. We wanted every person who arrived to feel, from the very first moment, what this place is about.',
        'On Earth Day, we remember that this park was born from depleted land we decided to help heal — and that purpose remains the same today.',
        "Caring for the planet doesn't begin with grand speeches. It begins when we learn to value what we have close to us — and that's, at its core, what Earth Park wants to remind every visitor.",
      ],
    },
    coverImage: null,
  },
  {
    slug: 'aves-migratorias-2026',
    publishDate: '2026-05-09',
    category: 'especie',
    title: { es: 'Las aves que regresaron a casa', en: 'The birds that came back home' },
    excerpt: {
      es: 'Cuando empezamos a proteger la tierra, las aves fueron de las primeras en notarlo. Hoy celebramos su regreso.',
      en: 'When we started protecting the land, the birds were among the first to notice. Today we celebrate their return.',
    },
    content: {
      es: [
        'Durante los años en que la finca perdía vida, muchas aves dejaron de visitarnos. Su ausencia fue, sin que lo supiéramos entonces, una señal de todo lo que se estaba perdiendo.',
        'Cuando empezamos a sembrar árboles nativos y a dejar que la vegetación volviera a crecer, las aves regresaron poco a poco: primero unas pocas, luego muchas más.',
        'Hoy, en el Día Mundial de las Aves Migratorias, nos gusta pensar en Earth Park como una parada en su camino: un lugar donde encuentran alimento, refugio y tranquilidad.',
        'Cada ave que vemos posarse en un árbol de la finca nos recuerda por qué decidimos cambiar la forma en que cuidamos esta tierra.',
      ],
      en: [
        'During the years the farm was losing life, many birds stopped visiting us. Their absence was, without us knowing it at the time, a sign of everything that was being lost.',
        'When we started planting native trees and letting the vegetation grow back, the birds returned little by little — first a few, then many more.',
        "Today, on World Migratory Bird Day, we like to think of Earth Park as a stop along their journey: a place where they find food, shelter, and calm.",
        'Every bird we see land on a tree here reminds us why we decided to change the way we care for this land.',
      ],
    },
    coverImage: null,
  },
  {
    slug: 'dia-de-las-abejas-2026',
    publishDate: '2026-05-20',
    category: 'especie',
    title: { es: 'Cuando llegaron las abejas', en: 'When the bees arrived' },
    excerpt: {
      es: '"Llegaron las abejas, las aves, los insectos y, especialmente, las mariposas." Así empezó a notarse que la tierra estaba volviendo a la vida.',
      en: '"The bees, the birds, the insects arrived, and especially, the butterflies." That\'s how it first became clear the land was coming back to life.',
    },
    content: {
      es: [
        'Hubo un momento, después de años de trabajo silencioso, en que algo maravilloso empezó a ocurrir en la finca: regresaron las pequeñas criaturas.',
        'Llegaron las abejas, las aves, los insectos y, especialmente, las mariposas. No las llamamos, no las obligamos a venir: simplemente encontraron, otra vez, un lugar donde vivir.',
        'Las abejas en particular nos enseñaron algo importante: la vida vuelve cuando le damos espacio para hacerlo. Cada colmena, cada zumbido entre las flores, es prueba de que el camino que elegimos fue el correcto.',
        'En su Día Mundial, celebramos a las abejas de Earth Park como parte esencial de esta historia de transformación.',
      ],
      en: [
        'There was a moment, after years of quiet work, when something wonderful began to happen on the farm: the small creatures returned.',
        "The bees, the birds, the insects arrived, and especially, the butterflies. We didn't call them, we didn't force them to come — they simply found, once again, a place to live.",
        'The bees in particular taught us something important: life comes back when you give it room to. Every hive, every hum among the flowers, is proof that the path we chose was the right one.',
        "On their World Day, we celebrate Earth Park's bees as an essential part of this story of transformation.",
      ],
    },
    coverImage: null,
  },
  {
    slug: 'diversidad-biologica-2026',
    publishDate: '2026-05-22',
    category: 'especie',
    title: { es: 'Un refugio que sigue creciendo', en: 'A refuge that keeps growing' },
    excerpt: {
      es: 'Earth Park no es un proyecto terminado. Es un refugio que, año tras año, sigue recibiendo más vida.',
      en: "Earth Park isn't a finished project. It's a refuge that, year after year, keeps welcoming more life.",
    },
    content: {
      es: [
        'Cuando decidimos transformar esta finca, no imaginábamos cuánta vida distinta llegaría a habitarla: plantas, insectos, aves, mariposas, y todo lo que aún no hemos aprendido a nombrar.',
        'Cada especie que regresa es una señal de que el ecosistema se está recuperando. Ninguna llegada es pequeña: todas suman a un mismo propósito.',
        'En el Día Internacional de la Diversidad Biológica, recordamos que Earth Park es, ante todo, un refugio para la conservación de la flora y fauna de nuestro territorio.',
        'Seguimos aprendiendo de cada planta que vuelve a crecer y de cada criatura que encuentra aquí un lugar para quedarse.',
      ],
      en: [
        "When we decided to transform this farm, we couldn't have imagined how much different life would come to live in it: plants, insects, birds, butterflies, and everything we still haven't learned to name.",
        "Every species that returns is a sign the ecosystem is recovering. No arrival is small — they all add up to the same purpose.",
        "On the International Day for Biological Diversity, we remember that Earth Park is, above all, a refuge for the conservation of our territory's flora and fauna.",
        'We keep learning from every plant that grows back and every creature that finds a place to stay here.',
      ],
    },
    coverImage: null,
  },
  {
    slug: 'medio-ambiente-2026',
    publishDate: '2026-06-05',
    category: 'fecha-conmemorativa',
    title: { es: 'Cuidar el planeta empieza aquí', en: 'Caring for the planet starts here' },
    excerpt: {
      es: 'No pretendemos tener todas las respuestas. Pero sabemos que cuidar el planeta empieza por valorar lo que tenemos cerca.',
      en: 'We don\'t claim to have all the answers. But we know caring for the planet starts with valuing what we have close to us.',
    },
    content: {
      es: [
        'En el Día Mundial del Medio Ambiente, en Earth Park no queremos hablar en grandes discursos, sino recordar una historia sencilla: la de una finca que decidió volver a la vida.',
        'Aquí no pretendemos tener todas las respuestas. Estamos aprendiendo, todos los días, de las plantas que vuelven a crecer, de las mariposas que encuentran alimento, del agua que debemos proteger.',
        'Creemos que cuidar el planeta no comienza en los grandes discursos, sino en las decisiones pequeñas y constantes: sembrar un árbol, proteger una quebrada, dejar que la naturaleza recupere su espacio.',
        'Por eso, cada visitante que llega a Earth Park se convierte también en parte de este propósito.',
      ],
      en: [
        "On World Environment Day, at Earth Park we don't want grand speeches — just a simple story: that of a farm that decided to come back to life.",
        "Here we don't claim to have all the answers. We're learning, every day, from the plants that grow back, from the butterflies that find food, from the water we must protect.",
        "We believe caring for the planet doesn't begin with grand speeches, but with small, constant decisions: planting a tree, protecting a stream, letting nature take back its space.",
        'That is why every visitor who comes to Earth Park also becomes part of this purpose.',
      ],
    },
    coverImage: null,
  },
  {
    slug: 'proteccion-naturaleza-2026',
    publishDate: '2026-10-18',
    category: 'fecha-conmemorativa',
    title: { es: 'Aprendiendo de la naturaleza, un día a la vez', en: 'Learning from nature, one day at a time' },
    excerpt: {
      es: 'Earth Park sigue siendo, después de todo este tiempo, un lugar de aprendizaje constante.',
      en: 'After all this time, Earth Park remains a place of constant learning.',
    },
    content: {
      es: [
        'No llegamos a este proyecto con todas las respuestas. Llegamos con una pregunta: ¿qué podíamos hacer para que esta tierra volviera a estar viva?',
        'Con los años, aprendimos observando: de las plantas que volvían a crecer, de las mariposas que encontraban alimento, de las aves que regresaban, del agua que debíamos proteger.',
        'Cada visitante que llega con curiosidad nos recuerda que este aprendizaje no termina. Proteger la naturaleza es un ejercicio diario, no una meta que se alcanza una sola vez.',
        'Seguimos caminando, observando y aprendiendo — un día a la vez, igual que el primer día.',
      ],
      en: [
        'We did not arrive at this project with all the answers. We arrived with a question: what could we do to bring this land back to life?',
        'Over the years, we learned by observing: from the plants that grew back, from the butterflies that found food, from the birds that returned, from the water we had to protect.',
        'Every visitor who arrives with curiosity reminds us this learning never ends. Protecting nature is a daily practice, not a goal reached once.',
        'We keep walking, observing, and learning — one day at a time, just like the first day.',
      ],
    },
    coverImage: null,
  },
  {
    slug: 'aniversario-earth-park-2026',
    publishDate: '2026-12-07',
    category: 'aniversario',
    title: { es: 'Un año más transformando la tierra', en: 'One more year transforming the land' },
    excerpt: {
      es: 'Hoy cumplimos {{years}} años desde que decidimos transformar esta tierra. Seguimos caminando el mismo propósito.',
      en: "Today we turn {{years}} years since we decided to transform this land. We're still walking the same path.",
    },
    content: {
      es: [
        'Un 7 de diciembre nació Earth Park, después de años de trabajo silencioso en una finca que decidió no seguir agotando la tierra que la sostenía.',
        'Hoy cumplimos {{years}} años de ese propósito: convertir un pedazo de tierra agotada en un refugio para los polinizadores y un espacio donde las personas puedan reconectar con la naturaleza.',
        'En este tiempo hemos aprendido de las plantas que vuelven a crecer, de las mariposas que encuentran alimento, de las aves que regresan y de cada visitante que llega con la curiosidad de descubrir.',
        'Gracias por ser parte de esta historia de transformación que, como dijimos desde el inicio, continúa escribiéndose cada día.',
      ],
      en: [
        'On a December 7th, Earth Park was born, after years of quiet work on a farm that decided to stop depleting the land that sustained it.',
        'Today we mark {{years}} years of that purpose: turning a piece of depleted land into a refuge for pollinators and a space where people can reconnect with nature.',
        "In this time we've learned from the plants that grow back, from the butterflies that find food, from the birds that return, and from every visitor who arrives with the curiosity to discover.",
        'Thank you for being part of this story of transformation that, as we said from the start, continues to be written every day.',
      ],
    },
    coverImage: null,
  },
  {
    slug: 'semana-02-09-agosto-2026',
    publishDate: '2026-08-09',
    category: 'semanal',
    title: {
      es: 'Momentos de la semana: 2 al 9 de agosto en Earth Park',
      en: 'This week at Earth Park: August 2-9',
    },
    excerpt: {
      es: 'Un atardecer que paró todo, una mariposa en el sendero, y los experimentos de esta semana en nuestro rincón de propagación de plantas.',
      en: "A sunset that stopped everything, a butterfly on the trail, and this week's experiments in our plant propagation corner.",
    },
    sections: {
      es: [
        {
          paragraphs: [
            'Cada semana en Earth Park pasan pequeñas cosas que merecen contarse: un atardecer que se roba la mirada, una mariposa que aparece justo cuando subes por el sendero, una flor que decidió abrir sus pétalos justo ese día. Así vivimos esta semana.',
          ],
        },
        {
          heading: 'El cielo hizo lo suyo',
          paragraphs: [
            'Un atardecer naranja que paró todo por un momento. Mi papá, como casi cada tarde, se quedó mirando el horizonte desde el mismo lugar de siempre — y si algo resume lo que significa este proyecto para nuestra familia, es justamente eso: detenerse a mirar lo que la tierra nos regala.',
          ],
          images: [weeklyImg(1), weeklyImg(2)],
        },
        {
          heading: 'Subiendo por el sendero',
          paragraphs: [
            'Camino a la Pirámide de los Teguas nos encontramos con una Mariposa Saltarina de cola larga común (*Urbanus dorantes*) — de esas visitas pequeñas que nos recuerdan por qué empezamos todo esto. Desde la estación Mariposa 88, la vista del valle sigue dejándonos sin palabras, sin importar cuántas veces la veamos.',
          ],
          images: [weeklyImg(4), weeklyImg(5), weeklyImg(6)],
        },
        {
          heading: 'Lo que estamos probando',
          paragraphs: [
            'Esta semana seguimos con nuestro experimento en la canastilla: ahí vamos probando distintas maneras de reproducir plantas tapizantes y suculentas, buscando la técnica que mejor funcione antes de llevarlas a gran escala.',
            'Entre las plantas que también nos acompañaron esta semana: el Sombrero Chino (*Holmskioldia sanguinea*), el Cayeno (*Hibiscus rosa-sinensis*), una Dalia (*Dahlia pinnata*) en todo su esplendor amarillo, el Carbonero Rojo (*Calliandra haematocephala*) — favorito de los polinizadores — y una Orquídea de Tierra (*Phaius tankervilleae*) que apenas empieza a florecer.',
          ],
          images: [weeklyImg(3), weeklyImg(7), weeklyImg(8), weeklyImg(9), weeklyImg(10), weeklyImg(11)],
        },
        {
          heading: 'Los guardianes de Earth Park',
          paragraphs: [
            'Y no podíamos cerrar sin presentarte a uno de nuestros compañeros de siempre: Maylo, todo un caballero — respetuoso, pero también muy territorial, por eso lo cuidamos aparte durante tu visita. Aunque si de guardianes juguetones se trata, hay alguien más en Earth Park que le encanta hacerse amigo de cada turista que llega... descúbrelo visitándonos, o quédate atento a nuestro blog.',
          ],
          images: [weeklyImg(12)],
        },
      ],
      en: [
        {
          paragraphs: [
            "Every week at Earth Park, small things happen that are worth telling: a sunset that steals the view, a butterfly that shows up just as you're climbing the trail, a flower that decided to open its petals on that exact day. That's how we lived this week.",
          ],
        },
        {
          heading: 'The sky did its thing',
          paragraphs: [
            "An orange sunset that stopped everything for a moment. My dad, like almost every evening, stood watching the horizon from his usual spot — and if anything sums up what this project means to our family, it's exactly that: stopping to look at what the land gives us.",
          ],
          images: [weeklyImg(1), weeklyImg(2)],
        },
        {
          heading: 'Climbing the trail',
          paragraphs: [
            "On the way to the Pirámide de los Teguas we ran into a Long-tailed Skipper (*Urbanus dorantes*) — one of those small visits that remind us why we started all this. From the Mariposa 88 station, the view of the valley still leaves us speechless, no matter how many times we see it.",
          ],
          images: [weeklyImg(4), weeklyImg(5), weeklyImg(6)],
        },
        {
          heading: "What we're testing",
          paragraphs: [
            "This week we kept working on our experiment in the canastilla: there we're trying out different ways to propagate ground-cover plants and succulents, looking for the technique that works best before scaling it up.",
            'Among the plants that also kept us company this week: the Chinese hat plant (*Holmskioldia sanguinea*), the Hibiscus (*Hibiscus rosa-sinensis*), a Dahlia (*Dahlia pinnata*) in full yellow bloom, the Red Powder Puff (*Calliandra haematocephala*) — a pollinator favorite — and a Ground Orchid (*Phaius tankervilleae*) just beginning to flower.',
          ],
          images: [weeklyImg(3), weeklyImg(7), weeklyImg(8), weeklyImg(9), weeklyImg(10), weeklyImg(11)],
        },
        {
          heading: "Earth Park's guardians",
          paragraphs: [
            "And we couldn't close without introducing you to one of our longtime companions: Maylo, quite the gentleman — respectful, but also very territorial, which is why we keep him separate during your visit. Though if playful guardians are what you're after, there's someone else at Earth Park who loves making friends with every visitor who arrives... find out by visiting us, or stay tuned to our blog.",
          ],
          images: [weeklyImg(12)],
        },
      ],
    },
    coverImage: weeklyImg(1),
  },
]

export function isPublished(post: BlogPost, now: Date = new Date()): boolean {
  return new Date(`${post.publishDate}T00:00:00`) <= now
}

export function getPublishedPosts(now: Date = new Date()): BlogPost[] {
  return blogPosts.filter((p) => isPublished(p, now)).sort((a, b) => b.publishDate.localeCompare(a.publishDate))
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug)
}

// Reemplaza el token {{years}} de los posts (ej. aniversario) por el numero real calculado en el momento.
export function resolveTokens(text: string, now: Date = new Date()): string {
  return text.replace(/\{\{years\}\}/g, String(yearsSinceFounding(now)))
}
