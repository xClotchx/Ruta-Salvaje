'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass } from 'lucide-react';

const navItems = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'galeria', label: 'Galería' },
  { id: 'mapa', label: 'Mapa' },
  { id: 'contacto', label: 'Contacto' },
];

export function TopNav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('inicio');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);

      const sections = navItems.map((n) => document.getElementById(n.id));
      const scrollPos = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec && sec.offsetTop <= scrollPos) {
          setActive(navItems[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {scrolled && (
        <motion.header
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed left-1/2 top-4 z-40 hidden -translate-x-1/2 lg:block"
        >
          <div className="flex items-center gap-1 rounded-full glass-strong px-2 py-2">
            <button
              onClick={() => scrollTo('inicio')}
              className="flex items-center gap-2 rounded-full px-3 py-1.5"
            >
              <Compass className="h-4 w-4 text-lime" />
              <span className="font-display text-sm font-bold tracking-tight">
                Ruta Salvaje
              </span>
            </button>
            <div className="mx-1 h-6 w-px bg-foreground/10" />
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="relative rounded-full px-4 py-1.5"
              >
                {active === item.id && (
                  <motion.div
                    layoutId="topnav-active"
                    className="absolute inset-0 rounded-full bg-lime/15"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span
                  className={`relative font-mono-tech text-xs uppercase tracking-wider transition-colors ${
                    active === item.id
                      ? 'text-lime'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
