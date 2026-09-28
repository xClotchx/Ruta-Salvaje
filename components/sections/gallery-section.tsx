'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import {
  AnimatePresence,
  motion,
  useDragControls,
} from 'framer-motion';
import {
  Calendar,
  Check,
  Clock,
  ExternalLink,
  MapPin,
  Mountain,
  Navigation,
  Route,
  Share2,
  TrendingUp,
  Waves,
  X,
} from 'lucide-react';
import {
  accentClasses,
  adventures,
  difficultyLevel,
  filterOptions,
  formatDate,
  mapsDirectionsUrl,
  mapsSearchUrl,
  optimized,
  typeLabels,
  type Adventure,
  type AdventureType,
} from '../../lib/adventures';

const typeIcon: Record<AdventureType, typeof Waves> = {
  waterfall: Waves,
  trail: Mountain,
  river: Waves,
  mountain: Mountain,
};

function DifficultyMeter({ adventure }: { adventure: Adventure }) {
  const level = difficultyLevel[adventure.difficulty];
  const accent = accentClasses[adventure.accent];
  return (
    <span role="img" aria-label={`Dificultad ${adventure.difficulty}`} className="flex items-center gap-2">
      <span className="flex gap-0.5" aria-hidden>
        {[1, 2, 3, 4].map((n) => (
          <span key={n} className={`h-3 w-1.5 rounded-full ${n <= level ? accent.bg : 'bg-white/20'}`} />
        ))}
      </span>
      <span className="text-xs text-foreground/85">{adventure.difficulty}</span>
    </span>
  );
}

