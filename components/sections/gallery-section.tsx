'use client';

import { useState, useRef, useCallback } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  type PanInfo,
} from 'framer-motion';
import {
  Waves,
  Mountain,
  Droplet,
  MapPin,
  Clock,
  Route,
  TrendingUp,
  X,
  ArrowLeft,
  ArrowRight,
  Calendar,
  Check,
} from 'lucide-react';
import {
  adventures,
  type Adventure,
  type AdventureType,
  accentClasses,
  typeLabels,
} from '../../lib/adventures';

const typeIconMap: Record<AdventureType, typeof Waves> = {
  waterfall: Waves,
  trail: Mountain,
  river: Droplet,
  mountain: Mountain,
};

export function GallerySection() {
  const [selected, setSelected] = useState<Adventure | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollByCard = useCallback((dir: 'left' | 'right') => {
    const container = containerRef.current;
    if (!container) return;
    const card = container.querySelector('[data-card]') as HTMLElement;
    const cardWidth = card?.offsetWidth ?? 320;
    container.scrollBy({
      left: dir === 'left' ? -cardWidth - 16 : cardWidth + 16,
      behavior: 'smooth',
    });
  }, []);

  return (
    <section
      id="galeria"
      className="grain relative w-full overflow-hidden bg-background py-20 sm:py-28"
    >
      <div className="absolute left-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-gradient-radial from-cyan/5 via-transparent to-transparent blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Section header */}
        <div className="mb-12 flex flex-col gap-4 sm:mb-16 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="font-mono-tech text-xs uppercase tracking-[0.3em] text-lime">
              [ 01 ] Lugares
            </span>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-6xl">
              Galería <span className="text-glow-cyan text-cyan">Cinética</span>
            </h2>
            <p className="mt-3 max-w-md font-mono-tech text-sm text-muted-foreground">
              Recuerdos.
            </p>
          </div>
          {/* Desktop arrows */}
          <div className="hidden gap-3 sm:flex">
            <button
              onClick={() => scrollByCard('left')}
              className="flex h-12 w-12 items-center justify-center rounded-full glass transition-colors hover:text-lime"
              aria-label="Anterior"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scrollByCard('right')}
              className="flex h-12 w-12 items-center justify-center rounded-full glass transition-colors hover:text-lime"
              aria-label="Siguiente"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Swipeable horizontal scroll */}
      <div
        ref={containerRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-6 scrollbar-hide sm:px-[max(1.5rem,calc((100vw-80rem)/2))] sm:pl-[max(1.5rem,calc((100vw-80rem)/2))]"
        onScroll={(e) => {
          const container = e.currentTarget;
          const card = container.querySelector('[data-card]') as HTMLElement;
          if (!card) return;
          const cardWidth = card.offsetWidth + 16;
          setActiveIndex(Math.round(container.scrollLeft / cardWidth));
        }}
      >
        {adventures.map((adv, i) => (
          <GalleryCard
            key={adv.id}
            adventure={adv}
            index={i}
            isActive={i === activeIndex}
            onOpen={() => setSelected(adv)}
          />
        ))}
        {/* Spacer for last card */}
        <div className="w-1 shrink-0 sm:w-8" />
      </div>

      {/* Progress dots */}
      <div className="mt-8 flex justify-center gap-2">
        {adventures.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === activeIndex ? 'w-8 bg-lime' : 'w-1.5 bg-muted-foreground/30'
            }`}
          />
        ))}
      </div>

      {/* Expandable modal */}
      <AnimatePresence>
        {selected && (
          <AdventureModal
            adventure={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function GalleryCard({
  adventure,
  index,
  isActive,
  onOpen,
}: {
  adventure: Adventure;
  index: number;
  isActive: boolean;
  onOpen: () => void;
}) {
  const accent = accentClasses[adventure.accent];
  const Icon = typeIconMap[adventure.type];
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-100, 100], [3, -3]);

  return (
    <motion.div
      data-card
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      style={{ x, rotate }}
      className="group relative w-[280px] shrink-0 snap-center sm:w-[340px]"
    >
      <motion.button
        onClick={onOpen}
        whileTap={{ scale: 0.97 }}
        className="relative block h-[440px] w-full overflow-hidden rounded-3xl glass-strong text-left sm:h-[480px]"
      >
        {/* Image */}
        <div className="absolute inset-0">
          <div
            className="h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            style={{ backgroundImage: `url(${adventure.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </div>

        {/* Top badge */}
        <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full glass px-3 py-1.5">
          <Icon className={`h-3.5 w-3.5 ${accent.text}`} />
          <span className="font-mono-tech text-[10px] uppercase tracking-wider text-foreground/90">
            {typeLabels[adventure.type]}
          </span>
        </div>

        {/* Difficulty badge */}
        <div className="absolute right-4 top-4 rounded-full glass px-3 py-1.5">
          <span className="font-mono-tech text-[10px] uppercase tracking-wider text-foreground/70">
            {adventure.difficulty}
          </span>
        </div>

        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div className="mb-2 flex items-center gap-1.5">
            <MapPin className={`h-3 w-3 ${accent.text}`} />
            <span className="font-mono-tech text-[10px] uppercase tracking-wider text-muted-foreground">
              {adventure.region}
            </span>
          </div>
          <h3 className="font-display text-2xl font-bold leading-tight tracking-tight">
            {adventure.title}
          </h3>
          <div className="mt-3 flex items-center gap-3 font-mono-tech text-[10px] uppercase tracking-wider text-muted-foreground">
            <span className="flex items-center gap-1">
              <Route className="h-3 w-3" />
              {adventure.distance}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {adventure.duration}
            </span>
          </div>
          {/* Expand hint */}
          <div className="mt-4 flex items-center gap-2">
            <span
              className={`flex items-center gap-1.5 font-mono-tech text-[10px] uppercase tracking-wider ${accent.text}`}
            >
              Ver detalles
            </span>
            <div
              className={`h-px flex-1 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${accent.bg}`}
            />
          </div>
        </div>
      </motion.button>
    </motion.div>
  );
}

function AdventureModal({
  adventure,
  onClose,
}: {
  adventure: Adventure;
  onClose: () => void;
}) {
  const accent = accentClasses[adventure.accent];
  const Icon = typeIconMap[adventure.type];
  const [galleryIndex, setGalleryIndex] = useState(0);

  const stats = [
    { icon: Route, label: 'Distancia', value: adventure.distance },
    { icon: TrendingUp, label: 'Desnivel', value: adventure.elevation },
    { icon: Clock, label: 'Duración', value: adventure.duration },
    { icon: Calendar, label: 'Fecha', value: adventure.date },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-end justify-center bg-background/80 backdrop-blur-md sm:items-center"
    >
      <motion.div
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[92svh] w-full max-w-4xl overflow-y-auto rounded-t-3xl glass-strong scrollbar-hide sm:rounded-3xl"
      >
        {/* Drag handle (mobile) */}
        <div className="sticky top-0 z-20 flex items-center justify-between bg-gradient-to-b from-background/80 to-transparent px-6 pb-3 pt-4 backdrop-blur-sm">
          <div className="mx-auto h-1.5 w-12 rounded-full bg-foreground/20 sm:hidden" />
          <button
            onClick={onClose}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full glass transition-colors hover:text-magenta"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Hero image */}
        <div className="relative h-64 w-full overflow-hidden sm:h-80">
          <div
            className="h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${adventure.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
          <div className="absolute bottom-4 left-6 right-6">
            <div className="mb-2 flex items-center gap-2">
              <div className={`flex items-center gap-1.5 rounded-full glass px-3 py-1.5`}>
                <Icon className={`h-3.5 w-3.5 ${accent.text}`} />
                <span className="font-mono-tech text-[10px] uppercase tracking-wider">
                  {typeLabels[adventure.type]}
                </span>
              </div>
              <div className="rounded-full glass px-3 py-1.5">
                <span className="font-mono-tech text-[10px] uppercase tracking-wider text-foreground/70">
                  {adventure.difficulty}
                </span>
              </div>
            </div>
            <h3 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              {adventure.title}
            </h3>
            <div className="mt-1 flex items-center gap-1.5">
              <MapPin className={`h-3.5 w-3.5 ${accent.text}`} />
              <span className="font-mono-tech text-xs text-muted-foreground">
                {adventure.location} · {adventure.region}
              </span>
            </div>
          </div>
        </div>

        <div className="px-6 pb-8 pt-6">
          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map((stat) => {
              const SIcon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="rounded-2xl glass p-3"
                >
                  <div className="mb-1 flex items-center gap-1.5">
                    <SIcon className={`h-3.5 w-3.5 ${accent.text}`} />
                    <span className="font-mono-tech text-[10px] uppercase tracking-wider text-muted-foreground">
                      {stat.label}
                    </span>
                  </div>
                  <span className="font-display text-lg font-bold">
                    {stat.value}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Description */}
          <p className="mt-6 text-sm leading-relaxed text-foreground/80 sm:text-base">
            {adventure.description}
          </p>

          {/* Highlights */}
          <div className="mt-6">
            <h4 className="mb-3 font-mono-tech text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Puntos destacados
            </h4>
            <div className="grid gap-2 sm:grid-cols-2">
              {adventure.highlights.map((h, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 rounded-xl glass p-3"
                >
                  <div
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${accent.bg} text-background`}
                  >
                    <Check className="h-3 w-3" />
                  </div>
                  <span className="text-sm text-foreground/80">{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Gallery strip */}
          <div className="mt-6">
            <h4 className="mb-3 font-mono-tech text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Galería
            </h4>
            <div className="flex gap-3 overflow-x-auto scrollbar-hide">
              {adventure.gallery.map((img, i) => (
                <motion.button
                  key={i}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setGalleryIndex(i)}
                  className={`relative h-24 w-36 shrink-0 overflow-hidden rounded-xl transition-all ${
                    galleryIndex === i
                      ? `${accent.border} ring-2`
                      : 'opacity-60'
                  }`}
                >
                  <div
                    className="h-full w-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${img})` }}
                  />
                </motion.button>
              ))}
            </div>
            <div className="relative mt-3 h- w-full overflow-hidden rounded-xl sm:h-[900px]">
              <motion.div
                key={galleryIndex}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="h-full w-full bg-cover bg-center"
                style={{
                  backgroundImage: `url(${adventure.gallery[galleryIndex]})`,
                }}
              />
              <div className="absolute bottom-3 right-3 rounded-full glass px-3 py-1.5">
                <span className="font-mono-tech text-[10px] uppercase tracking-wider text-foreground/70">
                  {galleryIndex + 1} / {adventure.gallery.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
