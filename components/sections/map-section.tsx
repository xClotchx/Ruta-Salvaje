'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation, X } from 'lucide-react';
import {
  adventures,
  accentClasses,
  typeLabels,
  type Adventure,
} from '../../lib/adventures';

export function MapSection() {
  const [hovered, setHovered] = useState<Adventure | null>(null);

  return (
    <section
      id="mapa"
      className="grain relative w-full overflow-hidden bg-background py-20 sm:py-28"
    >
      <div className="absolute right-0 top-1/3 h-[400px] w-[400px] rounded-full bg-gradient-radial from-magenta/5 via-transparent to-transparent blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mb-12">
          <span className="font-mono-tech text-xs uppercase tracking-[0.3em] text-magenta">
            [ 02 ] Mis puntos
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-6xl">
            Mapa de <span className="text-glow-magenta text-magenta">Aventuras</span>
          </h2>
          <p className="mt-3 max-w-md font-mono-tech text-sm text-muted-foreground">
             Puntos de exploración.
          </p>
        </div>

        {/* Map container */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl glass-strong sm:aspect-[16/9]">
          {/* Topographic background */}
          <div className="absolute inset-0 bg-grid-pattern bg-60px opacity-30" />
          <div className="absolute inset-0 bg-gradient-radial from-background/0 via-background/20 to-background/60" />

          {/* Decorative topographic lines */}
          <svg
            className="absolute inset-0 h-full w-full opacity-20"
            viewBox="0 0 100 75"
            preserveAspectRatio="none"
          >
            <path
              d="M 10 20 Q 30 10, 50 25 T 90 30"
              fill="none"
              stroke="hsl(78 100% 52% / 0.4)"
              strokeWidth="0.3"
            />
            <path
              d="M 5 35 Q 25 28, 45 40 T 85 45"
              fill="none"
              stroke="hsl(185 100% 50% / 0.3)"
              strokeWidth="0.3"
            />
            <path
              d="M 15 50 Q 35 42, 55 55 T 95 58"
              fill="none"
              stroke="hsl(330 100% 56% / 0.3)"
              strokeWidth="0.3"
            />
            <path
              d="M 0 15 Q 20 8, 40 18 T 80 22"
              fill="none"
              stroke="hsl(78 100% 52% / 0.2)"
              strokeWidth="0.2"
            />
            <path
              d="M 20 60 Q 40 52, 60 65 T 100 68"
              fill="none"
              stroke="hsl(185 100% 50% / 0.2)"
              strokeWidth="0.2"
            />
          </svg>

          {/* Pins */}
          {adventures.map((adv, i) => {
            const accent = accentClasses[adv.accent];
            const isActive = hovered?.id === adv.id;
            return (
              <motion.button
                key={adv.id}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1, type: 'spring' }}
                onMouseEnter={() => setHovered(adv)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => setHovered(adv)}
                className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${adv.coordinates.x}%`,
                  top: `${adv.coordinates.y}%`,
                }}
              >
                <div className="relative">
                  {/* Pulse ring */}
                  <span
                    className={`absolute inset-0 animate-ping rounded-full ${accent.dot} opacity-30`}
                    style={{ animationDuration: '2s' }}
                  />
                  {/* Pin */}
                  <div
                    className={`relative flex h-8 w-8 items-center justify-center rounded-full glass-strong ${accent.border} transition-transform hover:scale-125 sm:h-10 sm:w-10`}
                  >
                    <div className={`h-3 w-3 rounded-full ${accent.dot} sm:h-4 sm:w-4`} />
                  </div>
                </div>
              </motion.button>
            );
          })}

          {/* Compass */}
          <div className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full glass">
            <Navigation className="h-5 w-5 text-foreground/60" />
          </div>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 flex flex-col gap-1.5 rounded-2xl glass px-4 py-3">
            <div className="mb-1 font-mono-tech text-[10px] uppercase tracking-wider text-muted-foreground">
              Leyenda
            </div>
            {(['waterfall', 'trail', 'river'] as const).map((t) => (
              <div key={t} className="flex items-center gap-2">
                <div
                  className={`h-2.5 w-2.5 rounded-full ${
                    t === 'waterfall'
                      ? 'bg-cyan'
                      : t === 'trail'
                        ? 'bg-lime'
                        : 'bg-magenta'
                  }`}
                />
                <span className="font-mono-tech text-[10px] uppercase tracking-wider text-foreground/70">
                  {typeLabels[t]}
                </span>
              </div>
            ))}
          </div>

          {/* Tooltip card */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="absolute z-20 w-56 -translate-x-1/2 -translate-y-full"
                style={{
                  left: `${hovered.coordinates.x}%`,
                  top: `${hovered.coordinates.y}%`,
                }}
              >
                <div
                  className="overflow-hidden rounded-2xl glass-strong"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div
                    className="h-24 w-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${hovered.image})` }}
                  />
                  <div className="p-3">
                    <div className="mb-1 flex items-center gap-1.5">
                      <MapPin
                        className={`h-3 w-3 ${accentClasses[hovered.accent].text}`}
                      />
                      <span className="font-mono-tech text-[9px] uppercase tracking-wider text-muted-foreground">
                        {hovered.region}
                      </span>
                    </div>
                    <h4 className="font-display text-sm font-bold leading-tight">
                      {hovered.title}
                    </h4>
                    <button
                      onClick={() => {
                        document
                          .getElementById('galeria')
                          ?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="mt-2 w-full rounded-lg bg-foreground/10 py-1.5 font-mono-tech text-[10px] uppercase tracking-wider text-foreground/80 transition-colors hover:text-foreground"
                    >
                      Ver en galería →
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Stats row */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: 'Rutas exploradas', value: '7', accent: 'text-lime' },
            { label: 'Kilómetros recorridos', value: '30.5', accent: 'text-cyan' },
            { label: 'Países visitados', value: '3', accent: 'text-magenta' },
            { label: 'Días en el campo', value: '17', accent: 'text-lime' },
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl glass p-4">
              <div className={`font-display text-3xl font-bold ${stat.accent}`}>
                {stat.value}
              </div>
              <div className="mt-1 font-mono-tech text-[10px] uppercase tracking-wider text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