export function GallerySection() {
  const [selected, setSelected] = useState<Adventure | null>(null);
  const [filter, setFilter] = useState<(typeof filterOptions)[number]['id']>('all');
  const [activeIndex, setActiveIndex] = useState(0);
  const scroller = useRef<HTMLDivElement>(null);
  const raf = useRef(0);

  const list = filter === 'all' ? adventures : adventures.filter((a) => a.type === filter);

  // Botón "atrás" del teléfono cierra la hoja de detalles en vez de salir de la página
  useEffect(() => {
    const onPop = () => setSelected(null);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const open = useCallback((a: Adventure) => {
    window.history.pushState({ sheet: true }, '');
    setSelected(a);
  }, []);

  const close = useCallback(() => {
    if (window.history.state?.sheet) window.history.back();
    else setSelected(null);
  }, []);

  const onScroll = () => {
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      const el = scroller.current;
      const card = el?.querySelector('article') as HTMLElement | null;
      if (!el || !card) return;
      setActiveIndex(Math.round(el.scrollLeft / (card.offsetWidth + 16)));
    });
  };

  const changeFilter = (id: (typeof filterOptions)[number]['id']) => {
    setFilter(id);
    setActiveIndex(0);
    scroller.current?.scrollTo({ left: 0 });
  };

  return (
    <section id="rutas" className="relative w-full py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="font-display text-4xl font-light sm:text-6xl">Rutas recorridas</h2>
        <p className="mt-3 max-w-md text-muted-foreground">
          {adventures.length} lugares de Chiriquí. Toca una tarjeta para ver los datos y cómo llegar.
        </p>

        <div
          role="tablist"
          aria-label="Filtrar por tipo"
          className="scrollbar-hide -mx-6 mt-8 flex gap-2 overflow-x-auto px-6"
        >
          {filterOptions.map((f) => {
            const count = f.id === 'all' ? adventures.length : adventures.filter((a) => a.type === f.id).length;
            if (count === 0) return null;
            const on = filter === f.id;
            return (
              <button
                key={f.id}
                role="tab"
                aria-selected={on}
                onClick={() => changeFilter(f.id)}
                className={`h-11 shrink-0 rounded-full px-5 text-sm font-semibold transition-colors ${
                  on ? 'bg-foreground text-background' : 'glass text-foreground/85'
                }`}
              >
                {f.label} <span className={on ? 'text-background/60' : 'text-muted-foreground'}>{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div
        ref={scroller}
        onScroll={onScroll}
        className="scrollbar-hide mt-8 flex snap-x snap-mandatory scroll-px-6 gap-4 overflow-x-auto px-6 pb-4 sm:px-[max(1.5rem,calc((100vw-72rem)/2))]"
      >
        {list.map((adv, i) => {
          const accent = accentClasses[adv.accent];
          const Icon = typeIcon[adv.type];
          return (
            <article key={adv.id} className="relative w-[80vw] max-w-[360px] shrink-0 snap-center">
              <button
                onClick={() => open(adv)}
                aria-label={`Ver detalles de ${adv.title}`}
                className="group relative block aspect-[4/5] w-full overflow-hidden rounded-[2rem] text-left transition-transform duration-200 active:scale-[0.98]"
              >
                <Image
                  src={adv.image}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 80vw, 360px"
                  priority={i === 0}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-background/20" />

                <span className="glass absolute left-4 top-4 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold">
                  <Icon className={`h-3.5 w-3.5 ${accent.text}`} aria-hidden />
                  {typeLabels[adv.type]}
                </span>

                <span className="glass-strong absolute inset-x-3 bottom-3 block rounded-3xl p-4 pr-16">
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className={`h-3 w-3 ${accent.text}`} aria-hidden />
                    <span className="truncate">{adv.location}</span>
                  </span>
                  <span className="mt-1 block font-display text-xl font-semibold leading-tight">{adv.title}</span>
                  <span className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-foreground/85">
                    <span className="flex items-center gap-1">
                      <Route className="h-3.5 w-3.5" aria-hidden />
                      {adv.distance}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" aria-hidden />
                      {adv.duration}
                    </span>
                    <DifficultyMeter adventure={adv} />
                  </span>
                </span>
              </button>
              <a
                href={mapsSearchUrl(adv)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Abrir ${adv.title} en Google Maps`}
                className={`absolute bottom-6 right-6 z-10 flex h-12 w-12 items-center justify-center rounded-full ${accent.bg} text-background shadow-lg transition-transform active:scale-90`}
              >
                <Navigation className="h-5 w-5" />
              </a>
            </article>
          );
        })}
        <div className="w-2 shrink-0" aria-hidden />
      </div>

      <div className="mt-4 flex justify-center gap-2" aria-hidden>
        {list.map((a, i) => (
          <span
            key={a.id}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === activeIndex ? 'w-8 bg-water' : 'w-1.5 bg-muted-foreground/40'
            }`}
          />
        ))}
      </div>

      <AnimatePresence>{selected && <AdventureSheet adventure={selected} onClose={close} />}</AnimatePresence>
    </section>
  );
}

function AdventureSheet({ adventure, onClose }: { adventure: Adventure; onClose: () => void }) {
  const accent = accentClasses[adventure.accent];
  const Icon = typeIcon[adventure.type];
  const controls = useDragControls();
  const closeRef = useRef<HTMLButtonElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const share = async () => {
    const data = {
      title: adventure.title,
      text: `${adventure.title} — ${adventure.location}, ${adventure.region}`,
      url: mapsSearchUrl(adventure),
    };
    try {
      if (navigator.share) await navigator.share(data);
      else {
        await navigator.clipboard.writeText(data.url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      /* la persona canceló */
    }
  };

  const stats = [
    { icon: Route, label: 'Distancia', value: adventure.distance },
    { icon: TrendingUp, label: 'Desnivel', value: adventure.elevation },
    { icon: Clock, label: 'Duración', value: adventure.duration },
    { icon: Calendar, label: 'Fecha', value: formatDate(adventure.date) },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="sheet-title"
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/65 sm:items-center"
    >
      <motion.div
        drag="y"
        dragControls={controls}
        dragListener={false}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.6 }}
        onDragEnd={(_, info) => {
          if (info.offset.y > 110 || info.velocity.y > 600) onClose();
        }}
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 320, damping: 34 }}
        onClick={(e) => e.stopPropagation()}
        className="glass-strong relative flex max-h-[94svh] w-full max-w-3xl flex-col overflow-hidden rounded-t-[2rem] sm:rounded-[2rem]"
      >
        {/* Asa: se arrastra hacia abajo para cerrar */}
        <div
          onPointerDown={(e) => controls.start(e)}
          className="flex h-12 shrink-0 cursor-grab touch-none items-center justify-center"
        >
          <span className="h-1.5 w-12 rounded-full bg-foreground/25" aria-hidden />
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Cerrar"
            className="glass absolute right-3 top-2 flex h-10 w-10 items-center justify-center rounded-full"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="pb-safe overflow-y-auto overscroll-contain">
          <div className="relative aspect-[4/3] w-full sm:aspect-[16/9]">
            <Image
              src={adventure.image}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
            <div className="absolute inset-x-6 bottom-4">
              <p className="mb-2 flex flex-wrap items-center gap-2 text-xs font-semibold">
                <span className="glass flex items-center gap-1.5 rounded-full px-3 py-1.5">
                  <Icon className={`h-3.5 w-3.5 ${accent.text}`} aria-hidden />
                  {typeLabels[adventure.type]}
                </span>
                <span className="glass rounded-full px-3 py-1.5">
                  <DifficultyMeter adventure={adventure} />
                </span>
              </p>
              <h3 id="sheet-title" className="font-display text-photo text-3xl font-semibold leading-tight sm:text-4xl">
                {adventure.title}
              </h3>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-foreground/85">
                <MapPin className={`h-4 w-4 ${accent.text}`} aria-hidden />
                {adventure.location} · {adventure.region}
              </p>
            </div>
          </div>

          <div className="px-6 pt-6">
            <div className="grid grid-cols-[1fr_1fr_auto] gap-3">
              <a
                href={mapsSearchUrl(adventure)}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex h-14 items-center justify-center gap-2 rounded-2xl ${accent.bg} text-sm font-bold text-background transition-transform active:scale-95`}
              >
                <MapPin className="h-4 w-4" aria-hidden />
                Ver en Maps
              </a>
              <a
                href={mapsDirectionsUrl(adventure)}
                target="_blank"
                rel="noopener noreferrer"
                className="glass flex h-14 items-center justify-center gap-2 rounded-2xl text-sm font-bold transition-transform active:scale-95"
              >
                <ExternalLink className="h-4 w-4" aria-hidden />
                Cómo llegar
              </a>
              <button
                onClick={share}
                aria-label={copied ? 'Enlace copiado' : 'Compartir ubicación'}
                className="glass flex h-14 w-14 items-center justify-center rounded-2xl transition-transform active:scale-95"
              >
                {copied ? <Check className="h-5 w-5 text-water" /> : <Share2 className="h-5 w-5" />}
              </button>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map((s) => {
                const SIcon = s.icon;
                return (
                  <div key={s.label} className="tile rounded-2xl p-3">
                    <p className="mb-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <SIcon className={`h-3.5 w-3.5 ${accent.text}`} aria-hidden />
                      {s.label}
                    </p>
                    <p className="font-display text-lg font-semibold leading-snug">{s.value}</p>
                  </div>
                );
              })}
            </div>

            <p className="mt-6 max-w-prose leading-relaxed text-foreground/85">{adventure.description}</p>

            <h4 className="mb-3 mt-8 font-display text-xl font-semibold">Lo que te espera</h4>
            <ul className="grid gap-2 sm:grid-cols-2">
              {adventure.highlights.map((h) => (
                <li key={h} className="tile flex items-start gap-3 rounded-2xl p-3">
                  <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${accent.bg} text-background`}>
                    <Check className="h-3 w-3" aria-hidden />
                  </span>
                  <span className="text-sm leading-relaxed text-foreground/85">{h}</span>
                </li>
              ))}
            </ul>

            {adventure.video && (
              <video
                className="mt-8 aspect-video w-full rounded-2xl bg-black object-cover"
                controls
                playsInline
                preload="none"
                poster={optimized(adventure.image, 828)}
                src={adventure.video}
              >
                Tu navegador no puede reproducir este video.
              </video>
            )}

            <h4 className="mb-3 mt-8 font-display text-xl font-semibold">Fotos</h4>
          </div>

          <div className="scrollbar-hide flex snap-x snap-mandatory gap-3 overflow-x-auto px-6">
            {adventure.gallery.map((img, i) => (
              <div
                key={`${img}-${i}`}
                className="relative aspect-[4/5] w-[72%] shrink-0 snap-center overflow-hidden rounded-2xl sm:w-[42%]"
              >
                <Image
                  src={img}
                  alt={`${adventure.title}, foto ${i + 1}`}
                  fill
                  sizes="(max-width: 640px) 72vw, 320px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
