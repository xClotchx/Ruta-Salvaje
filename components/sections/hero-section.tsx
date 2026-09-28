'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Clock, MapPin, Navigation, Route } from 'lucide-react';
import { adventures, formatDate, mapsSearchUrl } from '../../lib/adventures';

const latest = adventures[0];
const ease = [0.16, 1, 0.3, 1] as const;

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '16%']);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.2]);
  const fade = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[100svh] w-full overflow-hidden">
      {/* Foto a pantalla completa: es lo primero que se ve */}
      <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0">
        <Image
          src={latest.image}
          alt={`${latest.title}, ${latest.location}`}
          fill
          priority
          quality={70}
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/55 to-background/10" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-transparent" />

      <motion.div
        style={{ opacity: fade }}
        className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-6 pb-28 pt-24 lg:pb-16"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass mb-6 inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-sm text-foreground/90"
        >
          <MapPin className="h-4 w-4 text-quetzal" aria-hidden />
          Diario de exploración en Chiriquí, Panamá
        </motion.p>

        {/* Único momento orquestado de la carga: el título sube línea por línea */}
        <h1 className="font-display text-photo text-[clamp(3.6rem,18vw,9.5rem)] font-light leading-[0.9]">
          {['Ruta', 'Salvaje'].map((word, i) => (
            <span key={word} className="block overflow-hidden pb-[0.08em]">
              <motion.span
                className="block"
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.2 + i * 0.14, ease }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-photo mt-5 max-w-md text-lg leading-relaxed text-foreground/90"
        >
          Cascadas, senderos y volcanes recorridos a pie, con los datos de cada ruta y el enlace
          directo para llegar.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease }}
          className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-stretch"
        >
          <a
            href="#rutas"
            className="flex h-14 items-center justify-center gap-2 rounded-full bg-quetzal px-8 text-base font-bold text-background transition-transform active:scale-95"
          >
            Ver las rutas
            <ArrowDown className="h-4 w-4" aria-hidden />
          </a>

          {/* Última ruta */}
          <div className="glass-strong flex items-center gap-4 rounded-3xl p-4 sm:max-w-sm">
            <div className="min-w-0 flex-1">
              <p className="text-xs text-muted-foreground">Última ruta · {formatDate(latest.date)}</p>
              <p className="truncate font-display text-lg font-semibold">{latest.title}</p>
              <p className="mt-1 flex items-center gap-3 text-xs text-foreground/80">
                <span className="flex items-center gap-1">
                  <Route className="h-3.5 w-3.5 text-water" aria-hidden />
                  {latest.distance}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-water" aria-hidden />
                  {latest.duration}
                </span>
              </p>
            </div>
            <a
              href={mapsSearchUrl(latest)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Abrir ${latest.title} en Google Maps`}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-water text-background transition-transform active:scale-90"
            >
              <Navigation className="h-5 w-5" />
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
