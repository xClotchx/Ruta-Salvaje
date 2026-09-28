'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Mountain, Map, Send } from 'lucide-react';
import { useActiveSection } from '@/hooks/use-active-section';

const navItems = [
  { id: 'inicio', label: 'Inicio', icon: Home },
  { id: 'rutas', label: 'Rutas', icon: Mountain },
  { id: 'mapa', label: 'Mapa', icon: Map },
  { id: 'contacto', label: 'Contacto', icon: Send },
] as const;
const ids = navItems.map((n) => n.id);

export function BottomNav() {
  const active = useActiveSection(ids);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 240);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id: string) => {
    if ('vibrate' in navigator) navigator.vibrate(8);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          aria-label="Navegación principal"
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 30 }}
          className="fixed bottom-[max(0.75rem,env(safe-area-inset-bottom))] left-1/2 z-40 -translate-x-1/2 lg:hidden"
        >
          <div className="glass-strong flex items-center gap-1 rounded-full p-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = active === item.id;
              return (
                <motion.button
                  key={item.id}
                  layout
                  onClick={() => go(item.id)}
                  whileTap={{ scale: 0.92 }}
                  aria-label={item.label}
                  aria-current={isActive ? 'page' : undefined}
                  className="relative flex h-12 min-w-12 items-center justify-center gap-2 rounded-full px-3.5"
                >
                  {isActive && (
                    <motion.span
                      layoutId="dock-pill"
                      className="absolute inset-0 rounded-full bg-white/[0.13] ring-1 ring-white/20"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    />
                  )}
                  <Icon className={`relative h-5 w-5 ${isActive ? 'text-water' : 'text-muted-foreground'}`} />
                  {isActive && (
                    <span className="relative text-sm font-semibold text-foreground">{item.label}</span>
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
