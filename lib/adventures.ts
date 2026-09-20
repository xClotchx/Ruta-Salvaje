export type AdventureType = 'waterfall' | 'trail' | 'river'| 'mountain';
export interface Adventure {
  id: string;
  title: string;
  type: AdventureType;
  secondaryType?: AdventureType;
  location: string;
  region: string;
  coordinates: { x: number; y: number };
  date: string;
  difficulty: 'Fácil' | 'Moderada' | 'Difícil' | 'Extrema';
  distance: string;
  elevation: string;
  duration: string;
  description: string;
  highlights: string[];
  image: string;
  gallery: string[];
  video?: string;
  accent: 'lime' | 'cyan' | 'magenta';
}

export const adventures: Adventure[] = [
  {
    id: 'cascada-el-choclon',
    title: 'Cascada El Choclon',
    type: 'waterfall',
    location: 'Cochea, distrito de Dolega',
    region: 'Chiriquí, Panamá',
    coordinates: { x:  62, y: 48 },
    date: '2026-09-20',
    difficulty: 'Moderada',
    distance: '3 km',
    elevation: 'No medido oficialmente',
    duration: '45 Min',
    description:
      'Una caída de 65 metros que desciende como encaje sobre rocas volcánicas. La humedad perpetua alimenta un ecosistema de helechos arborescentes y bromelias que cubren cada superficie.',
    highlights: [
      'Caminata bordeando el cauce del río Cochea',
      'Entorno rodeado de vegetación virgen y abundante fauna local de la zona',
      'Pozas naturales de agua cristalina típicas de los ríos precordilleranos de Chiriquí',
    ],
    image:'/image/choclon1.jpg',
    gallery: [
      '/image/choclon2.jpg',
      '/image/choclon3.jpg',
      '/image/choclon4.jpg',
    ],
    video: '/video/choclon.mp4',
    accent: 'cyan',
  },
  {
    id: 'Meseta-cascada-chorcha',
    title: 'Meseta y la Cascada de Chorcha',
    type: 'mountain',
    location: 'Provincia de Chiriquí, República de Panamá',
    region: 'Chorcha Arriba',
    coordinates: { x: 38, y: 30 },
    date: '2026-09-6',
    difficulty: 'Difícil',
    distance: '3.75 km',
    elevation: '+3530 m',
    duration: '1 h 20 MIN',
    description:
      'exige resistencia física debido a tramos con pendientes pronunciadas y terreno irregular. La recompensa es un paisaje de páramo con vistas panorámicas y la cascada de Chorcha, un salto de agua que cae en una poza natural.',
    highlights: [
      'se obtienen vistas panorámicas excepcionales hacia el Golfo de Chiriquí',
      'escuchar o cruzar con monos aulladores en medio de los tramos boscososs',
      'na caída libre imponente visible parcialmente desde la carretera Interamericana antes de subir',
      'Es común avistar aves locales y migratorias, como el quetzal, en la zona de páramo',
    ],
    image:
      '/image/chorcha1.jpg',
    gallery: [
      '/image/chorcha2.jpg',
      '/image/chorcha3.jpg',
      '/image/chorcha4.jpg',
      '/image/chorcha5.jpg',
      '/image/chorcha6.jpg',  
      '/image/chorcha7.jpg',
    ],
    accent: 'lime',
  },
  {
    id: 'cascada-Jagüatta-caldera',
    title: 'Cascada Jagüatta',
    type: 'waterfall',
    location: 'Corregimiento de Caldera, distrito de Boquete',
    region: 'Provincia de Chiriquí, República de Panamá',
    coordinates: { x: 78, y: 72,  },
    date: '2026-08-29',
    difficulty: 'Fácil',
    distance: '1.5 km',
    elevation: '+300 m',
    duration: '15 Min',
    description:
      'Se llega tras un recorrido corto a pie de aproximadamente 1 a 1.5 kilómetros desde el punto donde se dejan los vehículos. El trayecto implica descender por un sendero de tierra y piedras con tramos empinados hasta adentrarse por completo en la ribera del río y la base del cañón.',
    highlights: [
      'Ideal para nadar y refrescarse al pie de la cascada',
      'Grandes lajas y piedras planas esculpidas por el río',
      'Escenario popular para descensos extremos y saltos',
      'Rodeada de abundante vegetación tropical en Caldera',
    ],
    image:
      '/image/jawata1.jpg',
    gallery: [
      '/image/jawata2.jpg',
      '/image/jawata3.jpg',
      '/image/jawata4.jpg',
      '/image/jawata5.jpg',
    ],
    accent: 'cyan',
  },
  {
    id: 'sendero-carro-viejo',
    title: 'Sendero del Carro Viejo',
    type: 'trail',
    location: 'Alto Jaramillo, Boquete',
    region: 'Chiriquí, Panamá',
    coordinates: { x: 18, y: 22,  },
    date: '2026-08-29',
    difficulty: 'Fácil',
    distance: '3.75 km',
    elevation: '+480 m',
    duration: '20 Min',
    description:
      'Una ruta entre bosque nuboso y selva tropical que asciende hasta revelar el icónico y enigmático automóvil antiguo abandonado en medio de la naturaleza, ideal para fotografías memorables antes de continuar hacia las vistas panorámicas superiores.',
    highlights: [
      'Famoso carro abandonado en la selva',
      'Bosque nuboso y tropical exuberante',
      'Flora diversa con musgos, flores y hongos coloridos',
      'Vistas panorámicas de la región desde la parte alta',
    ],
    image:
      '/image/carro.jpg',
    gallery: [
      '/image/carro2.jpg',
      '/image/carro9.jpg',
      '/image/carro4.jpg',
      '/image/carro5.jpg',
      '/image/carro12.jpg',
     
    ],
    accent: 'magenta',
  },
  {
    id: 'cascada-trueno',
    title: 'Cascada Trueno',
    type: 'waterfall',
    location: 'Sector montañoso, Cordillera',
    region: 'Chiriquí, Panamá',
    coordinates: { x: 48, y: 15,  },
    date: '2026-08-23',
    difficulty: 'Moderada',
    distance: '2.5 km',
    elevation: '+320 m',
    duration: '30 min',
    description:
      'Una impresionante caída de agua rodeada por un denso bosque nuboso, cuyo potente caudal emite un sonido estruendoso que resuena en todo el cañón antes de precipitarse hacia una poza cristalina.',
    highlights: [
      'Potente caída de agua con sonido estruendoso',
      'Poza cristalina profunda al pie de la cascada',
      'Vegetación exuberante de bosque nuboso',
      'Sendero sombreado con terreno húmedo y montañoso',
    ],
    image:
      '/image/trueno.jpg',
    gallery: [
      '/image/trueno2.jpg',
      '/image/trueno3.jpg',
      '/image/trueno4.jpg',
      '/image/trueno5.jpg',
    ],
    accent: 'lime',
  },
  {
    id: 'cascadas-macho-de-monte',
    title: 'Cascadas Macho de Monte',
    type: 'waterfall',
    location: 'Cordillera',
    region: 'Chiriquí, Panamá',
    coordinates: { x: 62, y: 38 },
    date: '2026-03-26',
    difficulty: 'Moderada',
    distance: '3.0 km',
    elevation: '+350 m',
    duration: '40 Min',
    description:
      'Un imponente sistema de caídas de agua esculpido en la roca volcánica de la Cordillera, donde el río se precipita con fuerza formando pozas cristalinas rodeadas de paredes de piedra y una espesa vegetación boscosa.',
    highlights: [
      'Hermosas caídas de agua en la Cordillera',
      'Impresionantes formaciones rocosas y paredes de cañón',
      'Pozas cristalinas ideales para apreciar el paisaje',
      'Entorno natural virgen y fresco',
    ],
    image:
      '/image/macho.png',
    gallery: [
      '/image/macho2.jpg',
      '/image/macho3.png',
      '/image/macho4.png',
      '/image/macho.png',
    ],
    accent: 'cyan',
  },
  {
    id: 'volcan-baru',
    title: 'Volcán Barú',
    type: 'mountain',
    location: 'Parque Nacional Volcán Barú, Cordillera de Talamanca',
    region: 'Chiriquí, Panamá',
    coordinates: { x: 18, y: 32,  },
    date: '2024-11-15',
    difficulty: 'Extrema',
    distance: '13 km',
    elevation: '+1850 m',
    duration: '7 h',
    description:
     'El punto más alto de Panamá y un reto emblemático de senderismo que asciende a través de diversos pisos térmicos hasta la cima, donde en días despejados es posible observar simultáneamente el Océano Pacífico y el Mar Caribe.',
    highlights: [
      'Punto más alto de todo el país (3,474 m s. n. m.)',
      'Vista panorámica única que abarca ambos océanos',
      'Transición de bosque nuboso a páramo de altura',
      'Impresionante cráter volcánico inactivo',
    ],
    image:
      '/image/baru.jpeg',
    gallery: [
      '/image/baru2.jpeg',
      '/image/baru4.jpeg',
      '/image/baru6.jpeg',
      '/image/baru5.jpeg',
    ],
    accent: 'lime',
  },
];

