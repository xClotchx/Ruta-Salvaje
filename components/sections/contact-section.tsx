'use client';

import { useState } from 'react';
import { ArrowUpRight, Instagram, Mountain, Music2 } from 'lucide-react';

const socials = [
  { label: 'Instagram', handle: '@x_.emcc._x', icon: Instagram, href: 'https://www.instagram.com/x_.emcc._x' },
  { label: 'TikTok', handle: '@x_emcc_x', icon: Music2, href: 'https://www.tiktok.com/@x_emcc_x' },
];

// type Status = 'idle' | 'sending' | 'ok' | 'error';

export function ContactSection() {
  /* Estados y función comentados para evitar errores de TypeScript por variables no utilizadas
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus('sending');
    setError('');
    try {
      const res = await fetch('/api/sugerencias', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || 'No se pudo enviar. Inténtalo de nuevo.');
      form.reset();
      setStatus('ok');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo enviar. Inténtalo de nuevo.');
      setStatus('error');
    }
  };
  */

  return (
    <section id="contacto" className="relative w-full py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="font-display text-4xl font-light sm:text-6xl">Sigue la ruta</h2>
        <p className="mt-3 max-w-md text-muted-foreground">
          Las salidas nuevas se publican primero en redes.
        </p>

        <div className="mt-10 grid gap-4 lg:grid-cols-1">
          <div className="grid content-start gap-4 max-w-xl">
            {socials.map((s) => {
              const SIcon = s.icon;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-strong group flex items-center gap-4 rounded-3xl p-5 transition-transform active:scale-[0.98]"
                >
                  <span className="glass flex h-14 w-14 items-center justify-center rounded-2xl">
                    <SIcon className="h-6 w-6 text-water" aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm text-muted-foreground">{s.label}</span>
                    <span className="block truncate font-display text-xl font-semibold">{s.handle}</span>
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                </a>
              );
            })}
          </div>

          {/* 
          --- FORMULARIO COMENTADO ---
          <form onSubmit={onSubmit} className="glass-strong rounded-3xl p-6" noValidate>
            <h3 className="font-display text-2xl font-semibold">¿Conoces un lugar que debería visitar?</h3>
            <p className="mt-1 text-sm text-muted-foreground">Cuéntame dónde queda y por qué vale la pena.</p>

            <div className="mt-5 grid gap-3">
              <label className="grid gap-1.5 text-sm font-semibold">
                Lugar
                <input name="lugar" required minLength={3} maxLength={120} autoComplete="off" placeholder="Cascada, sendero o mirador" className={field} />
              </label>
              <label className="grid gap-1.5 text-sm font-semibold">
                Detalles <span className="font-normal text-muted-foreground">(opcional)</span>
                <textarea name="mensaje" rows={3} maxLength={500} placeholder="Cómo llegar, dificultad, qué hay de especial" className={`${field} resize-none`} />
              </label>
              <label className="grid gap-1.5 text-sm font-semibold">
                Tu nombre <span className="font-normal text-muted-foreground">(opcional)</span>
                <input name="nombre" maxLength={60} autoComplete="name" className={field} />
              </label>
              <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-0 w-0 opacity-0" />
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="mt-5 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-quetzal text-base font-bold text-background transition-transform active:scale-[0.98] disabled:opacity-70"
            >
              {status === 'sending' ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden /> : <Send className="h-5 w-5" aria-hidden />}
              {status === 'sending' ? 'Enviando' : 'Enviar sugerencia'}
            </button>

            <p role="status" aria-live="polite" className="mt-3 min-h-6 text-sm">
              {status === 'ok' && (
                <span className="flex items-center gap-2 text-water">
                  <Check className="h-4 w-4" aria-hidden /> Recibido. Gracias por el dato.
                </span>
              )}
              {status === 'error' && <span className="text-destructive">{error}</span>}
            </p>
          </form> 
          */}
        </div>

        <footer className="mt-20 flex flex-col items-center gap-3 border-t border-border/50 pt-8 text-center">
          <span className="flex items-center gap-2 font-display text-lg font-semibold">
            <Mountain className="h-4 w-4 text-water" aria-hidden /> Ruta Salvaje
          </span>
          <p className="text-sm text-muted-foreground">Registro de exploración de EMCC</p>
        </footer>
      </div>
    </section>
  );
}