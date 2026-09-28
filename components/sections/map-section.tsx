'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { ExternalLink, MapPin, Navigation } from 'lucide-react';
import {
  accentClasses,
  adventures,
  mapsDirectionsUrl,
  mapsEmbedUrl,
  mapsSearchUrl,
  totalKm,
  waterfallCount,
} from '../../lib/adventures';

function CountUp({ to, decimals = 0, suffix = '' }: { to: number; decimals?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15%' });
  const [v, setV] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setV(to);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - t0) / 1200, 1);
      setV(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <span ref={ref}>
      {decimals ? v.toFixed(decimals) : Math.round(v).toLocaleString('en-US')}
      {suffix}
    </span>
  );
}

const stats = [
  { label: 'Rutas exploradas', node: <CountUp to={adventures.length} /> },
  { label: 'Kilómetros a pie', node: <CountUp to={totalKm} decimals={1} /> },
  { label: 'Cascadas', node: <CountUp to={waterfallCount} /> },
  { label: 'Cima más alta', node: <CountUp to={3474} suffix=" m" /> },
];

export function MapSection() {
  const [selectedId, setSelectedId] = useState(adventures[0].id);
  const [loaded, setLoaded] = useState(false);
  const selected = adventures.find((a) => a.id === selectedId) ?? adventures[0];
  const accent = accentClasses[selected.accent];

  return (
    <section id="mapa" className="relative w-full py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="font-display text-4xl font-light sm:text-6xl">Dónde queda cada ruta</h2>
        <p className="mt-3 max-w-md text-muted-foreground">
          Elige una ruta y ábrela en Google Maps para que tu teléfono te lleve.
        </p>

        <div role="tablist" aria-label="Elegir ruta" className="scrollbar-hide -mx-6 mt-8 flex snap-x gap-2 overflow-x-auto px-6">
          {adventures.map((a) => {
            const on = a.id === selectedId;
            return (
              <button
                key={a.id}
                role="tab"
                aria-selected={on}
                onClick={() => setSelectedId(a.id)}
                className={`h-11 shrink-0 snap-start rounded-full px-4 text-sm font-semibold transition-colors ${
                  on ? 'bg-foreground text-background' : 'glass text-foreground/85'
                }`}
              >
                {a.title}
              </button>
            );
          })}
        </div>

        <div className="glass-strong relative mt-6 aspect-[4/5] w-full overflow-hidden rounded-[2rem] sm:aspect-[16/9]">
          {loaded ? (
            <iframe
              key={selected.id}
              title={`Mapa de ${selected.title}`}
              src={mapsEmbedUrl(selected)}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-8 text-center">
              {/* Curvas de nivel decorativas */}
              <svg className="absolute inset-0 h-full w-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" aria-hidden>
                {[10, 17, 24, 31, 38, 45].map((r, i) => (
                  <ellipse
                    key={r}
                    cx="50"
                    cy="50"
                    rx={r * 1.25}
                    ry={r}
                    fill="none"
                    stroke="hsl(172 65% 68%)"
                    strokeWidth="0.25"
                    transform={`rotate(${i * 9 - 20} 50 50)`}
                  />
                ))}
              </svg>
              <span className={`relative flex h-14 w-14 items-center justify-center rounded-full ${accent.bg} text-background`}>
                <MapPin className="h-7 w-7" aria-hidden />
              </span>
              <div className="relative">
                <p className="font-display text-2xl font-semibold">{selected.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{selected.location}</p>
              </div>
              <button
                onClick={() => setLoaded(true)}
                className="glass relative h-12 rounded-full px-6 text-sm font-bold transition-transform active:scale-95"
              >
                Cargar mapa
              </button>
              <p className="relative text-xs text-muted-foreground">Se carga al tocar para no gastar tus datos.</p>
            </div>
          )}
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <a
            href={mapsSearchUrl(selected)}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex h-14 items-center justify-center gap-2 rounded-2xl ${accent.bg} text-sm font-bold text-background transition-transform active:scale-95`}
          >
            <Navigation className="h-4 w-4" aria-hidden />
            Abrir en Google Maps
          </a>
          <a
            href={mapsDirectionsUrl(selected)}
            target="_blank"
            rel="noopener noreferrer"
            className="glass flex h-14 items-center justify-center gap-2 rounded-2xl text-sm font-bold transition-transform active:scale-95"
          >
            <ExternalLink className="h-4 w-4" aria-hidden />
            Cómo llegar desde mi ubicación
          </a>
        </div>

        <dl className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="glass rounded-3xl p-5">
              <dd className="font-display text-4xl font-light tabular-nums">{s.node}</dd>
              <dt className="mt-1 text-sm text-muted-foreground">{s.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