export const typeLabels: Record<AdventureType, string> = {
  waterfall: 'Cascada',
  trail: 'Sendero',
  river: 'Río',
  mountain: 'Montaña',
};

export const typeIcons: Record<AdventureType, string> = {
  waterfall: 'Waves',
  trail: 'Mountain',
  river: 'Droplet',
  mountain: 'Mountain',
};

export const accentClasses = {
  lime: {
    text: 'text-lime',
    bg: 'bg-lime',
    border: 'neon-border-lime',
    glow: 'text-glow-lime',
    from: 'from-lime',
    shadow: 'shadow-[0_0_30px_hsl(78_100%_52%/0.3)]',
    dot: 'bg-lime',
  },
  cyan: {
    text: 'text-cyan',
    bg: 'bg-cyan',
    border: 'neon-border-cyan',
    glow: 'text-glow-cyan',
    from: 'from-cyan',
    shadow: 'shadow-[0_0_30px_hsl(185_100%_50%/0.3)]',
    dot: 'bg-cyan',
  },
  magenta: {
    text: 'text-magenta',
    bg: 'bg-magenta',
    border: 'neon-border-magenta',
    glow: 'text-glow-magenta',
    from: 'from-magenta',
    shadow: 'shadow-[0_0_30px_hsl(330_100%_56%/0.3)]',
    dot: 'bg-magenta',
  },
} as const;
