import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Ruta Salvaje',
    short_name: 'Ruta Salvaje',
    description: 'Diario de exploración por Chiriquí, Panamá.',
    start_url: '/',
    display: 'standalone',
    background_color: '#061210',
    theme_color: '#061210',
    icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }],
  };
}
