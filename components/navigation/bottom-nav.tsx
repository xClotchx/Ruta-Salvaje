'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Images, Map, Mail, Compass } from 'lucide-react';

const navItems = [
  { id: 'inicio', label: 'Inicio', icon: Home },
  { id: 'galeria', label: 'Galería', icon: Images },
  { id: 'mapa', label: 'Mapa', icon: Map },
  { id: 'contacto', label: 'Contacto', icon: Mail },
];

export function BottomNav() {
  const [active, setActive] = useState('inicio');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 200);

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
      {visible && (
        <motion.nav
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-4 left-1/2 z-40 -translate-x-1/2 lg:hidden"
        >
          <div className="flex items-center gap-1 rounded-full glass-strong p-1.5 shadow-[0_8px_40px_hsl(0_0%_0%/0.5)]">
            {/* Logo dot */}
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-lime text-background">
              <Compass className="h-5 w-5" />
            </div>
            <div className="mx-0.5 h-6 w-px bg-foreground/10" />
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = active === item.id;
              return (
                <motion.button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  whileTap={{ scale: 0.85 }}
                  className="relative flex h-11 w-11 items-center justify-center rounded-full"
                  aria-label={item.label}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-lime/15"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <Icon
                    className={`relative h-5 w-5 transition-colors ${
                      isActive
                        ? 'text-lime'
                        : 'text-muted-foreground'
                    }`}
                  />
                </motion.button>
              );
            })}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
