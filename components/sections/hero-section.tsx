'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowDown, MapPin, Compass } from 'lucide-react';
import { MagneticButton } from '../../components/interactive/magnetic-button';

const profilePhoto =
  '/image/icono.jpg';

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const scrollToGallery = () => {
    document.getElementById('galeria')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={containerRef}
      className="grain relative min-h-[100svh] w-full overflow-hidden bg-background"
    >
      {/* Animated grid background */}
      <div className="absolute inset-0 bg-grid-pattern bg-60px opacity-40 animate-grid-pan" />

      {/* Radial glow */}
      <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-radial from-lime/10 via-transparent to-transparent blur-3xl" />
      <div className="absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-gradient-radial from-cyan/8 via-transparent to-transparent blur-3xl" />
      <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-gradient-radial from-magenta/8 via-transparent to-transparent blur-3xl" />

      <motion.div
        style={{ opacity }}
        className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col items-center justify-center px-6 pt-20 pb-32 sm:pt-24 lg:pt-0"
      >
        {/* Top label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex items-center gap-3 rounded-full glass px-4 py-2"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
          </span>
          <span className="font-mono-tech text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Registro activo · 2026
          </span>
        </motion.div>

        {/* Profile photo with glassmorphism frame */}
        <motion.div
          style={{ y: photoY, scale: photoScale }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-8"
        >
          <div className="absolute -inset-4 rounded-full bg-gradient-conic from-lime/30 via-cyan/20 to-magenta/30 blur-2xl animate-pulse-glow" />
          <div className="relative h-40 w-40 overflow-hidden rounded-full glass-strong p-1.5 sm:h-52 sm:w-52 lg:h-64 lg:w-64">
            <div
              className="h-full w-full rounded-full bg-cover bg-center"
              style={{ backgroundImage: `url(${profilePhoto})` }}
            />
          </div>
          {/* Floating badges */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -right-2 top-4 rounded-2xl glass-strong px-3 py-2 sm:-right-6"
          >
            <div className="flex items-center gap-1.5">
              <Compass className="h-3.5 w-3.5 text-lime" />
              <span className="font-mono-tech text-[10px] uppercase tracking-wider text-foreground/80">
                7 rutas
              </span>
            </div>
          </motion.div>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -left-2 bottom-4 rounded-2xl glass-strong px-3 py-2 sm:-left-6"
          >
            <div className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-cyan" />
              <span className="font-mono-tech text-[10px] uppercase tracking-wider text-foreground/80">
                3 países
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.div style={{ y: textY }} className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-5xl font-bold leading-[0.9] tracking-tight sm:text-7xl lg:text-8xl"
          >
            <span className="block text-foreground">Ruta</span>
            <span className="block text-glow-lime text-lime">Salvaje</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mx-auto mt-6 max-w-md font-mono-tech text-sm leading-relaxed text-muted-foreground sm:text-base"
          >
            Diario personal de exploración.
            <br />
            Cascadas, senderos, ríos y montañas  —
            <span className="text-cyan"> La ruta </span>.
          </motion.p>
        </motion.div> 

        {/* Magnetic CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-10"
        >
          <MagneticButton
            onClick={scrollToGallery}
            className="group flex items-center gap-3 rounded-full bg-lime px-8 py-4 font-mono-tech text-sm font-medium uppercase tracking-wider text-background neon-border-lime"
          >
            <span>Explorar registro</span>
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-28 left-1/2 z-10 -translate-x-1/2 lg:bottom-8"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-mono-tech text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Ruta salvaje
          </span>
          <div className="h-10 w-px bg-gradient-to-b from-lime/60 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
