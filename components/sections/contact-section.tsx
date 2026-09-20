'use client';

import { motion } from 'framer-motion';
import {
  Instagram,
  Music2,
  Mail,
  ArrowUpRight,
  Compass,
} from 'lucide-react';
import { MagneticButton } from "../interactive/magnetic-button";

const socials = [
  {
    label: 'Instagram',
    handle: '@x_.emcc._x',
    icon: Instagram,
    accent: 'text-magenta',
    href: 'https://www.instagram.com/x_.emcc._x?stkn=MTNmZjlrc2Vwcmxqdw%3D%3D&utm_source=qr',
  },
  {
    label: 'Tiktok',
    handle: '@x_emcc_x',
    icon: Music2,
    accent: 'text-cyan',
    href: 'https://www.tiktok.com/@x_emcc_x', // Agregué un enlace base de TikTok, puedes ajustarlo si lo deseas
  },
];

export function ContactSection() {
  return (
    <section
      id="contacto"
      className="grain relative w-full overflow-hidden bg-background py-20 sm:py-28"
    >
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-radial from-lime/5 via-transparent to-transparent blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mb-12">
          <span className="font-mono-tech text-xs uppercase tracking-[0.3em] text-cyan">
            [ 03 ] Redes
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-6xl">
            Mira mis <span className="text-glow-lime text-lime">aventuras</span>
          </h2>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {socials.map((s, i) => {
            const SIcon = s.icon;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                {/* Enlace envolvente para que la tarjeta sea clickeable */}
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full focus:outline-none"
                >
                  <MagneticButton
                    strength={0.15}
                    className="group block w-full rounded-3xl glass-strong p-6 text-left pointer-events-none"
                  >
                    <div className="flex items-start justify-between">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl glass`}
                      >
                        <SIcon className={`h-6 w-6 ${s.accent}`} />
                      </div>
                      <ArrowUpRight
                        className={`h-5 w-5 text-muted-foreground transition-all group-hover:-translate-y-1 group-hover:translate-x-1 ${s.accent}`}
                      />
                    </div>
                    <div className="mt-4">
                      <div className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                        {s.label}
                      </div>
                      <div className="mt-1 font-display text-xl font-bold">
                        {s.handle}
                      </div>
                    </div>
                    {/* Glow line */}
                    <div
                      className={`mt-4 h-px w-full origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${
                        s.accent === 'text-lime'
                          ? 'bg-lime'
                          : s.accent === 'text-cyan'
                            ? 'bg-cyan'
                            : 'bg-magenta'
                      }`}
                    />
                  </MagneticButton>
                </a>
              </motion.div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-16 flex flex-col items-center gap-4 border-t border-border/50 pt-8">
          <div className="flex items-center gap-2">
            <Compass className="h-4 w-4 text-lime" />
            <span className="font-display text-lg font-bold tracking-tight">
              Ruta Salvaje
            </span>
          </div>
          <p className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Registro de exploración · EMCC
          </p>
        </div>
      </div>
    </section>
  );
}