export type AdventureType = 'waterfall' | 'trail' | 'river' | 'mountain';

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
  accent: 'leaf' | 'water' | 'quetzal';
  /** Opcional: coordenadas exactas (clic derecho en Google Maps → copiar). Si existen, el enlace va al punto exacto. */
  latLng?: { lat: number; lng: number };
}

const SUPABASE_STORAGE_URL = 'https://muisrdanimeszfmmyhhj.supabase.co/storage/v1/object/public/image';

export const adventures: Adventure[] = [
  {
    id: 'cascada-el-choclon',
    title: 'Cascada El Choclon',
    type: 'waterfall',
    location: 'Cochea, distrito de Dolega',
    region: 'Chiriquí, Panamá',
    coordinates: { x: 62, y: 48 },
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
    image: `${SUPABASE_STORAGE_URL}/choclon1.jpg`,
    gallery: [
      `${SUPABASE_STORAGE_URL}/choclon2.jpg`,
      `${SUPABASE_STORAGE_URL}/choclon3.jpg`,
      `${SUPABASE_STORAGE_URL}/choclon4.jpg`,
    ],
    accent: 'water',
  },
  {
    id: 'Meseta-cascada-chorcha',
    title: 'Meseta y la Cascada de Chorcha',
    type: 'mountain',
    location: 'Chorcha Arriba',
    region: 'Chiriquí, Panamá',
    coordinates: { x: 38, y: 30 },
    date: '2026-09-06',
    difficulty: 'Difícil',
    distance: '3.75 km',
    elevation: '+3530 m',
    duration: '1 h 20 MIN',
    description:
      'Exige resistencia física debido a tramos con pendientes pronunciadas y terreno irregular. La recompensa es un paisaje de páramo con vistas panorámicas y la cascada de Chorcha.',
    highlights: [
      'Se obtienen vistas panorámicas excepcionales hacia el Golfo de Chiriquí',
      'Escuchar o cruzar con monos aulladores en medio de los tramos boscosos',
      'Una caída libre imponente visible parcialmente desde la carretera Interamericana',
      'Es común avistar aves locales y migratorias, como el quetzal',
    ],
    image: `${SUPABASE_STORAGE_URL}/chorcha1.JPG`,
    gallery: [
      `${SUPABASE_STORAGE_URL}/chorcha2.JPG`,
      `${SUPABASE_STORAGE_URL}/chorcha3.JPG`,
      `${SUPABASE_STORAGE_URL}/chorcha4.jpg`,
      `${SUPABASE_STORAGE_URL}/chorcha5.JPG`,
      `${SUPABASE_STORAGE_URL}/chorcha6.jpg`,  
      `${SUPABASE_STORAGE_URL}/chorcha7.jpg`,
    ],
    accent: 'leaf',
  },
  {
    id: 'cascada-Jagüatta-caldera',
    title: 'Cascada Jagüatta',
    type: 'waterfall',
    location: 'Corregimiento de Caldera, distrito de Boquete',
    region: 'Chiriquí, Panamá',
    coordinates: { x: 78, y: 72 },
    date: '2026-08-29',
    difficulty: 'Fácil',
    distance: '1.5 km',
    elevation: '+300 m',
    duration: '15 Min',
    description:
      'Se llega tras un recorrido corto a pie de aproximadamente 1 a 1.5 kilómetros desde el punto donde se dejan los vehículos.',
    highlights: [
      'Ideal para nadar y refrescarse al pie de la cascada',
      'Grandes lajas y piedras planas esculpidas por el río',
      'Escenario popular para descensos extremos y saltos',
      'Rodeada de abundante vegetación tropical en Caldera',
    ],
    image: `${SUPABASE_STORAGE_URL}/jawata1.JPG`,
    gallery: [
      `${SUPABASE_STORAGE_URL}/jawata2.JPG`,
      `${SUPABASE_STORAGE_URL}/jawata3.JPG`,
      `${SUPABASE_STORAGE_URL}/jawata4.JPG`,
      `${SUPABASE_STORAGE_URL}/jawata5.jpg`,
    ],
    accent: 'water',
  },
  {
    id: 'sendero-carro-viejo',
    title: 'Sendero del Carro Viejo',
    type: 'trail',
    location: 'Alto Jaramillo, Boquete',
    region: 'Chiriquí, Panamá',
    coordinates: { x: 18, y: 22 },
    date: '2026-08-29',
    difficulty: 'Fácil',
    distance: '3.75 km',
    elevation: '+480 m',
    duration: '20 Min',
    description:
      'Una ruta entre bosque nuboso y selva tropical que asciende hasta revelar el icónico automóvil antiguo abandonado.',
    highlights: [
      'Famoso carro abandonado en la selva',
      'Bosque nuboso y tropical exuberante',
      'Flora diversa con musgos, flores y hongos coloridos',
      'Vistas panorámicas de la región desde la parte alta',
    ],
    image: `${SUPABASE_STORAGE_URL}/carro.jpg`,
    gallery: [
      `${SUPABASE_STORAGE_URL}/carro2.jpg`,
      `${SUPABASE_STORAGE_URL}/carro9.JPG`,
      `${SUPABASE_STORAGE_URL}/carro4.JPG`,
      `${SUPABASE_STORAGE_URL}/carro5.JPG`,
      `${SUPABASE_STORAGE_URL}/carro12.jpg`,
    ],
    accent: 'quetzal',
  },
  {
    id: 'cascada-trueno',
    title: 'Cascada Trueno',
    type: 'waterfall',
    location: 'Sector montañoso, Cordillera',
    region: 'Chiriquí, Panamá',
    coordinates: { x: 48, y: 15 },
    date: '2026-08-23',
    difficulty: 'Moderada',
    distance: '2.5 km',
    elevation: '+320 m',
    duration: '30 min',
    description:
      'Una impresionante caída de agua rodeada por un denso bosque nuboso, cuyo potente caudal emite un sonido estruendoso.',
    highlights: [
      'Potente caída de agua con sonido estruendoso',
      'Poza cristalina profunda al pie de la cascada',
      'Vegetación exuberante de bosque nuboso',
      'Sendero sombreado con terreno húmedo y montañoso',
    ],
    image: `${SUPABASE_STORAGE_URL}/trueno.jpg`,
    gallery: [
      `${SUPABASE_STORAGE_URL}/trueno2.jpg`,
      `${SUPABASE_STORAGE_URL}/trueno3.jpg`,
      `${SUPABASE_STORAGE_URL}/trueno4.jpg`,
      `${SUPABASE_STORAGE_URL}/trueno5.jpg`,
    ],
    accent: 'leaf',
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
      'Un imponente sistema de caídas de agua esculpido en la roca volcánica de la Cordillera.',
    highlights: [
      'Hermosas caídas de agua en la Cordillera',
      'Impresionantes formaciones rocosas y paredes de cañón',
      'Pozas cristalinas ideales para apreciar el paisaje',
      'Entorno natural virgen y fresco',
    ],
    image: `${SUPABASE_STORAGE_URL}/macho.PNG`,
    gallery: [
      `${SUPABASE_STORAGE_URL}/macho2.JPG`,
      `${SUPABASE_STORAGE_URL}/macho3.PNG`,
      `${SUPABASE_STORAGE_URL}/macho4.PNG`,
      `${SUPABASE_STORAGE_URL}/macho.PNG`,
    ],
    accent: 'water',
  },
  {
    id: 'volcan-baru',
    title: 'Volcán Barú',
    type: 'mountain',
    location: 'Parque Nacional Volcán Barú, Cordillera de Talamanca',
    region: 'Chiriquí, Panamá',
    coordinates: { x: 18, y: 32 },
    date: '2024-11-15',
    difficulty: 'Extrema',
    distance: '13 km',
    elevation: '+1850 m',
    duration: '7 h',
    description:
      'El punto más alto de Panamá y un reto emblemático de senderismo que asciende a través de diversos pisos térmicos.',
    highlights: [
      'Punto más alto de todo el país (3,474 m s. n. m.)',
      'Vista panorámica única que abarca ambos océanos',
      'Transición de bosque nuboso a páramo de altura',
      'Impresionante cráter volcánico inactivo',
    ],
    image: `${SUPABASE_STORAGE_URL}/baru.jpeg`,
    gallery: [
      `${SUPABASE_STORAGE_URL}/baru2.jpeg`,
      `${SUPABASE_STORAGE_URL}/baru4.jpeg`,
      `${SUPABASE_STORAGE_URL}/baru6.jpeg`,
      `${SUPABASE_STORAGE_URL}/baru5.jpeg`,
    ],  
    accent: 'leaf',
  },
];

