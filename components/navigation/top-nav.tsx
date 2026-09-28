'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mountain } from 'lucide-react';
import { useActiveSection } from '@/hooks/use-active-section';

const navItems = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'rutas', label: 'Rutas' },
  { id: 'mapa', label: 'Mapa' },
  { id: 'contacto', label: 'Contacto' },
] as const;
const ids = navItems.map((n) => n.id);

export function TopNav() {
  const active = useActiveSection(ids);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

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
          <nav aria-label="Navegación principal" className="glass-strong flex items-center gap-1 rounded-full px-2 py-2">
            <button onClick={() => go('inicio')} className="flex items-center gap-2 rounded-full px-3 py-1.5">
              <Mountain className="h-4 w-4 text-water" />
              <span className="font-display text-base font-semibold">Ruta Salvaje</span>
            </button>
            <div className="mx-1 h-6 w-px bg-foreground/10" />
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                aria-current={active === item.id ? 'page' : undefined}
                className="relative rounded-full px-4 py-1.5"
              >
                {active === item.id && (
                  <motion.span
                    layoutId="topnav-active"
                    className="absolute inset-0 rounded-full bg-white/[0.12] ring-1 ring-white/15"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span
                  className={`relative text-sm font-semibold transition-colors ${
                    active === item.id ? 'text-water' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            ))}
          </nav>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