export const typeLabels: Record<AdventureType, string> = {
  waterfall: 'Cascada',
  trail: 'Sendero',
  river: 'Río',
  mountain: 'Montaña',
};

export const accentClasses = {
  leaf: { text: 'text-leaf', bg: 'bg-leaf', soft: 'bg-leaf/15', dot: 'bg-leaf' },
  water: { text: 'text-water', bg: 'bg-water', soft: 'bg-water/15', dot: 'bg-water' },
  quetzal: { text: 'text-quetzal', bg: 'bg-quetzal', soft: 'bg-quetzal/15', dot: 'bg-quetzal' },
} as const;

export const difficultyLevel: Record<Adventure['difficulty'], number> = {
  Fácil: 1,
  Moderada: 2,
  Difícil: 3,
  Extrema: 4,
};

export const filterOptions: { id: 'all' | AdventureType; label: string }[] = [
  { id: 'all', label: 'Todas' },
  { id: 'waterfall', label: 'Cascadas' },
  { id: 'trail', label: 'Senderos' },
  { id: 'mountain', label: 'Montañas' },
];

/** '2026-09-06' -> '6 sep 2026' (sin depender de la zona horaria del servidor) */
export function formatDate(iso: string) {
  const [y, m, d] = iso.split('-').map(Number);
  const meses = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
  return `${d} ${meses[m - 1]} ${y}`;
}

export const totalKm = adventures.reduce((sum, a) => sum + (parseFloat(a.distance) || 0), 0);
export const waterfallCount = adventures.filter((a) => a.type === 'waterfall').length;

/** Ruta optimizada por Next/Vercel (para poster de video, etc.). El ancho debe estar en deviceSizes. */
export const optimized = (url: string, w = 828, q = 70) =>
  `/_next/image?url=${encodeURIComponent(url)}&w=${w}&q=${q}`;

const mapsQuery = (a: Adventure) =>
  a.latLng ? `${a.latLng.lat},${a.latLng.lng}` : `${a.title}, ${a.location}, ${a.region}`;

/** Abre el lugar directo en Google Maps (app en móvil, web en escritorio). */
export const mapsSearchUrl = (a: Adventure) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery(a))}`;

/** Abre Google Maps con la ruta hacia el lugar desde la ubicación del usuario. */
export const mapsDirectionsUrl = (a: Adventure) =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapsQuery(a))}&travelmode=driving`;

/** Mapa embebido (se carga solo cuando la persona lo toca, para ahorrar datos). */
export const mapsEmbedUrl = (a: Adventure) =>
  `https://www.google.com/maps?q=${encodeURIComponent(mapsQuery(a))}&z=13&output=embed`;
